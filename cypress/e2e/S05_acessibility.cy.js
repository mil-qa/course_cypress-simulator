describe("Course: Cypress Playground - Seção 05: Testes de acessibilidade", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true&chancesOfError=0", {
      onBeforeLoad(window) {
        window.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.injectAxe();
  });

  it("successfully simulates a Cypress command", () => {
    cy.run("cy.log('henlo')");
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('henlo')")
      .and("be.visible");
    cy.checkA11y(".success");
  });
  it("shows an error when entering and running an invalid Cypress command", () => {
    cy.get("textarea#codeInput").type("cy.write('henlo')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error")
      .and("contain", "cy.write('henlo')")
      .and("be.visible");
    cy.checkA11y(".errorOutput");
  });
  it("shows a warning when entering and running a not-implemented Cypress command", () => {
    cy.get("textarea#codeInput").type("cy.contains('Run')");
    cy.contains("button", "Run").click();
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Warning")
      .and("contain", "command has not been implemented yet.")
      .and("be.visible");
    cy.checkA11y(".warning");
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
    cy.checkA11y();
  });
  it("maximizes and minimizes a simulation result", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click();

    cy.get(".expand-collapse").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('henlo')")
      .and("be.visible");

    cy.checkA11y();

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
    cy.checkA11y();
  });
  it("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("be.visible");
    cy.checkA11y();
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").should("not.be.visible");
  });
  it("shows the running state before showing the final result", () => {
    cy.get("textarea#codeInput").type("cy.log('henlo')");
    cy.contains("button", "Run").click().should("contain", "Running");
    cy.get("#outputArea")
      .should("have.text", "Running... Please wait.")
      .and("be.visible");
    cy.checkA11y();
  });
});

describe("Course: Cypress Simulator - S05: A11Y | Cookies", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true");
    cy.injectAxe();
  });

  it("consents on the cookies usage", () => {
    cy.get("#cookieConsent").as("cookieConsentBanner").should("be.visible");
    cy.checkA11y();
    cy.get("@cookieConsentBanner").find("button:contains('Accept')").click();
    cy.get("@cookieConsentBanner").should("not.be.visible");
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted");
  });
  it("declines on the cookies usage", () => {
    cy.get("#cookieConsent").as("cookieConsentBanner").should("be.visible");
    cy.checkA11y();
    cy.get("@cookieConsentBanner").find("button:contains('Decline')").click();
    cy.get("@cookieConsentBanner").should("not.be.visible");
    cy.getAllLocalStorage().then((response) => {
      const url = "http://localhost:59231";
      expect(response[url].cookieConsent).to.be.equal("declined");
    });
  });
});

describe("Course: Cypress Simulator - S05: A11Y | Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.contains("button", "Login").click();
    cy.injectAxe();
  });

  it("finds no a11y issues on all captcha view states (button enabled/disabled and error)", () => {
    cy.contains("button", "Verify").should("be.disabled");
    cy.get("#captchaInput").type("123");
    cy.contains("button", "Verify").should("be.enabled");
    cy.get("#captchaInput").clear();
    cy.contains("button", "Verify").should("be.disabled");
    cy.get("#captchaInput").type("12345");
    cy.checkA11y();
    cy.contains("button", "Verify").click();
    cy.get("#captchaError")
      .should("contain", "Incorrect answer")
      .and("be.visible");
    cy.checkA11y();
    cy.get("#captchaInput").should("not.have.text");
    cy.contains("button", "Verify").should("be.disabled");
  });
});

describe.only("Course: Cypress Simulator - S08: Erro na Matrix", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true&chancesOfError=1", {
      onBeforeLoad(window) {
        window.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.injectAxe();
  });
  it("errors out with a glitch in the Matrix", () => {
    cy.run("cy.log('henlo')");
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "There's a glitch in the Matrix")
      .and("be.visible");
    cy.checkA11y(".errorOutput");
  });
});
