import { render, screen } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
    it("renders the Button component", () => {
        render(<Button>Hi</Button>);

        screen.debug();
    });
});
