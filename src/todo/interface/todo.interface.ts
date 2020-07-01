import { Document } from "mongoose";

export interface Todo extends Document {
    title: String,
    groupTitle: String,
    desc: []
}

// export interface TodoList extends Document {
//     groupTitle: String,
//     task: [Todo]
// }

export interface UpdateRequestTodo extends Document {
    content: String;
    id: Number
}

export interface CreateRequestTodo extends Document {
    content: String;
}