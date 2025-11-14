
/***
 * Part 1
 * In an HTTP request, the Accept-Language header describes the list of languages that the requester would like content to be returned in.
 * The header takes the form of a comma-separated list of language tags.
 * For example: "Accept-Language: en-US, fr-CA, fr-FR" means that the reader would accept:
 *   1. English as spoken in the United States (most preferred)
 *   2. French as spoken in Canada
 *   3. French as spoken in France (least preferred)
 * We're writing a server that needs to return content in an acceptable language for the requester, and we want to make use of this header.
 * Our server doesn't support every possible language that might be requested (yet!), but there is a set of languages that we do support.
 * Write a function that receives two arguments:
 *   an Accept-Language header value as a string and a set of supported languages,
 *   and returns the list of language tags that will work for the request.
 * The language tags should be returned in descending order of preference (the same order as they appeared in the header).
 * In addition to writing this function, you should use tests to demonstrate that it's correct, either via an existing testing system or one you create.
 *
 * Examples:
 *   parse_accept_language(
 *     "en-US, fr-CA, fr-FR", # the client's Accept-Language header, a string
 *     ["fr-FR", "en-US"] # the server's supported languages, a set of strings
 *   )
 *   returns: ["en-US", "fr-FR"]
 *
 *   parse_accept_language("fr-CA, fr-FR", ["en-US", "fr-FR"])
 *   returns: ["fr-FR"]
 *
 *   parse_accept_language("en-US", ["en-US", "fr-CA"])
 *   returns: ["en-US"]
 *
 * Part 2
 * Accept-Language headers will often also include a language tag that is not region-specific - for example, a tag of "en" means "any variant of English".
 * Extend your function to support these language tags by letting them match all specific variants of the language.
 *
 * Examples:
 *   parse_accept_language("en", ["en-US", "fr-CA", "fr-FR"])
 *   returns: ["en-US"]
 *
 *   parse_accept_language("fr", ["en-US", "fr-CA", "fr-FR"])
 *   returns: ["fr-CA", "fr-FR"]
 *
 *   parse_accept_language("fr-FR, fr", ["en-US", "fr-CA", "fr-FR"])
 *   returns: ["fr-FR", "fr-CA"]
 *
 * Part 3
 * Accept-Language headers will sometimes include a "wildcard" entry, represented by an asterisk, which means "all other languages".
 * Extend your function to support the wildcard entry.
 *
 * Examples:
 *   parse_accept_language("en-US, *", ["en-US", "fr-CA", "fr-FR"])
 *   returns: ["en-US", "fr-CA", "fr-FR"]
 *
 *   parse_accept_language("fr-FR, fr, *", ["en-US", "fr-CA", "fr-FR"])
 *   returns: ["fr-FR", "fr-CA", "en-US"]
 */

/**
 * @param {string} acceptLanguage
 * @param {Array} supportedLanguages
 */
const parse_accept_language = (acceptLanguage, supportedLanguages) => {
  if (!acceptLanguage || acceptLanguage.length <= 0 || typeof acceptLanguage !== 'string') throw new Error('ValidationError on Accept-Language header');
  if (!Array.isArray(supportedLanguages) || supportedLanguages.length <= 0) throw new Error('ValidationError on Supported Languages input');

  const set = new Set();

  acceptLanguage.split(',').forEach((language) => {
    const trimmed = language.trim();
    const tag = trimmed.split("-")[0];
    if (tag === trimmed) {
      set.add(tag);
    } else {
      set.add(trimmed);
    }
  });

  const response = supportedLanguages.map((language) => {
    const [tag] = language.split("-");

    if (set.has(language)) return language;
    if (set.has(tag)) return language;

  }).filter(Boolean);

  // 🔧 Small fix: remove undefined and duplicates
  return [...new Set(response.reverse())];
}

export default parse_accept_language;
