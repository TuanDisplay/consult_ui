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
