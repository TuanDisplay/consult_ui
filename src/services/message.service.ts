
import {messageRequest} from '~/utils/axios';

export const messages = async () => {
  const res = await messageRequest.get('/messages');
  return res.data;
};

export const sendMessage = async (
  id: string,
  receiver_name: string,
  receiver_avatar: string,
  data: TMessageSchema,
) => {
  await messageRequest.post('/messages', {
    receiver_uuid: id,
    receiver_name: receiver_name,
    receiver_image: receiver_avatar,
    title: data.title,
    content: data.content,
  });
};

export const oldMessage = async (id: string) => {
  const res = await messageRequest.get(`/messages/${id}`);
  return res.data;
};
