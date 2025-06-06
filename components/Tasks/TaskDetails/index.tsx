import { Task } from "@/types";
import { formatDate } from "@/utils/functions";

interface Props {
    task: Task | null;
    onClose: () => void;
}

export default function TaskDetails(props: Props){
    return (
        <div className="h-80 w-60 flex flex-col">
            <p className="text-md font-bold mb-2">Task Details</p>
            <p className="font-semibold mb-2">Task: {props.task?.title}</p>
            <p className="text-sm font-semibold text-gray">Description: {props.task?.description}</p>
            <p className="text-[11px] mt-2 font-semibold text-gray-600">Created at: {formatDate(props.task?.createdAt!)}</p>
            <button onClick={props.onClose} className="cursor-pointer mt-auto bg-blue-600 rounded-md px-2 py-1 text-sm font-medium text-white self-end">Close</button>
        </div>
    )
}