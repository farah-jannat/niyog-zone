import type { Request, Response } from "express";
import {
  BadRequestError,
  ConnectionError,
  NotFoundError,
} from "@fvoid/shared-lib";
import { db } from "@/db";
import { userTable } from "@/schemas";
import { eq } from "drizzle-orm";
import { catchError } from "@/utils/catch-error.util";

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
