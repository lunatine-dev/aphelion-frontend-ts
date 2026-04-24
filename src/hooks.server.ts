import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
    let token = event.cookies.get("accessToken");
    const refreshToken = event.cookies.get("refreshToken");

    try {
        if (token) {
            event.locals.user = jwt.verify(token, JWT_SECRET);
        } else if (refreshToken) {
            // Request will be sent from SvelteKit backend, so we need to fetch the users real IP + User Agent to manage sessions properly
            const clientIp = event.getClientAddress();
            const userAgent = event.request.headers.get("user-agent") ?? "Unknown";

            const res = await fetch(`${PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-forwarded-for": clientIp,
                    "user-agent": userAgent,
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (res.ok) {
                const { accessToken, refreshToken: newRefreshToken } = await res.json();

                const cookieOptions = { path: "/", httpOnly: true, secure: true, sameSite: "lax" } as const;
                event.cookies.set("accessToken", accessToken, { ...cookieOptions, maxAge: 60 * 15 });
                event.cookies.set("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });

                event.locals.user = jwt.verify(accessToken, JWT_SECRET);
            } else if (res.status === 401 || res.status === 403) {
                event.cookies.delete("accessToken", { path: "/" });
                event.cookies.delete("refreshToken", { path: "/" });
                event.locals.user = null;
            }
        }
    } catch (err) {
        event.locals.user = null;
        event.cookies.delete("accessToken", { path: "/" });
    }

    return resolve(event);
};
