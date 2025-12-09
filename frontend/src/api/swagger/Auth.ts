/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { useApi } from "../utils/useApi";
import type {
  AuthUserResponse,
  CreateUserDto,
  LoginDto,
  MessageDto,
  SuccessMessageDto,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class AuthApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name Register
   * @summary Register a new user
   * @request POST:/api/auth/register
   */
  register = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<AuthUserResponse | MessageDto, any>({
      path: `/api/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Login
   * @summary Login
   * @request POST:/api/auth/login
   */
  login = (data: LoginDto, params: RequestParams = {}) =>
    this.request<AuthUserResponse, any>({
      path: `/api/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Refresh
   * @summary Refresh auth tokens
   * @request GET:/api/auth/refresh
   */
  refresh = (params: RequestParams = {}) =>
    this.request<AuthUserResponse, any>({
      path: `/api/auth/refresh`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Logout
   * @summary log out
   * @request DELETE:/api/auth/logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/auth/logout`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}

const instance = new AuthApi();

export const useAuthApi = () => {
  return {
    register: useApi(instance.register),
    login: useApi(instance.login),
    refresh: useApi(instance.refresh),
    logout: useApi(instance.logout),
  };
};
