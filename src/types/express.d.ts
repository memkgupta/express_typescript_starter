import type { AccessTokenPayload } from "@/application/security/TokenPayloads.ts";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload & {
                authId?: string;
            };
        }
    }
}

export {};