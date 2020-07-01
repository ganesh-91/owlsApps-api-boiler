import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, UpdateRequestNote, CreateRequestNote } from './interface/note.interface';

@Injectable()
export class NoteService {

    constructor(
        @InjectModel('Note') private readonly noteModel: Model<Note>
    ) { }

    async getAll(): Promise<Note[]> {
        let notesFromDb = await this.noteModel.find().sort({ updatedAt: -1 });
        if (!notesFromDb) throw new HttpException('NOTE.NOT_FOUND', HttpStatus.NOT_FOUND);
        return notesFromDb;
    }

    async addNote(data: CreateRequestNote): Promise<Note> {
        let createdNote = new this.noteModel(data);
        createdNote.save();
        return createdNote;
    }

    async breakContent(textValue: String): Promise<String[]> {
        const lines = textValue.replace(/\r\n/g, "\n").split("\n");
        return lines;
    }

    async updateNote(data: UpdateRequestNote, id: any): Promise<Note> {
        let noteFromDb = await this.noteModel.findOne({ _id: id });
        if (!noteFromDb) throw new HttpException('NOTE.NOT_FOUND', HttpStatus.NOT_FOUND);
        noteFromDb.content = data.content;
        noteFromDb.isCreateTodoActive = data.isCreateTodoActive;
        noteFromDb.updatedAt = new Date();
        // const todoLines = await this.breakContent(data.content);
        await noteFromDb.save();
        return noteFromDb;
    }

    async deleteNote(id: any): Promise<Note> {
        let noteFromDb = await this.noteModel.findOneAndDelete({ _id: id });
        if (!noteFromDb) throw new HttpException('NOTE.NOT_FOUND', HttpStatus.NOT_FOUND);
        return noteFromDb;
    }
}
