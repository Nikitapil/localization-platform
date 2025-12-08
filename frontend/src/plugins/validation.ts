import { defineRule } from 'vee-validate';

export const validation = () => {
  defineRule('required', (value: string, _, ctx) => {
    if (!value || !value.length) {
      return `${ctx.label || 'This Field'} is required`;
    }
    return true;
  });

  defineRule<string, string[]>('match', (value: string, [field], ctx) => {
    if (field && value !== ctx.form[field]) {
      return `${ctx.label || 'This Field'} should match`;
    }
    return '';
  });
};
