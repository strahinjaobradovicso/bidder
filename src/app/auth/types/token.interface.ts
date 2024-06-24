import { JwtPayload } from "jwt-decode";

export interface TokenResponsePayload extends JwtPayload {
    userId: number
    username: string
}