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
  DownloadLangTranslationsParams,
  SuccessMessageDto,
  UploadTranslationsByJsonBody,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class TranslationFilesApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns a JSON file containing translations based on provided filters
   *
   * @tags TranslationFiles
   * @name DownloadLangTranslations
   * @summary Export language translations to JSON file
   * @request GET:/api/translation-files/export-lang-translation
   */
  downloadLangTranslations = (
    query: DownloadLangTranslationsParams,
    params: RequestParams = {},
  ) =>
    this.request<File, any>({
      path: `/api/translation-files/export-lang-translation`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TranslationFiles
   * @name UploadTranslationsByJson
   * @summary Upload translations by json
   * @request POST:/api/translation-files/upload-translations
   */
  uploadTranslationsByJson = (
    data: UploadTranslationsByJsonBody,
    params: RequestParams = {},
  ) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/translation-files/upload-translations`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}

const instance = new TranslationFilesApi();

export const useTranslationFilesApi = () => {
  return {
    downloadLangTranslations: useApi(instance.downloadLangTranslations),
    uploadTranslationsByJson: useApi(instance.uploadTranslationsByJson),
  };
};
