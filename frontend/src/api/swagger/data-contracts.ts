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

export enum UserRole {
  STANDART = "STANDART",
  MAIN = "MAIN",
}

export interface ProfileResponseDto {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  canEdit: boolean;
}

export interface EditProfileDto {
  /** Profile name */
  name: string;
}

export interface EditUserDto {
  /** user email */
  email: string;
  /** user name */
  name: string;
  /** user last name */
  lastname: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  lastname: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

export interface ResponseWithUserDto {
  user: UserResponseDto;
}

export interface ChangePasswordDto {
  /** user old password */
  oldPassword: string;
  /** user new password */
  newPassword: string;
  /** repeated password */
  repeatedPassword: string;
}

export interface SuccessMessageDto {
  message: string;
}

export interface ProfileUserResponseDto {
  user: UserResponseDto;
  canEditUser: boolean;
  confirmed: boolean;
}

export interface ProfileUsersListResponseDto {
  users: ProfileUserResponseDto[];
  totalCount: number;
}

export interface EditProfileUserDto {
  userId: string;
  isConfirmed?: boolean;
  role?: UserRole;
}

export interface MessageDto {
  message: string;
}

export interface CreateProfileFieldsDto {
  /** Profile name */
  name: string;
}

export interface CreateUserDto {
  /** user email */
  email: string;
  /** user password */
  password: string;
  /** repeated password */
  repeatedPassword: string;
  /** user name */
  name: string;
  /** user last name */
  lastname: string;
  /** new profile fields */
  createProfileFields: CreateProfileFieldsDto;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUserResponse {
  user: UserResponseDto;
  accessToken: string;
}

export interface AddLangDto {
  name: string;
}

export interface LangResponseDto {
  id: string;
  name: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditLangDto {
  id: string;
  name: string;
}

export interface LangsResponseDto {
  langs: LangResponseDto[];
  totalCount: number;
}

export interface CreateTextDto {
  key: string;
}

export interface TextLangDto {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TextTranslationDto {
  id: string;
  lang: TextLangDto;
  value: string;
}

export interface TextResponseDto {
  id: string;
  key: string;
  translations: TextTranslationDto[];
  updatedAt: string;
}

export interface EditTextDto {
  key: string;
  newKey: string;
}

export interface TextsListResponseDto {
  texts: TextResponseDto[];
  totalCount: number;
}

export interface CreateTranslationDto {
  langId: string;
  textKey: string;
  value: string;
}

export interface GetIsProfileExistParams {
  name: string;
}

export interface GetProfileUsersParams {
  limit: number;
  offset: number;
  waitingForConfirmed?: boolean;
  onlyConfirmed?: boolean;
  search?: string;
}

export interface GetLangsParams {
  limit: number;
  offset: number;
}

export interface DeleteLangParams {
  id: string;
}

export interface GetTextsParams {
  limit: number;
  offset: number;
  searchString?: string;
}

export interface GetTextByKeyParams {
  key: string;
}

export interface DeleteTextParams {
  key: string;
}

export interface DeleteTranslationParams {
  id: string;
}
