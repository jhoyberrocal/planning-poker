import axios, { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { GenericResponse, ResponseAxios } from './types/http.types';
import { ST_ACCESS_TOKEN } from '@lib/constants.const';

export class HttpClient {
  private readonly stAccessToken: string = ST_ACCESS_TOKEN;
  private readonly baseUrl: string;
  private readonly successCodes: number[] = [200, 201];
  private $axios: AxiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });
  private params = {};
  private body = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get accessToken(): string {
    return localStorage.getItem(this.stAccessToken) as string;
  }

  set accessToken(value: string) {
    localStorage.setItem(this.stAccessToken, value);
  }

  public withAuthBearer(): HttpClient {
    ((this.$axios.defaults.headers as Record<string, string>)
      .common as unknown as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    return this;
  }

  public withBody<B>(data: B): HttpClient {
    this.body = data;
    return this;
  }

  public withParams<P>(params: P): HttpClient {
    this.params = { ...params };
    return this;
  }

  public async post<R>(path: string): Promise<GenericResponse<R>> {
    try {
      const req = await this.$axios.post(`${this.baseUrl}${path}`, this.body, {
        params: this.params,
      }) as ResponseAxios<R>;
      return this.makeResponse<R>(req);
    } catch (error) {
      return this.handlingError<R>(error);
    }
  }

  private handlingError<R>(error: unknown): GenericResponse<R> {
    if (axios.isAxiosError(error) && error.response) {
      return this.makeResponse<R>(error.response);
    } else {
      return {
        code: 500,
        isSuccess: false,
        data: null,
        error: error as string,
        message: 'Something is happened',
      };
    }
  }

  private makeResponse<R>(response: ResponseAxios<R>): GenericResponse<R> {
    const isSuccess = this.successCodes.includes(response.status);
    /** Modify when response changes **/
    const genericResponse: GenericResponse<R> = {
      code: response.status,
      data: response.data.data,
      error: response.data.error,
      isSuccess,
    };

    if (!isSuccess && response.data) {
      genericResponse.error = response.data.error || 'Api handled error';
      genericResponse.message = response.data.message;
      toast.error(genericResponse.message as string);
    }

    return genericResponse;
  }
}

export const $httpClient = (baseUrl: string): HttpClient => new HttpClient(baseUrl);
