import Input from "@/components/shared/input";

export default function HomePage() {
    return (
        <div
            className="d-flex flex-col gap-8"
            style={{ margin: 24, maxWidth: 400 }}
        >
            <Input label="Email" type="text" placeholder="email@example.com" />
            <Input label="Password" type="password" />
            <Input label="Password" type="password" withPasswordToggle />
            <Input label="label" readOnly defaultValue="test" />
            <Input
                label="Password"
                type="password"
                withPasswordToggle
                error="password is required"
            />
            <div style={{ marginBlock: 48 }}></div>
        </div>
    );
}
