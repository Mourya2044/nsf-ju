import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Reading initial admin credentials from environment variables...");

  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "SECURITY ERROR: INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD environment variables must be defined in .env to seed the database."
    );
  }

  const secureAdminPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.member.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      password: secureAdminPassword,
      role: "Admin",
      status: "Active",
    },
    create: {
      email: adminEmail.toLowerCase(),
      name: "NSF JU Administrator",
      role: "Admin",
      wing: "General",
      status: "Active",
      password: secureAdminPassword,
    },
  });

  console.log(`Default Administrator configured from .env: ${admin.email} (ID: ${admin.id})`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
