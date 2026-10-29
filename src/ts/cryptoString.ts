import CryptoJS from 'crypto-js';

/**
 * 加密string，返回string
 * @param text 待加密的字符串
 * @param password 密码
 * @returns string 返回加密后的OpenSSL格式的Base64字符串
 */
export function encryptStringToString(text: string, password: string): string {
    return CryptoJS.AES.encrypt(text, password).toString();
}

/**
 * 解密string，返回string
 * @param base64Str 被加密的Base64字符串
 * @param password 密码
 * @returns string 返回解密后的原始字符串
 */
export function decryptStringToString(base64Str: string, password: string): string {
    return CryptoJS.AES.decrypt(base64Str, password).toString(
        CryptoJS.enc.Utf8,
    );
}