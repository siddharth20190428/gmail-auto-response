/**
 * Gets count number of Threads from the users Inbox
 *
 * It takes the gmail service object and count of threads as parameter
 * Returns an array of Thread objects
 */

async function fetchThreads(gmail, count = 1) {
  try {
    const res = await gmail.users.threads.list({
      userId: "me",
      maxResults: count,
    });

    const threads = res.data.threads;

    return threads;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { fetchThreads };
