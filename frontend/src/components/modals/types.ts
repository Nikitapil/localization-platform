import { type ShowableComponent } from '@/composables/useShowableCompoonent';

export type ModalPayload = { title?: string; content?: string } | undefined;
export type ModalShowableComponent<T = null> = ShowableComponent<ModalPayload & T>;

export interface DefaultModalProps<T = null> {
  title?: string;
  content?: string;
  showableComponent: ModalShowableComponent<T>;
}
