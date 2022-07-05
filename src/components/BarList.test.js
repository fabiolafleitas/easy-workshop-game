import BarList from "./BarList";
import { render, screen } from "@testing-library/react";

const config = {
    bars: [
        {
            id: 1,
            image: "heart",
            alt: "Heart",
            quantity: 3,
            color: "red",
        },
        {
            id: 2,
            image: "potion",
            alt: "Health",
            quantity: 5,
            color: "cyan",
        },
    ],
};

describe("Bar List Component", () => {
    it("renders the correct number of bars", () => {
        render(<BarList barsConfig={config.bars} fillLevels={{}}/>);

        expect(screen.getAllByRole("article").length).toBe(2);
    });
});
