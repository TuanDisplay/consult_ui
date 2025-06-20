import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Button";
import LoadingScreen from "~/layouts/components/LoadingScreen";
import { BookingModal } from "~/pages/Home/HomeItems";
import * as bookingService from "~/services/booking.service";
import { convertIsoDate, convertIsoHour } from "~/utils/files";

interface IBooking {
  Uuid: string;
  AvailableTimeUuid: string;
  ExpertUuid: string;
  CustomerUuid: string;
  CustomerName: string;
  CustomerEmail: string;
  BookingTime: string;
  CreatedAt: string;
  Status: string;
}

export default function Booking() {
  const [bookingModal, setBookingModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bookingList"],
    queryFn: async (): Promise<IBooking[]> => {
      const res = await bookingService.bookingList();
      return res.data;
    },
  });

  const handleDelBooking = async (booking_id: string) => {
    try {
      await bookingService.delBooking(booking_id);
      queryClient.invalidateQueries({ queryKey: ["bookingList"] });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || "Có lỗi xảy ra");
    }
  };

  return (
    <>
      {bookingModal && <BookingModal setBookingModal={setBookingModal} />}
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Quản lý lịch hẹn
          </h1>
          <div className="flex justify-end mb-2">
            <Button
              className="p-2 font-semibold pr-3 text-sm"
              leftIcon={<Plus size={16} />}
              primary
              onClick={() => setBookingModal(true)}
            >
              Thêm lịch hẹn
            </Button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <LoadingScreen className="!h-[40vh]" />
            ) : data === null || data?.length === 0 ? (
              <div>Chưa có lịch hẹn từ người dùng</div>
            ) : (
              data?.map((appt) => (
                <div
                  key={appt.Uuid}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 hover:shadow-md transition"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-gray-700 font-semibold">
                      {appt.CustomerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appt.CustomerEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      Thời gian: {convertIsoHour(appt.BookingTime)}{" "}
                      {convertIsoDate(appt.BookingTime)}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        appt.Status === "confirmed"
                          ? "text-green-600"
                          : appt.Status === "cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      Trạng thái: {appt.Status}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0 flex gap-2">
                    <button
                      className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      onClick={() => handleDelBooking(appt.AvailableTimeUuid)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
