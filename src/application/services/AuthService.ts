import type { AuthRepository } from "@/domain/repositories/AuthRepository.js";
import type { UserRepository } from "@/domain/repositories/UserRepository.js";
import type { LoginMeta } from "../auth/LoginMeta.js";
import { Password } from "@/domain/auth/Password.js";
import { AuthSession } from "@/domain/auth/AuthSession.js";
import { Hash } from "@/domain/security/Hash.js";
import type { TokenService } from "./TokenService.js";

export class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly authRepo: AuthRepository,
        private readonly tokenService: TokenService
    ) {}

    async login(email: string, password: string, meta: LoginMeta) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error("Invalid credentials");

        if (!Password.verify(password, user.passwordHash)) {
            throw new Error("Invalid credentials");
        }

        const authId = crypto.randomUUID();

        const refreshToken = this.tokenService.createRefreshToken({
            authId,
            userId: user.id
        });

        const accessToken = this.tokenService.createAccessToken({
            userId: user.id,
            
        });

        await this.authRepo.create(
            new AuthSession(
                authId,
                user.id,
               Hash.sha256(refreshToken),
               false,
                this.tokenService.refreshTokenExpiry()
            ),
            
        );

        return { accessToken, refreshToken };
    }
    async refresh(refreshToken: string) {
    
    let payload;
    try {
        payload = this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
        throw new Error("Invalid refresh token");
    }

    const { authId, userId } = payload;

   
    const session = await this.authRepo.findById(authId);

    if (!session) {
        throw new Error("Session not found");
    }

   
    if (session.isRevoked || session.isExpired()) {
        throw new Error("Session expired");
    }

   
    const isValid = Hash.compare(
        refreshToken,
        session.refreshTokenHash
    );

    if (!isValid) {
        // token reuse detected → revoke all sessions
        await this.authRepo.revokeAll(userId);
        throw new Error("Refresh token reuse detected");
    }

    const newRefreshToken = this.tokenService.createRefreshToken({
        authId,
        userId
    });

    const newRefreshTokenHash = Hash.sha256(newRefreshToken);

    await this.authRepo.updateRefreshToken(
        authId,
        newRefreshTokenHash,
        this.tokenService.refreshTokenExpiry()
    );

    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const newAccessToken = this.tokenService.createAccessToken({
        userId: user.id,
       
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}
async logout(authId: string): Promise<void> {
    await this.authRepo.revoke(authId);
}
async logoutAll(userId: string): Promise<void> {
    await this.authRepo.revokeAll(userId);
}

}
