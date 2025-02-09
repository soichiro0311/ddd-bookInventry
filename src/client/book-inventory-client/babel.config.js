module.exports = {
  presets: ["next/babel"], // Next.jsのプリセット
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"], // プロジェクトのルートディレクトリ
        alias: {
          "@": "./src", // 例: @を/srcにマップする
        },
      },
    ],
  ],
};
