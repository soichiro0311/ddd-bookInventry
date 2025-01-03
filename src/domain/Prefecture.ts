export const Prefecture = {
  TOKYO_CYUOU: { prefecture: "Tokyo", city: "Chuou" },
  TOKYO_SHIBUYA: { prefecture: "Tokyo", city: "Shibuya" },
  KANAGAWA_KAWASKI: {
    prefecture: "Kanagawa",
    city: "Kawasaki",
  },
} as const;

export type PrefectureType =
  (typeof Prefecture)[keyof typeof Prefecture];
