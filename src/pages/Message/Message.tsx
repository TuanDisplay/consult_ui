import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import type { IUMesApi } from "~/common/types";
import MessageContent from "./MessageContent";
import * as messageService from "~/services/message.service";
import MessageModal from "./MessageModal";

export default function Message() {
  const [selectedUser, setSelectedUser] = useState<IUMesApi>({
    uuid: "",
    avatar: "",
    name: "",
    title: "",
  });
  const [isMessageModal, setMessageModal] = useState<boolean>(false);

  const { data: dataList } = useQuery({
    queryKey: ["message"],
    queryFn: async (): Promise<IUMesApi[]> => {
      const res = await messageService.messages();
      return res.partners;
    },
  });

  useEffect(() => {
    if (selectedUser.uuid == "" && dataList) {
      setSelectedUser(dataList[0]);
    }
  }, [selectedUser, setSelectedUser, dataList]);

  return (
    <>
      {isMessageModal && (
        <MessageModal
          id={selectedUser.uuid}
          receiver_avatar={selectedUser.avatar}
          receiver_name={selectedUser.name}
          setMessageModal={setMessageModal}
        />
      )}

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
                    title={msg.title}
                    className="line-clamp-1 text-xs text-gray-500"
                  >
                    {msg.title}
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
            <MessageContent uuid_reveicer={selectedUser.uuid} />
          </div>
        </div>
      </div>
    </>
  );
}
