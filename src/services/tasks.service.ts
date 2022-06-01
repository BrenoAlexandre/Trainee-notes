import HttpClient from './httpClient';
import { ITask } from '../Interfaces/ITask';
import { IUser } from '../Interfaces/IUser';

class TasksService {
  static async tasks(): Promise<ITask[]> {
    const { data } = await HttpClient.api.get<ITask[]>('/tasks');
    return data;
  }

  static async tasksByUser(userId: string): Promise<ITask[]> {
    const { data } = await HttpClient.api.get(`/tasks/${userId}`);
    return data;
  }

  static async create(title: string, description: string, user: IUser): Promise<ITask> {
    const obj = {
      title,
      description,
      user,
    };

    const { data } = await HttpClient.api.post('/tasks', obj);
    return data;
  }

  static async update(
    id: string,
    title: string,
    description: string,
    complete: boolean
  ): Promise<void> {
    const obj = {
      title,
      description,
      complete,
    };
    const { data } = await HttpClient.api.put(`/tasks/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`/tasks/${id}`);
    return statusText;
  }
}

export default TasksService;
