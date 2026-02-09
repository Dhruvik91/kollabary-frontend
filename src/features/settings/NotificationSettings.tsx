'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Smartphone, MessageSquare, Users, Star } from 'lucide-react';

export function NotificationSettings() {
    // Load from localStorage or default to true
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [messageNotifications, setMessageNotifications] = useState(true);
    const [collaborationNotifications, setCollaborationNotifications] = useState(true);
    const [reviewNotifications, setReviewNotifications] = useState(true);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const loadPreference = (key: string, setter: (value: boolean) => void) => {
            const saved = localStorage.getItem(`notification_${key}`);
            if (saved !== null) {
                setter(JSON.parse(saved));
            }
        };

        loadPreference('email', setEmailNotifications);
        loadPreference('push', setPushNotifications);
        loadPreference('messages', setMessageNotifications);
        loadPreference('collaborations', setCollaborationNotifications);
        loadPreference('reviews', setReviewNotifications);
    }, []);

    const handleToggle = (key: string, value: boolean, setter: (value: boolean) => void) => {
        setter(value);
        localStorage.setItem(`notification_${key}`, JSON.stringify(value));
        toast.success('Notification preferences updated');
    };

    return (
        <div className="space-y-6">
            {/* Email Notifications */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <CardTitle>Email Notifications</CardTitle>
                    </div>
                    <CardDescription>
                        Receive notifications via email
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications" className="text-base">
                                Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about your account activity
                            </p>
                        </div>
                        <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={(checked) => handleToggle('email', checked, setEmailNotifications)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <CardTitle>Push Notifications</CardTitle>
                    </div>
                    <CardDescription>
                        Receive browser push notifications
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="push-notifications" className="text-base">
                                Push Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Get instant notifications in your browser
                            </p>
                        </div>
                        <Switch
                            id="push-notifications"
                            checked={pushNotifications}
                            onCheckedChange={(checked) => handleToggle('push', checked, setPushNotifications)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Notification Types */}
            <Card className="glass border-glass-border">
                <CardHeader>
                    <CardTitle>Notification Types</CardTitle>
                    <CardDescription>
                        Choose which types of notifications you want to receive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Messages */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                            <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="space-y-0.5">
                                <Label htmlFor="message-notifications" className="text-base">
                                    Messages
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    New messages from other users
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="message-notifications"
                            checked={messageNotifications}
                            onCheckedChange={(checked) => handleToggle('messages', checked, setMessageNotifications)}
                        />
                    </div>

                    {/* Collaborations */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div className="space-y-0.5">
                                <Label htmlFor="collaboration-notifications" className="text-base">
                                    Collaborations
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Updates on your collaboration requests
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="collaboration-notifications"
                            checked={collaborationNotifications}
                            onCheckedChange={(checked) =>
                                handleToggle('collaborations', checked, setCollaborationNotifications)
                            }
                        />
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                            <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div className="space-y-0.5">
                                <Label htmlFor="review-notifications" className="text-base">
                                    Reviews
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    New reviews on your profile
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="review-notifications"
                            checked={reviewNotifications}
                            onCheckedChange={(checked) => handleToggle('reviews', checked, setReviewNotifications)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
