/**
 * valueをNumber()で変換する
 * 
 * - valueがfalseと判定される場合はdefaultValueを返す
 * - Number(value)がNaNと判定される場合はdefaultValueを返す
 */
export const toNumber = (value: any, defaultValue?: number): number | undefined => {
    if (!value) return defaultValue;
    
    const num = Number(value);
    return !isNaN(num) ? num : defaultValue;
}