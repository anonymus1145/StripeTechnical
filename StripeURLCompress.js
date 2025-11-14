/***
 * Prompt
 * Everyday we look at a lot of URLs, for example in our log files from client request.
 * We want our data science team to perform analytics and machine learning, but:
 *    1. we want to preserve the privacy of the user, but without completely obfuscating/hashing the URLs and making them useless,
 *    2. we simply have a lot of data and we want to reduce our storage/processing costs
 * In real world, we may solve this with hashing; due to the time constraints of the interview, we use numeronyms instead of compress Strings.
 *
 * Example starter code
 * String compress(String s) {
 *    // requirement 1, 2, etc
 *    String compressed_s = fx(s);
 *    return compressed_s;
 * }
 *
 * Part 1
 * Given a String, split it into "major parts" separated by special char '/'.
 * For each major part that's split by '/', we can further split it into "minor parts" separated by '.'.
 * We assume the given Strings:
 *    - Only have lower case letters and two separators ('/', '.').
 *    - Have no empty minor parts (no leading / trailing separators or consecutive separators like "/a", "a/", "./..").
 *    - Have >= 3 letters in each minor part.
 *
 * Example:
 *    stripe.com/payments/checkout/customer.maria
 *    s4e.c1m/p6s/c6t/c6r.m3a
 *
 * Part 2
 * In some cases, major parts consists of dozens of minor parts, that can still make the output String large.
 * For example, imagine compressing a URL such as "section/how.to.write.a.java.program.in.one.day".
 * After compressing it by following the rules in Part 1, the second major part still has 9 minor parts after compression.
 *
 * Task:
 * Therefore, to further compress the String, we want to only keep m (m > 0) compressed minor parts from Part1 within each major part.
 * If a major part has more than m minor parts, we keep the first (m-1) minor parts as is, but concatenate the first letter of the m-th minor part and the last letter of the last minor part with the count
 */

/**
* @param {string} url
* @param {number} m
*/

const urlCompressor = (url, m) => {
  if (!url || url.length === 0 || typeof url !== 'string') throw new Error('Invalid URL');
  if (!m || m <= 0 || typeof m !== 'number') throw new Error('Invalid parts limit');

  const majorParts = url.split('/');

  if (majorParts.length <= 0) throw new Error('Invalid URL');

  const compressParts = majorParts.map((part) => {
    const minorParts = part.split('.');
    if (minorParts.length <= m) return minorParts.join('.');

    const firstParts = minorParts.slice(0, m - 1);
    const remaining = minorParts.slice(m - 1);
    const firstChar = remaining[0][0];
    const lastChar = remaining[remaining.length - 1].slice(-1);
    const count = remaining.length;

    const compressedMinor = `${firstChar}${lastChar}${count}`;
    return [...firstParts, compressedMinor].join('.');
  });

  return compressParts.join('/');
}

const initialUrl = 'stripe.com/payments/checkout/customer.maria';
const result = urlCompressor(initialUrl, 1);
console.log(initialUrl);
console.log(result);

/*
 How it works:
Splits the URL into major parts (/).
Splits each major part into minor parts (.).
Keeps the first (m - 1) minor parts unchanged.
Compresses the rest into one token using the first letter, last letter, and count.
Rebuilds and returns the full compressed URL.
 */
