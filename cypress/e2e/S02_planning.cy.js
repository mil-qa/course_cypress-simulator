describe("Course: Cypress Simulator - S02: Planejamento de testes", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(window) {
        window.localStorage.setItem("cookieConsent", "accepted");
      },
    });
  });

  it("successfully simulates a Cypress command", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('henlo')")
      .and("be.visible");
  });
  it("shows an error when entering and running an invalid Cypress command", () => {
    cy.get("textarea#codeInput").type("cy.write('henlo')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error")
      .and("contain", "cy.write('henlo')")
      .and("be.visible");
  });
  it("shows a warning when entering and running a not-implemented Cypress command", () => {
    cy.get("textarea#codeInput").type("cy.contains('Run')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Warning")
      .and("contain", "command has not been implemented yet.")
      .and("be.visible");
  });
  it("shows an error when entering and running a valid Cypress command without parentheses", () => {
    cy.get("textarea#codeInput").type("cy.get");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error")
      .and("contain", "Missing parentheses")
      .and("be.visible");
  });
  it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.get("textarea#codeInput").type("help");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Common Cypress commands and examples:")
      .and("contain", "cy.visit")
      .and("contain", "cy.get")
      .and("contain", "cy.contains")
      .and("contain", "cy.request")
      .and("contain", "cy.exec")
      .and("contain", "cy.log")
      .and("be.visible");
  });
  it("maximizes and minimizes a simulation result", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click();
    cy.get(".expand-collapse").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('henlo')")
      .and("be.visible");
    cy.get("#collapseIcon")
      .should("be.visible")
      .click()
      .should("not.be.visible");
    cy.get("#expandIcon").should("be.visible");
  });
  it("logs out successfully", () => {
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible").click();
    cy.get("body").should("contain", "Login").and("be.visible");
  });
  it("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible");
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("not.be.visible");
  });
  it("shows the running state before showing the final result", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click().should("contain", "Running");
    cy.get("#outputArea")
      .should("have.text", "Running... Please wait.")
      .and("be.visible");
  });
  it("checks the run button disabled and enabled states", () => {
    cy.contains("button", "Run").should("be.disabled");
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").should("be.enabled");
    cy.get("textarea#codeInput").clear();
    cy.contains("button", "Run").should("be.disabled");
  });
  it("clears the code input when logging off then logging in again", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible").click();
    cy.contains("button", "Login").click();
    cy.get("textarea#codeInput").should("not.have.text");
  });
  it("disables the run button when logging off then logging in again", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible").click();
    cy.contains("button", "Login").click();
    cy.contains("button", "Run").should("be.disabled");
  });
  it("clears the code output when logging off then logging in again", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('henlo')")
      .and("be.visible");
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible").click();
    cy.contains("button", "Login").click();
    cy.get("#outputArea").should("not.have.text");
  });
  it("doesn't show the cookie consent banner on the login page", () => {
    cy.clearAllLocalStorage();
    cy.reload();
    cy.getAllLocalStorage().then((response) => {
      console.log(response);
      expect(response).to.be.empty;
    });
    cy.get("#cookieConsent").should("not.be.visible");
  });
});
