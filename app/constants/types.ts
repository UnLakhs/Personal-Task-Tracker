import { ObjectId } from "mongodb";

export interface Task {
    _id: ObjectId;
    title: string;
    status: "ongoing" | "completed";
    createdAt: Date; 
    priority: "low" | "medium" | "high";
}