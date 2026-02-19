"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";

const AddTaskUI = () => {
  const router = useRouter();
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
      router.refresh();
      //   setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-card rounded-2xl p-2 flex flex-row items-center justify-between w-full border border-border gap-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/30 transition-duration-200 transition-shadow">
      <form onSubmit={handleSubmit} className="flex justify-between w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          className="bg-transparent text-sm text-foreground w-full focus:outline-none flex-1"
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="cursor-pointer hover:opacity-90 transition transition-duration-200 bg-primary text-primary-foreground p-1.5 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="w-4 h-4  "/>
        </button>
      </form>
    </div>
  );
};

export default AddTaskUI;
