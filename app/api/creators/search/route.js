import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const creators = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    })
      .select("name username bio profilepic")
      .limit(10)
      .lean();

    return NextResponse.json(creators);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch creators" },
      { status: 500 }
    );
  }
}