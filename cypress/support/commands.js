var plus = '+'
var minus = '−'
var multiply = '×'
var divide = '÷'
var equals = '='
// Add new here

Cypress.Commands.add('verifyEquation', (eq) => {
    var input = parseInput(eq)

    var expectedResult = input[1]
    var calculatorTaps = input[0]

    openCalculatorApp()
    
    cy.get('table').eq(1).within(() => {
        var sanitizedInputs = getSanitizedInputs(calculatorTaps)
        for (const i of sanitizedInputs) {
            cy.get('div[role=button]').contains(i).click({scrollBehavior:false})
        }
        cy.get('div[role=button]').contains(equals).click({scrollBehavior:false})
    })
    //allow the UI time to settle
    cy.wait(500)
    cy.get('#cwos').invoke('text').then(val => {
        expect(val).to.equal(expectedResult)
    })
})

Cypress.Commands.add('verifySequentialCalculation', (eq, secondary) => {
    var firstInput = parseInput(eq)

    var firstExpectedResult = firstInput[1]
    var firstCalculatorTaps = firstInput[0]

    openCalculatorApp()
    cy.get('table').eq(1).within(() => {
        var sanitizedInputs = getSanitizedInputs(firstCalculatorTaps)
        for (const i of sanitizedInputs) {
            cy.get('div[role=button]').contains(i).click({scrollBehavior:false})
        }
        cy.get('div[role=button]').contains(equals).click({scrollBehavior:false})
    })
    //allow the UI time to settle
    cy.wait(500)
    cy.get('#cwos').invoke('text').then(val => {
        expect(val).to.equal(firstExpectedResult)
    })

    var secondInput = parseInput(secondary)

    var secondExpectedResult = secondInput[1]
    var secondCalculatorTaps = secondInput[0]

    // Unsure why, but when you run from here, the index of the table is +1 from before
    // TODO - figure out why/how so this can be cleaned up
    cy.get('table').eq(2).within(() => {
        var sanitizedInputs = getSanitizedInputs(secondCalculatorTaps)
        for (const i of sanitizedInputs) {
            cy.get('div[role=button]').contains(i).click({scrollBehavior:false})
        }
        cy.get('div[role=button]').contains(equals).click({scrollBehavior:false})
    })
    //allow the UI time to settle
    cy.wait(500)
    cy.get('#cwos').invoke('text').then(val => {
        expect(val).to.equal(secondExpectedResult)
    })
})

function openCalculatorApp() {
    cy.visit('https://www.google.com/search?q=calculator')
}

function parseInput(input) {
    input = input.replaceAll(/\s/g, '')
    var eqSplit = input.split('=')

    // mostly a typo handler, for now we're just ensuring that there's 1 and only 1 '=' sign
    if (eqSplit.length != 2) {
        throw new Error("Invalid equation, an equation may have only 1 '='")
    }

    // The unicode characters Google uses for many operators are different than the ones used
    // on most keyboards. Perform those conversions here
    eqSplit[0] = eqSplit[0].replaceAll('*', multiply)
    eqSplit[0] = eqSplit[0].replaceAll('/', divide)
    eqSplit[0] = eqSplit[0].replaceAll('-', minus)
    // Add new here

    return eqSplit
}

function getSanitizedInputs(calculatorTaps) {
    var sanitizedInputs = []
    var skipNext = false;
    var input;
    for (let i=0; i < calculatorTaps.length; i++) {
        if (skipNext) {
            skipNext = false
            continue
        }
        //handle inputs that are more than 1 character
        if ((calculatorTaps[i] == 'A' && calculatorTaps[i+1] == 'C')) {
            input = 'AC'
            skipNext = true
        } else if (calculatorTaps[i] == 'C' && calculatorTaps[i+1] == 'E') {
            input = 'CE'
            skipNext = true
        } else {
            input = calculatorTaps[i]
        }
        // Add new here
        sanitizedInputs.push(input)
    }
    return sanitizedInputs
}