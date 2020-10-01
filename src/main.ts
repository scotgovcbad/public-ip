import * as core from '@actions/core';
import { HttpClient } from '@actions/http-client';

/**
 * Action bootstrapper.
 *
 * @export
 */
export async function run(): Promise<void> {
  const maxRetries = parseInt(core.getInput('maxRetries'), 10);

  const http = new HttpClient('haythem/public-ip', undefined, { allowRetries: true, maxRetries: maxRetries });

  try {
    const ipv4 = await http.getJson<Response>('https://cbad-publicipservice.azurewebsites.net/api/getip');

    core.setOutput('ipv4', ipv4.result.ip);

    core.info(`ipv4: ${ipv4.result.ip}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

interface Response {
  ip: string;
}

run();
