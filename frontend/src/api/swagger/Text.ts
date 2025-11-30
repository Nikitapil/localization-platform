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

import type {
  CreateTextDto,
  DeleteTextParams,
  EditTextDto,
  GetTextByKeyParams,
  GetTextsParams,
  SuccessMessageDto,
  TextResponseDto,
  TextsListResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class TextApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags text
   * @name CreateText
   * @summary Create Text
   * @request POST:/api/text
   */
  createText = (data: CreateTextDto, params: RequestParams = {}) =>
    this.request<TextResponseDto, any>({
      path: `/api/text`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags text
   * @name EditText
   * @summary Edit text
   * @request PUT:/api/text
   */
  editText = (data: EditTextDto, params: RequestParams = {}) =>
    this.request<TextResponseDto, any>({
      path: `/api/text`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags text
   * @name GetTexts
   * @summary Edit text
   * @request GET:/api/text
   */
  getTexts = (query: GetTextsParams, params: RequestParams = {}) =>
    this.request<TextsListResponseDto, any>({
      path: `/api/text`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags text
   * @name GetTextByKey
   * @summary Get Text by key
   * @request GET:/api/text/{key}
   */
  getTextByKey = (
    { key, ...query }: GetTextByKeyParams,
    params: RequestParams = {},
  ) =>
    this.request<TextResponseDto, any>({
      path: `/api/text/${key}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags text
   * @name DeleteText
   * @summary Delete text
   * @request DELETE:/api/text/{key}
   */
  deleteText = (
    { key, ...query }: DeleteTextParams,
    params: RequestParams = {},
  ) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/text/${key}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
