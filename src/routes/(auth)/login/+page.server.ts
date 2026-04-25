import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // If the hook successfully verified a JWT, redirect to home/dashboard
    if (locals.user) {
        throw redirect(303, "/");
    }

    return {};
};
