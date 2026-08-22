import type { APIRequestContext } from '@playwright/test';
import { Config } from '../config/env.config';

export class APIUtil {
  constructor(private request: APIRequestContext) {}

 
  async get(endpoint: string) {
    const response = await this.request.get(`${Config.apiUrl}${endpoint}`);
    return response;
  }

 
  async post(endpoint: string, payload: object) {
    const response = await this.request.post(`${Config.apiUrl}${endpoint}`, {
      data: payload,
    });
    return response;
  }


  async put(endpoint: string, payload: object) {
    const response = await this.request.put(`${Config.apiUrl}${endpoint}`, {
      data: payload,
    });
    return response;
  }

  
  async delete(endpoint: string) {
    const response = await this.request.delete(`${Config.apiUrl}${endpoint}`);
    return response;
  }
}