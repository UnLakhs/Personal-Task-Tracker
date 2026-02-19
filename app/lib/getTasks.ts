//fetch tasks from the backend

import { Task } from "../constants/types";
import clientPromise from "./mongoDB";

// Fetches all tasks from the MongoDB database
const getAllTasks = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Personal-Task-Tracker");
    const TaskCollection = db.collection<Task>("tasks");
    const tasks = await TaskCollection.find({}).toArray();
    console.log("Fetched tasks:", tasks);
    console.log(`task length: ${tasks.length}`);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export default getAllTasks;

// Fetches the count of total, completed, and ongoing tasks from the MongoDB database
export async function getTaskCounts() {
  const client = await clientPromise;
  const db = client.db("Personal-Task-Tracker");
  const TaskCollection = db.collection<Task>("tasks");

  const total = await TaskCollection.countDocuments();
  const completed = await TaskCollection.countDocuments({
    status: "completed",
  });
  const ongoing = await TaskCollection.countDocuments({
    status: "ongoing",
  });

  return { total, completed, ongoing };
}