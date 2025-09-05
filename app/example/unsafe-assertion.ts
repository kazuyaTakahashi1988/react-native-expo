/* eslint-disable @typescript-eslint/no-explicit-any */

const value: any = "hello";

// ❌ unsafe type assertion
const length = (value as number).toFixed(2);

console.info(length);
