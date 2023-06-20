import * as core from '@actions/core';
import { HttpClient } from '@actions/http-client';

/**
 * Action bootstrapper.
 *
 * @export
 */
export async function run(): Promise<void> {
  const maxRetries = parseInt(core.getInput('maxRetries'), 10);

  //const http = new HttpClient('scotgovcbad/public-ip', undefined, { allowRetries: true, maxRetries: maxRetries });
  const client = new HttpClient();

  try {
    const ipv4 = await client.getJson<Response>('https://cbad-publicipservice.azurewebsites.net/api/getip');

    core.setOutput('ipv4', ipv4.result.ip);

    core.info(`ipv4: ${ipv4.result.ip} defo getting the right branch, but remember to remove me`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

interface Response {
  ip: string;
}

run();
