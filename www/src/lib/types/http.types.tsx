export type ResponseAxios<T> = {
  status: number;
  data: {
    error?: string | undefined;
    message?: string;
    data: T;
  };
};

export type GenericResponse<T> = {
  code: number;
  isSuccess: boolean;
  error: string | undefined;
  data: T;
  message?: string;
};
