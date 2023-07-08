import { registerAs } from "@nestjs/config";

export default registerAs("email", () => {
    return {
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS
        },
        verifyBaseUrl: process.env.EMAIL_VERIFY_BASE_URL
    }; 
});