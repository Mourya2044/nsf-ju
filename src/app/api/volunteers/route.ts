import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, course, year, cell } = await request.json();

    if (!fullName || !email || !phone || !course || !year || !cell) {
      return NextResponse.json(
        { success: false, message: "Missing required volunteer parameters." },
        { status: 400 }
      );
    }

    const newEnrollment = await prisma.volunteerEnrollment.create({
      data: {
        taskId: "0",
        userEmail: email.toLowerCase(),
        userName: fullName,
      },
    });

    return NextResponse.json({ success: true, enrollment: newEnrollment });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to record volunteer enrollment." },
      { status: 500 }
    );
  }
}
