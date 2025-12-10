import { type ShowableComponent } from '@/composables/useShowableCompoonent';

export type ModalPayload = { title?: string; content?: string } | undefined;
export type ModalShowableComponent = ShowableComponent<ModalPayload>;

export interface DefaultModalProps {
  title?: string;
  content?: string;
  showableComponent: ModalShowableComponent;
}
