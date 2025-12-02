import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosRequestConfig } from "axios";

import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

type Method = "post" | "put" | "delete" | "patch";

type Payload<T> = {
  data?: T;
  config?: AxiosRequestConfig;
};

const useMutationClient = <T = any, V = any>({
  url,
  method = "post",
  isPrivate = false,
  invalidateKeys = [],
  successMessage = "Success",
  errorMessage,
  onSuccess,
  onError,
}: {
  url: string;
  method?: Method;
  isPrivate?: boolean;
  invalidateKeys?: string[][];
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();

  return useMutation<T, any, Payload<V>>({
    mutationFn: async ({ data, config }) =>
      method === "delete"
        ? (await client.delete(url, config)).data
        : (await client[method](url, data, config)).data,

    onSuccess: (data) => {
      toast.success((data as any)?.message || successMessage);

      // ✅ Wrap key array in { queryKey: key }
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      onSuccess?.(data);
    },

    onError: (error: any) => {
      toast.error(errorMessage || error?.response?.data?.message || "Error");
      onError?.(error);
    },
  });
};

export default useMutationClient;
{
  /* const deleteUser = useMutationClient({
  url: `/users/${id}`,
  method: "delete",
  isPrivate: true,
  invalidateKeys: [["users"]], // array of query keys
  successMessage: "User deleted!",
});

deleteUser.mutate({}); */
}
