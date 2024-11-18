import * as crypto from 'crypto';

export async function encrypt(password: string): Promise<string> {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function comparePassword(Password: string, encyptedPassword?: string): Promise<boolean> {
    const hash = crypto.createHash('sha256').update(Password).digest('hex');
    return hash == encyptedPassword;
}
