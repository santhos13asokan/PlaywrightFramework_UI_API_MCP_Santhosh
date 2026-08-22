import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../.env') });


const currentEnv = (process.env.ENV || 'dev').toLowerCase();

let selectedEnv;

if (currentEnv === 'test') {
  selectedEnv = {
    baseUrl: process.env.TEST_BASE_URL || 'https://test-app.example.com',
    apiUrl: process.env.TEST_API_URL || 'https://test-api.example.com',
    // dbHost: process.env.TEST_DB_HOST || '127.0.0.1',
    // dbName: process.env.TEST_DB_NAME || 'test_db',
  };
} else {
 
  selectedEnv = {
    baseUrl: process.env.DEV_BASE_URL || 'https://dev-app.example.com',
    apiUrl: process.env.DEV_API_URL || 'https://dev-api.example.com',
    // dbHost: process.env.DEV_DB_HOST || '127.0.0.1',
    // dbName: process.env.DEV_DB_NAME || 'dev_db',
  };
}

export const Config = {
  envName: currentEnv,
  baseUrl: selectedEnv.baseUrl,
  apiUrl: selectedEnv.apiUrl
  //dbHost: selectedEnv.dbHost,
 // dbName: selectedEnv.dbName,
};
