import { useRouter } from "next/navigation";
import httpService from "@/lib/http-service";
import { API_CONFIG, FRONTEND_ROUTES } from "@/constants/constants";
import { useAuth } from "@/providers/auth-provider";
import { useCreateInfluencerProfile } from "./use-influencer";
import { CreateInfluencerPayload } from "@/types/influencer";

export const useInfluencerOnboarding = () => {
    const router = useRouter();
    const { refreshUser } = useAuth();

    return useCreateInfluencerProfile(
        async (data: CreateInfluencerPayload) => {
            return await httpService.post(API_CONFIG.path.influencer.profile, data);
        },
        {
            onSuccess: async () => {
                await refreshUser();
                router.replace(FRONTEND_ROUTES.DASHBOARD.INFLUENCER);
            },
            onError: (error: any) => {
                console.error("Failed to create profile (influencer):", error);
            }
        }
    );
};
