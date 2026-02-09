'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield } from 'lucide-react';
import { ProfileSettings } from './ProfileSettings';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySettings } from './PrivacySettings';

export function SettingsContainer() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabbed Interface */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 h-12">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Privacy</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <ProfileSettings />
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <NotificationSettings />
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                    <PrivacySettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}
