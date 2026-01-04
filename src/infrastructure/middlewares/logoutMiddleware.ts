import { tokenService } from "@/application/security/tokenServiceInstance.js";
import { BadRequestError } from "@/errors/BadRequestError.js";
import { UnauthorizedError } from "@/errors/UnauthorizedError.js";
import type { Request, Response, NextFunction } from "express";
export const logoutMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const refreshToken =
        req.body?.refreshToken ||
        req.cookies?.refreshToken ||
        req.headers["x-refresh-token"];

    if (!refreshToken || typeof refreshToken !== "string") {
        throw new BadRequestError("Refresh token missing");
    }

    try {
        const payload = tokenService.verifyRefreshToken(refreshToken);

        // ✅ Attach logout context
        req.user = {
            userId: payload.userId,
            authId: payload.authId,
           
        };

        next();
    } catch {
        throw new UnauthorizedError("Invalid or expired refresh token");
    }
};

