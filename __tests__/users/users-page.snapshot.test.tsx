import UsersPage from "@/app/(test)/users/page";
import { render } from "@testing-library/react";

it("renders users page unchanged", () => {
  const { container } = render(<UsersPage />);
  expect(container).toMatchSnapshot();
});
