import {MediaPauseWebhookPayload} from './mediaPause';
import {MediaPlayWebhookPayload} from './mediaPlay';
import {MediaResumeWebhookPayload} from './mediaResume';
import { MediaStopWebhookPayload } from './mediaStop';

export type WebhookPayload = MediaPauseWebhookPayload | MediaPlayWebhookPayload | MediaResumeWebhookPayload | MediaStopWebhookPayload;