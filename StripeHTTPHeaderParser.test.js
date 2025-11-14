import { test } from "node:test";
import assert from "node:assert/strict";
import parse_accept_language from "./StripeHTTPHeaderParser.js";

test("example1_test", () => {
  const response = parse_accept_language("en-US, fr-CA, fr-FR", ["fr-FR", "en-US"]);
  assert.deepStrictEqual(response, ["en-US", "fr-FR"]);
});

test("example1_test2", () => {
  const response = parse_accept_language("fr-CA, fr-FR", ["en-US", "fr-FR"]);
  assert.deepStrictEqual(response, ["fr-FR"]);
});

test("example1_test3", () => {
  const response = parse_accept_language("en-US", ["en-US", "fr-CA"]);
  assert.deepStrictEqual(response, ["en-US"]);
});

test("example2_test", () => {
  const response = parse_accept_language("en", ["en-US", "fr-CA", "fr-FR"]);
  assert.deepStrictEqual(response, ["en-US"]);
});

test("example2_test2", () => {
  const response = parse_accept_language("fr", ["en-US", "fr-CA", "fr-FR"]);
  assert.deepEqual(response, ["fr-CA", "fr-FR"]);
});

test("example2_test3", () => {
  const response = parse_accept_language("fr-FR, fr", ["en-US", "fr-CA", "fr-FR"]);
  assert.deepEqual(response, ["fr-FR", "fr-CA"]);
});
