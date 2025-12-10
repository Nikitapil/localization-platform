import { useShowableComponent } from '@/composables/useShowableCompoonent';
import type { ModalPayload } from './types';

export const useModal = () => useShowableComponent<ModalPayload>();
