import type { Request, Response } from "express";
import { ConnectionError, uploads } from "@fvoid/shared-lib";
import { db } from "@/db";
import { profileTable } from "@/schemas";
import { sql } from "drizzle-orm";
import { catchError } from "@/utils/catch-error.util";
import type { UpsertProfileType } from "@/validations/profile.validaiton";

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
