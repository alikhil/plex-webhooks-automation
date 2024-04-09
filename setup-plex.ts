import {JSDOM} from 'jsdom';

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

  // Turn the Device elements into objects
  const formattedDevices = [];
  for (const device of devices) {
    formattedDevices.push({
      id: parseInt(device.getAttribute('id') || '-1', 10),
      name: device.getAttribute('name'),
      platform: device.getAttribute('platform'),
      clientIdentifier: device.getAttribute('clientIdentifier'),
      createdAt: parseInt(device.getAttribute('createdAt') || '-1', 10) * 1000,
    });
  }

  console.log('Devices:', formattedDevices);

  // TODO: Upsert the "players" section of the application config file.
}
main();