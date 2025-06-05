import Input from "../Input";
import TaskList from "./TaskList";

export default function Tasks(){
    return <div className="p-4 flex flex-col">
        <button className="bg-blue-600 rounded-md text-white text-sm py-1 px-2 w-40">Add Task</button>
        <div className="my-2 py-2 px-2 flex flex-row justify-between rounded-md shadow-md shadow-gray-300">
            <div className="flex flex-row items-center">
                <span className="mr-2 font-semibold text-sm">Search:</span>
                <Input placeholder="Search..." className="w-90 rounded-sm" />
            </div>
            <div className="flex flex-row items-center justify-end w-full">
                <span className="mr-2 font-semibold text-sm">Sort By:</span>
                <select
                    className="w-20 px-2 h-8 border rounded-md bg-white text-sm text-gray-700 focus:outline-none"
                >
                <option value="">Recent</option>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                </select>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
            <TaskList type="todo" />
            <TaskList type="in progress"/>
            <TaskList type="done" />
        </div>
    </div>
}