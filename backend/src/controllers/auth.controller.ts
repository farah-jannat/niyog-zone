import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import {
  BadRequestError,
  ConnectionError,
  handleAsync,
  NotAuthorizedError,
  NotFoundError,
} from "@fvoid/shared-lib";
import type { LoginInput, RegisterInput } from "@/validations/user.validation";
import { db } from "@/db";
import { userTable } from "@/schemas";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/utils/hashing.util";
import { config } from "@/config";
import { updateImage } from "@/utils/update-image-url.util";
import { catchError } from "@/utils/catch-error.util";

export const register = async (req: Request, res: Response) => {
  const formData = req.body as RegisterInput;

  const isUser = await handleAsync(
    db
      .select()
      .from(userTable)
      .where(eq(userTable.email, formData.email))
      .limit(1)
      .then((res) => res[0])
  );

  if (isUser) throw new BadRequestError("User already exits");

  // upload image to cloudinary
  // const uploadResult = await uploads(formData.);

  const hashedPassword = await hashPassword(formData.password);

  const registerData: RegisterInput = {
    ...formData,
    password: hashedPassword,
  };

  const newUser = await handleAsync(
    db
      .insert(userTable)
      .values(registerData)
      .returning()
      .then((res) => res[0])
  );

  // return res.status(201).json({
  //   message: "Account created successfully.",
  //   success: true,
  // });

  // Generate jwt
  const payload = {
    id: newUser?.id,
    email: newUser?.email,
    fullName: newUser?.fullName,
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600,
  };

  const token = jwt.sign(payload, config.JWT_TOKEN);

  req.session = { jwt: token };

  return res.json({
    message: "Account created successfully",
    user: newUser,
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const formData = req.body as LoginInput;

  console.log("=========================================== ", formData);

  // Find isUser & throw error if !isUser
  const isUser = await handleAsync(
    db
      .select()
      .from(userTable)
      .where(eq(userTable.email, formData.email))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new BadRequestError("User not found");

  // Compare password
  const isPasswordValid = await verifyPassword(
    formData.password,
    isUser.password
  );

  if (!isPasswordValid) throw new BadRequestError("Invalid credentials");

  // Generate jwt
  const payload = {
    id: isUser?.id,
    email: isUser.email,
    fullName: isUser.fullName,
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600,
  };

  const token = jwt.sign(payload, config.JWT_TOKEN);

  req.session = { jwt: token };

  return res.json({
    message: "User logged in successfully",
    user: isUser,
    token,
  });
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  return res.json({ message: "Logout successful", user: {} });
};

export const getAuthUser = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) throw new NotAuthorizedError();

  const [isUserError, isUser] = await catchError(
    db.query.userTable.findFirst({
      where: eq(userTable.email, user.email),
      columns: {
        password: false,
      },
    })
  );

  if (isUserError) throw new ConnectionError("Database Error!");
  if (!isUser) throw new NotFoundError();

  return res.json(isUser);
};
