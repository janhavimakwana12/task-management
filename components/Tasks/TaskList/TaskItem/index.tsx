import React from "react";
import { Task } from "@/types";
import { formatDate } from "@/utils/functions";

interface Props {
    task: Task;
    onViewDetails: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const TaskItem = React.memo((props: Props) => {
    return <div className="bg-blue-200 p-2 text-sm rounded-sm">
        <p className="font-bold">{props.task.title}</p>
        <p className="text-sm font-semibold text-gray h-15 overflow-hidden">{props.task.description}</p>
        <p className="text-[10px] mt-2 font-semibold text-gray-600">Created at: {formatDate(props.task.createdAt!)}</p>
        <div className="flex justify-end mt-2">
            <button onClick={props.onDelete} className="cursor-pointer bg-red-500 mr-1 rounded-md px-2 py-1 text-sm font-medium text-white">Delete</button>
            <button onClick={props.onEdit} className="cursor-pointer bg-blue-500 mr-1 rounded-md px-2 py-1 text-sm font-medium text-white">Edit</button>
            <button onClick={props.onViewDetails} className="cursor-pointer bg-blue-600 rounded-md px-2 py-1 text-sm font-medium text-white">View Details</button>
        </div>
    </div>
});

export default TaskItem;