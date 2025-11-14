import { UserProfile } from "@/components/core/for-testing/user-profile";
import { userDataMock } from "@/mocks/user";
import { render, screen, waitFor } from "@testing-library/react";

// 1. MOCK THE MODULE: Tell Jest to use a mock implementation for the entire apiService module.
import * as apiService from "@/services/users";
jest.mock("@/services/users");

describe("UserProfile Component with API Mocking", () => {
  // Set up the mock function before each test
  beforeEach(() => {
    // 2. SET THE MOCK RETURN VALUE: This is the key step.
    // We override the mocked fetchUserData function to return a resolved Promise
    // with our fake data.
    (apiService.fetchUserData as jest.Mock).mockResolvedValue(userDataMock);
  });

  // Clear mock history after each test to ensure isolation
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case
  test("displays user data after successful fetch", async () => {
    const userId = "1";

    // 1. Arrange: Render the component
    render(<UserProfile userId={userId} />);

    // Initial Assert: Check for the loading state (synchronous)
    expect(screen.getByText(/Loading user data.../i)).toBeInTheDocument();

    // The component makes an API call and updates state, which is ASYNCHRONOUS.
    // We must wait for the data to be rendered.

    // 2. Act/Assert (Asynchronous): Wait for the desired content to appear
    await waitFor(() => {
      // Assert 1: Check if the fetched data is displayed
      expect(
        screen.getByRole("heading", { name: userDataMock.fio || "" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Email: ${userDataMock.email}`)
      ).toBeInTheDocument();
    });

    // Assert 2: Verify the API function was called correctly (Crucial for mocking!)
    expect(apiService.fetchUserData).toHaveBeenCalledTimes(1);
    expect(apiService.fetchUserData).toHaveBeenCalledWith(userId);
  });

  // Test Case for the failure state
  test("displays an error message on failed fetch", async () => {
    const mockError = new Error("Network error");

    // OVERRIDE THE MOCK: Set the mock to return a REJECTED promise for this specific test
    (apiService.fetchUserData as jest.Mock).mockRejectedValue(mockError);

    // Arrange: Render the component
    render(<UserProfile userId={"2"} />);

    // Act/Assert (Asynchronous): Wait for the error state to be rendered
    await waitFor(() => {
      // Since our component logs the error and sets user to null,
      // it should display the "User not found" message.
      expect(screen.getByText(/User not found./i)).toBeInTheDocument();
    });

    // Assert: Check that the loading message is gone
    expect(screen.queryByText(/Loading user data.../i)).not.toBeInTheDocument();
  });
});
