import {Injectable} from '@nestjs/common';
import {CreateTodoDto} from './create-todo.dto';
import {UpdateTodoDto} from './update-todo.dto';

export interface Todo {
    id: number;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
}

@Injectable()
export class AppService {
    private todos: Todo[] = [];
    private nextId: number = 1;

    getHello(): string {
        return 'Hello World!';
    }

    createTodo(createTodoDto: CreateTodoDto): Todo {
        const newTodo: Todo = {
            id: this.nextId++,
            title: createTodoDto.title,
            description: createTodoDto.description,
            date: createTodoDto.date,
            completed: false
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    getAllTodos(): Todo[] {
        return this.todos;
    }

    deleteTodoById(id: number): Todo | null {
        const index = this.todos.findIndex(todo => todo.id === id);
        const victim = this.todos.at(index) as Todo;
        if (index === -1) {
            return null;
        }
        this.todos.splice(index, 1);
        return victim;
    }

    updateTodo(id: number, updateTodoDto: UpdateTodoDto): Todo | null {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            return null;
        }
        Object.assign(todo, updateTodoDto)
        return todo;

    }
    updatePatchTodo(id: number, updateTodoDto: UpdateTodoDto): Todo | null {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            return null;
        }
        todo.completed = updateTodoDto.completed;
        return todo;
    }
}
