import HttpClient from './httpClient';
import { IUser } from '../Interfaces/IUser';

class UsersService {
  static async users(): Promise<IUser[]> {
    const { data } = await HttpClient.api.get<IUser[]>('/users');
    return data;
  }

  static async user(userId: string): Promise<IUser[]> {
    const { data } = await HttpClient.api.get(`/users/${userId}`);
    return data;
  }

  static async create(name: string, email: string, password: string): Promise<IUser> {
    const obj = {
      name,
      email,
      password,
    };

    const { data } = await HttpClient.api.post('/users', obj);
    return data;
  }

  static async update(id: string, name: string, email: string, password: boolean): Promise<void> {
    const obj = {
      name,
      email,
      password,
    };
    const { data } = await HttpClient.api.put(`/users/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`/users/${id}`);
    return statusText;
  }
}

export default UsersService;
