import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import {
  BadRequestError,
  ConnectionError,
  handleAsync,
  NotFoundError,
  uploads,
} from "@fvoid/shared-lib";
import type { LoginInput, RegisterInput } from "@/validations/user.validation";
import { db } from "@/db";
import { profileTable, userTable } from "@/schemas";
import { eq, sql } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/utils/hashing.util";
import { config } from "@/config";
import { updateImage } from "@/utils/update-image-url.util";
import { catchError } from "@/utils/catch-error.util";
import type { UpsertProfileType } from "@/validations/profile.validaiton";

// controller

export const upsertProfile = async (req: Request, res: Response) => {
  const formData = req.body as UpsertProfileType;

  const [error, result] = await catchError(
    db.transaction(async (tx) => {
      // upload image to cloudinary
      const uploadResult = await uploads(formData.profilePhoto ?? "");

      formData.profilePhoto = uploadResult?.secure_url;

      const [profile] = await tx
        .insert(profileTable)
        .values(formData)
        .onConflictDoUpdate({
          // 🛑 FIX: The 'target' must be the unique COLUMN (profileTable.userId),
          // not the value (formData.id). We use userId because a user should
          // only have one profile, making it a reliable unique key for the upsert.
          target: profileTable.userId,
          set: {
            bio: sql`excluded.bio`,
            // 🛑 NOTE: I removed 'from' and 'year' as they are not
            // defined in your profileTable schema.
            profilePhoto: sql`excluded.profile_photo`,
            skills: sql`excluded.skills`,
            updatedAt: new Date(), // It's a good practice to update the timestamp
          },
        })
        .returning();

      return profile;
    })
  );

  if (error) throw new ConnectionError("Error upserting profile!");

  return res.json({ profile: result });
};
