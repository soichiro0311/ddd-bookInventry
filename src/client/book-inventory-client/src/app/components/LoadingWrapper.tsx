import type { ReactNode } from "react";

export function LoadingWrapper({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  if (isLoading) {
    return <LoadingIcon />;
  }

  return <>{children}</>;
}

function LoadingIcon() {
  return (
    <div className="flex justify-center my-20">
      <div
        className="w-10 h-10 rounded-full border-4 border-blue-500 animate-spin"
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
}
