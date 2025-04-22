import * as http from "http";
import { Connection, OAuth2 } from "jsforce";
import { ClientId, ClientSecret } from "./constant.mjs";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const oauth2 = new OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl: "https://login.salesforce.com",
  clientId: ClientId,
  clientSecret: ClientSecret,
  // redirectUri: 'http://localhost:3000/oauth2/callback'
  redirectUri: "http://localhost:3001",
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

export function getSFAuthorizationUrl(callback) {
  oauth2.redirectUri = callback || oauth2.redirectUri;
  return oauth2.getAuthorizationUrl({
    scope: "sfap_api api"
    // code_challenge: 'code_challenge',
    // code_challenge_method: 'S256'
  });
}

export async function handleAuthorizationCodeCallback(code) {
  try {
    const conn = new Connection({ oauth2: oauth2 });
    const userInfo = await conn.authorize(
      { grant_type: "authorization_code", code: code }
      //   // code_verifier: (code) => code
    );
    const { accessToken, refreshToken, instanceUrl } = conn;
    const { id, organizationId, url } = userInfo;
    return { accessToken, refreshToken, instanceUrl, id, organizationId, url };
  } catch (error) {
    console.error(
      "Error in handleAuthorizationCodeCallback:",
      typeof error,
      error.message
    );
    throw error;
  }
}
