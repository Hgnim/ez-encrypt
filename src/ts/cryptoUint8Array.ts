import CryptoJS from 'crypto-js';
import {wordArrayToUint8Array} from "./crypto";


/**
 * 将Uint8Array加密，返回Uint8Array
 * @param sourceU8a 原始数据
 * @param password 密码
 * @return Uint8Array 返回加密后的数据
 */
export function encryptUint8ArrayToUint8Array(sourceU8a: Uint8Array, password: string): Uint8Array {
    return wordArrayToUint8Array(
        CryptoJS.enc.Base64.parse(
            CryptoJS.AES.encrypt(
                CryptoJS.lib.WordArray.create(sourceU8a), password
            ).toString()
        )
    );
}

/**
 * 将Uint8Array加密数据解密，返回Uint8Array
 * @param encU8a 加密数据
 * @param password 密码
 * @return Uint8Array 返回原始的数据
 */
export function decryptUint8ArrayToUint8Array(
    encU8a: Uint8Array,
    password: string,
): Uint8Array {
    return wordArrayToUint8Array(
        CryptoJS.AES.decrypt(
            CryptoJS.enc.Base64.stringify(
                CryptoJS.lib.WordArray.create(encU8a),
            ),
            password,
        ),
    );
}


/**
 * 将string加密为Uint8Array
 * @param sourceStr 原始数据
 * @param password 密码
 * @return Uint8Array 返回加密后的数据
 */
export function encStringToUint8Array(sourceStr: string, password: string): Uint8Array {
    return wordArrayToUint8Array(
        CryptoJS.enc.Base64.parse(
            CryptoJS.AES.encrypt(
                sourceStr, password
            ).toString()
        )
    );
}

/**
 * 将Uint8Array解密为string
 * @param encU8a 加密数据
 * @param password 密码
 * @return string 返回原始string
 */
export function decUint8ArrayToString(encU8a: Uint8Array, password: string): string {
    return CryptoJS.AES.decrypt(
        CryptoJS.enc.Base64.stringify(
            CryptoJS.lib.WordArray.create(encU8a)
        )
        , password
    ).toString(CryptoJS.enc.Utf8);
}