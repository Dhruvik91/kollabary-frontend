import { UserCircle, Building2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ROLES } from '@/constants/constants';
import { cn } from '@/lib/utils';

interface RoleSelectorProps {
    selectedRole: ROLES.USER | ROLES.INFLUENCER;
    onRoleChange: (role: ROLES.USER | ROLES.INFLUENCER) => void;
    showRoleSelection?: boolean;
}

export function RoleSelector({ selectedRole, onRoleChange, showRoleSelection = true }: RoleSelectorProps) {
    return (
        <div className={cn("space-y-3", showRoleSelection ? "block" : "hidden")}>
            <Label>I am a</Label>
            <RadioGroup
                value={selectedRole}
                onValueChange={(value) => onRoleChange(value as ROLES.USER | ROLES.INFLUENCER)}
                className="grid grid-cols-2 gap-4"
            >
                <div>
                    <RadioGroupItem
                        value={ROLES.USER}
                        id="brand"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="brand"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover/50 backdrop-blur-sm p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                        <Building2 className="mb-3 h-6 w-6" aria-hidden="true" />
                        <span className="text-sm font-medium">Brand</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem
                        value={ROLES.INFLUENCER}
                        id="influencer"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="influencer"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover/50 backdrop-blur-sm p-4 hover:bg-accent/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                        <UserCircle className="mb-3 h-6 w-6" aria-hidden="true" />
                        <span className="text-sm font-medium">Influencer</span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}
