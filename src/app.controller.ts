import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {AppService, Todo} from './app.service';
import {CreateTodoDto} from './create-todo.dto';
import {UpdateTodoDto} from './update-todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/todos')
  getAllTodos(): Todo[] {
    return this.appService.getAllTodos()
  }

  @Post('/todos')
  createTodo(@Body() createTodoDto: CreateTodoDto):Todo {
    return this.appService.createTodo(createTodoDto);
  }

  @Delete('/todos/:id')
  deleteTodoById(@Param('id') id: string) {
    return this.appService.deleteTodoById(Number(id));
  }

  @Put('todos/:id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) :Todo | null {
    return this.appService.updateTodo(Number(id), updateTodoDto);
  }
  @Patch('todos/:id')
  updatePatchTodo(@Param('id') id: string, @Body()updateTodoDto: UpdateTodoDto ) :Todo | null {
    return this.appService.updatePatchTodo(Number(id), updateTodoDto);
  }
}
