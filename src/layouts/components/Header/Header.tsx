import { useQuery } from "@tanstack/react-query";
import { BellRing, CalendarCog, LogOut, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Menu as Wrapper, MenuButton } from "@headlessui/react";

import type { IExpProfileApi } from "~/common/types";
import * as expertService from "~/services/expert.service";
import NotiMenu from "~/components/Menu";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await expertService.logout();
      localStorage.removeItem("consultToken");
      navigate("/consult-login");
      toast.success("Đã đăng xuất");
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["expert-profile"],
    queryFn: async (): Promise<IExpProfileApi> => {
      const res = await expertService.expertProfile();
      return res;
    },
  });

  return (
    <>
      <div className="h-[60px] shadow-2xl flex items-center justify-between px-10">
        <Link to="/">
          <img src="/logo_rm.png" alt="logo" className="h-10" />
        </Link>
        <div className="flex gap-10">
          <div className="flex gap-3">
            <Link
              to={"/booking-consult"}
              title="Quản lý lịch hẹn"
              className="bg-[#D5E5F3] p-2.5 cursor-pointer rounded-lg group"
            >
              <CalendarCog className="text-[#2D9CDB] group-hover:text-blue-300 duration-300" />
            </Link>
            <Link
              to={"/message-consult"}
              title="Tin nhắn"
              className="bg-[#D5E5F3] p-2.5 cursor-pointer rounded-lg group"
            >
              <Mail className="text-[#2D9CDB] group-hover:text-blue-300 duration-300" />
            </Link>

            <Wrapper>
              <MenuButton
                className="bg-[#D5E5F3] p-2.5 cursor-pointer rounded-lg group outline-0"
                title="Thông báo"
              >
                <BellRing className="text-[#2D9CDB] group-hover:text-blue-300 duration-300" />
              </MenuButton>
              <NotiMenu />
            </Wrapper>

            <div
              title="Log out"
              className="bg-[#F5DCE0] p-2.5 cursor-pointer rounded-lg group"
              onClick={handleLogout}
            >
              <LogOut className="text-[#FF5B5B] group-hover:text-red-300 duration-300" />
            </div>
          </div>
          <div className="w-[1px] my-2 bg-black"></div>
          <div className="flex gap-2 items-center">
            <div>
              <span>Xin chào, </span>
              <span className="font-bold">
                {" "}
                {isLoading ? "Vô danh" : data?.expertname}
              </span>
            </div>
            <div className="rounded-full h-10 w-10 overflow-hidden">
              <img
                src={isLoading ? "/no-user.png" : data?.image}
                alt="avatar"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
