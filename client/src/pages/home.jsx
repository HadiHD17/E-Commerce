import Button from "@/components/shared/button";

export default function HomePage() {
    return (
        <>
            HI <Button color="brand">hi theres</Button>
            <Button color="danger">theres</Button>
            <Button color="gray">hi theres</Button>
            <div>
                <Button variant="outlined" color="brand">
                    theres
                </Button>
                <Button variant="outlined" color="danger">
                    theres
                </Button>
                <Button variant="outlined" color="gray">
                    theres
                </Button>
            </div>
            <div>
                <Button variant="faded" color="brand">
                    theres
                </Button>
                <Button variant="faded" color="danger">
                    theres
                </Button>
                <Button variant="faded" color="gray">
                    theres
                </Button>
            </div>
        </>
    );
}
