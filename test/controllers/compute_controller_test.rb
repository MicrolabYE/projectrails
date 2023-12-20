require "test_helper"

class ComputeControllerTest < ActionDispatch::IntegrationTest
  test "should get add_message" do
    get compute_add_message_url
    assert_response :success
  end
end
