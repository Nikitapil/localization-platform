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
  ApiKeyResponseDto,
  DeleteApiKeyParams,
  SuccessMessageDto,
} from "./data-contracts";
import { HttpClient, type RequestParams } from "./http-client";

export class ApiKeysApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ApiKeys
   * @name CreateApiKey
   * @summary Create api key
   * @request POST:/api/api-keys
   */
  createApiKey = (params: RequestParams = {}) =>
    this.request<ApiKeyResponseDto, any>({
      path: `/api/api-keys`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiKeys
   * @name GetApiKeys
   * @summary Return api keys
   * @request GET:/api/api-keys
   */
  getApiKeys = (params: RequestParams = {}) =>
    this.request<ApiKeyResponseDto[], any>({
      path: `/api/api-keys`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiKeys
   * @name DeleteApiKey
   * @summary Delete api key
   * @request DELETE:/api/api-keys/{key}
   */
  deleteApiKey = (
    { key, ...query }: DeleteApiKeyParams,
    params: RequestParams = {},
  ) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/api-keys/${key}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}

const instance = new ApiKeysApi();

export const useApiKeysApi = () => {
  return {
    createApiKey: useApi(instance.createApiKey),
    getApiKeys: useApi(instance.getApiKeys),
    deleteApiKey: useApi(instance.deleteApiKey),
  };
};
