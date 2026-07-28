'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { videoSchema, VideoFormValues } from '@/lib/validations/video.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { uploadService } from '@/services/upload.service';
import { Film, CircleDollarSign, Loader2, UploadCloud, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VideoFormProps {
  onSubmit: (data: VideoFormValues) => void;
  isLoading?: boolean;
}

const CATEGORIES = [
  'UGC Content',
  'Product Review',
  'Unboxing',
  'Tutorial / How-to',
  'Short-form Ads',
  'Vlog',
  'Sponsored Segment',
  'Social Media Reel / TikTok',
];

export const VideoForm = ({ onSubmit, isLoading = false }: VideoFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
      price: undefined,
      categories: [],
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a valid video file.');
      return;
    }

    // Limit to 30MB
    const maxBytes = 30 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error('Video file size exceeds the 30MB limit.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(20); // initial start fake progress indicator
      
      const response = await uploadService.uploadFile(file);
      
      setUploadProgress(100);
      form.setValue('videoUrl', response.url, { shouldValidate: true });
      toast.success('Video uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload video');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const onFormSubmit = (values: VideoFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Video Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Aesthetic Skincare Product Reel"
                  {...field}
                  className="rounded-xl border-border/50 h-11 focus:border-primary transition-all placeholder:text-[13px] sm:placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video Upload or URL Zone */}
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Video File
              </FormLabel>
              <div className="space-y-4">
                
                {/* Drag Drop File Input Zone */}
                <div className="relative border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center bg-muted/30 dark:bg-muted/10 group">
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-3">
                      <Loader2 className="animate-spin text-primary" size={32} />
                      <span className="text-sm font-bold text-foreground">Uploading video...</span>
                      {uploadProgress !== null && (
                        <div className="w-48 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ) : field.value ? (
                    <div className="flex flex-col items-center space-y-3">
                      <CheckCircle className="text-emerald-500" size={32} />
                      <span className="text-sm font-bold text-foreground line-clamp-1 max-w-xs">
                        Video ready for submission
                      </span>
                      <video
                        key={field.value}
                        src={field.value}
                        controls
                        playsInline
                        className="w-full max-w-xs h-32 object-contain rounded-lg border border-border/20 mt-2 bg-black"
                      />
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => form.setValue('videoUrl', '')}
                        className="text-xs text-red-500 hover:text-red-400 p-0"
                      >
                        Remove and upload another
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center space-y-2 w-full">
                      <UploadCloud
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                        size={32}
                      />
                      <span className="text-sm font-bold text-foreground">Click to select video file</span>
                      <span className="text-xs text-muted-foreground">
                        Supports MP4, MOV, WEBM (Max 30MB)
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Direct URL Input Fallback */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block">
                    Or paste direct Video URL
                  </span>
                  <FormControl>
                    <Input
                      placeholder="e.g., https://my-portfolio.com/video.mp4"
                      {...field}
                      className="rounded-xl border-border/50 h-11 focus:border-primary transition-all placeholder:text-[13px] sm:placeholder:text-sm"
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pricing Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Asking Price ($)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <CircleDollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    size={16}
                  />
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g., 250"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="pl-12 rounded-xl h-11 border-border/50 focus:border-primary transition-all placeholder:text-[13px] sm:placeholder:text-sm"
                  />
                </div>
              </FormControl>
              <FormDescription className="text-[11px] text-muted-foreground font-medium">
                Set to 0 or leave empty if you want to negotiate pricing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Video Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell buyers what makes this video special, including resolution, content outline, and potential usages..."
                  className="min-h-28 rounded-xl border-border/50 focus:border-primary transition-all resize-none placeholder:text-[13px] sm:placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categories Field */}
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Categories / Tags
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={CATEGORIES}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select video categories..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Button */}
        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Film size={18} className="group-hover:scale-110 transition-transform" />
          )}
          Post Video for Sale
        </Button>

      </form>
    </Form>
  );
};
