describe("Verify the Google Calculator's", { scrollBehavior: 'top' }, () => {
  describe("numerals represent themselves as", () => {
    specify('number 0', () => {
      cy.verifyEquation('0=0')
    })
    specify('number 1', () => {
      cy.verifyEquation('1=1')
    })
    specify('number 2', () => {
      cy.verifyEquation('2=2')
    })
    specify('number 3', () => {
      cy.verifyEquation('3=3')
    })
    specify('number 4', () => {
      cy.verifyEquation('4=4')
    })
    specify('number 5', () => {
      cy.verifyEquation('5=5')
    })
    specify('number 6', () => {
      cy.verifyEquation('6=6')
    })
    specify('number 7', () => {
      cy.verifyEquation('7=7')
    })
    specify('number 8', () => {
      cy.verifyEquation('8=8')
    })
    specify('number 9', () => {
      cy.verifyEquation('9=9')
    })
  })

  describe("seperator/period/dot", () => {
    specify('represents properly when used before any digits', () => {
      cy.verifyEquation('.25=.25')
    })
    specify('represents properly when used between digits', () => {
      cy.verifyEquation('12.25=12.25')
    })
  })

  describe("plus operator", () => {
    specify('proplerly adds two positive integers', () => {
      cy.verifyEquation('123 + 123 = 246')
    })
    specify('proplerly adds two positive floats', () => {
      cy.verifyEquation('123.456 + 123.456 = 246.912')
    })
  })

  describe("minus operator", () => {
    specify('subtracts two positive integer values', () => {
      cy.verifyEquation('321 - 123 = 198')
    })
    specify('subtracts two float values', () => {
      cy.verifyEquation('987.654 - 321.098 = 666.556')
    })
    specify('will make the first value negative', () => {
      cy.verifyEquation('-123456 + 123456 = 0')
    })
  })

  describe("multiply operator", () => {
    specify('multiplies two integer values', () => {
      cy.verifyEquation('42 * 27 = 1134')
    })
    specify('multiplies two float values', () => {
      cy.verifyEquation('123.456 * 123.456 = 15241.383936')
    })
    specify('when used with a single minus operator returns a negative value (2 integers) ', () => {
      cy.verifyEquation('-123 * 123 = -15129')
    })
    specify('when used with a single minus operator returns a negative value (2 floats) ', () => {
      cy.verifyEquation('-123.456 * 123.456 = -15241.383936')
    })
    specify('when used with two minus operators returns a positive value (2 integers) ', () => {
      cy.verifyEquation('-123 * -123 = 15129')
    })
    specify('when used with two minus operators returns a positive value (2 floats) ', () => {
      cy.verifyEquation('-123.456 * -123.456 = 15241.383936')
    })
  })

  describe("divide operator", () => {
    specify('divides two integer values', () => {
      cy.verifyEquation('1134 / 27 = 42')
    })
    specify('divides two float values', () => {
      cy.verifyEquation('15241.383936 / 123.456 = 123.456')
    })
    specify('when used with a single minus operator returns a negative value (2 integers) ', () => {
      cy.verifyEquation('-15129 / 123 = -123')
    })
    specify('when used with a single minus operator returns a negative value (2 floats) ', () => {
      cy.verifyEquation('-15241.383936 / 123.456 = -123.456')
    })
    specify('when used with two minus operators returns a positive value (2 integers) ', () => {
      cy.verifyEquation('-15129 / -123 = 123')
    })
    specify('when used with two minus operators returns a positive value (2 floats) ', () => {
      cy.verifyEquation('-15241.383936 / -123.456 = 123.456')
    })
  })

  describe("follows PEMDAS/BODMAS rules", () => {
    specify('when multiplication/division are specified first', () => {
      cy.verifyEquation('5 * 6 + 7 = 37')
      cy.verifyEquation('35 / 7 - 3 = 2')
    })
    specify('when multiplication/division are specified last', () => {
      cy.verifyEquation('7 + 6 * 5 = 37')
      cy.verifyEquation('12 - 35 / 7 = 7')
    })
  })

  describe("Clear Entry (CE) button", () => {
    specify('removes the last input', () => {
      cy.verifyEquation('12345 CE = 1234')
    })
    specify('can be used multiple times successively', () => {
      cy.verifyEquation('12345 CE CE CE = 12')
    })
    specify('transforms to "AC" after the enter button is pressed, and clears all', () => {
      cy.verifySequentialCalculation('1 + 2 + 3 = 6', 'AC = 0')
    })
  })

  
  
})