export async function load({}) {
    const user = {
        login: "john-doe",
        name: "John Doe",
        avatar: "https://placehold.co/200x200",
        rank: "dev",
    };
    return { user };
}
