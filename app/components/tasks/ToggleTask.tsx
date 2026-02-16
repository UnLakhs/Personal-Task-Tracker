"use client";

import { useRouter } from "next/navigation";

const ToggleTask = ({ id, completed }: { id: string; completed: boolean }) => {
  const router = useRouter();

  const toggle = async () => {
    try {
      await fetch(`/api/getTasks/${id}`, {
        method: "PATCH",
      });
      router.refresh();
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <button onClick={toggle} className="text-lg">
      {completed ? "☑" : "☐"}
    </button>
  );
};

export default ToggleTask;
