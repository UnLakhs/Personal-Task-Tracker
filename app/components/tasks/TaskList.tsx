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
    <div className="rounded-2xl p-4 w-100">
      <ul>
        {tasks && tasks.length > 0
          ? tasks.map((task: Task) => (
              <li className="text-2xl flex justify-between w-64" key={task._id.toString()}>
                <div>
                  <ToggleTask
                    id={task._id.toString()}
                    completed={task.status === "completed"}
                  />
                  <span className={task.status === "completed" ? "line-through opacity-50" : ""}>{task.title}</span>
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
