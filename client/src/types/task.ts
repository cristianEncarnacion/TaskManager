export type Task = {
  _id: number; // Cambiado a string para consistencia
  title: string;
  description: string;
  completed: boolean;
  date?: string;
};
