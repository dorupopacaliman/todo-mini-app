import { TodoType } from '../types';

const TodoItem = ({ todo }: { todo: TodoType }) => {
  return <li className={todo.completed ? 'strike-through' : ''}>{todo.title}</li>;
};

export default TodoItem;
