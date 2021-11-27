import { newUserRegistrationCZE } from '../fixtures.js'


describe('Registration of a new user CZE', () => {

  beforeEach(() => {
    browser.reloadSession();
    browser.url('/cs');
  });

  it('should registrate to the Application', () => {
    const signIn = $(".hide_xs");
    signIn.click();

    const emailAdress = $("#email_create");
    emailAdress.setValue(newUserRegistrationCZE);

    $("#SubmitCreate").click();

    const gender = $("#id_gender2");
    gender.click()
    const firstName = $("#customer_firstname")
    firstName.setValue("Jana");
    const lastName = $("#customer_lastname");
    lastName.setValue("Novotná");
    const email = $("#email");
    email.setValue(newUserRegistrationCZE);
    const password = $("#passwd");
    password.setValue("Janina123");

    $("#days").click();
    $("#days").$("option[value='3']").click();

    $("#months").click();
    $("#months").$("option[value='12']").click();

    $("#years").click();
    $("#years").$("option[value='2000']").click();

     $("#submitAccount").click();
 
    expect(signIn).toHaveTextContaining("Jana");
  });

});