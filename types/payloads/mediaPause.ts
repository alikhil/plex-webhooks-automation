import {BaseWebhookPayload} from './base';

export interface MediaPauseWebhookPayload extends BaseWebhookPayload {
  event: 'media.pause';
}
