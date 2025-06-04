import type { FormValues } from "~/pages/EditProfile/EditProfile";
import { expertRequest } from "~/utils/axios";

export const login = async (email: string, password: string) => {
  const res = await expertRequest.post("/expert/login", {
    email: email,
    password: password,
  });
  return res.data;
};

export const logout = async () => {
  const res = await expertRequest.post("/expert/logout");
  return res.data;
};

export const expertProfile = async () => {
  const res = await expertRequest.get("/expert/my-profile");
  return res.data;
};

export const updateExpert = async (uuid_expert: string, data: FormValues) => {
  await expertRequest.put(`/expert/update/${uuid_expert}`, {
    expertname: data.expert_name,
    image: data.expert_avatar,
    introduce: data.expert_desc,
    achivement: data.achievements.map((item) => item.value),
    industry: data.majors.map((item) => item.value),
    password: data.password,
  });
};
