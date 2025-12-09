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
  CreateTranslationDto,
  DeleteTranslationParams,
  SuccessMessageDto,
  TextTranslationDto,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class TranslationApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags translation
   * @name CreateTranslation
   * @summary Create translation
   * @request POST:/api/translation
   */
  createTranslation = (
    data: CreateTranslationDto,
    params: RequestParams = {},
  ) =>
    this.request<TextTranslationDto, any>({
      path: `/api/translation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags translation
   * @name EditTranslation
   * @summary Edit translation
   * @request PUT:/api/translation
   */
  editTranslation = (data: TextTranslationDto, params: RequestParams = {}) =>
    this.request<TextTranslationDto, any>({
      path: `/api/translation`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags translation
   * @name DeleteTranslation
   * @summary Delete translation
   * @request DELETE:/api/translation/{id}
   */
  deleteTranslation = (
    { id, ...query }: DeleteTranslationParams,
    params: RequestParams = {},
  ) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/translation/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}

const instance = new TranslationApi();

export const useTranslationApi = () => {
  return {
    createTranslation: useApi(instance.createTranslation),
    editTranslation: useApi(instance.editTranslation),
    deleteTranslation: useApi(instance.deleteTranslation),
  };
};
