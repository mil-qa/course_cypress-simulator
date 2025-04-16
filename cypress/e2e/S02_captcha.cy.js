describe("Course: Cypress Simulator - S02: Planejamento de testes | Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.contains("button", "Login").click();
  });

  it("disables the captcha verify button when no answer is provided or it's cleared", () => {
    cy.contains("button", "Verify").should("be.disabled");
    cy.get("#captchaInput").type("123");
    cy.contains("button", "Verify").should("be.enabled");
    cy.get("#captchaInput").clear();
    cy.contains("button", "Verify").should("be.disabled");
  });
  it.only("shows an error on a wrong captcha answer and goes back to its initial state", () => {
    cy.get("#captchaInput").type("12345");
    cy.contains("button", "Verify").click();
    cy.get("#captchaError")
      .should("contain", "Incorrect answer")
      .and("be.visible");
    cy.get("#captchaInput").should("not.have.text");
    cy.contains("button", "Verify").should("be.disabled");
  });
});
