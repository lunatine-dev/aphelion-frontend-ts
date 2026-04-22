export const APP_NAME = "aphelion";

const RANDOM_DATA = {
    name: ["aphelion-ts", "aphelion-frontend-ts", "umbra", "velora", "comet", "perihelion"],
    server: [
        {
            name: "Node-1",
            status: "online",
        },
        {
            name: "Node-2",
            status: "offline",
        },
    ],
    users: ["lunatine-dev"],
    language: ["JavaScript", "TypeScript", "Svelte", "HTML"],
};

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateProjectTemplates = (count: number) => {
    return Array.from({ length: count }, () => {
        const name = pick(RANDOM_DATA.name);
        const user = pick(RANDOM_DATA.users);
        const server = pick(RANDOM_DATA.server);
        const language = pick(RANDOM_DATA.language);

        return {
            name: name,
            server: { ...server }, // Spread to avoid reference sharing
            repositoryName: `${user}/${name}`,
            branch: "main",
            createdAt: new Date(),
            updatedAt: new Date(),
            lastCommit: {
                text: "chore: initial commit",
                date: new Date(),
            },
            id: Math.random() * 1516,
            language,
        };
    });
};

export const PROJECT_TEMPLATE = {
    name: "aphelion-ts",
    server: {
        name: "Node-1",
        status: "online",
    },
    repositoryName: "lunatine-dev/aphelion-ts",
    branch: "main",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastCommit: {
        text: "chore: readme cleanup",
        date: new Date(),
    },
};

export const PROJECT_TEMPLATES = generateProjectTemplates(10);
