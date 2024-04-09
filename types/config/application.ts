import {Bulb} from "./bulb";
import {Player} from "./player";

export interface ApplicationConfig {
  players: Player[];
  bulbs: Bulb[];

  associations: {
    playerUuid: Player['clientIdentifier'];
    bulbId: Bulb['id'];

    note: string;
  }[];
}
