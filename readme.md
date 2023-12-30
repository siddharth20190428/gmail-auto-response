# Gmail Auto Response Application

Node.js based app that is able to respond to emails sent to your Gmail mailbox while you’re out on a vacation.

## Features Completed

1. **Login with Google API:**

   - Implemented authentication using the "Login with Google" API.
   - Utilized OAuth 2.0 for secure access to the Gmail API.

2. **Check for New Emails:**

   - The application regularly checks for new emails in a specified Gmail ID.
   - Utilized Gmail API's `users.threads.get` endpoint to retrieve a list of threads.

3. **Send Replies to Emails with No Prior Replies:**

   - Identified and isolated email threads with no prior replies.
   - Sent replies to first-time email threads from others to the mailbox.
   - Checked for existing replies by examining the email thread history.

4. **Add Label and Move Email:**

   - Added a label to the email after sending the reply.
   - Utilized Gmail API's `users.messages.modify` endpoint to add a label to the email.
   - Moved the email to the labeled category in Gmail.

5. **Repeat Sequence in Random Intervals:**
   - Implemented a repeating sequence of steps 2-4.
   - The application repeats the email checking, replying, labeling, and moving process at random intervals.
   - The intervals are set between 45 to 120 seconds.

## Additional Notes

- **Label Creation:**
  - The application creates a label if it does not exist already.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/siddharth20190428/gmail-auto-response.git
   cd gmail-auto-response
   ```

2. Install Dependencies:

```bash
npm install
```

3. Change the me variable to your email address in index.js file.

4. Run the application

```bash
npm run dev
```
