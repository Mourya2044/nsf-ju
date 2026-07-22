import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const caller = await getAuthenticatedUser(request);
    if (!caller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    if (caller.role !== "Admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin authorization required to modify member records." },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const { role, wing, status } = await request.json();

    const existing = await prisma.member.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Member not found." },
        { status: 404 }
      );
    }

    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        ...(role !== undefined && { role }),
        ...(wing !== undefined && { wing }),
        ...(status !== undefined && { status }),
      },
    });

    const { password: _, ...safeMember } = updatedMember;
    return NextResponse.json({ success: true, member: safeMember });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update member." },
      { status: 500 }
    );
  }
}
