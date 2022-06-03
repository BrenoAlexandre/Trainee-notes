import HttpClient from './httpClient';
import { IUser } from '../Interfaces/IUser';
import setTokenStorage from '../utils/setTokenStorage';

const baseRoute = '/api/v1/users';
class UsersService {
  static async loginUser(user: { email: string; password: string }): Promise<IUser> {
    const { data, headers } = await HttpClient.api.post(`${baseRoute}/login`, user);
    setTokenStorage('authorization', headers.authorization);
    return data;
  }

  static async findUser(userId: string): Promise<IUser[]> {
    const { data } = await HttpClient.api.get(`${baseRoute}/${userId}`);
    return data;
  }

  static async create(user: { name: string; email: string; password: string }): Promise<IUser> {
    const { data } = await HttpClient.api.post(`${baseRoute}/`, user);
    return data;
  }

  static async update(
    id: string,
    user: { name: string; email: string; password: boolean }
  ): Promise<void> {
    const { data } = await HttpClient.api.put(`${baseRoute}/${id}`, user);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`${baseRoute}/${id}`);
    return statusText;
  }
}

export default UsersService;
