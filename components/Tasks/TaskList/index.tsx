import Task from "./Task";
import Modal from "@/components/Modal";
import TaskDetails from "../TaskDetails";
import AddEditTask from "../AddEditTask";
import { TODO_TYPES } from "@/types";

export default function TaskList(props: {type:string;}){
    return <div className="grid gap-2 shadow-md shadow-gray-400 rounded-md p-2">
        <div className="bg-blue-500 rounded-xs text-md text-white p-1 uppercase">{props.type}</div>
        <Task description="Description 1 Reprehenderit sunt exercitation anim adipisicing consectetur ipsum. Culpa consequat veniam minim consectetur quis voluptate laboris id ullamco ut quis nisi officia. Duis minim dolor dolore anim aliqua elit est. Fugiat do quis adipisicing in ad voluptate ex non cupidatat." />
        <Task description="Description 2"/>
        <Task description="Description 3" />
        {/* <Modal isOpen={true} onClose={() => {}}>
            <AddEditTask type={TODO_TYPES.Edit} />
        </Modal> */}
    </div>
}