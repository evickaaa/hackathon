import { newUserBookingCZE } from '../fixtures.js'


describe('Booking a hotel', () => {

  beforeEach(() => {
    browser.reloadSession();
    browser.url('/cs');
  });

  it('HD - should booking a hotel as unregistered user', () => {
  
    const hotelLocations = $("#hotel_location");
    hotelLocations.setValue("London")
    browser.pause(1000)

    const hotelButton = $("#id_hotel_button");
    hotelButton.click();
    const hotelButtonMenu = $(".hotel_dropdown_ul");
    hotelButtonMenu.click();

    const checkInDateButton = $("#check_in_time");
    checkInDateButton.click();
    $("td[data-handler='selectDay']").click();

    const checkOutTimeButton = $("#check_out_time");
    checkOutTimeButton.click();
    $("td[data-handler='selectDay']").click();
    
    $("#search_room_submit").click();

    // choosing a room
    const hotels = $$(".room_cont")
    const secondHotel = hotels[1]
    secondHotel.$("a[data-id-product='2']").click()
    browser.pause(1000);

    $(".button-container").$("a").click()
    browser.pause(1000);

    $(".proceed_btn_block").$("a").click()
    browser.pause(1000)

    $("#opc_guestCheckout").click()
    browser.pause(1000)

    // fill in the form (guest information)
    const gender = $("option[value='2']");
    gender.click()
    const firstName = $("#customer_firstname")
    firstName.setValue("Jana");
    const lastName = $("#customer_lastname");
    lastName.setValue("Novotná");
    const email = $("#email");
    email.setValue(newUserBookingCZE);
    const mobilePhone = $("#phone_mobile");
    mobilePhone.setValue(+420728456987);
    
    $("#days").click();
    $("#days").$("option[value='3']").click();

    $("#months").click();
    $("#months").$("option[value='12']").click();

    $("#years").click();
    $("#years").$("option[value='2000']").click();

    const firstName2 = $("#firstname");
    firstName2.setValue("Jana");

    const lastName2 = $("#lastname");
    lastName2.setValue("Novotná");

    const address = $("#address1");
    address.setValue("Hornicka 120");

    const city = $("#city");
    city.setValue("Praha");

    const postCode = $("#postcode");
    postCode.setValue("19011");

    const country = $("#id_country");
    country.$("option[value='16']").click();
    const mobilePhone2 = $("#guest-info-block").$$("#phone_mobile");
    mobilePhone2[1].setValue(+420728456987);
    $("#submitGuestAccount").click();
    browser.pause(1000)

    const proceedButton = $("a[title='Proceed to Payment']");
    proceedButton.click();

    const termsConfirmation = $("#uniform-cgv");
    termsConfirmation.click()

    const bankwire = $(".bankwire")
    bankwire.click()

    const submitButton = $("button[type='submit']");
    submitButton.click()
  });
});