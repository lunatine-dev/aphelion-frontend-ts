import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
    let token = event.cookies.get("accessToken");
    const refreshToken = event.cookies.get("refreshToken");

    // 1. Try to verify the access token
    try {
        if (token) {
            event.locals.user = jwt.verify(token, JWT_SECRET);
        } else if (refreshToken) {
            const res = await fetch(`${PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            });

            if (res.ok) {
                const { accessToken, newRefreshToken } = await res.json();

                event.cookies.set("accessToken", accessToken, { path: "/", httpOnly: true, maxAge: 60 * 15 });
                event.cookies.set("refreshToken", newRefreshToken, {
                    path: "/",
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                });

                event.locals.user = jwt.verify(accessToken, JWT_SECRET);
            }
        }
    } catch (err) {
        event.locals.user = null;
    }

    return resolve(event);
};
