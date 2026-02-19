import { Task } from "@/app/constants/types";
import ToggleTask from "./ToggleTask";
import DeleteTask from "./DeleteTask";

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
    <div className="rounded-2xl p-4">
      <ul>
        {tasks && tasks.length > 0
          ? tasks.map((task: Task) => (
              <li className="group text-sm py-3 px-4 w-full mb-2 border border-border rounded-lg bg-card" key={task._id.toString()}>
                <div className="flex items-center justify-center gap-2">
                  <ToggleTask
                    id={task._id.toString()}
                    completed={task.status === "completed"}
                  />
                  <span 
                    className={`
                      flex-1 
                      wrap-break-word 
                      overflow-hidden
                      ${task.status === "completed" ? "line-through opacity-50" : ""}
                    `}
                  >
                    {task.title}
                  </span>
                  <DeleteTask id={task._id.toString()} />
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TaskList;
