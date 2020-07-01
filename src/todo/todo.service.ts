import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Todo } from './interface/todo.interface';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { json } from 'express';
import { TodoSchema } from './schemas/todo.schema';
import { async } from 'rxjs/internal/scheduler/async';
import {
    getResponseStatus,
    todoModuleEnt,
    successEnt,
    getAllEnt,
    errorEnt,
    createEnt,
    updateEnt,
    deleteEnt
} from 'src/common/responseStatus/responseStatusHepler';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel('Todo') private readonly taskModel: Model<Todo>
    ) { }

    async getHello(str: any): Promise<any> {
        return 'Hello Todo!';
    }

    async addTodo(str: any): Promise<any> {
        console.log('str', str)
        let infoData = this.parseRequest(str)
        try {
            infoData.forEach(async (taskList) => {
                await this.taskModel.findOneAndUpdate({
                    groupTitle: taskList.groupTitle,
                    title: taskList.title
                }, taskList, { upsert: true }, (err, doc) => {
                    if (err) return err;
                });
            });
        } catch (error) {
            throw new HttpException(getResponseStatus(todoModuleEnt, createEnt, errorEnt), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    parseRequest(str: string) {
        let [title, desc] = ['', ['']];
        const lines = "NEWROW" + str.replace(/\n/g, "NEWROW")
        const newStr = lines.split('NEWROW+')
        let infoData = [];
        let dataMap = new Map();
        for (const line in newStr) {
            if (newStr[line] !== '') {
                let newTaskGroup = []
                let groupTitle = ''
                newStr[line].split('NEWROW-').forEach((el, inx) => {
                    if (inx === 0) {
                        groupTitle = el.trim()
                    } else {
                        [title, ...desc] = [...el.trim().split('NEWROW>')];
                        newTaskGroup.push({
                            groupTitle,
                            title,
                            desc
                        })
                    }
                });
                infoData = [...infoData, ...newTaskGroup]
            }
        }
        return infoData;
    }
}

