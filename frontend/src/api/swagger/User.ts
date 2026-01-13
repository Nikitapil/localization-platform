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
  ChangePasswordDto,
  EditProfileUserDto,
  EditUserDto,
  GetProfileUsersParams,
  ProfileUserResponseDto,
  ProfileUsersListResponseDto,
  ResponseWithUserDto,
  SuccessMessageDto,
} from "./data-contracts";
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
  /**
   * No description
   *
   * @tags User
   * @name ChangePassword
   * @summary Change password
   * @request PUT:/api/user/password
   */
  changePassword = (data: ChangePasswordDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/user/password`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetProfileUsers
   * @summary Get profile users
   * @request GET:/api/user/profile-users
   */
  getProfileUsers = (
    query: GetProfileUsersParams,
    params: RequestParams = {},
  ) =>
    this.request<ProfileUsersListResponseDto, any>({
      path: `/api/user/profile-users`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name EditProfileUser
   * @summary Edit profile user information
   * @request PUT:/api/user/edit-profile-user
   */
  editProfileUser = (data: EditProfileUserDto, params: RequestParams = {}) =>
    this.request<ProfileUserResponseDto, any>({
      path: `/api/user/edit-profile-user`,
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
    changePassword: useApi(instance.changePassword),
    getProfileUsers: useApi(instance.getProfileUsers),
    editProfileUser: useApi(instance.editProfileUser),
  };
};
