import { Light } from "types/config/light";


export default async function SwitchShellyLight(light: Light, shouldTurnOn: boolean) {
    try {
        const shellyDeviceAddress = light.shellyDeviceAddress;
        let queryString = '?turn=' + (shouldTurnOn ? 'on' : 'off');
        const url = `http://${shellyDeviceAddress}/relay/0` + queryString;

        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`Failed to switch light. Status: ${response.status}`);
        }

        console.log('Light state set:', shouldTurnOn ? 'on' : 'off');
    } catch (error) {
        console.error('Failed to switch light, error:', error);
    }
}