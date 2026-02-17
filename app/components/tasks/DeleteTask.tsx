"use client";

import { useRouter } from "next/navigation";

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
    <button onClick={handleDelete} className="cursor-pointer text-red-500">
      
    </button>
  );
};

export default DeleteTask;
