import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const found = db.members.find(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. User not found." },
        { status: 404 }
      );
    }

    if (found.status === "Deactivated") {
      return NextResponse.json(
        { success: false, message: "Account deactivated. Contact Committee Head." },
        { status: 403 }
      );
    }

    if (found.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid Credentials. Try again." },
        { status: 401 }
      );
    }

    // Return authenticated member (omitting password for security)
    const { password: _, ...userWithoutPassword } = found;
    return NextResponse.json({
      success: true,
      message: `Authentication approved. Welcome back, ${found.name}!`,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error during login." },
      { status: 500 }
    );
  }
}
