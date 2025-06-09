import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/types";

interface Props {
    type: string;
    tasks: Task[];
    onViewDetails: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskList = React.memo((props: Props) => {
    return <div className="grid gap-2 shadow-md shadow-gray-400 rounded-md p-2">
        <div className="bg-blue-500 rounded-xs text-md text-white p-1 uppercase max-h-[32px]">{props.type}</div>
        {props.tasks.map((task: Task, index: number) => (
                <TaskItem index={index} key={index} task={task} onViewDetails={() => props.onViewDetails(task)} onEdit={() => props.onEdit(task)} onDelete={() => props.onDelete(task)} />
        ))}
    </div>
});

export default TaskList;