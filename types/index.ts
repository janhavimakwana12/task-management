export enum TODO_TYPES  {
    Edit = "Edit",
    Add = "Add"
}

export interface Task{
    title: string;
    description: string;
    createdAt?: string;
}