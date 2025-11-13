import UsersPage from "@/app/(test)/users/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<UsersPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    console.log(heading.textContent);

    expect(heading).toBeInTheDocument();
  });
});
