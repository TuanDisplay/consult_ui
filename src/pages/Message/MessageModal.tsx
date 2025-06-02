import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill-new";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import * as messageService from "~/services/message.service";

import "react-quill-new/dist/quill.snow.css";

interface IMessageModal {
  id: string;
  receiver_avatar: string;
  receiver_name: string;
  setMessageModal: any;
}

interface IMessageForm {
  title: string;
  content: string;
}

export default function MessageModal({
  id,
  receiver_name,
  receiver_avatar,
  setMessageModal,
}: IMessageModal) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IMessageForm>({
    mode: "onChange",
  });

  const title = watch("title");
  const content = watch("content");

  const isMessageDisable = title && content && !errors.title && !errors.content;

  const onSubmit = async (data: IMessageForm) => {
    try {
      await messageService.sendMessage(
        id,
        receiver_name,
        receiver_avatar,
        data
      );
      reset();
      toast.success("Gửi tin nhắn thành công");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || "Có lỗi xảy ra");
    }
  };

  return (
    <Modal
      className="w-full max-w-lg rounded-xl bg-white shadow-2xl transition-all"
      setMessageModal={setMessageModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-6 pt-6 pb-2"
      >
        <h3 className="mb-2 text-base font-semibold text-gray-700">
          Tới:
          <span className="font-bold text-black">
            {receiver_name || "Vô danh"}
          </span>
        </h3>

        <input
          type="text"
          {...register("title")}
          placeholder="Nhập tiêu đề..."
          className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              className="h-[200px] pb-10"
              placeholder="Nhập nội dung tin nhắn..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            disable={isSubmitting || !isMessageDisable}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </Button>
        </div>

        <p className="mt-2 text-right text-xs text-gray-400">
          {new Date().toLocaleString("vi-VN", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </form>
    </Modal>
  );
}
