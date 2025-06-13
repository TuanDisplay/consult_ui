import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "~/components/Button";
import Modal from "~/components/Modal";
import * as bookingService from "~/services/booking.service";

interface BookingModalProps {
  setBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValue {
  date: string;
  startTime: string;
  endTime: string;
}

export default function BookingModal({ setBookingModal }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValue>();

  const onSubmit = async (data: FormValue) => {
    try {
      await bookingService.addBooking(data.date, data.startTime, data.endTime);
      setBookingModal(false);
      toast.success("Thêm lịch hẹn thành công");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error);

      toast.error(error.response?.data.message || "Có lỗi xảy ra");
    }
  };

  return (
    <Modal
      className="min-h-[100px] max-w-sm bg-white"
      setMessageModal={setBookingModal}
    >
      <div className="max-w-md space-y-4 px-8 py-6">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Thêm lịch hẹn
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="bookingDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Chọn ngày hẹn
            </label>
            <input
              type="date"
              {...register("date")}
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Thời gian bắt đầu
            </label>
            <input
              id="startTime"
              {...register("startTime")}
              type="time"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="endTime"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Thời gian kết thúc
            </label>
            <input
              id="endTime"
              {...register("endTime")}
              type="time"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <Button
            className="w-full py-2 font-semibold"
            primary
            disable={isSubmitting}
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </Modal>
  );
}
