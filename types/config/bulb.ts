export interface Bulb {
  id: string;
  method: string;

  note: string;
}

export enum BulbMethod {
  HUE = 'hue',
}
