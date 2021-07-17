import fs from 'fs';
import path from 'path';
import { hash, compare } from 'bcryptjs';

export function generateUsersDataPath() {
    return path.join(process.cwd(), 'server/data', 'users.json');
}

export function extractUsersData(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

// // AUTH
export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}


export async function handleGetUserDataObject(email, data) {
    let userObj = data.find((item) => item.email === email);
    return userObj
}