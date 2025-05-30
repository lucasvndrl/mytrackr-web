"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountSchema, createAccountSchema } from "@/schemas/accountSchema";
import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import toast from "react-hot-toast";
import { CreateAccountDTO } from "@/useCases/Account/CreateAccount/CreateAccountDTO";
import ReactSelect from "react-select";
import { useRouter } from "next/navigation";

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

const RegisterForm: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = async (data: AccountData) => {
    try {
      setLoading(true);
      const payload = {
        account: {
          ...data,
          user_id: user?.sub,
          email: user?.email,
        },
      };
      const token = await getAccessToken();
      const res = await fetch("/api/account/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(res);
      if (!res.ok) throw new Error("Failed to create profile");
      toast.success("Profile successfully created");
      setLoading(false);
      router.push("/credentialscheck");
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.error(error);
      toast.error("Error creating profile");
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            )}
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-600">
                {errors.avatar.message}
              </p>
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
              disabled={loading}
              className={`w-full p-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      ${
        loading
          ? "bg-indigo-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
    `}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
