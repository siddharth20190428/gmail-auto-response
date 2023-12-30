/**
 * Gets count number of Threads from the users Inbox
 *
 * It takes the gmail service object and count of threads as parameter
 * Returns an array of Thread objects
 */

async function fetchThreads(gmail, count = 1) {
  const res = await gmail.users.threads.list({
    userId: "me",
    maxResults: count,
  });

  const threads = res.data.threads;

  return threads;
}
module.exports = { fetchThreads };
