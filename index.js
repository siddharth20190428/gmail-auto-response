const { google } = require("googleapis");
const authorize = require("./authorize");
const { fetchThreads } = require("./threads");
const { sendMessage } = require("./message");

function calculateDelay() {
  let max = 10,
    min = 5;
  let delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay;
}

function logTime(delay) {
  console.log("\nStarted at", new Date().toLocaleString());
  console.log("Refresh in", delay, "seconds\n");
}

async function checkAndReply(gmail) {
  try {
    // fetching threads
    console.log("Fetching threads");
    const threads = await fetchThreads(gmail);
    console.log("Threads fetched");

    // iterating threads
    threads.forEach(async (thread) => {
      const currThread = await gmail.users.threads.get({
        userId: "me",
        id: thread.id,
      });

      // fetching the last message
      const lastMessage = currThread.data.messages.at(-1);
      // console.log(lastMessage.payload.headers);
      // console.log(lastMessage.map((a) => a.payload.headers));
      const byMe = lastMessage.payload.headers.find(
        (obj) =>
          obj.name.toLowerCase() == "from" &&
          (obj.value == "Siddharth Sahu <siddharth201820@gmail.com>" ||
            obj.value == "siddharth201820@gmail.com")
      );
      // checking if the thread contains a message that is sent by me or not
      if (!byMe) {
        const toAddress = lastMessage.payload.headers
          .find((obj) => obj.name.toLowerCase() == "from")
          .value.split(" ")
          .at(-1)
          .slice(1, -1);
        // console.log(toAddress);
        await sendMessage(gmail, toAddress, thread.id);
        console.log("Message Sent\n");
      } else {
        console.log("Already Replied\n");
      }
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

    logTime(calculateDelay());
    await checkAndReply(gmail);
    const repeat = async () => {
      try {
        // repeating the checkAndReply in random seconds
        const delay = calculateDelay();

        // Use setTimeout instead of setInterval
        setTimeout(async () => {
          logTime(delay);
          await checkAndReply(gmail);
          repeat(); // Call repeat again after the specified delay
        }, delay * 1000);
      } catch (error) {
        console.error("Error in repeat:", error);
      }
    };

    repeat();
  } catch (error) {
    console.log(error);
  }
}

main();
