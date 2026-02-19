"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const DeleteTask = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/getTasks/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
    >
      <Trash2 size={20} />
    </button>
  );
};

export default DeleteTask;
