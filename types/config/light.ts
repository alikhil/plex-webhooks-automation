export interface Light {
  id: string;
  switchMethod: SwitchMethod;

  note: string;
  shellyDeviceAddress?: string;
}

export enum SwitchMethod {
  HUE = 'hue',
  SHELLY = 'shelly',
}
