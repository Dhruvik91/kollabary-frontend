"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, RotateCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/cropImage";

type ImageCropModalProps = {
  image: string;
  onClose: () => void;
  onCropDone: (croppedFile: File) => void;
};

// Helper to rotate the source image dynamically in memory
const rotateImage = (imageSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!imageSrc.startsWith("blob:")) {
      img.setAttribute("crossOrigin", "anonymous");
    }
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No canvas context"));
        return;
      }

      // Rotate 90 degrees clockwise
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalWidth;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.translate(-img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg", 0.95);
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};

export default function ImageCropModal({
  image,
  onClose,
  onCropDone,
}: ImageCropModalProps) {
  const [currentImage, setCurrentImage] = useState(image);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUrls, setCreatedUrls] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Clean up created object URLs on unmount to prevent leaks
  useEffect(() => {
    return () => {
      createdUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [createdUrls]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    
    // Default to a centered 80% square crop box
    const size = Math.min(width, height) * 0.8;
    const initialCrop: Crop = {
      unit: "px",
      x: (width - size) / 2,
      y: (height - size) / 2,
      width: size,
      height: size,
    };
    
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  };

  const handleRotate = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const rotatedUrl = await rotateImage(currentImage);
      setCurrentImage(rotatedUrl);
      setCreatedUrls((prev) => [...prev, rotatedUrl]);
    } catch (err) {
      console.error("Error rotating image:", err);
      setError("Failed to rotate image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = async () => {
    if (!completedCrop || !imageRef.current) return;
    setIsProcessing(true);
    setError(null);
    try {
      const croppedFile = await getCroppedImg(imageRef.current, completedCrop);
      onCropDone(croppedFile);
    } catch (err) {
      console.error("Error cropping image:", err);
      setError("Failed to crop image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-background border border-border text-foreground rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-lg tracking-tight text-foreground font-display">
              Crop Profile Image
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-xl transition"
            disabled={isProcessing}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cropper area */}
        <div className="relative w-full h-[320px] md:h-[380px] bg-zinc-950 flex-1 flex items-center justify-center overflow-hidden p-6">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            keepSelection={true}
          >
            <img
              ref={imageRef}
              src={currentImage}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-h-[280px] md:max-h-[330px] max-w-full object-contain select-none"
            />
          </ReactCrop>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-5 bg-card border-t border-border">
          {error && (
            <div className="text-sm bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Instructions */}
          <p className="text-xs text-muted-foreground text-center">
            Drag the corners/edges of the square to resize, or drag the center to move the crop box.
          </p>

          {/* Operations & Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleRotate}
              disabled={isProcessing}
              className="border-border hover:bg-muted hover:text-foreground text-foreground gap-2 h-11 px-4 rounded-xl transition"
            >
              <RotateCw className="h-4 w-4" />
              Rotate 90°
            </Button>

            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isProcessing}
                className="hover:bg-muted hover:text-foreground text-muted-foreground h-11 px-5 rounded-xl transition"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDone}
                disabled={isProcessing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    Cropping...
                  </>
                ) : (
                  "Apply & Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ReactCrop {
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .ReactCrop__crop-selection {
          border: 2px dashed var(--primary, #ea580c) !important;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7) !important;
        }
        /* Custom drag handles style */
        .ReactCrop__drag-handle {
          width: 10px !important;
          height: 10px !important;
          background-color: #ffffff !important;
          border: 1.5px solid var(--primary, #ea580c) !important;
          border-radius: 2px !important;
        }
        .ReactCrop__drag-handle:after {
          display: none !important;
        }
        /* Style the 3x3 grid lines */
        .ReactCrop__rule-of-thirds-vt::before,
        .ReactCrop__rule-of-thirds-vt::after,
        .ReactCrop__rule-of-thirds-hz::before,
        .ReactCrop__rule-of-thirds-hz::after {
          border-color: rgba(255, 255, 255, 0.4) !important;
        }
      `}</style>
    </div>
  );
}
