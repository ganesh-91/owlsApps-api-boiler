import { Document } from "mongoose";

export interface Note extends Document {
    isCreateTodoActive: Boolean;
    content: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateRequestNote extends Document {
    isCreateTodoActive: Boolean;
    content: String;
    id: Number
}

export interface CreateRequestNote extends Document {
    content: String;
}