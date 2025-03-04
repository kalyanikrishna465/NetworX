const nlp = require("compromise");
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
const urlRegex = /(https?:\/\/[^\s]+)/g;

function extractStructuredData(text) {
  const doc = nlp(text);

  const people = doc.people().out('array');
  const name = people.length > 0 ? people[0] : "";

  const phoneNumbers = [];
  const lines = text.split('\n');
  lines.forEach(line => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(line, 'IN');
      if (phoneUtil.isValidNumber(number)) {
        phoneNumbers.push(phoneUtil.format(number, 2));
      }
    } catch (e) {
    }
  });
  const phone = phoneNumbers.join(', ');

  const emails = text.match(emailRegex);
  const email = emails ? emails.join(', ') : "";

  const urls = text.match(urlRegex);
  const website = urls ? urls.join(', ') : "";

  const organizations = doc.organizations().out('array');
  const company = organizations.length > 0 ? organizations[0] : "";

  return { name, phone, email, website, company, rawText: text };
}

module.exports = { extractStructuredData };
