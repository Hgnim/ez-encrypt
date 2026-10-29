import CryptoJS from 'crypto-js';

export function wordArrayToUint8Array(wa:CryptoJS.lib.WordArray){
    //从WordArray中提取出字节长度并实例化Uint8Array
    const byteArray = new Uint8Array(wa.sigBytes);
    for (let i = 0; i < wa.sigBytes; i++) {
        //从words数组中按位提取每个字节
        byteArray[i] = (wa.words[i >>> 2]! >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return byteArray;
}



/**
 * 加密Uint8Array，返回string
 * @param data 待加密的Uint8Array
 * @param password 密码
 * @returns string 返回加密后的OpenSSL格式的Base64字符串
 */
export function encryptUint8ArrayToString(data: Uint8Array, password: string): string {
    const wordArray = CryptoJS.lib.WordArray.create(data);
    const encrypted = CryptoJS.AES.encrypt(wordArray, password);
    return encrypted.toString();
}

/**
 * 解密string，返回Uint8Array
 * @param base64Str 被加密的Base64字符串
 * @param password 密码
 * @returns Uint8Array 返回解密后的原始Uint8Array
 *///decryptUint8ArrayFromString
export function decryptStringToUint8Array(
    base64Str: string,
    password: string,
): Uint8Array {
    const decrypted = CryptoJS.AES.decrypt(base64Str, password);
    return wordArrayToUint8Array(decrypted);
}