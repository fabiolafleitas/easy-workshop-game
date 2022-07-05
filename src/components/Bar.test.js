import { render, screen } from "@testing-library/react";
import Bar from "./Bar";

const defaultParams = {
    config: {
        id: 1,
        image: "heart",
        alt: "Heart",
        quantity: 3,
        color: "red",
    },
    fillLevel: 3,
};

const getParams = (params = {}, config = {}) => {
    
    return {
      ...defaultParams,
      ...params,
      config: {
        ...defaultParams.config,
        ...config
      }
    };
}

describe("Bar Component", () => {
    it("renders the image", () => {
        render(<Bar {...getParams()} />);

        expect(screen.getByAltText("Heart")).toBeInTheDocument();
    });

    it("renders all the levels filled", () => {
        render(<Bar {...getParams()} />);

        const levels = screen.getAllByLabelText(/level/);

        expect(levels.length).toBe(3);
        expect(levels[0]).toHaveClass("redFill");
        expect(levels[1]).toHaveClass("redFill");
        expect(levels[2]).toHaveClass("redFill");
    });

    it("renders filled levels when load size is greater than zero and less than quantity", () => {
        render(<Bar {...getParams({fillLevel: 2})} />);

        const levels = screen.getAllByLabelText(/level/);

        expect(levels[0]).toHaveClass("redFill");
        expect(levels[1]).toHaveClass("redFill");
        expect(levels[2]).toHaveClass("empty");
        expect(levels[2]).not.toHaveClass("redFill");
    });

    it("renders all empty levels when load size equals to zero", () => {
        render(<Bar {...getParams({fillLevel: 0})} />);

        const levels = screen.getAllByLabelText(/level/);

        expect(levels[0]).toHaveClass("empty");
        expect(levels[0]).not.toHaveClass("redFill");
        expect(levels[1]).toHaveClass("empty");
        expect(levels[1]).not.toHaveClass("redFill");
        expect(levels[2]).toHaveClass("empty");
        expect(levels[2]).not.toHaveClass("redFill");
    });

    it("renders all filled levels when load size is greater than quantity", () => {
        render(<Bar {...getParams({fillLevel: 5})} />);

        const levels = screen.getAllByLabelText(/level/);

        expect(levels.length).toBe(3);
        expect(levels[0]).not.toHaveStyle("backgroundColor: #ffffff");
        expect(levels[1]).toHaveClass("redFill");
        expect(levels[2]).toHaveClass("redFill");
    });

    it("renders one level as default when the quantity is invalid", () => {
        render(<Bar {...getParams({}, {quantity: -1})} />);

        const levels = screen.getAllByLabelText(/level/);
        expect(levels.length).toBe(1);
    });
});
