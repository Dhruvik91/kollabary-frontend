'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Save, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KCSetting, KCSettingKey } from '@/services/kc-setting.service';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KCSettingsFormProps {
    title: string;
    description: string;
    icon: React.ElementType;
    settings: KCSetting[];
    isPending: boolean;
    onUpdate: (key: KCSettingKey, value: number) => void;
}

const SETTING_LABELS: Record<KCSettingKey, { label: string; description: string }> = {
    [KCSettingKey.AUCTION_CREATION_PRICE]: {
        label: 'Auction Creation Price',
        description: 'Amount of KC Coins deducted when a brand creates a new auction.'
    },
    [KCSettingKey.COLLABORATION_CREATION_PRICE]: {
        label: 'Collaboration Creation Price',
        description: 'Amount of KC Coins deducted when a collaboration is initiated.'
    },
    [KCSettingKey.BID_PLACEMENT_PRICE]: {
        label: 'Bid Placement Price',
        description: 'Amount of KC Coins deducted when an influencer places a bid.'
    },
    [KCSettingKey.DAILY_ALLOWANCE_BRAND]: {
        label: 'Daily Allowance (Brand)',
        description: 'Amount of KC Coins credited to brand accounts daily.'
    },
    [KCSettingKey.DAILY_ALLOWANCE_INFLUENCER]: {
        label: 'Daily Allowance (Influencer)',
        description: 'Amount of KC Coins credited to influencer accounts daily.'
    },
    [KCSettingKey.REFERRAL_REWARD_REFERRER]: {
        label: 'Referrer Reward',
        description: 'Coins rewarded to the user who shared their referral code.'
    },
    [KCSettingKey.REFERRAL_REWARD_REFERRED]: {
        label: 'Referred Reward',
        description: 'Coins rewarded to the new user who signed up using a code.'
    },
};

export function KCSettingsForm({
    title,
    description,
    icon: Icon,
    settings,
    isPending,
    onUpdate
}: KCSettingsFormProps) {
    const [values, setValues] = React.useState<Record<string, number>>({});

    React.useEffect(() => {
        const initialValues: Record<string, number> = {};
        settings.forEach(s => {
            initialValues[s.key] = s.value;
        });
        setValues(initialValues);
    }, [settings]);

    const handleInputChange = (key: string, val: string) => {
        const numVal = parseInt(val) || 0;
        setValues(prev => ({ ...prev, [key]: numVal }));
    };

    const handleSave = (key: KCSettingKey) => {
        onUpdate(key, values[key] || 0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 glass-card p-6 shadow-sm"
        >
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>

            <div className="space-y-6">
                {settings.map((setting) => (
                    <div key={setting.key} className="p-4 rounded-xl border border-border/30 bg-muted/20 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Label className="text-sm font-semibold">
                                    {SETTING_LABELS[setting.key]?.label || setting.key}
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info size={14} className="text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">{SETTING_LABELS[setting.key]?.description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    value={values[setting.key] ?? setting.value}
                                    onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                    className="w-24 text-center font-mono font-bold"
                                />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSave(setting.key)}
                                    disabled={isPending || values[setting.key] === setting.value}
                                    className="rounded-lg h-9 w-20"
                                >
                                    {isPending ? '...' : <Save size={16} />}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs text-amber-500 font-medium">
                    Note: Changes to these values are applied immediately to all system actions. Please double-check before saving.
                </p>
            </div>
        </motion.div>
    );
}
