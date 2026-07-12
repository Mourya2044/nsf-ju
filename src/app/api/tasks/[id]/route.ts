import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const taskId = parseInt(id, 10);
    const { action, email } = await request.json();

    const db = await readDb();
    const index = db.tasks.findIndex((t) => t.id === taskId);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Task not found." },
        { status: 404 }
      );
    }

    const task = db.tasks[index];

    if (action === "complete") {
      task.status = "completed";
    } else if (action === "join") {
      if (!email) {
        return NextResponse.json(
          { success: false, message: "Email is required to join a task." },
          { status: 400 }
        );
      }
      
      const volunteers = task.volunteersJoined || [];
      if (!volunteers.includes(email)) {
        task.volunteersJoined = [...volunteers, email];
      }
      
      const assignees = task.assignee || [];
      if (!assignees.includes(email)) {
        task.assignee = [...assignees, email];
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action. Supported actions are 'complete' and 'join'." },
        { status: 400 }
      );
    }

    await writeDb(db);
    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update task." },
      { status: 500 }
    );
  }
}
