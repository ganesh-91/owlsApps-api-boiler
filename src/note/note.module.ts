import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { TodoService } from 'src/todo/todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])
  ],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'note', method: RequestMethod.GET },
      )
      .forRoutes(NoteController);
  }
}
