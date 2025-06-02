import clsx from 'clsx';
import LoadingAni from '~/components/Animation/LoadingAni';

export default function LoadingScreen({ className }: { className?: string }) {
  return (
    <div
      className={clsx('relative flex h-screen items-center justify-center', className)}
    >
      <LoadingAni>
        <span className="ml-4 text-xl text-gray-500">Đang tải dữ liệu...</span>
      </LoadingAni>
    </div>
  );
}
