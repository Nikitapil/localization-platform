import type { Plugin } from 'vue';
import { clickOutside } from './clickOutside';

export const directivesPlugin: Plugin = {
  install(app) {
    app.directive('click-outside', clickOutside);
  }
};
