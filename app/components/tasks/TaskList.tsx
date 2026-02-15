import { Task } from "@/app/constants/types";

const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getTasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const TaskList = async () => {
  const tasks = await getTasks();

  return (
    <div className="bg-[#27F5F5] rounded-2xl p-4 w-100">
      <ul>
        {tasks && tasks.length > 0
          ? tasks.map((task: Task) => (
              <li className="text-2xl" key={task._id.toString()}>{task.title}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TaskList;
