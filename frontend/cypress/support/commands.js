/**
 * Commands for use across the end-to-end tests.
 */
import '@testing-library/cypress/add-commands';
require('cypress-downloadfile/lib/downloadFileCommand');

/**
 * Go to home page of the app
 *
 * From page: any
 */
Cypress.Commands.add('load_flowsheets_list', () => {
    cy.intercept({
        method: 'GET',
        pathname: '/flowsheets/',
    }).as('loadFlowsheetsList');
    cy.visit('/')
    cy.wait('@loadFlowsheetsList', {timeout: 30000})
        .its('response.statusCode').should('eq', 200);
})

/**
 * Load a flowsheet and build it with its default options when needed.
 *
 * From page: flowsheet list
 */
Cypress.Commands.add('load_flowsheet', (flowsheet_name) => {
    cy.intercept({
        method: 'GET',
        pathname: '/flowsheets/*/config',
    }).as('loadFlowsheet');
    cy.findByText(flowsheet_name).click();
    cy.wait('@loadFlowsheet', {timeout: 180000}).then(({response}) => {
        expect(response.statusCode, 'load flowsheet status').to.eq(200);
        expect(response.body.exports, 'flowsheet exports').to.be.an('object');

        // Flowsheets with build options initially return no exported variables.
        // Use the API state instead of a list of model-specific build flags.
        if (Object.keys(response.body.exports).length === 0) {
            expect(response.body.build_options, 'unbuilt flowsheet options')
                .to.be.an('object').and.not.be.empty;
            cy.build_flowsheet();
        }
    });
    cy.get('#run-flowsheet-button', {timeout: 30000}).should('be.visible');
})

/**
 * Build flowsheet
 *
 * From page: flowsheet
 */
Cypress.Commands.add('build_flowsheet', () => {
    cy.intercept({
        method: 'GET',
        pathname: '/flowsheets/*/config',
        query: {build: '1'},
    }).as('buildFlowsheet');
    cy.get('#build-flowsheet-button', {timeout: 30000}).should('be.visible').click();
    cy.wait('@buildFlowsheet', {timeout: 180000}).then(({response}) => {
        expect(response.statusCode, 'build flowsheet status').to.eq(200);
        expect(response.body.exports, 'built flowsheet exports')
            .to.be.an('object').and.not.be.empty;
    });
    cy.get('#run-flowsheet-button', {timeout: 30000}).should('be.visible');
})

/**
 * Reset flowsheet
 *
 * From page: flowsheet
 */
Cypress.Commands.add('reset_flowsheet', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:8001/flowsheets/**',
    }).as('resetFlowsheet');
    cy.get('#reset-flowsheet-button').click()
    cy.wait('@resetFlowsheet', {timeout: 180000});
})

/**
 * Set the water mass flowrate [input] to the given value
 *
 * From page: Inputs
 */
Cypress.Commands.add('set_ro_flowrate', (value) => {
    let input_textbox_name = 'Feed water mass flowrate';
    let input_textbox = cy.findByRole('textbox', {name: input_textbox_name, timeout: 20000});
    input_textbox.click({force:true});
    input_textbox = cy.findByRole('textbox', {name: input_textbox_name, timeout: 20000});
    input_textbox.type('{backspace}{backspace}{backspace}{backspace}' + value);
    cy.wait(500);
})

/**
 * Solve the flowsheet
 *
 * From page: Inputs
 */
Cypress.Commands.add('solve_flowsheet', () => {
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:8001/flowsheets/**',
    }).as('run');
    cy.get('#run-flowsheet-button', {timeout: 20000}).click()
    cy.wait('@run', {timeout: 300000});
})

/**
 * Save configuration
 *
 * From page: Output
 */
Cypress.Commands.add('save_configuration', () => {
    cy.intercept({
        method: "POST",
        url: "http://localhost:8001/flowsheets/**",
    }).as("saveConfig");
    cy.findByRole('button', {name: /save/i}).click()
    cy.wait("@saveConfig");
})

/**
 * Open logging panel
 *
 * From page: Any
 */
Cypress.Commands.add('open_logging_panel', () => {
    cy.get('.header-actions', {timeout: 10000}).click();
    // cy.wait(500);
    cy.get('.view-logs', {timeout: 10000}).click();
    cy.wait(500);
})

/**
 * Enter text into element based on role and name
 *
 * From page: Inputs
 */
Cypress.Commands.add('enter_text', (identifier, role_or_class, value, name ) => {
    let input_textbox
    if (identifier === "role") {
        input_textbox = cy.findByRole(role_or_class, {name: name});
    }
    else if (identifier === "class") {
        input_textbox = cy.get('.'+role_or_class);
    }
    input_textbox.click({force:true});
    if (identifier === "role") {
        input_textbox = cy.findByRole(role_or_class, {name: name});
        input_textbox.clear().type(value)

    }
    else if (identifier === "class") {
        input_textbox = cy.get('.'+role_or_class);
        input_textbox.type('{backspace}{backspace}{backspace}{backspace}' + value);

    }
    cy.wait(500);
})
