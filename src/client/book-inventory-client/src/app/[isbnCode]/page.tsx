import { KeywordSearchProvider } from "../provider/keywordSearchProvider";
import BookDetailContents from "./ContentsArea";

export default async function BookDetail({
  params,
}: {
  params: Promise<{ isbnCode: string }>;
}) {
  const { isbnCode } = await params;

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <KeywordSearchProvider>
        <BookDetailContents isbnCode={isbnCode} />
      </KeywordSearchProvider>
    </div>
  );
}
