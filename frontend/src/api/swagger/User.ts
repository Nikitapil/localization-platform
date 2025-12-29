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
import type { EditUserDto, ResponseWithUserDto } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class UserApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name EditUser
   * @summary Edit user
   * @request PUT:/api/user
   */
  editUser = (data: EditUserDto, params: RequestParams = {}) =>
    this.request<ResponseWithUserDto, any>({
      path: `/api/user`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

const instance = new UserApi();

export const useUserApi = () => {
  return {
    editUser: useApi(instance.editUser),
  };
};
