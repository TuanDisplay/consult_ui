import { Star } from 'lucide-react';

interface IComment {
  avatar: string,
  username: string,
  commentDay: string,
  content: string,
}

export default function Comment({avatar, username, commentDay, content}: IComment) {
  return (
    <div className="space-y-3 border-b-[1px] py-5 last:border-none">
      <div className="flex items-center gap-5">
        <img
          src={`/${avatar}`}
          alt="avatar"
          className="h-8 w-8 rounded-full bg-cover"
        />
        <span className="">{username}</span>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-1">
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} stroke="#ff6e00" />
        </div>
        <span className="text-sm">{commentDay}</span>
      </div>
      <p>{content}</p>
    </div>
  );
}
