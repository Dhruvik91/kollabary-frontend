import { useQuery } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { User } from '@/constants/interface';

export function useGetMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await httpService.get<User>(API_CONFIG.path.userAuth.me);
            return response.data;
        },
        retry: false,
    });
}
