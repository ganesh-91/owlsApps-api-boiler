import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    groupTitle: String,
    title: String,
    desc: [String]
});

// export const TodoListSchema = new mongoose.Schema({
//     groupTitle: String,
//     task: [TodoSchema]
// });
