import {JSDOM} from 'jsdom';
import applicationConfig from './config/application.json';
import * as fs from "fs";
import {Player} from "./types/config/player";

const plexApiKey = "";
const plexServerUrl = "127.0.0.1";
const plexServerPort = 32400;

async function main() {
  if (plexApiKey === "") {
    // TODO: Figure out a way of getting it automatically
    console.error('Please set the plexApiKey variable to your Plex API key.');
    return;
  }

  const response = await fetch(`http://${plexServerUrl}:${plexServerPort}/devices`, {
    method: 'GET',
    headers: {
      'X-Plex-Token': plexApiKey,
      'Accept': 'application/xml'
    },
  });

  const body = await response.text();

  const dom = new JSDOM(body);
  const doc = dom.window.document;

  // Get all Device elements
  const devices = doc.querySelectorAll('Device');
  const applicationPlayers: Player[] = applicationConfig.players;

  // Turn the Device elements into objects
  const formattedDevices = [];
  for (const device of devices) {
    const formattedDevice = {
      id: parseInt(device.getAttribute('id') || '-1', 10),
      name: device.getAttribute('name') || 'Unknown',
      platform: device.getAttribute('platform') || 'Unknown',
      clientIdentifier: device.getAttribute('clientIdentifier') || 'Unknown',
      createdAt: parseInt(device.getAttribute('createdAt') || '-1', 10) * 1000,
    };

    formattedDevices.push(formattedDevice);

    // loop players and see if formattedDevice.clientIdentifier is in the players
    const playerIndex = applicationPlayers.findIndex((p) => p.clientIdentifier === formattedDevice.clientIdentifier);

    if (playerIndex !== -1) {
      console.log('Player already exists, updating:', applicationPlayers[playerIndex]);
      applicationPlayers[playerIndex] = {
        ...applicationPlayers[playerIndex],
        ...formattedDevice,
      };
      continue;
    }

    console.log('Player does not exist, adding:', formattedDevice);
    applicationPlayers.push({
      ...formattedDevice,
      note: '',
    });
  }

  console.log('Devices:', formattedDevices);

  // Save the updated application config
  console.log('Updating application config...');
  console.log('applicationConfig:', applicationConfig);

  // write to file (overwrite existing data)
  fs.writeFileSync('./config/application.json', JSON.stringify({
    ...applicationConfig,
    ...{
      players: applicationPlayers,
    }
  }, null, 2));

  console.log('Application config updated!');
}
main();
