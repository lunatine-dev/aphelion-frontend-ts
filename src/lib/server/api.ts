import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { error, redirect, type RequestEvent } from "@sveltejs/kit";

async function request(event: RequestEvent, method: string, path: string, body?: any) {
    const token = event.cookies.get("accessToken");

    const res = await event.fetch(`${PUBLIC_BACKEND_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    if (res.status === 401) {
        event.cookies.delete("accessToken", { path: "/" });
        event.cookies.delete("refreshToken", { path: "/" });
        throw redirect(303, "/login");
    }

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw error(res.status, errData.message || "Backend Error");
    }

    return res.status === 204 ? null : res.json();
}

export const api = {
    get: (e: RequestEvent, p: string) => request(e, "GET", p),
    post: (e: RequestEvent, p: string, b: any) => request(e, "POST", p, b),
    put: (e: RequestEvent, p: string, b: any) => request(e, "PUT", p, b),
    delete: (e: RequestEvent, p: string) => request(e, "DELETE", p),
};
