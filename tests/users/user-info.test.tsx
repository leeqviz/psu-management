import { UserInfo } from "@/components/core/for-testing/user-info";
import { render, screen } from "@testing-library/react";
// 1. Import the utility module that contains the function
import { userDataMock } from "@/mocks/user";
import { FormatUtils } from "@/utils/formatters";

// 2. Mock the specific function *before* the component is rendered
describe("UserInfo Component with Internal Function Mocking", () => {
  // Declare the spy variable outside
  let formatDateSpy: jest.SpyInstance | null = null;

  beforeEach(() => {
    // A. Spy on the specific function
    formatDateSpy = jest.spyOn(FormatUtils, "formatDate");

    // B. Tell the spy what to return for this test case
    // This replaces the real function logic for the duration of the test
    formatDateSpy.mockReturnValue("MOCKED_DATE_2025");
  });

  afterEach(() => {
    // C. RESTORE THE ORIGINAL FUNCTION: This is CRUCIAL for spyOn
    // You must restore the original implementation after each test
    // to avoid affecting other tests in the file.
    if (formatDateSpy) formatDateSpy.mockRestore();
  });

  test("renders user info using the mocked formatDate function", () => {
    // 1. Arrange: Render the component
    render(<UserInfo user={userDataMock} />);

    // 2. Assert 1: Check if the component displays the MOCKED value
    // This proves the component correctly used the mocked function.
    const formattedDate = screen.getByText("Joined: MOCKED_DATE_2025");
    expect(formattedDate).toBeInTheDocument();
    // 3. Assert 2: Verify the mock was called correctly (Crucial for mocking!)
    expect(formatDateSpy).toHaveBeenCalledTimes(1);
    expect(formatDateSpy).toHaveBeenCalledWith(userDataMock.assignedAt);

    // 4. Assert 3: Ensure OTHER internal functions still work (Integrity check)
    // The formatName function was NOT mocked, so it runs its original logic.
    expect(
      screen.getByRole("heading", {
        name: "leeqviz@gmail.com, Полотский Е.В.",
        level: 2,
      })
    ).toBeInTheDocument();
  });
});
