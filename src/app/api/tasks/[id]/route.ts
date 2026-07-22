import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const taskId = id; // String UUID
    const { action, email } = await request.json();

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json(
        { success: false, message: "Task not found." },
        { status: 404 }
      );
    }

    let updatedTask;

    if (action === "complete") {
      updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { status: "completed" },
      });
    } else if (action === "join") {
      if (!email) {
        return NextResponse.json(
          { success: false, message: "Email is required to join a task." },
          { status: 400 }
        );
      }

      const currentVolunteers = existingTask.volunteersJoined || [];
      const currentAssignees = existingTask.assignee || [];

      const newVolunteers = currentVolunteers.includes(email)
        ? currentVolunteers
        : [...currentVolunteers, email];

      const newAssignees = currentAssignees.includes(email)
        ? currentAssignees
        : [...currentAssignees, email];

      updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          volunteersJoined: newVolunteers,
          assignee: newAssignees,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action. Supported actions are 'complete' and 'join'." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update task." },
      { status: 500 }
    );
  }
}
