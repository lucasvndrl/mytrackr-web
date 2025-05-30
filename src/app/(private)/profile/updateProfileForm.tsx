"use client";

import Modal from "@/components/Modals/Modal";
import { useUserData } from "@/hooks/userData";
import { accountSchema } from "@/schemas/accountSchema";
import { AccountTable } from "@/types/dbTables";
import { UpdateAccountDTO } from "@/useCases/Account/UpdateAccount/UpdateAccountDTO";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import { z } from "zod";

type AccountData = z.infer<typeof accountSchema>;

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
];

type UpdateProfileFormProps = {
  user: AccountTable;
};

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const { updateUserData } = useUserData();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        favorite_genres: user.favorite_genres ?? [],
        avatar: (user.avatar as unknown as string) ?? undefined,
      });

      if (user.avatar) {
        setAvatarPreview(`data:image/png;base64,${user.avatar}`);
      }
    }
  }, [user]);

  const onSubmit = async (data: AccountData) => {
    try {
      setLoading(true);
      const payload = {
        account: {
          ...data,
          user_id: user?.user_id,
        },
      } as unknown as UpdateAccountDTO;
      const token = await getAccessToken();
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao atualizar perfil");
      await updateUserData(token);
      toast.success("User updated successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Erro ao atualizar perfil");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64WithPrefix = reader.result as string;

        const base64Only = base64WithPrefix.split(",")[1];

        setAvatarPreview(base64WithPrefix);
        setValue("avatar", base64Only, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      toast.loading("Deleting account...", { id: "delete-account" });
      const token = await getAccessToken();
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Erro ao deletar conta");
      toast.remove("delete-account");
      toast.success("Account deleted successfully");
      setIsModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.remove("delete-account");
      toast.error("Erro ao deletar conta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <Modal
          isOpen={isModalOpen}
          message="Do you want to delete your account?"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar (Profile Picture)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {avatarPreview && (
              <div className="mt-2 w-20 h-20 relative rounded-full overflow-hidden">
                <Image
                  src={avatarPreview}
                  alt="Avatar Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {errors.avatar && (
              <p className="text-red-600 text-sm">{errors.avatar.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Favorite Genres
            </label>
            <Controller
              control={control}
              name="favorite_genres"
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isMulti
                  options={genres.map((g) => ({ label: g, value: g }))}
                  value={field.value?.map((val: string) => ({
                    label: val,
                    value: val,
                  }))}
                  onChange={(val) => field.onChange(val.map((v) => v.value))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />

            {errors.favorite_genres && (
              <p className="text-red-600 text-sm">
                {errors.favorite_genres.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading || !isDirty}
              className={`w-full p-2 text-white rounded-md transition
      ${
        loading || !isDirty
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
    `}
            >
              {loading ? "Loading..." : "Save changes"}
            </button>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
