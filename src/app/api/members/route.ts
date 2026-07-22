import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, getAuthenticatedUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const caller = await getAuthenticatedUser(request);
    if (!caller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid authentication session required." },
        { status: 401 }
      );
    }

    const members = await prisma.member.findMany({
      orderBy: { id: "asc" },
    });
    // Return members list without passwords
    const safeMembers = members.map(({ password: _, ...rest }) => rest);
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
    const { name, email, password, wing, inviteCode } = await request.json();

    if (!name || !email || !password || !wing || !inviteCode) {
      return NextResponse.json(
        { success: false, message: "Missing required registration parameters (including Secret Passcode)." },
        { status: 400 }
      );
    }

    const expectedCode = process.env.MEMBER_SIGNUP_SECRET || "NSFJU2026";
    if (inviteCode.trim() !== expectedCode.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid Secret Organization Passcode. Verification failed." },
        { status: 403 }
      );
    }

    const lowerEmail = email.toLowerCase();
    const exists = await prisma.member.findUnique({
      where: { email: lowerEmail },
    });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "A member with this email is already registered." },
        { status: 409 }
      );
    }

    // Hash password with bcrypt before persisting
    const hashedPassword = await hashPassword(password);

    const newMember = await prisma.member.create({
      data: {
        name,
        email: lowerEmail,
        password: hashedPassword,
        role: "Member", // Self-registration is strictly role: Member
        wing,
        status: "Pending", // Requires Admin approval
      },
    });

    const { password: _, ...userWithoutPassword } = newMember;
    return NextResponse.json({
      success: true,
      message: `Account submitted successfully! Your registration is now PENDING approval by an Admin.`,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error during registration." },
      { status: 500 }
    );
  }
}
