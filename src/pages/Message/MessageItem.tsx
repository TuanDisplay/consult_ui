import { convertIsoDateTime, convertStringToHtml } from '~/utils/files';

interface MessageItemProps {
  avatar: string;
  name: string;
  email: string;
  title: string;
  content: string;
  time: string;
}

export default function MessageItem({
  avatar,
  name,
  title,
  email,
  content,
  time,
}: MessageItemProps) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <img
            src={avatar ? avatar : '/no-user.png'}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-sm font-medium">{email}</div>
          </div>
          <div className="ml-auto text-xs text-gray-400">
            {convertIsoDateTime(time)}
          </div>
        </div>
        <h3 className="my-1 text-sm font-semibold">Tiêu đề: {title}</h3>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={convertStringToHtml(content)}
        ></p>
      </div>
    </div>
  );
}
