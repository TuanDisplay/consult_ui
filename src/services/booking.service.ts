import { bookingRequest } from "~/utils/axios";

export const addBooking = async (
  date: string,
  startTime: string,
  endTime: string
) => {
  await bookingRequest.post("/expert/create_available", {
    date: date,
    start_time: startTime,
    end_time: endTime,
  });
};

export const bookingList = async () => {
  const res = await bookingRequest.get("/expert/booking-list");
  return res.data;
};

export const delBooking = async (booking_id: string) => {
  await bookingRequest.delete(`/expert/cancel/${booking_id}`);
};
