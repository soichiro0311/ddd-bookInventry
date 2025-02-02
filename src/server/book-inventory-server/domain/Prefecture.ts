import { DomainError } from "../error/DomainError";

export const Prefecture = {
  TOKYO_CYUOU: { prefecture: "Tokyo", city: "Chuou" },
  TOKYO_SHIBUYA: { prefecture: "Tokyo", city: "Shibuya" },
  KANAGAWA_KAWASKI: {
    prefecture: "Kanagawa",
    city: "Kawasaki",
  },
} as const;

export type PrefectureType = (typeof Prefecture)[keyof typeof Prefecture];

export const prefectureBuilder = (prefecture: string, city: string) => {
  const targetPrefectureCity = Object.entries(Prefecture)
    .map(([key, value]) => ({ key, value }))
    .find(
      (entry) =>
        entry.value.prefecture === prefecture && entry.value.city === city
    );
  if (targetPrefectureCity == null) {
    throw new DomainError(
      `マスタ登録されていない県の書店を登録しています。 登録対象 県:${prefecture} 市:${city}`
    );
  }

  return targetPrefectureCity.value;
};
