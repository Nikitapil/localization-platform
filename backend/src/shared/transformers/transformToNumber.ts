import { TransformFnParams } from 'class-transformer/types/interfaces';

export const transformToNumber = ({ value }: TransformFnParams) => Number(value);
