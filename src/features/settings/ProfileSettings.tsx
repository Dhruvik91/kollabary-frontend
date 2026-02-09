'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateProfile } from '@/hooks/useProfile';
import { PasswordChangeForm } from './PasswordChangeForm';

export function ProfileSettings() {
    const { user } = useAuth();
    const updateProfile = useUpdateProfile();
    const [name, setName] = useState(user?.name || '');

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error('Name cannot be empty');
            return;
        }

        try {
            await updateProfile.mutateAsync({ name });
        } catch (error) {
            // Error handled by hook
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Information */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your personal information and profile picture
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-2 border-primary/20">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                            />
                            <AvatarFallback className="bg-primary/10">
                                <User className="h-12 w-12 text-primary" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" className="gap-2" disabled>
                                <Camera className="h-4 w-4" />
                                Change Photo
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                JPG, PNG or GIF. Max size 2MB.
                            </p>
                            <p className="text-xs text-muted-foreground italic">
                                (Coming soon)
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="max-w-md"
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={user?.email || ''}
                            disabled
                            className="bg-muted max-w-md"
                        />
                        <p className="text-xs text-muted-foreground">
                            Email cannot be changed
                        </p>
                    </div>

                    {/* Role (Read-only) */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Account Type</Label>
                        <Input
                            id="role"
                            value={user?.role || ''}
                            disabled
                            className="bg-muted max-w-md capitalize"
                        />
                    </div>

                    <Button
                        onClick={handleSave}
                        disabled={updateProfile.isPending || name === user?.name}
                        className="gap-2"
                    >
                        {updateProfile.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordChangeForm />
                </CardContent>
            </Card>
        </div>
    );
}
