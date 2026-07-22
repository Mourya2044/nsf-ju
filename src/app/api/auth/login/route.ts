import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const found = await prisma.member.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!found) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. User not found." },
        { status: 404 }
      );
    }

    if (found.status === "Pending") {
      return NextResponse.json(
        { success: false, message: "Account pending approval. An Admin must approve your registration before you can log in." },
        { status: 403 }
      );
    }

    if (found.status === "Deactivated") {
      return NextResponse.json(
        { success: false, message: "Account deactivated. Contact Committee Head." },
        { status: 403 }
      );
    }

    const isValidPassword = await comparePassword(password, found.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Password verification failed." },
        { status: 401 }
      );
    }

    // Generate JWT Session Token
    const token = signToken({
      email: found.email,
      name: found.name,
      role: found.role,
      wing: found.wing,
    });

    const { password: _, ...userWithoutPassword } = found;
    
    const response = NextResponse.json({
      success: true,
      message: `Authentication approved. Welcome back, ${found.name}!`,
      user: userWithoutPassword,
      token,
    });

    // Attach secure HTTP-Only cookie to response
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error during login." },
      { status: 500 }
    );
  }
}
