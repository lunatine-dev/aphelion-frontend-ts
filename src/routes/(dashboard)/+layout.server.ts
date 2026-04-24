import { redirect } from "@sveltejs/kit";

export async function load(event) {
    if (!event.locals.user) {
        throw redirect(307, "/login");
    }

    return {
        user: event.locals.user,
    };
}
