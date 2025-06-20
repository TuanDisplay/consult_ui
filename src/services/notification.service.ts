import { notificationRequest } from '~/utils/axios';

export const notification = async () => {
  const res = await notificationRequest.get('/notification');
  return res.data;
};
