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

export default function Tasks(){
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(timer)
      }, [query])

      useEffect(() => {
        const fetchTasks = async () => {
          if (debouncedQuery.trim() === '') {
            const res = await api.get('/api/task')
            setTasks(res.data.tasks)
          } else {
            const res = await api.get(`/api/task/search?q=${encodeURIComponent(debouncedQuery)}`)
            setTasks(res.data.tasks)
          }
        }

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

    return <div className="p-4 flex flex-col">
        <button onClick={handleModal} className="cursor-pointer bg-blue-600 rounded-md text-white text-sm py-1 px-2 w-40">Add Task</button>
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
        <div className="my-2 py-2 px-2 flex flex-row justify-between rounded-md shadow-md shadow-gray-300">
            <div className="flex flex-row items-center">
                <span className="mr-2 font-semibold text-sm">Search:</span>
                <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-90 rounded-sm" />
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
            <TaskList type="todo" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.Pending)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
            <TaskList type="in progress" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.InProgress)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
            <TaskList type="done" tasks={tasks.filter((task: Task) => task.status === TASK_STATUS.Done)} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    </div>
}