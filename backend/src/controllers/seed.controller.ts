// ** Third party imports
import type { Request, Response } from "express";
import { faker } from "@faker-js/faker";

// ** Utils
import { hashPassword } from "@/utils/hashing.util";

// ** DB
import { db } from "@/db";
import { userTable, userRoleEnum } from "@/schemas";
import { catchError } from "@/utils/catch-error.util";
import { ConnectionError } from "@fvoid/shared-lib";

const seedUser = async (req: Request, res: Response) => {
  const { count = "10" } = req.params;
  const total = parseInt(count);

  if (isNaN(total) || total <= 0) {
    return res.status(400).json({ message: "Invalid count provided." });
  }

  console.log("Removing existing users...");
  const [deleteError] = await catchError(db.delete(userTable));

  if (deleteError) throw new ConnectionError("Database Connection Error !!");

  console.log("--- Existing users removed successfully ---");

  const roles = userRoleEnum.enumValues;

  for (let i = 0; i < total; i++) {
    const authData = {
      email: `seed${i + 1}@jobportal.com`,
      phoneNumber: faker.phone.number(),
      password: await hashPassword("qwerty"),
      fullName: faker.person.fullName(),
      role: faker.helpers.arrayElement(roles),
    };

    const [createError, result] = await catchError(
      db
        .insert(userTable)
        .values(authData)
        .returning({
          id: userTable.id,
          email: userTable.email,
          role: userTable.role,
        })
        .then((res) => res[0])
    );

    if (createError) {
      console.error(`Error creating user ${i + 1}:`, createError);
    } else {
      console.log(
        `User ${i + 1} created: ID=${result?.id}, Email=${
          result?.email
        }, Role=${result?.role}`
      );
    }
  }

  return res.json({ message: `${total} seed users created successfully.` });
};

export default seedUser;
