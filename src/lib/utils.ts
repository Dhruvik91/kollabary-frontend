import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitch,
  MessageCircle,
  Send,
  Globe,
  Mic,
  PenSquare,
  Users,
  Video,
  Clapperboard,
  Gamepad2,
  Mail,
  Hash,
  type LucideIcon,
} from 'lucide-react';

type SocialPlatform =
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'facebook'
  | 'twitter_x'
  | 'linkedin'
  | 'threads'
  | 'pinterest'
  | 'snapchat'
  | 'twitch'
  | 'discord'
  | 'reddit'
  | 'telegram'
  | 'whatsapp_channels'
  | 'medium'
  | 'substack'
  | 'quora'
  | 'spotify_podcast'
  | 'apple_podcast'
  | 'podcast'
  | 'blog_website'
  | 'ugc_content'
  | 'email_newsletter'
  | 'community_promotion'
  | 'live_streaming'
  | 'gaming_content'
  | 'short_form_video'
  | 'long_form_video'
  | 'other';

const SOCIAL_PLATFORM_ICONS: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Video,
  facebook: Facebook,
  twitter_x: Hash,
  linkedin: Linkedin,
  threads: MessageCircle,
  pinterest: PenSquare,
  snapchat: MessageCircle,
  twitch: Twitch,
  discord: Users,
  reddit: MessageCircle,
  telegram: Send,
  whatsapp_channels: MessageCircle,
  medium: PenSquare,
  substack: Mail,
  quora: MessageCircle,
  spotify_podcast: Mic,
  apple_podcast: Mic,
  podcast: Mic,
  blog_website: Globe,
  ugc_content: Clapperboard,
  email_newsletter: Mail,
  community_promotion: Users,
  live_streaming: Video,
  gaming_content: Gamepad2,
  short_form_video: Video,
  long_form_video: Clapperboard,
  other: Globe,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSocialPlatformIcon = (
  platform: SocialPlatform,
): LucideIcon => {
  return SOCIAL_PLATFORM_ICONS[platform] || Globe;
};