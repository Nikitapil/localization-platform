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
import type { GetIsProfileExistParams } from "./data-contracts";
import { HttpClient, type RequestParams } from "./http-client";

export class ProfileApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Profile
   * @name GetIsProfileExist
   * @summary Get is profile exist
   * @request GET:/api/profile/check/{name}
   */
  getIsProfileExist = (
    { name, ...query }: GetIsProfileExistParams,
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/profile/check/${name}`,
      method: "GET",
      format: "json",
      ...params,
    });
}

const instance = new ProfileApi();

export const useProfileApi = () => {
  return {
    getIsProfileExist: useApi(instance.getIsProfileExist),
  };
};
