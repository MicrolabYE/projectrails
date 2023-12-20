require "test_helper"

class MainControllerTest < ActionDispatch::IntegrationTest
  test "should get main_page" do
    get main_main_page_url
    assert_response :success
  end

  test "should get registration" do
    get main_registration_url
    assert_response :success
  end

  test "should get profile" do
    get main_profile_url
    assert_response :success
  end

  test "should get about_us" do
    get main_about_us_url
    assert_response :success
  end

  test "should get stop_page" do
    get main_stop_page_url
    assert_response :success
  end
end
