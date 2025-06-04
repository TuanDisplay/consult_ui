import { WrapperContent } from "~/components/Content";
import * as messageService from "~/services/message.service";
import type { IUMesDeApi } from "~/common/types";
import { useQuery } from "@tanstack/react-query";
import type { IExpProfileApi } from "~/common/types";
import MessageItem from "./MessageItem";

interface IMessageContent {
  reveicer_id: string;
  reveicer_avatar: string;
  reveicer_name: string;
  reveicer_email: string;
  senderData: IExpProfileApi | undefined;
}

export default function MessageContent({
  reveicer_id,
  reveicer_avatar,
  reveicer_email,
  reveicer_name,
  senderData,
}: IMessageContent) {
  const {
    data: dataDe,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messageDe", reveicer_id],
    queryFn: async (): Promise<IUMesDeApi[]> => {
      const res = await messageService.oldMessage(reveicer_id);
      return res.messages;
    },
  });

  return (
    <WrapperContent error={error} refetch={refetch} isLoading={isLoading}>
      {dataDe?.length === 0 ? (
        <div className="text-center">Không có tin nhắn</div>
      ) : (
        dataDe?.map((item, index) => {
          return (
            <div key={index}>
              {item.sender_uuid === reveicer_id ? (
                senderData && (
                  <MessageItem
                    avatar={senderData.image}
                    email={senderData.email}
                    name={senderData.expertname}
                    title={item.title}
                    content={item.content}
                    time={item.created_at}
                  />
                )
              ) : (
                <MessageItem
                  avatar={reveicer_avatar}
                  email={reveicer_email}
                  name={reveicer_name}
                  title={item.title}
                  content={item.content}
                  time={item.created_at}
                />
              )}
            </div>
          );
        })
      )}
    </WrapperContent>
  );
}
