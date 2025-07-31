import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./";

describe("Input Component", () => {
    it("should render a normal input with a label and a placeholder, when given", () => {
        render(<Input id="name" label="Name" placeholder="Your name..." />);

        const input = screen.getByLabelText("Name");

        expect(input).toHaveAttribute("id", "name");
        expect(input).toHaveAttribute("placeholder", "Your name...");
    });

    it("should change values on user input", () => {
        render(<Input label="Name" />);

        const input = screen.getByLabelText("Name");

        fireEvent.change(input, { target: { value: "John" } });
        expect(input.value).toBe("John");
    });

    it("should toggle password visibility when button is clicked", () => {
        render(<Input label="Password" type="password" withPasswordToggle />);

        const input = screen.getByLabelText("Password");
        const toggleButton = screen.getByRole("button");

        expect(input).toHaveAttribute("type", "password");

        // click to show password
        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute("type", "text");

        // click to hide password again
        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute("type", "password");
    });

    it("should throw an error, if `withPasswordToggle` and non-password `type` props are set", () => {
        expect(() =>
            render(<Input type="text" withPasswordToggle />),
        ).toThrowError();

        expect(() =>
            render(<Input type="email" withPasswordToggle />),
        ).toThrowError();

        expect(() =>
            render(<Input type="date" withPasswordToggle />),
        ).toThrowError();

        expect(() =>
            render(<Input type="password" withPasswordToggle />),
        ).not.toThrowError();
    });

    it("should render an error message if `error` prop is passed", () => {
        render(<Input label="Name" type="text" error="Error text" />);

        const inputRoot = screen.getByTestId("input-root");
        const inputError = screen.getByTestId("input-error");

        expect(inputRoot).toContainElement(inputError);
        expect(inputError).toHaveTextContent("Error text");
    });
});
