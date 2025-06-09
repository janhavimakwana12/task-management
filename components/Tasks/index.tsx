'use client';
import React, { useEffect, useCallback, useState } from "react";
import Input from "../Input";
import TaskList from "./TaskList";
import Modal from "../Modal";
import AddEditTask from "./AddEditTask";
import TaskDetails from "./TaskDetails";
import { TASK_STATUS, TODO_TYPES } from "@/types";
import api from "@/utils/api";
import { Task } from "@/types";
import DeleteTask from "./DeleteTask";
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getTaskTypes } from "@/utils/functions";

export default function Tasks(){
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(timer)
      }, [query])

      const fetchTasks = useCallback(async() => {
        try{
            if(debouncedQuery.trim() === ''){
                const res = await api.get('/api/task')
                setTasks(res.data.tasks)
            }else {
                const res = await api.get(`/api/task/search?q=${encodeURIComponent(debouncedQuery)}`)
                setTasks(res.data.tasks)
            }
        }catch(error:any){
            toast.error(error.response.data.message);
        }
      }, [debouncedQuery])

      useEffect(() => {
        fetchTasks()
      }, [debouncedQuery, isAddModalOpen, isEditModalOpen, isDeleteModalOpen])

    const handleModal = useCallback(() => {
        setAddModalOpen(!isAddModalOpen);
    }, [isAddModalOpen]);

    const handleClose = useCallback(() => {
        setAddModalOpen(false);
        setEditModalOpen(false);
        setViewModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedTask(null);
    }, []);

    const handleViewDetails = useCallback((task: Task) => {
        setViewModalOpen(true);
        setSelectedTask(task);
    }, []);

    const handleEdit = useCallback((task: Task) => {
        setEditModalOpen(true);
        setSelectedTask(task);
    }, []);

    const handleDelete = useCallback((task: Task) => {
        setDeleteModalOpen(true);
        setSelectedTask(task);
    }, []);

    const handleDragEnd = useCallback(async(result: DropResult) => {

        const {destination, source, draggableId} = result;
        if (!destination || destination.droppableId === source.droppableId) return

        try {
          setTasks(prev =>
            prev.map(task =>
              task.id === draggableId ? { ...task, status: destination.droppableId as Task['status'] } : task
            )
          )
          await api.patch(`/api/task/${draggableId}/status`, {
            status: destination.droppableId,
          })
        } catch (error) {
          toast.error('Could not update task status')
        }
    }, []);

    const handleSort = useCallback(async(q: string) => {
        setSortBy(q);
        if(q === 'recent'){
            fetchTasks()
        }else{
            const res = await api.get(`/api/task/search?queryStatus=${q}`);
            setTasks(res.data.tasks);
        }
    }, [sortBy]);

    const handleSearch = useCallback((q: string) => {
        setQuery(q);
        setSortBy('recent');
    }, [query]);

    return <div className="p-4 flex flex-col">
        <button onClick={handleModal} className="cursor-pointer bg-blue-600 rounded-md text-white text-sm py-1 px-2 w-full md:w-40">Add Task</button>
        <Modal isOpen={isAddModalOpen} onClose={handleClose}>
            <AddEditTask type={TODO_TYPES.Add} onClose={handleClose} />
        </Modal>
        <Modal isOpen={isViewModalOpen} onClose={handleClose}>
            <TaskDetails task={selectedTask} onClose={handleClose} />
        </Modal>
        <Modal isOpen={isEditModalOpen} onClose={handleClose}>
            <AddEditTask task={selectedTask || undefined} type={TODO_TYPES.Edit} onClose={handleClose} />
        </Modal>
        <Modal isOpen={isDeleteModalOpen} onClose={handleClose}>
            <DeleteTask task={selectedTask} onClose={handleClose} />
        </Modal>
        <div className="my-2 py-2 px-2 flex md:flex-row flex-col justify-between rounded-md shadow-md shadow-gray-300 ">
            <div className="flex flex-row items-center">
                <span className="mr-2 font-semibold text-sm">Search:</span>
                <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="md:w-90 w-full rounded-sm" />
            </div>
            <div className="flex flex-row items-center justify-end w-full mt-2 md:mt-0">
                <span className="mr-2 font-semibold text-sm">Sort By:</span>
                <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="w-20 px-2 h-8 border rounded-md bg-white text-sm text-gray-700 focus:outline-none"
                >
                <option value="recent">Recent</option>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                </select>
            </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd} >
            <div className="grid grid-cols-3 gap-2">
                <Droppable droppableId="todo" key="todo" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <TaskList  type="todo" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.Todo)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
                            {provided.placeholder}
                            </div>
                    )}
                </Droppable>
                <Droppable droppableId="inprogress" key="inprogress" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <TaskList type="in progress" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.InProgress)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
                            {provided.placeholder}
                            </div>
                    )}
                </Droppable>
                <Droppable droppableId="done" key="done" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <TaskList type="done" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.Done)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
                            {provided.placeholder}
                            </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    </div>
}