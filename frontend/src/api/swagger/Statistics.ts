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
  LangsStatisticResponseDto,
  ProfileStatisticsResponseDto,
} from "./data-contracts";
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
  /**
   * No description
   *
   * @tags Statistics
   * @name GetLangsStatistics
   * @summary Get langs statistics
   * @request GET:/api/statistics/langs
   */
  getLangsStatistics = (params: RequestParams = {}) =>
    this.request<LangsStatisticResponseDto[], any>({
      path: `/api/statistics/langs`,
      method: "GET",
      format: "json",
      ...params,
    });
}

const instance = new StatisticsApi();

export const useStatisticsApi = () => {
  return {
    getProfileStatistics: useApi(instance.getProfileStatistics),
    getLangsStatistics: useApi(instance.getLangsStatistics),
  };
};
