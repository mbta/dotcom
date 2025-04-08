import { faker } from "../../../assets/node_modules/@faker-js/faker/locale/en_US";

describe("Customer Support Form", () => {
  beforeEach(() => {
    cy.visit("/customer-support");
  });

  it("shows an error state for missing type and comments", () => {
    cy.get("#support-submit").click();
    cy.get(".has-danger #support_subject").should("be.visible");
    cy.get(".has-danger #comments").should("be.visible");
  });

  it("toggles additional fields when 'would like a response' is changed", () => {
    // these fields are visible to start
    // checkboxes need to be targeted by their label instead of the input
    // because of how they are rendered (the actual input has opacity: 0)
    const additionalFields = [
      "#first_name",
      "#last_name",
      "#email",
      "#phone",
      "#privacy_label",
      "#promotions_label"
    ];

    additionalFields.forEach(id => {
      cy.get(`#contactInfoForm ${id}`).should("be.visible");
    });

    cy.get("#no_request_response_label").click();

    additionalFields.forEach(id => {
      cy.get(`#contactInfoForm ${id}`).should("not.be.visible");
    });
  });

  it("doesn't allow non-image files to be uploaded", () => {
    cy.get("input#photo").attachFile("customer-support-form/test_file.txt");
    cy.get("#upload-photo-error").should("be.visible");
  });

  it("Generates previews for each uploaded image", () => {
    cy.get("input#photo").attachFile("customer-support-form/test_image1.png");
    cy.get("input#photo").attachFile("customer-support-form/test_image2.png");
    cy.get(".photo-preview").should("have.length", 2);
  });

  describe("Submits form successfully", () => {
    let comment, first_name, last_name, email, phone;

    beforeEach(() => {
      cy.intercept("POST", "/customer-support").as("submitForm", { type: "static" });
      comment = faker.hacker.phrase();
      first_name = faker.name.firstName();
      last_name = faker.name.lastName();
      email = faker.internet.email();
      phone = faker.phone.number();
    });

    it("With basic info", () => {
      cy.selectRandomServiceAndSubject();
      cy.get("#comments").type(comment);
      cy.get("#no_request_response_label").click();
      cy.fillRecaptcha();
      cy.get("#support-submit").click();

      cy.wait("@submitForm")
        .its("response.statusCode")
        .should("eq", 302);

      cy.get(".support-confirmation--error").should("not.be.visible");
      cy.get(".support-confirmation--success").should("be.visible");

      // check the email is sent with relevant data
      cy.wait(2000);
      cy.mix("test_helpers.feedback_email")
        .its("stdout")
        .should("not.contain", "enonent")
        .should("contain", `${comment}</DESCRIPTION>`)
        .then(stdout => {
          cy.get("@selectedService").then(service =>
            cy.wrap(stdout).should("contain", `<SERVICE>${service}</SERVICE>`)
          );
          cy.get("@selectedSubject").then(subject =>
            cy.wrap(stdout).should("contain", `<CATEGORY>${subject}</CATEGORY>`)
          );
        });
    });

    it("Filters profane words", () => {
      comment = "Distinctio cum dolor distinctio eos deserunt.";

      cy.selectRandomServiceAndSubject();
      cy.get("#comments").type(comment);
      cy.get("#no_request_response_label").click();
      cy.fillRecaptcha();
      cy.get("#support-submit").click();

      cy.wait("@submitForm")
        .its("response.statusCode")
        .should("eq", 302);

      const censoredComment = "Distinctio *** dolor distinctio eos deserunt.";
      // check the email is sent with relevant data
      cy.wait(2000);
      cy.mix("test_helpers.feedback_email")
        .its("stdout")
        .should("not.contain", "enonent")
        .should("contain", `${censoredComment}</DESCRIPTION>`);
    });

    it("With optional fields", () => {
      cy.selectRandomServiceAndSubject();
      cy.get("#comments").type(comment);
      cy.get("#first_name").type(first_name);
      cy.get("#last_name").type(last_name);
      cy.get("#email").type(email);
      cy.get("#phone").type(phone);
      cy.get("#privacy_label").click();
      cy.get("#promotions_label").click();
      cy.fillRecaptcha();
      cy.get("#support-submit").click();

      cy.wait("@submitForm")
        .its("response.statusCode")
        .should("eq", 302);

      cy.get(".support-confirmation--error").should("not.be.visible");
      cy.get(".support-confirmation--success").should("be.visible");

      // check the email is sent with relevant data
      cy.wait(2000);
      cy.mix("test_helpers.feedback_email")
        .its("stdout")
        .should("not.contain", "enonent")
        .should("contain", `${comment}</DESCRIPTION>`)
        .should("contain", first_name)
        .should("contain", last_name)
        .should("contain", email)
        .should("contain", phone)
        .then(stdout => {
          cy.get("@selectedService").then(service =>
            cy.wrap(stdout).should("contain", `<SERVICE>${service}</SERVICE>`)
          );
          cy.get("@selectedSubject").then(subject =>
            cy.wrap(stdout).should("contain", `<CATEGORY>${subject}</CATEGORY>`)
          );
        });
    });

    /**
     * Returns Poison.Encoder error, maybe the test upload is getting
     * encoded suboptimally?
     */
    xit("With a photo attachment", () => {
      cy.selectRandomServiceAndSubject();
      cy.get("#comments").type(comment);
      cy.get("input#photo").attachFile("customer-support-form/test_image1.png");
      cy.get("#no_request_response_label").click();
      cy.fillRecaptcha();
      cy.get("#support-submit").click();

      cy.wait("@submitForm")
        .its("response.statusCode")
        .should("eq", 302);

      cy.get(".support-confirmation--error").should("not.be.visible");
      cy.get(".support-confirmation--success").should("be.visible");

      // check the email is sent with relevant data
      cy.wait(2000);
      cy.mix("test_helpers.feedback_email")
        .its("stdout")
        .should("not.contain", "enonent")
        .should("contain", `${comment}</DESCRIPTION>`)
        .should("contain", "test_image1")
        .then(stdout => {
          cy.get("@selectedService").then(service =>
            cy.wrap(stdout).should("contain", `<SERVICE>${service}</SERVICE>`)
          );
          cy.get("@selectedSubject").then(subject =>
            cy.wrap(stdout).should("contain", `<CATEGORY>${subject}</CATEGORY>`)
          );
        });
    });

    /**
     * Always raises Elixir error, e.g.:
     * (File.Error) could not read file "/var/folders/2v/
     * x05g8lfd1l734_337rcx1dpwbgm0nx/T//plug-1626/
     * multipart-1626630666-24765732541476-1": no such file or directory
     */
    xit("With two photo attachments", () => {
      cy.selectRandomServiceAndSubject();
      cy.get("#comments").type(comment);
      cy.get("input#photo").attachFile("customer-support-form/test_image1.png");
      cy.get("input#photo").attachFile("customer-support-form/test_image2.png");
      cy.get("#no_request_response_label").click();
      cy.fillRecaptcha();
      cy.get("#support-submit").click();

      cy.wait("@submitForm")
        .its("response.statusCode")
        .should("eq", 302);

      cy.get(".support-confirmation--error").should("not.be.visible");
      cy.get(".support-confirmation--success").should("be.visible");

      // check the email is sent with relevant data
      cy.wait(2000);
      cy.mix("test_helpers.feedback_email")
        .its("stdout")
        .should("not.contain", "enonent")
        .should("contain", `${comment}</DESCRIPTION>`)
        .should("contain", "test_image1")
        .should("contain", "test_image2")
        .then(stdout => {
          cy.get("@selectedService").then(service =>
            cy.wrap(stdout).should("contain", `<SERVICE>${service}</SERVICE>`)
          );
          cy.get("@selectedSubject").then(subject =>
            cy.wrap(stdout).should("contain", `<CATEGORY>${subject}</CATEGORY>`)
          );
        });
    });
  });
});
