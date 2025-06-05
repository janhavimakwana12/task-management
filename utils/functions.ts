import jwt from "jsonwebtoken";
export const generateToken = (email: string) => {
    return jwt.sign({email}, process.env.NEXTAUTH_SECRET!, {expiresIn: '1h'})
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!);
}