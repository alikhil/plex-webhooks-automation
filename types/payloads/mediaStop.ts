import {BaseWebhookPayload} from './base';

export interface MediaStopWebhookPayload extends BaseWebhookPayload {
  event: 'media.stop';
}
