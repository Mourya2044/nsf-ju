import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const caller = await getAuthenticatedUser(request);
    if (!caller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Active session required." },
        { status: 401 }
      );
    }

    if (caller.role !== "Admin" && caller.role !== "Committee Head") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin or Committee Head role required to dispatch tasks." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, desc, wing, priority, visibility, deadline, assignee, duration } = body;

    if (!title || !desc || !wing || !priority || !visibility || !deadline) {
      return NextResponse.json(
        { success: false, message: "Missing required task fields." },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        desc,
        wing,
        priority,
        status: "todo",
        assignee: assignee || [],
        assignedBy: caller.name,
        deadline,
        visibility,
        duration: duration || "Not Estimated",
        volunteersJoined: [],
      },
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create task." },
      { status: 500 }
    );
  }
}
