import type { Request, Response } from "express";
import { BadRequestError, ConnectionError, uploads } from "@fvoid/shared-lib";
import { db } from "@/db";
import { profileTable } from "@/schemas";
import { eq, sql } from "drizzle-orm";
import { catchError } from "@/utils/catch-error.util";
import type { UpsertProfileType } from "@/validations/profile.validaiton";

export const upsertProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const formData = req.body as UpsertProfileType;
  // console.log("form data ", formData);

  // upload image to cloudinary
  if (!id) {
    const uploadResult = await uploads(formData.profilePhoto ?? "");
    formData.profilePhoto = uploadResult?.secure_url;

    const [errProfileInsert, [profile]] = await catchError(
      db.insert(profileTable).values(formData).returning()
    );

    // if (errProfileInsert)
    //   throw new ConnectionError("Db error inserting profile");

    if (errProfileInsert)
      console.log("@@@@@@@@@@@@@@ Db error inserting profile");

    return res.json(profile);
    // console.log("updated prfile ", res.json(profile))
    // return profile;
  }

  const [profileError, oldProfile] = await catchError(
    db.query.profileTable.findFirst({
      where: eq(profileTable.id, id),
    })
  );

  if (profileError) throw new ConnectionError("Database Error!");

  if (formData.profilePhoto !== oldProfile?.profilePhoto) {
    const uploadResult = await uploads(formData.profilePhoto ?? "");
    formData.profilePhoto = uploadResult?.secure_url;
  }

  const [errProfileUpdate, [profile]] = await catchError(
    db
      .update(profileTable)
      .set(formData)
      .where(eq(profileTable.id, id))
      .returning()
  );

  // if (errProfileUpdate)
  //   throw new ConnectionError("Db error updating profile " + errProfileUpdate);

  if (errProfileUpdate)
    console.log(
      "######################3 Db error updating profile " + errProfileUpdate
    );

  return res.json(profile);

  // if (error) throw new ConnectionError("DB Error upserting profile! "+error);

  // if (error) console.log("DB Error upserting profile! " + error);
};

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("iddd ", id);

  if (!id) throw new BadRequestError("Id not found!");

  const [profileError, profile] = await catchError(
    db.query.profileTable.findFirst({
      where: eq(profileTable.userId, id),
    })
  );

  if (profileError) throw new ConnectionError("Database Error!");
  return res.json(profile);
};
