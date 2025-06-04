import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import type { IExpProfileApi, IUMesApi } from "~/common/types";
import MessageContent from "./MessageContent";
import * as messageService from "~/services/message.service";
import * as expertService from "~/services/expert.service";
import MessageModal from "./MessageModal";
import { WrapperContent } from "~/components/Content";

export default function Message() {
  const [selectedUser, setSelectedUser] = useState<IUMesApi>({
    uuid: "",
    avatar: "",
    name: "",
    email: "",
  });
  const [isMessageModal, setMessageModal] = useState<boolean>(false);

  const {
    data: dataList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["message"],
    queryFn: async (): Promise<IUMesApi[]> => {
      const res = await messageService.messages();
      return res.partners;
    },
  });

  const { data: expData } = useQuery({
    queryKey: ["expert-profile"],
    queryFn: async (): Promise<IExpProfileApi> => {
      const res = await expertService.expertProfile();
      return res;
    },
  });

  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setSelectedUser(dataList[0]);
    }
  }, [selectedUser, setSelectedUser, dataList]);

  return (
    <>
      {isMessageModal && (
        <MessageModal
          reveicer_id={selectedUser.uuid}
          receiver_name={selectedUser.name}
          setMessageModal={setMessageModal}
        />
      )}

      <WrapperContent isLoading={isLoading} error={error} refetch={refetch}>
        {dataList?.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Không có cuộc trò chuyện nào.
          </div>
        ) : (
          <div className="container mx-auto mt-5 mb-10">
            <div className="flex bg-gray-100">
              <div className="w-[300px] border-r bg-white p-2">
                {dataList?.map((msg) => (
                  <div
                    key={msg.uuid}
                    onClick={() => setSelectedUser(msg)}
                    className={`flex cursor-pointer items-start gap-3 rounded p-2 transition hover:bg-gray-200 ${
                      selectedUser.uuid === msg.uuid
                        ? "border-l-4 border-orange-500 bg-gray-100"
                        : ""
                    }`}
                  >
                    <img
                      src={
                        msg.avatar == "" || !msg.avatar
                          ? "/no-user.png"
                          : msg.avatar
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="truncate text-sm font-semibold">
                        {msg.name == "" ? "Không xác định" : msg.name}
                      </div>
                      <div
                        title={msg.email}
                        className="line-clamp-1 text-xs text-gray-500"
                      >
                        {msg.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 p-4">
                <div className="mb-4 flex items-center justify-end gap-2">
                  <Button
                    className="px-3 py-1.5 font-bold"
                    primary
                    onClick={() => setMessageModal(true)}
                  >
                    Phản hồi
                  </Button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      className="rounded border py-1.5 pr-4 pl-10 text-sm"
                    />
                    <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <MessageContent
                  reveicer_id={selectedUser.uuid}
                  reveicer_avatar={selectedUser.avatar}
                  reveicer_name={selectedUser.name}
                  reveicer_email={selectedUser.email}
                  senderData={expData}
                />
              </div>
            </div>
          </div>
        )}
      </WrapperContent>
    </>
  );
}
