import { ROLES } from "../constants/constants";

export interface SignupDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface CreateInfluencerDto extends SignupDto { }

export interface AuthResponse {
    access_token?: string;
    user: {
        id: string;
        email: string;
        role: ROLES;
        status: string;
        name?: string;
        profile?: any;
        createdAt: string;
        updatedAt: string;
    };
}
