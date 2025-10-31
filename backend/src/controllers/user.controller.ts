import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import {
  BadRequestError,
  ConnectionError,
  handleAsync,
  NotFoundError,
} from "@fvoid/shared-lib";
import type {
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from "@/validations/user.validation";
import { db } from "@/db";
import { profileTable, userTable } from "@/schemas";
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

// export const getUser = async (req: Request, res: Response) => {
//   let { application } = req.query;
//   const { id } = req.params;

//   if (!id) throw new BadRequestError("Id not found!");

//   const [userError, user] = await catchError(
//     db.query.userTable.findFirst({
//       where: eq(userTable.id, id),
//       with: {
//         // creator: creator ? true : undefined,
//         // company: company ? true : undefined,
//         applications: application ? true : undefined,
//       },
//     })
//   );

//   if (userError) throw new ConnectionError("Database Error!");
//   if (!user) throw new NotFoundError();

//   return res.json(user);
// };

export const getUser = async (req: Request, res: Response) => {
  let { application, profile, job } = req.query;

  const { id } = req.params;

  if (!id) throw new BadRequestError("Id not found!");

  // --- Drizzle Query Logic ---
  const [userError, user] = await catchError(
    db.query.userTable.findFirst({
      where: eq(userTable.id, id),

      with: {
        applications: application
          ? {
              with: {
                job: job ? true : undefined,
              },
              // orderBy: (applications, { desc }) => [
              //   desc(applications.createdAt),
              // ],
            }
          : undefined,
        profile: profile ? true : undefined,
      },
    })
  );

  if (userError) throw new ConnectionError("Database Error!");
  if (!user) throw new NotFoundError();

  return res.json(user);
};
