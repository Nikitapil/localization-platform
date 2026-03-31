import { useShowableComponent, type ShowableComponentParams } from '@/composables/useShowableCompoonent';
import type { ModalPayload } from './types';

export const useModal = <T = null>(params?: ShowableComponentParams) => useShowableComponent<ModalPayload & T>(params);
