import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'todo', method: RequestMethod.GET },
      )
      .forRoutes(TodoController);
  }
}
