import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
    isCreateTodoActive: Boolean,
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});