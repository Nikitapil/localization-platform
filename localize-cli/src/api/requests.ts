import {TextListResponse} from '../types';
import $api from './apiInstance';

export const fetchTexts = async (keys: string[]): Promise<TextListResponse> => {
  const url = '/api/text/by-keys';
  const response = await $api.post<TextListResponse>(url, {
    keys: keys
  });
  return response.data;
}