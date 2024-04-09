import {BaseWebhookPayload} from './base';

export interface MediaResumeWebhookPayload extends BaseWebhookPayload {
  event: 'media.resume';
}
