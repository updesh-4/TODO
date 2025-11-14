import { Response } from 'express';
import Todo from '../models/Todo';
import { AuthedRequest } from '../middleware/auth';

export const createTodo = async (req: AuthedRequest, res: Response) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, owner: req.user._id });
  res.json(todo);
}

export const listTodos = async (req: AuthedRequest, res: Response) => {
  const todos = await Todo.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
}

export const updateTodo = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: id, owner: req.user._id }, req.body, { new: true });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json(todo);
}

export const deleteTodo = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id, owner: req.user._id });
  res.json({ message: 'Deleted' });
}
