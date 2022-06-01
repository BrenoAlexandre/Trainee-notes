export interface ITask {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  user?: string;
}
