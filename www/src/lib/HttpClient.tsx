import axios, { AxiosInstance } from 'axios';
import { ResponseAxios } from './types/http';

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
      return this.makeResponse(req);
    } catch (e) {
      // @ts-ignore
      return this.makeResponse(e.response || e);
    }
  }

  private makeResponse<T>(response: ResponseAxios<T>) {
    console.log(response);
    const isSuccess = this.successCodes.includes(response.status);
    /** Modify when response changes **/
    const genericResponse = {
      code: response.status,
      data: response.data,
      error: response.data.error,
      isSuccess,
    };

    if (!isSuccess && response.data) {
      genericResponse.error = response.data.message || response.data.error;
    }

    return genericResponse;
  }
}

export const $httpClient = (baseUrl: string) => new HttpClient(baseUrl);
