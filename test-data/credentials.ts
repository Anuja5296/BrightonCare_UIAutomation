// test-data/credentials.ts

export const testData = {
    validUser: {
        email: "anuja.qa",  // ⚠️ Replace with actual valid credentials
        password: "Pass@123"
    },
    invalidUser: {
        email: "Anuja@example.com",
        password: "wrongpassword"
    },
    emptyUsername: {
        email: "",
        password: "Test@123"
    },
    emptyPassword: {
        email: "testuser@example.com",
        password: ""
    },
    shortPassword: {
        email: "testuser@example.com",
        password: "short"
    },
    baseURL: "https://qa-ehr.polarissw.co/",
    moveInsURL: "https://qa-ehr.polarissw.co/move-ins"
};

// Optional: Define types
export interface Credentials {
    email: string;
    password: string;
}