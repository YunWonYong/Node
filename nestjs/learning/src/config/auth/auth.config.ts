import { registerAs } from "@nestjs/config";


export default registerAs("auth", () => {
    return {
        secret: process.env.AUTH_SECRET,
    }; 
});