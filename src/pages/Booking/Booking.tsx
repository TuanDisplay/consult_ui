import { useState } from "react";

interface Appointment {
  id: number;
  name: string;
  email: string;
  time: string;
  status: "pending" | "approved" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    time: "2025-06-03 10:00",
    status: "pending",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    time: "2025-06-04 14:30",
    status: "approved",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "c@example.com",
    time: "2025-06-05 09:00",
    status: "pending",
  },
];

export default function Booking() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);

  const updateStatus = (id: number, status: "approved" | "cancelled") => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Quản lý lịch hẹn
        </h1>
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-700 font-semibold">
                  {appt.name}
                </p>
                <p className="text-sm text-gray-500">{appt.email}</p>
                <p className="text-sm text-gray-600">Thời gian: {appt.time}</p>
                <p
                  className={`text-sm font-medium ${
                    appt.status === "approved"
                      ? "text-green-600"
                      : appt.status === "cancelled"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  Trạng thái: {appt.status}
                </p>
              </div>
              {appt.status === "pending" && (
                <div className="mt-3 md:mt-0 flex gap-2">
                  <button
                    onClick={() => updateStatus(appt.id, "approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => updateStatus(appt.id, "cancelled")}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
