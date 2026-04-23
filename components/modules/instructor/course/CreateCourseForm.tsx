"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { createCourseAction } from "@/actions/instructor/course.action";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  thumbnailUrl: z.string().url("Please upload a thumbnail image").optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  priceType: z.enum(["FREE", "PAID"]),
  price: z.number().min(0, "Price must be positive").optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateCourseForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      difficulty: "Beginner",
      priceType: "FREE",
      price: 0,
    },
  });

  const priceType = watch("priceType");

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    });

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", "travel-guides");

    const cloudName = "dsblzzfib";

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File too large! Max 5MB allowed.");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setValue("thumbnailUrl", url, { shouldValidate: true });
      setPreviewUrl(url);
      toast.success("Thumbnail uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeThumbnail = () => {
    setValue("thumbnailUrl", undefined);
    setPreviewUrl(null);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        price: data.priceType === "FREE" ? 0 : data.price,
      };
      const res = await createCourseAction(payload);
      if (res.success) {
        toast.success("Course created successfully, Again check from draft");
        reset();
        setPreviewUrl(null);
      } else {
        toast.error(res.message || "Failed to create course");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-3xl shadow-lg border-muted">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Create New Course</CardTitle>
          <CardDescription>
            Fill in the details below to launch your professional course.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g. Master React in 30 Days"
                {...register("title")}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive font-medium">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a comprehensive overview of your course..."
                className={`min-h-[120px] resize-none ${errors.description ? "border-destructive" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive font-medium">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              {/* <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val) => setValue("category", val, { shouldValidate: true })}>
                  <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive font-medium">{errors.category.message}</p>
                )}
              </div> */}

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  defaultValue="Beginner"
                  onValueChange={(val) => setValue("difficulty", val as any, { shouldValidate: true })}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && (
                  <p className="text-sm text-destructive font-medium">{errors.difficulty.message}</p>
                )}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-muted/50 transition-colors hover:bg-muted">
                {previewUrl ? (
                  <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-sm">
                    <img src={previewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-2 cursor-pointer w-full py-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      ) : (
                        <Upload className="h-8 w-8" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Click to upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WebP (max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
              <input type="hidden" {...register("thumbnailUrl")} />
              {errors.thumbnailUrl && (
                <p className="text-sm text-destructive font-medium">{errors.thumbnailUrl.message}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-muted/30 p-6 rounded-xl space-y-6">
              <div className="space-y-2">
                <Label>Pricing Model</Label>
                <Select
                  defaultValue="FREE"
                  onValueChange={(val) => setValue("priceType", val as any, { shouldValidate: true })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">Free of Charge</SelectItem>
                    <SelectItem value="PAID">Paid Enrollment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {priceType === "PAID" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="price">Course Price (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      className={`pl-8 ${errors.price ? "border-destructive" : ""}`}
                      placeholder="49.99"
                      {...register("price", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-destructive font-medium">{errors.price.message}</p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold shadow-md"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Course...
                </>
              ) : (
                "Launch Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
