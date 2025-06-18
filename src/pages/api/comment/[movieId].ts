import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.query;
  if (!movieId) return res.status(400).json({ error: "Missing movieId" });

  const comments = await prisma.comment.findMany({
    where: { movieId: String(movieId) },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(comments);
}