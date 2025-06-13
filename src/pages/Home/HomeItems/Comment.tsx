import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { IExpReviewItem, IExpReviewPage } from "~/common/types";
import PaginationBar from "~/components/PaginationBar";
import LoadingScreen from "~/layouts/components/LoadingScreen";
import * as ratingService from "~/services/rating.service";
import { convertIsoDate } from "~/utils/files";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "#ff6e00" : "none"}
          stroke={index < rating ? "none" : "#ff6e00"}
        />
      ))}
    </div>
  );
};

export default function Comment({ expert_id }: { expert_id: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["expReview", expert_id],
    queryFn: async (): Promise<IExpReviewPage> => {
      const res = await ratingService.expReview(expert_id);
      return res;
    },
  });

  const reviewData: IExpReviewItem[] = useMemo(() => {
    return data?.items ? data.items : [];
  }, [data]);

  return (
    <div className="mx-8 mt-10">
      <div className="text-xl font-bold">Đánh giá và bình luận</div>
      <div className="mt-5">
        {isLoading ? (
          <LoadingScreen className="!h-[40vh]" />
        ) : (
          <>
            {reviewData.length === 0 || reviewData === null ? (
              <div className="">Không có bình luận nào</div>
            ) : (
              reviewData.map((item) => {
                return (
                  <div
                    key={item.uuid}
                    className="space-y-3 border-b-[1px] py-5 last:border-none"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={
                          item.customerAvartar
                            ? item.customerAvartar
                            : "no-user.png"
                        }
                        alt="avatar"
                        className="h-8 w-8 rounded-full bg-cover"
                      />
                      <span className="">{item.customer_name}</span>
                    </div>
                    <div className="flex gap-5 items-center">
                      <RatingStars rating={item.rating} />
                      <span className="text-sm mt-0.5">
                        {convertIsoDate(item.created_at)}
                      </span>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
      {reviewData.length > 0 && (
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={data?.limit ? data?.limit : 0}
          totalItems={data?.total ? data.total : 0}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
