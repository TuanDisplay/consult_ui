import { messageRequest } from "~/utils/axios";

export const messages = async () => {
  const res = await messageRequest.get("/messages");
  return res.data;
};

export const sendMessage = async (
  id: string,
  data: { title: string; content: string }
) => {
  await messageRequest.post("/messages", {
    receiver_uuid: id,
    title: data.title,
    content: data.content,
    receiver_type: "customer",
  });
};

export const oldMessage = async (id: string) => {
  const res = await messageRequest.get(`/messages/${id}`);
  return res.data;
};
