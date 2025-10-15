import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import type {
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from "@/validations/user.validation";
import { db } from "@/drizzle/db";
import { profileTable, userTable } from "@/drizzle/schemas";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/utils/hashing.util";
import { config } from "@/config";
import { updateImage } from "@/utils/update-image-url.util";

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

  await handleAsync(
    db
      .insert(userTable)
      .values(registerData)
      .returning()
      .then((res) => res[0])
  );

  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
};

export const login = async (req: Request, res: Response) => {
  const formData = req.body as LoginInput;

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

// updateProfile

export const updateProfile = async (req: Request, res: Response) => {
  const { id, profilePhoto, ...formData } = req.body as UpdateProfileInput;

  const isProfile = await handleAsync(
    db.query.profileTable.findFirst({
      where: eq(profileTable.id, id),
    })
  );

  if (!isProfile) throw new BadRequestError("Id is not defined");

  // ** update image
  const updateCoverImage = await updateImage(
    isProfile.profilePhoto,
    profilePhoto
  );

  // ** prepare data
  const profileData = {
    ...formData,
    profilePhoto: updateCoverImage,
  };

  // ** update the profile
  const [updatedProfile] = await db
    .update(profileTable)
    .set(profileData)
    .where(eq(profileTable.id, id))
    .returning();

  return res.json(updatedProfile);
};
