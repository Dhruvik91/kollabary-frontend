import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { useCreateProfile } from "./useProfile";

export const useBrandOnboarding = () => {
    const router = useRouter();
    const { refreshUser } = useAuth();

    return useCreateProfile({
        onSuccess: async () => {
            await refreshUser();
            router.replace(FRONTEND_ROUTES.DASHBOARD.BRAND);
        },
        onError: (error: any) => {
            console.error("Failed to create profile (brand):", error);
        }
    });
};
