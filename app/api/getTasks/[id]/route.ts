//Upadting the status of a task (toggle between completed and ongoing)
import { Task } from "@/app/constants/types";
import clientPromise from "@/app/lib/mongoDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const client = await clientPromise;
    const db = client.db("Personal-Task-Tracker");
    const taskCollection = db.collection<Task>("tasks");

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const task = await taskCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const newStatus = task.status === "completed" ? "ongoing" : "completed";

    await taskCollection.updateOne(
      { _id: task._id },
      { $set: { status: newStatus } },
    );

    return NextResponse.json(
      { message: "Task status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error toggling task status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

//Deletes a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db("Personal-Task-Tracker");
  const taskCollection = db.collection<Task>("tasks");

  try {
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    if (!result)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
