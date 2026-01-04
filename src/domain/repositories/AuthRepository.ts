// domain/repositories/AuthRepository.ts

import type { AuthSession } from "../auth/AuthSession.js";

export interface AuthRepository {
    create(session: AuthSession): Promise<void>;
    findById(id: string): Promise<AuthSession | null>;
    revoke(id: string): Promise<void>;
    revokeAll(userId: string): Promise<void>;
    updateRefreshToken(
        authId:string,
        refreshTokenHash:string,
        expiresAt:Date
    ):Promise<void>
}
