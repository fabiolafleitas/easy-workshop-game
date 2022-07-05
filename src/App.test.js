import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";
import App from "./App";

const clickButtonTimes = (button, count) => {
    for (let i = 0; i < count; i++) {
        userEvent.click(button);
    }
};

const expectAllToHaveClass = (elements, className) => {
    elements.forEach((element) => {
      expect(element).toHaveClass(className);
    });
};

describe("App Component", () => {
    it("should render the bars with the sword button", () => {
        render(<App />);

        expect(screen.getByAltText("Character")).toBeInTheDocument();
        expect(screen.getAllByRole("article").length).toBe(2);
        expect(
            screen.getByRole("button", { name: /sword/i })
        ).toBeInTheDocument();
    });

    it("should decrease one level of health on every click if the level is greater than one", () => {
        render(<App />);

        const swordBtn = screen.getByRole("button", { name: /sword/i });
        userEvent.click(swordBtn);

        const bars = screen.getAllByRole("article");

        const heartLevels = within(bars[0]).getAllByLabelText(/level/);
        const healthLevels = within(bars[1]).getAllByLabelText(/level/);

        expect(heartLevels[heartLevels.length - 1]).toHaveClass("redFill");
        expect(healthLevels[healthLevels.length - 1]).toHaveClass("empty");
    });

    it("should decrease one level of heart if the health level reaches one", () => {
        render(<App />);

        const swordBtn = screen.getByRole("button", { name: /sword/i });
        const bars = screen.getAllByRole("article");
        const healthLevels = within(bars[1]).getAllByLabelText(/level/);

        clickButtonTimes(swordBtn, healthLevels.length);

        const heartLevels = within(bars[0]).getAllByLabelText(/level/);
        expect(heartLevels[heartLevels.length - 1]).toHaveClass("empty");
    });

    it("should fill the health bar if the heart level decreases", () => {
        render(<App />);

        const swordBtn = screen.getByRole("button", { name: /sword/i });
        const bars = screen.getAllByRole("article");
        const healthLevels = within(bars[1]).getAllByLabelText(/level/);

        clickButtonTimes(swordBtn, healthLevels.length);

        expectAllToHaveClass(healthLevels, "cyanFill");
    });

    it("should show game over message if the heart level reaches one", () => {
        render(<App />);

        const swordBtn = screen.getByRole("button", { name: /sword/i });
        const bars = screen.getAllByRole("article");
        const heartLevels = within(bars[0]).getAllByLabelText(/level/);
        const healthLevels = within(bars[1]).getAllByLabelText(/level/);

        clickButtonTimes(swordBtn, heartLevels.length * healthLevels.length);

        expect(screen.getByText(/game over/i)).toBeInTheDocument();
        expect(screen.queryByAltText("Character")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /sword/i })).not.toBeInTheDocument();
        expect(bars[0]).not.toBeInTheDocument();
        expect(bars[1]).not.toBeInTheDocument();
    });
});
