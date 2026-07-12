import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);
    const { role, wing, status } = await request.json();

    const db = await readDb();
    const index = db.members.findIndex(
      (c) => c.email.toLowerCase() === decodedEmail.toLowerCase()
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Member not found." },
        { status: 404 }
      );
    }

    if (role !== undefined) db.members[index].role = role;
    if (wing !== undefined) db.members[index].wing = wing;
    if (status !== undefined) db.members[index].status = status;

    await writeDb(db);
    return NextResponse.json({ success: true, member: db.members[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update member." },
      { status: 500 }
    );
  }
}
