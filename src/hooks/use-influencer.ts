import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateInfluencerPayload } from "@/types/influencer";

export function useCreateInfluencerProfile<TData = any, TError = any>(
    mutationFn: (data: CreateInfluencerPayload) => Promise<TData>,
    options?: Omit<UseMutationOptions<TData, TError, CreateInfluencerPayload>, "mutationFn">
) {
    return useMutation({
        mutationFn,
        ...options
    });
}
