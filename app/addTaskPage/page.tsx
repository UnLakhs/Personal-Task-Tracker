'use client';
import { useState } from "react";

const addTaskPage = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setLoading(true);
      const response = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      //   setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>ADD A TASK</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="border p-2 rounded"
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded cursor-pointer">{loading ? "Adding..." : "Add Task"}</button>
      </form>
    </div>
  );
};

export default addTaskPage;
