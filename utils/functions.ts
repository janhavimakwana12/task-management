import jwt from "jsonwebtoken";
export const generateToken = (email: string) => {
    return jwt.sign({email}, process.env.NEXTAUTH_SECRET!, {expiresIn: '1h'})
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!);
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      })
}