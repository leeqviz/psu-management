import UsersPage from "@/app/[lng]/(test)/users/page";
import { render } from "@testing-library/react";

it("renders users page unchanged", () => {
  const { container } = render(<UsersPage />);
  expect(container).toMatchSnapshot();
});
