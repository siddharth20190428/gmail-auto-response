const { addLabelToEmail } = require("./labels");
const { Base64 } = require("js-base64");
const { me } = require("./index");

/**
 * Generates base64 encodedURI for sending email
 *
 * It takes the to, from, subject, message strings as parameter
 * Returns a base 64 encodedURI
 */
function makeBody(to, from, subject, message) {
  let str = `to: ${to}\nfrom: ${from}\nContent-Type: text/html; charset=\"UTF-8\"\nsubject:${subject}\n\n${message}`;

  let encodedMail = Base64.encodeURI(str);
  return encodedMail;
}

/**
 * Sends message to a recieved email
 *
 * It takes the gmail service object  as parameter
 *
 */
async function sendMessage(gmail, to, threadId) {
  let raw = makeBody(
    to,
    me,
    "Thanks for Emailing",
    "<p>Since, I am on vacation. My bot is replying to you. I will be back soon.</p>"
  );
  gmail.users.messages
    .send({
      userId: "me",
      resource: {
        raw,
        threadId,
      },
    })
    .then((res) => {
      addLabelToEmail(gmail, res.data.id);
    });
}

module.exports = { sendMessage };
