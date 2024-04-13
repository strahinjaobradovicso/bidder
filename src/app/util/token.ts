import { JwtPayload, jwtDecode } from "jwt-decode";
import { environment } from "../../environments/environment";

export interface TokenResponsePayload extends JwtPayload {
    userId: number
    username: string
}
export const getDecoded = (): TokenResponsePayload | undefined => {
    const token = localStorage.getItem(environment.TOKEN_STORAGE_KEY);
    if(!token)
        return;
    const decoded = jwtDecode(token) as TokenResponsePayload;
    if(decoded.exp && decoded.exp * 1000 <= Date.now()){
        return;
    }
    return decoded;
}