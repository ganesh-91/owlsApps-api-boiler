import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ResponseSuccess } from 'src/common/dto/response.dto';
import { getResponseStatus, noteModuleEnt, createEnt, successEnt, errorEnt, todoModuleEnt } from 'src/common/responseStatus/responseStatusHepler';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async getHello(): Promise<any> {
        return await this.todoService.getHello('hi');
    }

    @Post()
    async addTodo(
        @Body() data: any
    ): Promise<any> {
        try {
            await this.todoService.addTodo(data.rawData);
            return new ResponseSuccess(getResponseStatus(todoModuleEnt, createEnt, successEnt));
        } catch (error) {
            throw new HttpException(getResponseStatus(todoModuleEnt, createEnt, errorEnt), HttpStatus.NOT_FOUND)
        }
    }
}

