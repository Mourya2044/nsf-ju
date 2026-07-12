import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { Task } from "@/context/AppContext";

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json({ success: true, tasks: db.tasks });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, desc, wing, priority, visibility, deadline, assignee, duration, assignedBy } = body;

    if (!title || !desc || !wing || !priority || !visibility || !deadline) {
      return NextResponse.json(
        { success: false, message: "Missing required task fields." },
        { status: 400 }
      );
    }

    const db = await readDb();

    const newTask: Task = {
      id: Date.now(),
      title,
      desc,
      wing,
      priority,
      status: "todo",
      assignee: assignee || [],
      assignedBy: assignedBy || "Committee Lead",
      deadline,
      visibility,
      duration: duration || "Not Estimated",
      volunteersJoined: []
    };

    db.tasks.unshift(newTask);
    await writeDb(db);

    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create task." },
      { status: 500 }
    );
  }
}
