import { useUser } from "@/context/user-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { KTP } from "../services/ktp";

export const useKTP = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();
  return useMutation({
    mutationFn: async (data: any) => KTP(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      setUser({
        ...user,
        ktp_data: res.data,
      });
      router.push("/(e-kyc)/confirm-ktp");
      return res;
    },
    onError: (error: Error) => {
      console.error("KTP extraction failed:", error.message);
    },
  });
};
