import {BaseWebhookPayload} from './base';

export interface MediaPlayWebhookPayload extends BaseWebhookPayload {
  event: 'media.play';
}
