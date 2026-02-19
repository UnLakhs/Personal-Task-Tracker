// app/page.tsx
import AddTaskUI from "./components/menu/AddTaskUI";
import ProgressBar from "./components/ProgressBar";
import TaskList from "./components/tasks/TaskList";
import { getTaskCounts }  from "./lib/getTasks";

export default async function Home() {
  const taskCount = await getTaskCounts();
  return (
    <div className="max-w-xl mx-auto bg-card rounded-3xl shadow-lg border border-gray-100 p-8 min-h-full">
      <h1 className="text-4xl font-bold text-foreground">Personal Task Tracker</h1>
      <span className="text-gray my-2">{taskCount.completed} of {taskCount.total}</span>
      <ProgressBar completed={taskCount.completed} total={taskCount.total} />
      <AddTaskUI />
      <TaskList />
    </div>
  );
}