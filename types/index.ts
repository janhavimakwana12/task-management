export enum TODO_TYPES  {
    Edit = "Edit",
    Add = "Add"
}

export enum TASK_STATUS {
    Todo = "todo",
    InProgress = "inprogress",
    Done = "done"
}

export interface Task{
    title: string;
    description: string;
    createdAt?: string;
    status: TASK_STATUS;
    id: string;
}

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  cpassword: string;
};