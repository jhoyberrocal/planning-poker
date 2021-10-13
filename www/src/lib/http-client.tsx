import axios, { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { GenericResponse, ResponseAxios } from './types/http.types';

export class HttpClient {
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

  get accessToken() {
    return localStorage.getItem('access_token') as string;
  }

  set accessToken(value: string) {
    localStorage.setItem('access_token', value);
  }

  public withAuthBearer() {
    (this.$axios.defaults.headers!.common as {}) = {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  public withBody<T>(data: T) {
    this.body = data;
    return this;
  }

  public withParams<T>(params: T) {
    this.params = { ...params };
    return this;
  }

  public async post<T>(path: string) {
    try {
      const req = await this.$axios.post(`${this.baseUrl}${path}`, this.body, {
        params: this.params,
      }) as ResponseAxios<T>;
      return this.makeResponse<T>(req);
    } catch (error) {
      return this.handlingError(error);
    }
  }

  private handlingError(error: any) {
    let messageError: ResponseAxios<null> = {
      status: 500,
      data: {
        message: 'Error: something happened!!',
        data: null,
        error,
      },
    };

    if (error.response) {
      messageError = error.response;
    }
    return this.makeResponse<null>(messageError);
  }

  private makeResponse<T>(response: ResponseAxios<T>): GenericResponse<T> {
    const isSuccess = this.successCodes.includes(response.status);
    /** Modify when response changes **/
    const genericResponse: GenericResponse<T> = {
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

export const $httpClient = (baseUrl: string) => new HttpClient(baseUrl);
