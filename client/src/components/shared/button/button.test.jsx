import { render, screen } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
    it("renders the Button component with children text", () => {
        render(<Button>Hello</Button>);

        expect(screen.getByRole("button")).toHaveTextContent("Hello");
    });
});
