import type { RuleExpression } from 'vee-validate';
import type { MaybeRef } from 'vue';

export interface FieldValidationParams {
  name: string;
  rules?: MaybeRef<RuleExpression<unknown>>;
  validationName?: string;
  externalError?: string;
}
