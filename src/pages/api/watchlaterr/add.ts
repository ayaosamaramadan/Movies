import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { movieId } = req.body;
  if (!movieId || typeof movieId !== "string") {
    return res.status(400).json({ error: "Invalid movieId" });
  }

  try {
    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: { watchlater: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // تأكد أن watchlater مصفوفة
    const currentwatchlater = Array.isArray(user.watchlater)
      ? user.watchlater
      : [];

    // لا تضف الفيلم إذا كان موجود مسبقًا
    if (currentwatchlater.includes(movieId)) {
      return res
        .status(200)
        .json({ watchlater: currentwatchlater, message: "Already in watchlater" });
    }

    const updatedwatchlater = [...currentwatchlater, movieId];

    const updatedUser = await prismadb.user.update({
      where: { email: session.user.email },
      data: {
        watchlater: {
          set: updatedwatchlater,
        },
      },
      select: { watchlater: true },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating watchlater:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
