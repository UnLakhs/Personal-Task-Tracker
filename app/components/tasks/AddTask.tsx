"use client";

const AddTask = () => {
  return (
    <div className="bg-[#27F5F5] rounded-2xl p-4 flex flex-row items-center justify-between w-100">
      <h2>Personal Task Tracker</h2>
      <div>
        <div className="flex rounded-2xl bg-[#2DBDBD] p-4 items-center justify-center gap-2 cursor-pointer">
          <span>Add Task</span>
        </div>  
      </div>
    </div>
  );
};

export default AddTask;
