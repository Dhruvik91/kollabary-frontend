'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Download, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export function PrivacySettings() {
    const [profileVisible, setProfileVisible] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('privacy_profileVisible');
        if (saved !== null) {
            setProfileVisible(JSON.parse(saved));
        }
    }, []);

    const handleVisibilityToggle = (checked: boolean) => {
        setProfileVisible(checked);
        localStorage.setItem('privacy_profileVisible', JSON.stringify(checked));
        toast.success(`Profile is now ${checked ? 'public' : 'private'}`);
    };

    const handleExportData = () => {
        toast.info('Data export feature coming soon');
    };

    const handleDeleteAccount = () => {
        toast.error('Account deletion not yet implemented');
    };

    return (
        <div className="space-y-6">
            {/* Profile Visibility */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        {profileVisible ? (
                            <Eye className="h-5 w-5 text-primary" />
                        ) : (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                        )}
                        <CardTitle>Profile Visibility</CardTitle>
                    </div>
                    <CardDescription>
                        Control who can see your profile
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="profile-visible" className="text-base">
                                Public Profile
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Make your profile visible to everyone on the platform
                            </p>
                        </div>
                        <Switch
                            id="profile-visible"
                            checked={profileVisible}
                            onCheckedChange={handleVisibilityToggle}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>
                        Export or manage your account data
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-base">Export Your Data</Label>
                        <p className="text-sm text-muted-foreground">
                            Download a copy of your account data including profile information,
                            messages, and collaboration history
                        </p>
                        <Button
                            variant="outline"
                            onClick={handleExportData}
                            className="gap-2 mt-2"
                        >
                            <Download className="h-4 w-4" />
                            Export Data
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    </div>
                    <CardDescription>
                        Irreversible and destructive actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label className="text-base">Delete Account</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                            Permanently delete your account and all associated data. This action
                            cannot be undone and you will lose access to all your collaborations,
                            messages, and profile information.
                        </p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-destructive" />
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="space-y-2">
                                        <p>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove all your data from our servers.
                                        </p>
                                        <p className="font-semibold text-foreground">
                                            You will lose:
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>Your profile and all personal information</li>
                                            <li>All messages and conversations</li>
                                            <li>All collaboration history</li>
                                            <li>All reviews and ratings</li>
                                        </ul>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteAccount}
                                        className="bg-destructive hover:bg-destructive/90"
                                    >
                                        Yes, delete my account
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
