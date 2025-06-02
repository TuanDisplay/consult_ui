import { customerRequest } from "~/utils/axios";

export const profile = async () => {
  const res = await customerRequest.get("/customer/my-profile");
  return res.data;
};

export const updateProfile = async (data: any) => {
  await customerRequest.put(`/customer/${data.id}`, {
    username: data.fname,
    image: data.avatar,
    introduce: data.bio,
  });
};
