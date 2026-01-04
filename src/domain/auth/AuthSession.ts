export class AuthSession {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly refreshTokenHash: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: Date
    ) {}

    /* =====================
       Domain logic
       ===================== */

    isExpired(now: Date = new Date()): boolean {
        return now > this.expiresAt;
    }

    matchesRefreshToken(hash: string): boolean {
        return this.refreshTokenHash === hash;
    }

    rotateRefreshToken(
        newHash: string,
        newExpiry: Date
    ): AuthSession {
        return new AuthSession(
            this.id,
            this.userId,
            newHash,
            this.isRevoked,
            newExpiry
        );
    }
}
