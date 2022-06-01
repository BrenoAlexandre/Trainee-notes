import HttpClient from './httpClient';
import { ITask } from '../Interfaces/ITask';

const baseRoute = 'api/v1/tasks';
class TasksService {
  static async tasks(): Promise<ITask[]> {
    const { data } = await HttpClient.api.get<ITask[]>(`${baseRoute}`);
    return data;
  }

  static async tasksByUser(userId: string): Promise<ITask[]> {
    const { data } = await HttpClient.api.get(`${baseRoute}/userId/${userId}`);
    return data;
  }

  static async create(title: string, description: string, userId: string): Promise<ITask> {
    const obj = {
      title,
      description,
      userId,
    };

    const { data } = await HttpClient.api.post(`${baseRoute}`, obj);
    return data;
  }

  static async update(task: ITask): Promise<void> {
    const obj = {
      title: task.title,
      description: task.description,
      complete: task.complete,
    };
    const { data } = await HttpClient.api.put(`${baseRoute}/${task.id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`${baseRoute}/${id}`);
    return statusText;
  }
}

export default TasksService;
