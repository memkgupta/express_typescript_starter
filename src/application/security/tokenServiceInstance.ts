import { TokenService } from "../services/TokenService.js";


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("JWT secrets are not configured");
}

export const tokenService = new TokenService(
    accessTokenSecret,
    refreshTokenSecret
);
