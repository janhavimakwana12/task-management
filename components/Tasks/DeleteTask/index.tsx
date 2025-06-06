import { Task } from "@/types";
import api from "@/utils/api";

interface Props {
    task: Task | null;
    onClose: () => void;
}

export default function DeleteTask(props: Props){
    const handleDelete = async () => {
        try{
            await api.delete(`/api/task/${props.task?.id}`);
        }catch(error){
            console.log(error);
        }finally{
            props.onClose();
        }
    };

    return (
        <div className="h-80 w-60 flex flex-col">
            <p className="text-md font-bold mb-2">Task Details</p>
            <p className="font-semibold mb-2">Task: {props.task?.title}</p>
            <p className="text-sm font-semibold text-gray">Description: {props.task?.description}</p>
            <p className="text-[11px] mt-2 font-semibold text-gray-600">Are you sure you want to delete this task?</p>
            <div className="mt-auto flex flex-row justify-end">
                <button onClick={props.onClose} className="mr-2 cursor-pointer mt-auto bg-blue-600 rounded-md px-2 py-1 text-sm font-medium text-white self-end">Cancel</button>
                <button onClick={handleDelete} className="cursor-pointer mt-auto bg-red-600 rounded-md px-2 py-1 text-sm font-medium text-white self-end">Delete</button>
            </div>
        </div>
    )
}