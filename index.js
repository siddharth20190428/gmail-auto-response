const { google } = require("googleapis");
const authorize = require("./authorize");
const { fetchThreads } = require("./threads");

async function checkAndReply(gmail) {
  try {
    console.log("Getting threads");
    const threads = await fetchThreads(gmail);
    console.log("Threads fetched");

    threads.forEach(async (thread) => {
      const currThread = await gmail.users.threads.get({
        userId: "me",
        id: thread.id,
      });

      const messages = currThread.data.messages;
      messages.forEach((message) => {
        const byMe = message.payload.headers.find(
          (obj) =>
            obj.name.toLowerCase() == "from" &&
            (obj.value == "Siddharth Sahu <siddharth201820@gmail.com>" ||
              obj.value == "siddharth201820@gmail.com")
        );
        if (!byMe) {
          console.log("Message Sent\n");
        } else {
          console.log("Message not Sent By Me\n");
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    console.log("Starting the app");
    console.log("Starting authorization");
    const auth = await authorize();
    const gmail = google.gmail({ version: "v1", auth });
    console.log("Authorized");

    let max = 10,
      min = 5;

    const repeat = async () => {
      let delay = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log("\nStarted at", new Date().toLocaleString());
      console.log("Refresh in", delay, "seconds\n");
      setTimeout(repeat, delay * 1000);

      await checkAndReply(gmail);
    };
    repeat();
  } catch (error) {
    console.log(error);
  }
}

main();
