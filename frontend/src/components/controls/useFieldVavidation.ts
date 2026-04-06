import { useField, type RuleExpression } from 'vee-validate';
import { computed, type MaybeRef } from 'vue';

interface FieldValidationParams {
  fieldName: string;
  rules?: MaybeRef<RuleExpression<unknown>>;
  validationName?: string;
  externalError?: string;
}

export const useFieldValidation = ({ fieldName, rules, validationName, externalError }: FieldValidationParams) => {
  const { errorMessage, validate, meta } = useField(fieldName, rules, {
    syncVModel: true,
    validateOnMount: false,
    validateOnValueUpdate: false,
    label: validationName
  });

  const isError = computed(() => {
    return (meta.validated && errorMessage.value) || externalError;
  });

  const error = computed(() => errorMessage.value || externalError);

  const handleChange = () => {
    if (isError.value) {
      validate();
    }
  };

  return {
    isError,
    error,
    handleChange
  };
};
