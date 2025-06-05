


export default function TaskDetails(){
    return (
        <div className="h-80 w-60 flex flex-col">
            <p className="text-md font-bold mb-2">Task Details</p>
            <p className="font-semibold mb-2">Task: Task 6</p>
            <p className="text-sm font-semibold text-gray">Description: Description 6</p>
            <p className="text-[11px] mt-2 font-semibold text-gray-600">Created at: 01/09/2021 05:30:00</p>
            <button className="mt-auto bg-blue-600 rounded-md px-2 py-1 text-sm font-medium text-white self-end">Close</button>
        </div>
    )
}