import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { logger } from '../utils/logger.util';

const BASE_URL: string = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

const axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  async get<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return ajax(endpoint, 'GET', data);
  },
  async post<T = unknown, D = unknown>(endpoint: string, data?: D): Promise<T> {
    return ajax(endpoint, 'POST', data);
  },
  async put<T = unknown, D = unknown>(endpoint: string, data?: D): Promise<T> {
    return ajax(endpoint, 'PUT', data);
  },
  async delete<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax<T, D = unknown>(
  endpoint: string,
  method: string = 'GET',
  data: D | null = null
): Promise<T> {
  try {
    const config: AxiosRequestConfig<D> = {
      url: `${BASE_URL}/${endpoint.replace(/^\/+/, '')}`,
      method,
    };

    if (method === 'GET') {
      config.params = data;
    } else {
      config.data = data as D;
    }

    const res: AxiosResponse<T> = await axios(config);
    return res.data;
  } catch (err: any) {
    logger.error(`Error in ajax call to ${endpoint}:`, err.message);
    if (err.response) {
      logger.error('Response data:', err.response.data);
      logger.error('Response status:', err.response.status);
    }
    throw err;
  }
}
