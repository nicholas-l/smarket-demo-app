import { removeUnderscoreAndCapitalise } from "../common";

it('returns captalised when no underscores', () => {
  const result = removeUnderscoreAndCapitalise("test");
  expect(result).toEqual("Test");
});

it('returns captalised when one underscore', () => {
  const result = removeUnderscoreAndCapitalise("test_second");
  expect(result).toEqual("Test Second");
});

it('returns captalised when two underscores', () => {
  const result = removeUnderscoreAndCapitalise("test_second_third");
  expect(result).toEqual("Test Second Third");
});

