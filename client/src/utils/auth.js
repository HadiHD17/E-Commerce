export default class Auth {
    static saveSession(payload) {
        console.log("payload:", payload);
        if ("id" in payload && "email" in payload && "token" in payload) {
            localStorage.setItem(
                "auth-user",
                JSON.stringify({
                    id: payload.id,
                    name: payload.name,
                    email: payload.email,
                }),
            );
            localStorage.setItem("auth-token", payload.token);
        }
    }

    static isLoggedIn() {
        return (
            Boolean(localStorage.getItem("auth-user")) &&
            Boolean(localStorage.getItem("auth-token"))
        );
    }

    static clearSession() {
        localStorage.removeItem("auth-user");
        localStorage.removeItem("auth-token");
    }
}
