import Cookies from "js-cookie";

export const tokenConfig = () => {
    const initCookie = Cookies.get("ooml-auth-token");

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    if (initCookie) {
        config.headers["x-access-token"] = initCookie;
    }

    return config;
};