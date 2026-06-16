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
import type { ProfileStatisticsResponseDto } from "./data-contracts";
import { HttpClient, type RequestParams } from "./http-client";

export class StatisticsApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Statistics
   * @name GetProfileStatistics
   * @summary Get profile statistics
   * @request GET:/api/statistics/profile
   */
  getProfileStatistics = (params: RequestParams = {}) =>
    this.request<ProfileStatisticsResponseDto, any>({
      path: `/api/statistics/profile`,
      method: "GET",
      format: "json",
      ...params,
    });
}

const instance = new StatisticsApi();

export const useStatisticsApi = () => {
  return {
    getProfileStatistics: useApi(instance.getProfileStatistics),
  };
};
