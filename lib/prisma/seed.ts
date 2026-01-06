import { prisma } from "./client";

async function down() {
  await prisma.$transaction(async (tx) => [
    await tx.$executeRaw`TRUNCATE TABLE "UserRole" RESTART IDENTITY CASCADE;`,
    await tx.$executeRaw`TRUNCATE TABLE "Role" RESTART IDENTITY CASCADE;`,
    await tx.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
  ]);
}

async function up() {
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        fio: "Полотский Е.В.",
        fioShort: "Полотский Е.В.",
        email: "leeqviz@gmail.com",
        position: "Профессор",
        department: "Факультет информационных технологий",
        login: "leeqviz@gmail.com",
        password: "admin11111",
      },
    });
    const role = await tx.role.create({
      data: {
        name: "Admin",
        description: "Administrator",
      },
    });
    await tx.userRole.create({
      data: {
        assignedBy: "system",
        userId: user.id,
        roleId: role.id,
      },
    });
  });
}

export async function seed() {
  // Use an interactive transaction for safety
  await prisma.$transaction(async () => {
    // 1. CLEANUP: Delete data in correct order (child tables first)
    // Using deleteMany({}) is safer than 'TRUNCATE' because it respects foreign keys
    console.log("Clearing old data...");
    await down();

    // 2. SEED: Create new data
    console.log("Inserting new data...");
    await up();
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
