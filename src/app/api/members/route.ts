import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { Member } from "@/context/AppContext";

export async function GET() {
  try {
    const db = await readDb();
    // Return members list without passwords
    const safeMembers = db.members.map(({ password: _, ...rest }) => rest);
    return NextResponse.json({ success: true, members: safeMembers });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch members." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, role, wing } = await request.json();

    if (!name || !email || !password || !role || !wing) {
      return NextResponse.json(
        { success: false, message: "Missing required registration parameters." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const exists = db.members.some(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { success: false, message: "A member with this email is already registered." },
        { status: 409 }
      );
    }

    const newMember: Member = {
      name,
      email: email.toLowerCase(),
      role,
      wing,
      status: "Active",
      password
    };

    db.members.push(newMember);
    await writeDb(db);

    const { password: _, ...userWithoutPassword } = newMember;
    return NextResponse.json({
      success: true,
      message: `Account created successfully. Welcome ${name}!`,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error during registration." },
      { status: 500 }
    );
  }
}
