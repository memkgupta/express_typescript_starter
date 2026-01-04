import type { AuthService } from "@/application/services/AuthService.js";
import { UnauthorizedError } from "@/errors/UnauthorizedError.js";
import type { Request, Response } from "express";


export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    /* ======================
       LOGIN
       ====================== */
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const tokens = await this.authService.login(
            email,
            password,
            {
                deviceId: req.headers["x-device-id"] ,
                userAgent: req.headers["user-agent"],
                ipAddress: req.ip
            }
        );

        return res.status(200).json(tokens);
    };

    /* ======================
       REFRESH TOKEN
       ====================== */
    refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        const tokens = await this.authService.refresh(refreshToken);

        return res.status(200).json(tokens);
    };

    /* ======================
       LOGOUT (single device)
       ====================== */
    logout = async (req: Request, res: Response) => {
        if(!req.user) throw new UnauthorizedError()
        const { authId } = req.user; 
        
        await this.authService.logout(authId!);

        return res.status(204).send();
    };

    /* ======================
       LOGOUT ALL DEVICES
       ====================== */
    logoutAll = async (req: Request, res: Response) => {
           if(!req.user) throw new UnauthorizedError()
        const { userId } = req.user;

        await this.authService.logoutAll(userId);

        return res.status(204).send();
    };
}
