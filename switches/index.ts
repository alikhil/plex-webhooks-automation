import {Light, SwitchMethod} from '../types/config/light';
import switchHueLight from "./hue";
import switchShellyLight from "./shelly";

export async function switchLight(light: Light, shouldTurnOn: boolean): Promise<void> {
  console.log('Switching light', light.id, 'using switchMethod', light.switchMethod);

  if (light.switchMethod === SwitchMethod.HUE) {
    return switchHueLight(light, shouldTurnOn);
  }
  if (light.switchMethod === SwitchMethod.SHELLY) {
    return switchShellyLight(light, shouldTurnOn);
  }

  console.error('Unknown light switchMethod:', light.switchMethod);
}
