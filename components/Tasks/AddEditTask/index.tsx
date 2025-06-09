"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Task, TODO_TYPES } from "@/types";
import api from "@/utils/api";
import toast from 'react-hot-toast'
interface Props {
  type: TODO_TYPES;
  onClose: () => void;
  task?: Task
}

type FormValues = {
  title: string;
  description: string;
};

export default function AddEditTask(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues:{
      title: props.task?.title ?? "",
      description: props.task?.description ?? ""
    }
  });

  const onSubmit = async(data: FormValues) => {
    try{
      if(props.type === TODO_TYPES.Add){
        await api.post('/api/task', data);
      }else{
        await api.patch(`/api/task/${props?.task?.id}`, data);
      }
    }catch(error:any){
      toast.error(error.response.data.message);
    }finally{
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-80 w-60 flex flex-col">
      <p className="text-md font-bold mb-2">{props.type} Task</p>
      <div className="flex flex-col mb-3">
        <label className="text-xs font-semibold text-gray-500">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          className={`outline-none border-b text-sm ${
            errors.title ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.title && (
          <span className="text-red-500 text-xs mt-1">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-xs font-semibold text-gray-500">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={3}
          className={`outline-none border-b text-sm ${
            errors.description ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.description && (
          <span className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="self-end mt-auto">
        <button
          className="cursor-pointer bg-gray-100 text-sm py-1 px-2 rounded-md font-medium mr-2"
          type="submit"
        >
          Save
        </button>
        <button
          className="cursor-pointer bg-gray-300 text-sm py-1 px-2 rounded-md font-medium"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
