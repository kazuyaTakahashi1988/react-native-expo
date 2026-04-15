// 1. sonarjs/cognitive-complexity テスト (設定値: 10を超過)
export function complexCognitiveFunction(input: number): string {
  if (input > 0) {
    if (input > 10) {
      if (input > 20) {
        if (input > 30) {
          for (let i = 0; i < 5; i++) {
            if (i % 2 === 0) {
              while (i < 3) {
                if (i === 2) {
                  switch (i) {
                    case 0:
                      return 'zero';
                    case 2:
                      return 'two';
                    default:
                      return 'other';
                  }
                } else if (i === 1) {
                  return 'one';
                }
                i++;
              }
            }
          }
        }
      }
    }
  }
  return 'default';
}
// 2. sonarjs/no-small-switch テスト (小さすぎるswitch)
export function smallSwitchTest(value: number): string {
  switch (value) {
    case 1:
      return 'one';
    default:
      return 'other';
  }
}
// 3. total-functions/no-unsafe-type-assertion テスト (危険なasアサーション)
export function unsafeAssertionTest(): string {
  const unknownData: unknown = getApiResponse();
  const userData = unknownData as { name: string; age: number }; // エラー: 危険なasアサーション
  return userData.name;
}
function getApiResponse(): unknown {
  return { name: 'test', age: 25 };
}
// 4. complexity テスト (循環的複雑度5を超過)
export function cyclomaticComplexFunction(a: number, b: number): string {
  if (a > 0) {
    return 'a';
  } else if (b > 0) {
    return 'b';
  } else if (a < 0) {
    return 'negative a';
  } else if (b < 0) {
    return 'negative b';
  } else if (a === 0) {
    return 'zero a';
  } else if (b === 0) {
    return 'zero b';
  }
  return 'unknown';
}
// 5. max-depth テスト (ネストの深さ5を超過)
export function deeplyNestedFunction(): void {
  if (true) {
    if (true) {
      if (true) {
        if (true) {
          if (true) {
            if (true) {
              console.warn('too deep');
            }
          }
        }
      }
    }
  }
}
// 6. no-else-return テスト (不要なelse)
export function unnecessaryElseTest(condition: boolean): string {
  if (condition) {
    return 'true case';
  }
  return 'false case';
}
// @typescript-eslint/no-unsafe-member-access エラーが発生する例
const apiResponse: any = null;
console.log(apiResponse.data.items);
// TypeError: Cannot read property 'data' of null
/* 特定のモジュールやパスからのインポートを禁止するためのルール */
import { Image } from 'react-native';
console.log(Image);
