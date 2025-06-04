import { useState } from "react";
import clsx from "clsx";
import { Plus, UploadCloud, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "~/components/Button";
import { MajorCat } from "~/common/data";
import { convertToBase64 } from "~/utils/files";
import * as expertService from "~/services/expert.service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export interface FormValues {
  expert_name: string;
  expert_desc: string;
  achievements: { value: string }[];
  majors: { value: string }[];
  password: string;
  expert_avatar: string;
}

const EditProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const { expertId } = useParams();
  const navigite = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      expert_name: "",
      expert_desc: "",
      achievements: [{ value: "" }],
      majors: [{ value: "" }],
      password: "",
      expert_avatar: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const {
    fields: majorFields,
    append: majorAppend,
    remove: majorRemove,
  } = useFieldArray({
    control,
    name: "majors",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setValue("expert_avatar", base64);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await expertService.updateExpert(expertId ? expertId : "", data);
      queryClient.invalidateQueries({ queryKey: ["expert-profile"] });
      navigite("/");
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Expert Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Expert name:
              </label>
              <input
                type="text"
                {...register("expert_name")}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                {...register("expert_desc")}
                rows={3}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Achievements:
              </label>
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      {...register(`achievements.${index}.value`)}
                      className="mt-1 w-full border border-gray-300 rounded-md p-2 flex-1"
                      placeholder={"Achievement " + (index + 1)}
                    />
                    {fields.length > 0 && (
                      <X
                        size={16}
                        className={clsx(
                          "text-red-500 hover:text-red-400 cursor-pointer",
                          {
                            invisible: index === 0,
                          }
                        )}
                        onClick={() => remove(index)}
                      />
                    )}
                  </div>
                );
              })}
              <Button
                leftIcon={<Plus size={16} />}
                className="mt-1 text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => append({ value: "" })}
                disable={fields.length > 3}
              >
                Add Achievement
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industries:
              </label>
              {majorFields.map((major, index) => {
                return (
                  <div key={major.id} className="flex gap-2 items-center">
                    <select
                      {...register(`majors.${index}.value`)}
                      className={clsx(
                        "mt-1 w-full border border-gray-300 rounded-md p-2"
                      )}
                    >
                      {MajorCat.map((data) => {
                        return (
                          <option key={data.id} value={data.value}>
                            {data.name}
                          </option>
                        );
                      })}
                    </select>

                    {majorFields.length > 0 && (
                      <X
                        size={16}
                        className={clsx(
                          "text-red-500 hover:text-red-400 cursor-pointer",
                          {
                            invisible: index === 0,
                          }
                        )}
                        onClick={() => majorRemove(index)}
                      />
                    )}
                  </div>
                );
              })}

              <Button
                leftIcon={<Plus size={16} />}
                className="mt-1 text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => majorAppend({ value: "" })}
                disable={majorFields.length > 3}
              >
                Add Industry
              </Button>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="md:col-span-2">
              <div className="w-[250px] rounded-xl bg-white">
                <label className="block text-sm font-medium text-gray-700">
                  Avatar:
                </label>
                <div className="rounded-xl border-1 border-dashed p-2">
                  <label
                    htmlFor={"avatar"}
                    className="flex h-30 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl hover:bg-gray-50"
                  >
                    <input
                      id={"avatar"}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {image ? (
                      <img src={image} alt="preview" className="object-cover" />
                    ) : (
                      <>
                        <UploadCloud className="h-6 w-6 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Tải lên
                        </span>
                      </>
                    )}
                  </label>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Kích thước tối đa: 10 MB.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full py-2 font-bold"
              primary
              disable={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
