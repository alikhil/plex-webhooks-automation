

import fs from 'fs';
import path from 'path';
import {ApplicationConfig} from "./types/config/application";

let configPath = process.env.CONFIG_PATH || './config/application.json';

const configFilePath = path.resolve(__dirname, configPath);
const rawApplicationConfig = fs.readFileSync(configFilePath, 'utf-8');
const parsedConfig = JSON.parse(rawApplicationConfig);

const applicationConfig = parsedConfig as ApplicationConfig;
export default applicationConfig;
