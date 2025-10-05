import HttpUtil from "./HttpUtil";
import { type AxiosInstance, type AxiosResponse } from "axios";
import HttpUtilHandler from "./HttpUtilHandler";
import type BaseResponse from "../../base/response/BaseResponse";
import { Left, type Either } from "../../base/core/Either";
import HttpClient from "./HttpClient";

export default class HttpUtilImpl implements HttpUtil {
  private handler: HttpUtilHandler;
  private client: AxiosInstance;

  constructor() {
    this.handler = new HttpUtilHandler();
    this.client = new HttpClient().getInstance();
  }

  async post(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await this.client.post(
        params.uri,
        params.body,
        {
          headers: params.header,
          params: params.parameter,
        }
      );
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async get(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await this.client.get(
        params.uri, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async put(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await this.client.put(
        params.uri, 
        params.body, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async delete(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await this.client.delete(
        params.uri, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }
}
