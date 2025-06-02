import { expertRequest } from "~/utils/axios";

export const expertProfile = async () => {
  const res = await expertRequest.get("/expert/my-profile");
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await expertRequest.post("/expert/login", {
    email: email,
    password: password,
  });
  return res.data;
};
