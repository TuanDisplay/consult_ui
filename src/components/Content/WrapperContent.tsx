import Button from "~/components/Button";
import LoadingAni from "~/components/Animation/LoadingAni";
import clsx from "clsx";
import type { ReactNode } from "react";

interface IWrapperContent {
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export default function WrapperContent({
  children,
  isLoading,
  error,
  refetch,
  className,
}: IWrapperContent) {
  return (
    <div
      className={clsx(
        "relative h-[95vh] w-full overflow-hidden overflow-y-auto py-2",
        className
      )}
    >
      {isLoading ? (
        <div className="absolute top-1/2 w-full translate-y-[-50%] text-center">
          <LoadingAni>
            <span className="ml-4 text-sm text-gray-500">
              Đang tải dữ liệu...
            </span>
          </LoadingAni>
        </div>
      ) : error ? (
        <div className="absolute top-1/2 flex w-full translate-y-[-50%] flex-col items-center text-center">
          <div>Có lỗi xảy ra: {(error as Error).message}</div>
          <Button className="px-3 py-2" primary onClick={refetch}>
            Tải lại
          </Button>
        </div>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
