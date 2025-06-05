export default function Task(props: {description: string;}){
    return <div className="bg-blue-200 p-2 text-sm rounded-sm">
        <p className="font-bold">Task 3</p>
        <p className="text-sm font-semibold text-gray h-15 overflow-hidden">{props.description}</p>
        <p className="text-[10px] mt-2 font-semibold text-gray-600">Created at: 01/09/2024, 05:30:00</p>
        <div className="flex justify-end mt-2">
            <button className="bg-red-500 mr-1 rounded-md px-2 py-1 text-sm font-medium text-white">Delete</button>
            <button className="bg-blue-500 mr-1 rounded-md px-2 py-1 text-sm font-medium text-white">Edit</button>
            <button className="bg-blue-600 rounded-md px-2 py-1 text-sm font-medium text-white">View Details</button>
        </div>
    </div>
}