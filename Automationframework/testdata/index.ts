import { Config } from '../config/env.config';
import devData from './dev.json';
import testDataJson from './test.json';


let selectedData;

if (Config.envName === 'test') {
  selectedData = testDataJson;
} else {
  selectedData = devData;
}

export const testData = selectedData;