/**
 * Parse a string of email data, producing the number of messages found in the string and
 * the date range of the messages.
 * 
 * Each message is separated by ##||##
 * 
 * Each message has five parts in sequence separated by #/#:
 * Sender, subject, date, recipient, body.
 */
const { emailData } = require("./emailData");

function mailCount(emailData) {
  const messages = emailData.split('##||##');
  const parsed = messages.map((message) => {
    const [sender, subject, date, recipient, body] = message.split('#/#');
    return { sender, subject, date, recipient, body };
  });
  const rawDates = parsed.map((msgObj) => new Date(msgObj.date));
  const earliestDate = new Date(Math.min(...rawDates)).toDateString();
  const latestDate = new Date(Math.max(...rawDates)).toDateString();
  console.log(`Count of Email: ${messages.length}`);
  console.log(`Date Range: ${earliestDate} - ${latestDate}`);
}

mailCount(emailData);

// console output

// Count of Email: 5
// Date Range: Sat Jun 25 2016 - Thu Aug 11 2016