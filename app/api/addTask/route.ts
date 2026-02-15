//Adds task in database and returns response to client

import { Task } from "@/app/constants/types";
import clientPromise from "@/app/lib/mongoDB";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const client = await clientPromise;
  const db = client.db("Personal-Task-Tracker");
  const taskCollection = db.collection<Task>("tasks");

  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ message: "Invalid title" }, { status: 400 });
    }

    const newTask = await taskCollection.insertOne({
      _id: new ObjectId(),
      title,
      status: "ongoing",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Task added successfully", id: newTask.insertedId },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json(
      { message: "Failed to add task" },
      { status: 500 },
    );
  }
}
