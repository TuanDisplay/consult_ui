import { messageRequest } from "~/utils/axios";

export const messages = async () => {
  const res = await messageRequest.get("/messages");
  return res.data;
};

export const sendMessage = async (id: string, data: any) => {
  await messageRequest.post("/messages", {
    receiver_uuid: id,
    title: data.title,
    content: data.content,
  });
};

export const oldMessage = async (id: string) => {
  const res = await messageRequest.get(`/messages/${id}`);
  return res.data;
};
