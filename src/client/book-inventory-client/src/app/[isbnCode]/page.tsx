export default function BookDetail({
  params,
}: {
  params: { isbnCode: string };
}) {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {params.isbnCode}
    </div>
  );
}
