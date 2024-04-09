import express from 'express';
import multer from 'multer';
import { WebhookPayload } from 'types/payloads';
import applicationConfig from './config/application.json';

console.log("Application config:", applicationConfig);

const app = express();
const upload = multer({ dest: '/tmp/' });

app.post('/', upload.single('thumb'), async (req, res, next) => {
  const payload = req.body as WebhookPayload; // Removed .json() since req.body is already parsed by multer.
  console.log('Got webhook for', payload.event);

  // Apple TV.
  if (payload.Player.uuid === process.env.PLAYER && payload.Metadata.type !== 'track') {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.BEARER,
        'Content-Type': 'application/json'
      }
    };

    if (payload.event === 'media.play' || payload.event === 'media.resume') {
      // Turn light off.
      console.log('Turning light off.');
      options.body = JSON.stringify({ desired_state: { powered: false } });
      await fetch('https://winkapi.quirky.com/light_bulbs/' + process.env.BULB, options);
    } else if (payload.event === 'media.pause' || payload.event === 'media.stop') {
      // Turn light on.
      console.log('Turning light on.');
      options.body = JSON.stringify({ desired_state: { powered: true, brightness: 1.0 } });
      await fetch('https://winkapi.quirky.com/light_bulbs/' + process.env.BULB, options);
    }
  }

  res.sendStatus(200);
});

app.listen(12000);
console.log('Listening for incoming webhooks on port 12000');
