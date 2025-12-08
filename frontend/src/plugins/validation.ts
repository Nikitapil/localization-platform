import { defineRule } from 'vee-validate';

export const validation = () => {
  defineRule('required', (value: string, _, ctx) => {
    if (!value || !value.length) {
      return `${ctx.label || 'This Field111'} is required`;
    }
    return true;
  });
};
