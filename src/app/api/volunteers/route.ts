import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { VolunteerEnrollment } from "@/context/AppContext";

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, course, year, cell } = await request.json();

    if (!fullName || !email || !phone || !course || !year || !cell) {
      return NextResponse.json(
        { success: false, message: "Missing required volunteer parameters." },
        { status: 400 }
      );
    }

    const db = await readDb();

    const newEnrollment: VolunteerEnrollment = {
      id: Date.now(),
      fullName,
      email,
      phone,
      course,
      year,
      cell,
      date: new Date().toISOString().split("T")[0]
    };

    db.enrollments.push(newEnrollment);
    await writeDb(db);

    return NextResponse.json({ success: true, enrollment: newEnrollment });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to record volunteer enrollment." },
      { status: 500 }
    );
  }
}
