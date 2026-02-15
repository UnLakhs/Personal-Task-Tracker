import AddTaskUI from "./components/menu/AddTaskUI";
import TaskList from "./components/tasks/TaskList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-4xl font-bold">Personal Task Tracker</h1>
      <AddTaskUI />
      <TaskList />
    </div>
  );
}
