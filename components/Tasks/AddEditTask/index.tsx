'use client';
import { TODO_TYPES } from "@/types";
interface Props{
  type: TODO_TYPES
}

export default function AddEditTask(props: Props) {
  return (
    <div className="h-80 w-60 flex flex-col">
      <p className="text-md font-bold mb-2">{props.type} Task</p>
      <div className="flex flex-col mb-3">
        <label className="text-xs font-semibold text-gray-500">Title</label>
        <input className="outline-none border-b border-gray-400 text-sm" value="Title 1"  type="text" onChange={() => {}} />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-xs font-semibold text-gray-500">Description</label>
        <textarea rows={3} className="text-sm outline-none border-b border-gray-400" value="Description"  onChange={() => {}} />
      </div>
      <div className="self-end mt-auto">
        <button className="cursor-pointer bg-gray-100 text-sm py-1 px-2 rounded-md font-medium mr-2">Save</button>
        <button className="cursor-pointer bg-gray-300 text-sm py-1 px-2 rounded-md font-medium">Cancel</button>
      </div>
    </div>
  );
}
