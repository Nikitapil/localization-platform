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
  AddLangDto,
  DeleteLangParams,
  EditLangDto,
  GetLangsParams,
  LangResponseDto,
  LangsResponseDto,
  SuccessMessageDto,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class LangApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Lang
   * @name AddLang
   * @summary Add Lang
   * @request POST:/api/lang
   */
  addLang = (data: AddLangDto, params: RequestParams = {}) =>
    this.request<LangResponseDto, any>({
      path: `/api/lang`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Lang
   * @name EditLang
   * @summary Edit Lang
   * @request PUT:/api/lang
   */
  editLang = (data: EditLangDto, params: RequestParams = {}) =>
    this.request<LangResponseDto, any>({
      path: `/api/lang`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Lang
   * @name GetLangs
   * @summary Get Langs
   * @request GET:/api/lang
   */
  getLangs = (query: GetLangsParams, params: RequestParams = {}) =>
    this.request<LangsResponseDto, any>({
      path: `/api/lang`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Lang
   * @name DeleteLang
   * @summary Delete Lang
   * @request DELETE:/api/lang/{id}
   */
  deleteLang = (
    { id, ...query }: DeleteLangParams,
    params: RequestParams = {},
  ) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/lang/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}

const instance = new LangApi();

export const useLangApi = () => {
  return {
    addLang: useApi(instance.addLang),
    editLang: useApi(instance.editLang),
    getLangs: useApi(instance.getLangs),
    deleteLang: useApi(instance.deleteLang),
  };
};
