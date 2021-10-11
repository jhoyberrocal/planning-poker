export type ResponseAxios<T> = {
  status: number;
  data: {
    error: string;
    message?: string;
    data: T;
  };
};