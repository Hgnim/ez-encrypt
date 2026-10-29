import CryptoJS from 'crypto-js';

/**
 * 加密string，返回WordArray
 * @param text 待加密的文本
 * @param password 密码
 * @returns CryptoJS.lib.WordArray 返回加密后的WordArray
 */
export function encryptStringToWordArray(text:string, password: string): CryptoJS.lib.WordArray {
    const encCp = CryptoJS.AES.encrypt(text, password);
    //将salt、iv、ciphertext拼接成WordArray
    return encCp.salt.concat(encCp.iv).concat(encCp.ciphertext);
}

/**
 * 解密WordArray密文，返回string
 * @param wa 被加密的WordArray
 * @param password 密码
 * @returns string 返回解密后的字符串
 */
export function decryptWordArrayToString(
    wa: CryptoJS.lib.WordArray,
    password: string,
): string {
    return CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({
            //切分
            salt: CryptoJS.lib.WordArray.create(wa.words.slice(0, 2), 8),
            iv: CryptoJS.lib.WordArray.create(wa.words.slice(2, 6), 16),
            ciphertext: CryptoJS.lib.WordArray.create(
                wa.words.slice(6),
                wa.sigBytes - 24,
            ),
        }),
        password,
    ).toString(CryptoJS.enc.Utf8);
}

/**
 * 将WordArray转换为Hex字符串
 * @param wa WordArray输入
 * @returns 返回string类型的Hex字符串
 */
export function cvWordArrayToHex(wa:CryptoJS.lib.WordArray):string{
    return wa.toString(CryptoJS.enc.Hex);
}

/**
 * 将Hex字符串转换为WordArray
 * @param hex Hex字符串输入
 * @returns 返回WordArray对象
 */
export function cvHexToWordArray(hex:string):CryptoJS.lib.WordArray{
    return CryptoJS.enc.Hex.parse(hex);
}