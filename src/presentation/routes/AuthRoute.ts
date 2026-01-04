import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "@/infrastructure/middlewares/authMiddleware.js";
import { logoutMiddleware } from "@/infrastructure/middlewares/logoutMiddleware.js";


export const createAuthRoutes = (
    controller: AuthController
) => {
    const router = Router();

    router.post("/login", controller.login);
    router.post("/refresh", controller.refresh);

    router.post(
        "/logout",
        authMiddleware,
        logoutMiddleware,
        controller.logout
    );

    router.post(
        "/logout-all",
        authMiddleware,
        controller.logoutAll
    );

    return router;
};
