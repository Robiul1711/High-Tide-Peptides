import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

type UseClientProps = {
  queryKey: string[];
  url: string;
  isPrivate?: boolean;
  params?: object;
  enabled?: boolean;
};

const useClient = ({
  queryKey,
  url,
  isPrivate = false,
  params = {},
  enabled = true,
}: UseClientProps) => {
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      const res = await client.get(url, { params });
      return res.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useClient;


// how to use it :

// const { data, isLoading } = useClient({
//   queryKey: ["home-banner"],
//   url: "/blogs",
//   isPrivate:true
// });