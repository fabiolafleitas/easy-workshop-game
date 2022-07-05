import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import MainActions from "./MainActions";

describe("Main Actions Component", () => {
  it("should render a button", () => {
    render(<MainActions />);

    expect(screen.getByRole('button', {name: /sword/i})).toBeInTheDocument();
  });

  it("should call the correct function on click", () => {
    const onSwordClick = jest.fn();
    render(<MainActions onSwordClick={onSwordClick}/>);

    userEvent.click(screen.getByRole('button', {name: /sword/i}));
    expect(onSwordClick).toBeCalled();
  });
});