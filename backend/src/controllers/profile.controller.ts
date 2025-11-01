import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import {
  BadRequestError,
  ConnectionError,
  handleAsync,
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

// updateProfile

// export const updateProfile = async (req: Request, res: Response) => {
//   const { id, profilePhoto, ...formData } = req.body as UpdateProfileInput;

//   const isProfile = await handleAsync(
//     db.query.profileTable.findFirst({
//       where: eq(profileTable.id, id),
//     })
//   );

//   if (!isProfile) throw new BadRequestError("Id is not defined");

//   // ** update image
//   const updateCoverImage = await updateImage(
//     isProfile.profilePhoto,
//     profilePhoto
//   );

//   // ** prepare data
//   const profileData = {
//     ...formData,
//     profilePhoto: updateCoverImage,
//   };

//   // ** update the profile
//   const [updatedProfile] = await db
//     .update(profileTable)
//     .set(profileData)
//     .where(eq(profileTable.id, id))
//     .returning();

//   return res.json(updatedProfile);
// };

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
