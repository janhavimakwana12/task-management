export enum TODO_TYPES  {
    Edit = "Edit",
    Add = "Add"
}

export enum TASK_STATUS {
    Pending = "pending",
    InProgress = "in progress",
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