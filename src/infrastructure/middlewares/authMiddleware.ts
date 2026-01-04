import { TokenService } from "@/application/services/TokenService.js";
import { BadRequestError } from "@/errors/BadRequestError.js";
import type { Request, Response, NextFunction } from "express";

const tokenService = new TokenService(
    process.env.ACCESS_TOKEN_SECRET!,
    process.env.REFRESH_TOKEN_SECRET!
);

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) throw new BadRequestError();
    try {
        const payload = tokenService.verifyAccessToken(token);

        req.user = payload; // 👈 attach user context
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
