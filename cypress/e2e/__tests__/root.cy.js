import React from 'react'


const addTag = (tagName) => {
    cy.get('[data-test-id="add-input"]').type(tagName)
    cy.get('[data-test-id="add-button"]').click()
};

const removeItem = (index) => {
    cy.get(`[data-test-id="remove-icon-${index}"]`).click()
};

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('user can add a tag', () => {
        addTag("Tag number 1")
        cy.get('[data-test-id="list"]').should('have.length', 1)
    })

    it('added tag should be correct', () => {
        addTag("Tag number 1")
        cy.get('[data-test-id="list"]').children().should('have.text', "Tag number 1")
    })

    it('added multiple tags', () => {
        addTag("Tag number 1")
        addTag("Tag number 2")
        cy.get('[data-test-id="list"]').children().should('have.length', 2)
    })


    it('remove a tag from multiple tags', () => {
        addTag("Tag number 1")
        addTag("Tag number 2")

        cy.get('[data-test-id="remove-icon-0"]').click()
        cy.get('[data-test-id="list"]').children().should('have.length', 1)
    })

    it('correct item should be removed', () => {
        addTag("Tag number 1")
        addTag("Tag number 2")

        cy.get('[data-test-id="remove-icon-0"]').click()
        cy.get('[data-test-id="list"]').children().should('have.text', "Tag number 2")
    })

    it('three items should be rendered in the list from a url with tag', () => {
        addTag("1")
        addTag("2")
        addTag("3")

        cy.location().should((loc) => {
            expect(loc.hash).to.eq('#tags=1,2,3')
        })
    })


    it('check url after removing item', () => {
        addTag("1")
        addTag("2")
        addTag("3")

        removeItem(0)
        removeItem(1)

        cy.location().should((loc) => {
            expect(loc.hash).to.eq('#tags=2')
        })
    })

})

describe('url rendered with tags for the first time', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#tags=1,2,3')
    })

    it('three items should be rendered in the list from a url with tag', () => {
        cy.get('[data-test-id="list"]').children().should('have.length', 3)
    })
})

