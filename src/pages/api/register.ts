import bcrypt from "bcrypt";
import  prismadb from "@/lib/prismadb"; // Adjust the import path as necessary
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword, // Only this if your schema uses hashedPassword
        emailVerified: new Date(),
        image: "",
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
