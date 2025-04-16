describe("Course: Cypress Simulator - S02: Planejamento de testes | Cookies", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true");
  });

  it("consents on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Accept')")
      .click();
    cy.get("@cookieConsentBanner").should("not.be.visible");
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted");
  });
  it("declines on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Decline')")
      .click();
    cy.get("@cookieConsentBanner").should("not.be.visible");
    cy.getAllLocalStorage().then((response) => {
      const url = Object.keys(response)[0];
      console.log(url);
      expect(response[url].cookieConsent).to.be.equal("declined");
    });
  });
});
