import { Controller, Get, Post, Body, Put, Param, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { NoteService } from './note.service';
import {
    getResponseStatus,
    noteModuleEnt,
    successEnt,
    getAllEnt,
    errorEnt,
    createEnt,
    updateEnt,
    deleteEnt
} from 'src/common/responseStatus/responseStatusHepler';
import { CreateRequestNote, UpdateRequestNote } from './interface/note.interface';
import { IResponse } from '../common/interfaces/response.interface';

@Controller('note')
export class NoteController {
    constructor(
        private readonly noteService: NoteService) { }

    @Get()
    async getAll(): Promise<IResponse> {
        try {
            let noteList = await this.noteService.getAll();
            return new ResponseSuccess(getResponseStatus(noteModuleEnt, getAllEnt, successEnt), noteList);
        } catch (error) {
            throw new HttpException(getResponseStatus(noteModuleEnt, getAllEnt, errorEnt), HttpStatus.NOT_FOUND)
        }
    }

    @Post('/add')
    async addNote(
        @Body() data: CreateRequestNote
    ): Promise<IResponse> {
        try {
            let note = await this.noteService.addNote(data);
            return new ResponseSuccess(getResponseStatus(noteModuleEnt, createEnt, successEnt), note);
        } catch (error) {
            throw new HttpException(getResponseStatus(noteModuleEnt, createEnt, errorEnt), HttpStatus.NOT_FOUND)
        }
    }

    @Put(':id')
    async updateNote(
        @Param('id') id: any,
        @Body() data: UpdateRequestNote
    ): Promise<IResponse> {
        try {
            await this.noteService.updateNote(data, id);
            return new ResponseSuccess(getResponseStatus(noteModuleEnt, updateEnt, successEnt));
        } catch (error) {
            throw new HttpException(getResponseStatus(noteModuleEnt, updateEnt, errorEnt), HttpStatus.NOT_FOUND)
            // return new ResponseError(getResponseStatus(noteModuleEnt, updateEnt, successEnt), error);
        }
    }

    @Delete('/:id')
    async deleteNote(
        @Param('id') id: any
    ): Promise<IResponse> {
        try {
            await this.noteService.deleteNote(id);
            return new ResponseSuccess(getResponseStatus(noteModuleEnt, deleteEnt, successEnt));
        } catch (error) {
            throw new HttpException(getResponseStatus(noteModuleEnt, deleteEnt, errorEnt), HttpStatus.NOT_FOUND)
        }
    }
}
