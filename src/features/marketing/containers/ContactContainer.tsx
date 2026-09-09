'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { COMPANY_EMAIL } from '@/constants';
import { contactFormSchema, ContactFormValues } from '@/lib/validations/marketing';

export const ContactContainer = () => {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Simulate API call or handling
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmittedEmail(data.email);
      toast.success('Your message has been sent successfully! Our team will contact you shortly.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <StaticPageLayout
      title="Contact Support & Sales"
      subtitle="Have questions or need custom enterprise solutions? We are here to help 24/7."
      lastUpdated="September 2026"
      showReturnHome={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl border border-border/50 flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base mb-1 text-foreground">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-2">Our team responds within 2-4 hours.</p>
            <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary font-bold text-sm hover:underline break-all">
              {COMPANY_EMAIL}
            </a>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-border/50 flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1 text-foreground">Support Hours</h3>
            <p className="text-sm text-muted-foreground mb-1">Monday – Friday: 24 Hours</p>
            <p className="text-xs text-muted-foreground/80">Saturday – Sunday: 9:00 AM – 6:00 PM IST</p>
          </div>
        </div>
      </div>

      <StaticSection title="Send Us a Message" icon={<MessageSquare className="w-6 h-6 text-primary" />} index={1}>
        {submittedEmail ? (
          <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Message Received!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for reaching out. A Kollabary support specialist will review your request and get back to you at <strong>{submittedEmail}</strong>.
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmittedEmail(null)}
              className="rounded-full px-6"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</label>
                <Input
                  {...register('name')}
                  placeholder="e.g. Sarah Jenkins"
                  className="bg-background/50 border-border/60 rounded-xl h-12"
                />
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="sarah@brand.com"
                  className="bg-background/50 border-border/60 rounded-xl h-12"
                />
                {errors.email && (
                  <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
              <Input
                {...register('subject')}
                placeholder="How can we help you?"
                className="bg-background/50 border-border/60 rounded-xl h-12"
              />
              {errors.subject && (
                <p className="text-xs text-destructive font-medium">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
              <Textarea
                rows={5}
                {...register('message')}
                placeholder="Provide details regarding your campaign, partnership inquiry, or technical question..."
                className="bg-background/50 border-border/60 rounded-2xl resize-none"
              />
              {errors.message && (
                <p className="text-xs text-destructive font-medium">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 h-12 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isSubmitting ? 'Sending...' : 'Submit Message'}
            </Button>
          </form>
        )}
      </StaticSection>
    </StaticPageLayout>
  );
};
