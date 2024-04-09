# Webhooks Home Automation
This project allows you to automatically control the lights in your house when using Plex.

## Features
- Automatically turn off lights when you start watching a movie on Plex.
- Automatically turn off lights when you resume a movie on Plex.
- Automatically turn on lights when you pause a movie on Plex.
- Automatically turn on lights when you stop a movie on Plex.
 
## Installation
- Install the latest LTS version of [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.

## Automatic Configuration
We've created setup scripts to help configure the application for you:
- If you're using Phillips Hue bulbs with a bridge: Run the setup script using `npm run setup-hue`.
- If you want to automatically pull through your Plex players. Run the setup script using `npm run setup-plex`.

If you would rather set it up manually use the manual configuration steps below.

## Manual Configuration
- You can manually configure the application config in `config/application.json`
- Get device id from https://app.plex.tv/desktop/#!/settings/devices/all and add it to the `device` field in the config.
- Find your bulb ids in whatever home lighting integration you're using.

## Build
If you would like to run the application using regular Node JS, you will need to build the application first.
- Build the latest code using `npm run build`.

## Run
If you have built the application and would like to run it using Node JS, you can do so by running:
- Start the app using `npm start`.

Alternatively, you can run the application using `ts-node`:
- Start the app using `npm run start-dev`.

## Add Webhook to Plex
- Add the webhook to https://app.plex.tv/desktop/#!/settings/webhooks
