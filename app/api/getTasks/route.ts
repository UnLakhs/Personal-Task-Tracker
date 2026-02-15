//Fetches all tasks from the database and returns them as a JSON response

import clientPromise from "@/app/lib/mongoDB";
import { NextResponse } from "next/server"; 

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Personal-Task-Tracker");
  const taskCollection = db.collection("tasks");

  try {
    const allTasks = await taskCollection.find({}).toArray();
    return NextResponse.json(allTasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}
