'use client';

import React from 'react';
import { UserProfile } from '@/services/profile.service';

// Import Modular Components
import { PublicProfileHero } from './public/PublicProfileHero';
import { PublicProfileSidebar } from './public/PublicProfileSidebar';
import { PublicProfileContent } from './public/PublicProfileContent';

interface PublicProfileDetailProps {
    profile: UserProfile;
}

export const PublicProfileDetail = ({ profile }: PublicProfileDetailProps) => {
    const {
        fullName = 'Brand',
        username = 'brand',
        bio,
        location,
        socialLinks,
        avatarUrl,
        stats = { totalAuctions: 0, completedCollaborations: 0 },
        collaborators = []
    } = (profile as any);

    return (
        <div className="space-y-8 sm:space-y-12 pb-20">
            {/* Modular Hero Section */}
            <PublicProfileHero
                profileId={profile.id}
                fullName={fullName}
                username={username}
                avatarUrl={avatarUrl}
                location={location}
            />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Modular Sidebar: Stats & Links */}
                <PublicProfileSidebar
                    socialLinks={socialLinks}
                    auctionsCount={stats.totalAuctions}
                    collaborationsCount={stats.completedCollaborations}
                />

                {/* Modular Main Content: About and Collaborators */}
                <PublicProfileContent
                    bio={bio}
                    collaborators={collaborators}
                />
            </div>
        </div>
    );
};
