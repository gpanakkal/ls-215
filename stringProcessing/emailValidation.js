/**
 * Validate an email address:
 * 1. Must have a local part (username) containing at least one letter/digit 
 * and zero non-alphanumeric characters
 * 2. Has domain part containing two or more components with a . between each,
 * containing letters only
 * 3. Has one @ sign
 */
// function isValidEmail2(email) {
//   const parts = email.split('@');
//   if (parts.length !== 2) return false;

//   [local, domain] = parts;

//   const isAlphaNumeric = (str) => /^[a-z0-9]+$/i.test(str);
//   const isAlpha = (str) => /^[a-z]+$/i.test(str);
//   const domainParts = domain.split('.');
//   if (domainParts.length < 2) return false;
//   return isAlphaNumeric(local) && domainParts.every(isAlpha);
// }

const isValidEmail = (email) => {
  return /^[a-z0-9]+@([a-z]+\.)+[a-z]+$/i.test(email);
};

console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
console.log(isValidEmail('foo@baz.com'));             // returns true
console.log(isValidEmail('foo@baz.ph'));              // returns true
console.log(isValidEmail('HELLO123@baz'));            // returns false
console.log(isValidEmail('foo.bar@baz.to'));          // returns false
console.log(isValidEmail('foo@baz.'));                // returns false
console.log(isValidEmail('foo_bat@baz'));             // returns false
console.log(isValidEmail('foo@bar.a12'));             // returns false
console.log(isValidEmail('foo_bar@baz.com'));         // returns false
console.log(isValidEmail('foo@bar.....com'));         // returns false