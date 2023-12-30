const path = require("path");
const fs = require("fs").promises;
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const SCOPES = [
  "https://mail.google.com",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
];

const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 */
async function loadExistingCredentials() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const creds = JSON.parse(content);
    return google.auth.fromJSON(creds);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const key = JSON.parse(content).web;

  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });

  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 * @return {OAuth2Client} client
 */
async function authorize() {
  let client = await loadExistingCredentials();
  if (client) return client;
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) await saveCredentials(client);
  return client;
}

authorize();
