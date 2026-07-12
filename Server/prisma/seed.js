import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import "dotenv/config";



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});

async function seed() {
    console.log("🌱 Starting database seeding...");

    try {
        const adminEmail = "admin@college.com";
        const adminPassword = "Admin@123";

        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingAdmin) {
            console.log("✅ Admin user already exists. Skipping creation.");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        console.log(typeof hashedPassword);

        // Create the administrator
        await prisma.user.create({
            data: {
                fullName: "Administrator", // Changed from name to match your schema
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
                isActive: true,
            },
        });

        console.log("🎉 Administrator account seeded successfully.");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        await pool.end(); // Close PostgreSQL pool
    }
}

seed();
