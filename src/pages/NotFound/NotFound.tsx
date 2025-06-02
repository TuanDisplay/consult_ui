import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <img
        src="logo_rm.png"
        alt="Not found illustration"
        className="absolute top-0 left-0 mt-4 ml-5 w-30"
      />
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oops! Trang bạn tìm không tồn tại.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
