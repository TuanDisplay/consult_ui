import Comment from "~/components/Comment";
import { CommentCard, ExpertCard } from "~/common/data";
import { convertCategoryName } from "~/utils/files";
// import LoadingScreen from '~/layouts/components/LoadingScreen';

export default function Home() {

  const data = ExpertCard[0];

  return (
    <>
      <div className="mx-auto my-10 max-w-6xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 flex flex-col items-center">
            <img
              src={data?.imageUrl}
              alt="avatar"
              className="h-60 w-48 rounded-xl object-cover shadow-md"
            />
            <div className="mt-4 text-gray-500">
              <p>{data?.rate}/5.0 ⭐ </p>
              <p>{data?.consultCount} lượt tư vấn</p>
              <p>{data?.views} lượt xem</p>
            </div>
          </div>

          <div className="col-span-2 space-y-5">
            <div className="flex items-start justify-between">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <h2 className="text-primary text-lg font-semibold">
                    Họ và tên
                  </h2>
                  <p className="mt-1 text-gray-600">{data?.author}</p>
                </div>
                <div>
                  <h2 className="text-primary text-lg font-semibold">Email</h2>
                  <p className="mt-1 text-gray-600">{data?.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-primary text-lg font-semibold">
                Giới thiệu bản thân
              </h3>
              <p className="mt-1 text-gray-700">{data?.desc}</p>
            </div>

            <div>
              <h3 className="text-primary text-lg font-semibold">Thành tựu</h3>
              <ul className="mt-1 ml-5 list-disc space-y-1 text-gray-700">
                {data?.achievements?.map((achie, index) => {
                  return <li key={index}>{achie}</li>;
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-primary text-lg font-semibold">
                Lĩnh vực tư vấn
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.majors?.map((field, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-gray-800"
                  >
                    {convertCategoryName(field)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8 mt-10">
          <div className="text-xl font-bold">Đánh giá và bình luận</div>
          <div className="mt-5">
            {CommentCard.map((item) => {
              return (
                <Comment
                  key={item.id}
                  avatar={item.imageUrl}
                  username={item.author}
                  commentDay={item.publishDate}
                  content={item.desc}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
