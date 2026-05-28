"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { Upload, Camera, Loader2, RefreshCw, Trash2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCropModal from "./ImageCropModal";
import { uploadService } from "@/services/upload.service";
import { cn } from "@/lib/utils";

type ProfileImageStepProps = {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
};

export default function ProfileImageStep({
  value,
  onChange,
  disabled = false,
}: ProfileImageStepProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const validateAndProcessFile = (file: File) => {
    setError(null);

    // Validate type (MIME type must be jpeg, png, or webp)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image (JPEG, PNG, or WebP).");
      return;
    }

    // Validate size (must be under 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError("File is too large. Image must be under 5MB.");
      return;
    }

    // Revoke previous object URL if any
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    // Create object URL for cropper
    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(objectUrl);
    setIsCropping(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [selectedImage]);

  const handleCropDone = async (croppedFile: File) => {
    setIsCropping(false);
    setIsCompressing(true);
    setError(null);

    let fileToUpload = croppedFile;

    // Compress client-side
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 512,
        useWebWorker: true,
      };
      fileToUpload = await imageCompression(croppedFile, options);
    } catch (compressErr) {
      console.error("Compression error, uploading original crop:", compressErr);
    } finally {
      setIsCompressing(false);
    }

    // Upload to API
    setIsUploading(true);
    try {
      const uploadRes = await uploadService.uploadFile(fileToUpload);
      onChange(uploadRes.url);
    } catch (uploadErr) {
      console.error("Upload failed:", uploadErr);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Clean up local cropper source image
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
        setSelectedImage(null);
      }
    }
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const isLoading = isCompressing || isUploading;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-sm mx-auto py-8">
      {/* Upload/Preview circle */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative group w-40 h-40 rounded-full flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 overflow-hidden",
          dragActive
            ? "border-primary bg-primary/10 scale-105"
            : value
            ? "border-border bg-card"
            : "border-muted-foreground/30 bg-muted hover:border-primary/60 hover:bg-muted/80",
          isLoading && "opacity-75 pointer-events-none"
        )}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Avatar preview"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
            {/* Overlay on hover */}
            {!disabled && !isLoading && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-200 cursor-pointer" onClick={triggerFileSelect}>
                <Camera className="h-6 w-6 text-white" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-white">Change</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center cursor-pointer h-full w-full" onClick={triggerFileSelect}>
            {isLoading ? (
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            ) : (
              <>
                <Upload className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                <span className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                  Upload Photo
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 max-w-[110px]">
                  Drag & drop or browse
                </span>
              </>
            )}
          </div>
        )}

        {/* Mini progress indicator inside circle if uploading */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-[11px] font-medium text-foreground">
              {isCompressing ? "Optimizing..." : "Uploading..."}
            </span>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isLoading}
      />

      {/* Actions and messages */}
      <div className="text-center space-y-4 w-full">
        {error ? (
          <p className="text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-xl">
            {error}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Optimal sizes under 5MB (JPEG, PNG, WebP)</span>
          </div>
        )}

        {value && !isLoading && !disabled && (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileSelect}
              className="border-border hover:bg-muted text-foreground h-9 px-3 rounded-lg text-xs gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="hover:bg-muted text-muted-foreground hover:text-destructive h-9 px-3 rounded-lg text-xs gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {/* Crop Modal display */}
      {isCropping && selectedImage && (
        <ImageCropModal
          image={selectedImage}
          onClose={handleCropCancel}
          onCropDone={handleCropDone}
        />
      )}
    </div>
  );
}
