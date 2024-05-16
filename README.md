# Justin's Google Calulator Tester

## How to run tests
From the root directory simply type `npx cypress run` into your console and all tests will be ran for you in your console  window.

## How do I write more tests
Find `cypress/e2e/syec.cy.js` and add away! The syntax would be the same as if you were writing the function. Example: `cy.verifyEquation('1 + 1 = 2')` don't forget to enslose your equation in quotes~

## What do I have to do if/when my calulator app has added functionality?
Very little. Simple mathematical functions (like parenthesis) should work out-of-the-box. Other functions (like Pi, or SqRt) may need to have their unicode character defined. Open `cypress/support/commands.js` and search for `Add new here` to find where those difficult to type functions are.
