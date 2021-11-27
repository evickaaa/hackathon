import { username, password } from '../fixtures.js'


describe('Booking a hotel CZE', () => {

  beforeEach(() => {
    browser.reloadSession();
    browser.url('/cs');
  });

  it('HD - should booking a hotel as unregistered user', () => {
    
    // SIGN
    const sign = $(".hidden-xs").$(".navigation-link")
    sign.click()

    const emailBox = $("#email")
    emailBox.setValue(username)

    const passwordBox = $("#passwd")
    passwordBox.setValue(password)

    const submitButtonLogin = $("#SubmitLogin")
    submitButtonLogin.click()
    browser.pause(1000)
    // home button
    const homeButton = $("a[title='Home']");
    homeButton.click()
    browser.pause(1000)

    // homepage
    const hotelLocations = $("#hotel_location");
    hotelLocations.setValue("London")

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
    browser.pause(1000)

    // choosing a room
    const hotels = $$(".room_cont")
    const secondHotel = hotels[1]
    secondHotel.$("a[data-id-product='2']").click()

    $(".button-container").$("a").click()

    $(".proceed_btn_block").$("a").click()

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