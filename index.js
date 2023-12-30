const { google } = require("googleapis");
const authorize = require("./authorize");

async function fetchThreads(gmail, count = 2) {
  const res = await gmail.users.threads.list({
    userId: "me",
    maxResults: count,
  });

  const threads = res.data.threads;

  return threads;
}

async function main() {
  try {
    console.log("Starting the app");
    console.log("Starting authorization");
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });
    console.log("Authorized");

    console.log("Getting threads");
    const threads = await fetchThreads(gmail);
    console.log("Threads fetched");
    console.log(threads);
  } catch (error) {
    console.log(error);
  }
}

main();
