import { useField } from 'vee-validate';
import { computed } from 'vue';
import type { FieldValidationParams } from './types';

export const useFieldValidation = ({ name, rules, validationName, externalError }: FieldValidationParams) => {
  const { errorMessage, validate, meta } = useField(name, rules, {
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
