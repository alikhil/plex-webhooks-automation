import express from 'express';
import multer from 'multer';
import { WebhookPayload } from 'types/payloads';
import switchLight from "./switches";

import rawApplicationConfig from './config/application.json';
import {ApplicationConfig} from "./types/config/application";
const applicationConfig = rawApplicationConfig as ApplicationConfig;

console.log("Application config:", applicationConfig);

const app = express();
const upload = multer({ dest: '/tmp/' });

app.post('/', upload.single('thumb'), async (req, res, next) => {
  const payload = req.body as WebhookPayload; // Removed .json() since req.body is already parsed by multer.
  console.log('Got webhook for', payload.event);

  if (payload.Metadata.type === 'track') {
    console.log('Ignoring track event');
    return res.sendStatus(200);
  }

  const {associations} = applicationConfig;

  for (const {deviceId, lightId} of associations) {
    if (payload.Player.uuid !== deviceId) {
      continue;
    }

    console.log('Found association for device', deviceId, 'and light', lightId);

    const light = applicationConfig.lights.find((l) => l.id === lightId);

    if (!light) {
      console.error('Light config not found');
      return res.sendStatus(200);
    }

    if (payload.event === 'media.play' || payload.event === 'media.resume') {
      console.log('Turning light off');

      await switchLight(light, false);
    }

    if (payload.event === 'media.pause' || payload.event === 'media.stop') {
      console.log('Turning light on');

      await switchLight(light, true);
    }
  }

  res.sendStatus(200);
});

app.listen(12000);
console.log('Listening for incoming webhooks on port 12000');
