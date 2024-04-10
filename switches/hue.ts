import {Light} from 'types/config/light';
import {api as hueApi} from "node-hue-api";
import {discoverBridge, username} from "../setup-hue";

export default async function SwitchHueLight(light: Light, shouldTurnOn: boolean) {
  console.log('Switching light with hue method', light.id, 'using switchMethod', light.switchMethod);

  const ipAddress = await discoverBridge();

  if (ipAddress === null) {
    console.error('No Hue Bridge was found. Please try again.');
    return;
  }

  console.log('Bridge found at IP address:', ipAddress);

  console.log('Creating authenticated API instance...');
  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const authenticatedApi = await hueApi.createLocal(ipAddress).connect(username);
  console.log('Authenticated API instance created!');

  await authenticatedApi.lights.setLightState(light.id, {
    brightness: shouldTurnOn ? 100 : 0,
  });

  return;
}
