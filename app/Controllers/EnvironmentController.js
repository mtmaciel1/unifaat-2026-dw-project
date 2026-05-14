import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../bootstrap/config.js';

export default async function EnvironmentController(request, response) {

  const isDocker = process.env.IS_DOCKER === 'true';

  const environment = isDocker ? 'docker' : 'local';

  const dbHost = process.env.POSTGRES_HOST || 'localhost';
  const dbPort = parseInt(process.env.POSTGRES_PORT) || 6789;

  const webHost = isDocker ? 'nodeweb_host' : 'localhost';
  const webPort = isDocker ? 8080 : parseInt(process.env.NODE_WEB_PORT) || 3000;

  return response.json({
    environment,
    database: {
      host: dbHost,
      port: dbPort,
    },
    web: {
      host: webHost,
      port: webPort,
    },
  });

}