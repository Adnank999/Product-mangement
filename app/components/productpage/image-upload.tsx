// 'use client';

// import { useCallback, useState } from 'react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { CircleX, CloudUpload, ImageIcon, TriangleAlert, XIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import Image from 'next/image';

// interface ImageFile {
//     id: string;
//     file: File;
//     preview: string;
//     progress: number;
//     status: 'uploading' | 'completed' | 'error';
//     error?: string;
// }

// interface ImageUploadProps {
//     maxFiles?: number;
//     maxSize?: number;
//     accept?: string;
//     className?: string;
//     onImagesChange?: (images: ImageFile[]) => void;
//     onUploadComplete?: (images: ImageFile[]) => void;
// }

// export default function ImageUpload({
//     maxFiles = 10,
//     maxSize = 2 * 1024 * 1024, // 2MB
//     accept = 'image/*',
//     className,
//     onImagesChange,
//     onUploadComplete,
// }: ImageUploadProps) {
//     const [images, setImages] = useState<ImageFile[]>([]);
//     const [isDragging, setIsDragging] = useState(false);
//     const [errors, setErrors] = useState<string[]>([]);
//     const [visibleDefaultImages, setVisibleDefaultImages] = useState<any[]>([


//     ]);

//     const validateFile = (file: File): string | null => {
//         if (!file.type.startsWith('image/')) {
//             return 'File must be an image';
//         }
//         if (file.size > maxSize) {
//             return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
//         }
//         if (images.length >= maxFiles) {
//             return `Maximum ${maxFiles} files allowed`;
//         }
//         return null;
//     };

//     const addImages = useCallback(
//         (files: FileList | File[]) => {
//             const newImages: ImageFile[] = [];
//             const newErrors: string[] = [];

//             Array.from(files).forEach((file) => {
//                 const error = validateFile(file);
//                 if (error) {
//                     newErrors.push(`${file.name}: ${error}`);
//                     return;
//                 }

//                 const imageFile: ImageFile = {
//                     id: `${Date.now()}-${Math.random()}`,
//                     file,
//                     preview: URL.createObjectURL(file),
//                     progress: 0,
//                     status: 'uploading',
//                 };

//                 newImages.push(imageFile);
//             });

//             if (newErrors.length > 0) {
//                 setErrors((prev) => [...prev, ...newErrors]);
//             }

//             if (newImages.length > 0) {
//                 const updatedImages = [...images, ...newImages];
//                 setImages(updatedImages);
//                 onImagesChange?.(updatedImages);

//                 // Simulate upload progress
//                 newImages.forEach((imageFile) => {
//                     simulateUpload(imageFile);
//                 });
//             }
//         },
//         [images, maxSize, maxFiles, onImagesChange],
//     );

//     const simulateUpload = (imageFile: ImageFile) => {
//         let progress = 0;
//         const interval = setInterval(() => {
//             progress += Math.random() * 20;
//             if (progress >= 100) {
//                 progress = 100;
//                 clearInterval(interval);

//                 setImages((prev) =>
//                     prev.map((img) => (img.id === imageFile.id ? { ...img, progress: 100, status: 'completed' as const } : img)),
//                 );

//                 // Check if all uploads are complete
//                 const updatedImages = images.map((img) =>
//                     img.id === imageFile.id ? { ...img, progress: 100, status: 'completed' as const } : img,
//                 );

//                 if (updatedImages.every((img) => img.status === 'completed')) {
//                     onUploadComplete?.(updatedImages);
//                 }
//             } else {
//                 setImages((prev) => prev.map((img) => (img.id === imageFile.id ? { ...img, progress } : img)));
//             }
//         }, 100);
//     };

//     const removeImage = useCallback((id: string) => {
//         // If it's a default image, remove it from visible defaults
//         if (id.startsWith('default-')) {
//             setVisibleDefaultImages((prev) => prev.filter((img) => img.id !== id));
//             return;
//         }

//         // Remove uploaded image
//         setImages((prev) => {
//             const image = prev.find((img) => img.id === id);
//             if (image) {
//                 URL.revokeObjectURL(image.preview);
//             }
//             return prev.filter((img) => img.id !== id);
//         });
//     }, []);

//     const handleDragEnter = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setIsDragging(true);
//     }, []);

//     const handleDragLeave = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setIsDragging(false);
//     }, []);

//     const handleDragOver = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//     }, []);

//     const handleDrop = useCallback(
//         (e: React.DragEvent) => {
//             e.preventDefault();
//             e.stopPropagation();
//             setIsDragging(false);

//             const files = e.dataTransfer.files;
//             if (files.length > 0) {
//                 addImages(files);
//             }
//         },
//         [addImages],
//     );

//     const openFileDialog = useCallback(() => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.multiple = true;
//         input.accept = accept;
//         input.onchange = (e) => {
//             const target = e.target as HTMLInputElement;
//             if (target.files) {
//                 addImages(target.files);
//             }
//         };
//         input.click();
//     }, [accept, addImages]);

//     const formatBytes = (bytes: number): string => {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//     };

//     return (
//         <div className={cn('w-full max-w-4xl', className)}>
//             {/* Image Grid - Moved to top */}
//             <div className="mb-6">


//                 {/* Show uploaded images in a separate grid below */}
//                 {images.length > 0 && (
//                     <div className="grid grid-cols-4 gap-2.5 mt-4">
//                         {images.map((imageFile, index) => (
//                             <Card
//                                 key={imageFile.id}
//                                 className="flex h-[100px] items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group"
//                             >
//                                 <Image
//                                     src={imageFile.preview}
//                                     fill
//                                     className="h-full w-full object-cover rounded-md"
//                                     alt={`Product view ${index + 1}`}
//                                 />

//                                 {/* Remove Button Overlay */}
//                                 <Button
//                                     onClick={() => removeImage(imageFile.id)}
//                                     variant="outline"
//                                     size="icon"
//                                     className="shadow-sm absolute top-2 end-2 size-6 opacity-0 group-hover:opacity-100 rounded-full"
//                                 >
//                                     <XIcon className="size-3.5" />
//                                 </Button>
//                             </Card>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Upload Area */}
//             <Card
//                 className={cn(
//                     'border-dashed shadow-none rounded-md transition-colors',
//                     isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
//                 )}
//                 onDragEnter={handleDragEnter}
//                 onDragLeave={handleDragLeave}
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//             >
//                 <CardContent className="text-center">
//                     <div className="flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3">
//                         <CloudUpload className="size-4" />
//                     </div>
//                     <h3 className="text-2sm text-foreground font-semibold mb-0.5">Choose a file or drag & drop here.</h3>
//                     <span className="text-xs text-secondary-foreground font-normal block mb-3">
//                         JPEG, PNG, up to {formatBytes(maxSize)}.
//                     </span>
//                     <Button type="button" size="sm" variant="default" onClick={openFileDialog}>
//                         Browse File
//                     </Button>
//                 </CardContent>
//             </Card>

//             {/* Upload Progress Cards */}
//             {images.length > 0 && (
//                 <div className="mt-6 space-y-3">
//                     {images.map((imageFile) => (
//                         <Card key={imageFile.id} className="shadow-none rounded-md">
//                             <CardContent className="flex items-center gap-2 p-3">
//                                 <div className="flex items-center justify-center size-[32px] rounded-md border border-border shrink-0">
//                                     <ImageIcon className="size-4 text-muted-foreground" />
//                                 </div>
//                                 <div className="flex flex-col gap-1.5 w-full">
//                                     <div className="flex items-center justify-between gap-2.5 -mt-2 w-full">
//                                         <div className="flex items-center gap-2.5">
//                                             <span className="text-xs text-foreground font-medium leading-none">{imageFile.file.name}</span>
//                                             <span className="text-xs text-muted-foreground font-normal leading-none">
//                                                 {formatBytes(imageFile.file.size)}
//                                             </span>
//                                             {imageFile.status === 'uploading' && (
//                                                 <p className="text-xs text-muted-foreground">Uploading... {Math.round(imageFile.progress)}%</p>
//                                             )}
//                                         </div>
//                                         <Button onClick={() => removeImage(imageFile.id)} variant="ghost" size="icon" className="size-6">
//                                             <CircleX className="size-3.5" />
//                                         </Button>
//                                     </div>

//                                     <Progress
//                                         value={imageFile.progress}
//                                         className={cn('h-1 transition-all duration-300', '[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50')}
//                                     />
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             )}

//             {/* Error Messages */}
//             {errors.length > 0 && (
//                 <Alert variant="destructive" className="mt-5">

//                     <TriangleAlert />


//                     <AlertTitle>File upload error(s)</AlertTitle>
//                     <AlertDescription>
//                         {errors.map((error, index) => (
//                             <p key={index} className="last:mb-0">
//                                 {error}
//                             </p>
//                         ))}
//                     </AlertDescription>

//                 </Alert>
//             )}
//         </div>
//     );
// }


import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CircleX, CloudUpload, ImageIcon, TriangleAlert, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    error?: string;
    url?: string;
}

interface ImageUploadProps {
    maxFiles?: number;
    maxSize?: number;
    accept?: string;
    className?: string;
    onImagesChange?: (images: ImageFile[]) => void;
    onUploadComplete?: (images: ImageFile[]) => void;
}

export default function ImageUpload({
    maxFiles = 10,
    maxSize = 2 * 1024 * 1024, // 2MB
    accept = 'image/*',
    className,
    onImagesChange,
    onUploadComplete,
}: ImageUploadProps) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const onImagesChangeRef = useRef<typeof onImagesChange>(null);
    const onUploadCompleteRef = useRef<typeof onUploadComplete>(null);
    useEffect(() => { onImagesChangeRef.current = onImagesChange; }, [onImagesChange]);
    useEffect(() => { onUploadCompleteRef.current = onUploadComplete; }, [onUploadComplete]);

    const lastEmittedSigRef = useRef<string>('');

    const emitUrlsIfChanged = (list: ImageFile[]) => {
        // Only completed uploads; ignore blobs
        const urls = list.filter(i => i.status === 'completed').map(i => i.url ?? i.preview);
        const sig = urls.join('|');
        if (sig !== lastEmittedSigRef.current) {
            lastEmittedSigRef.current = sig;
            // Decouple from current call stack just in case
            setTimeout(() => onImagesChangeRef.current?.(urls as any), 0);
        }
    };

    const validateFile = (file: File): string | null => {
        if (!file.type.startsWith('image/')) {
            return 'File must be an image';
        }
        if (file.size > maxSize) {
            return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
        }
        if (images.length >= maxFiles) {
            return `Maximum ${maxFiles} files allowed`;
        }
        return null;
    };

    const addImages = useCallback((files: FileList | File[]) => {
        const newImages: ImageFile[] = [];
        const newErrors: string[] = [];

        Array.from(files).forEach((file) => {
            const error = validateFile(file);
            if (error) { newErrors.push(`${file.name}: ${error}`); return; }
            newImages.push({
                id: `${Date.now()}-${Math.random()}`,
                file,
                preview: URL.createObjectURL(file), // local preview
                progress: 0,
                status: 'uploading',
            });
        });

        if (newErrors.length > 0) setErrors(prev => [...prev, ...newErrors]);

        if (newImages.length > 0) {
            // Do NOT call onImagesChange here (would send blob URLs)
            setImages(prev => {
                const updated = [...prev, ...newImages];
                return updated;
            });
            // start uploads
            newImages.forEach(uploadToCloudinary);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSize, maxFiles]); // don't depend on `images` or `onImagesChange`

    const uploadToCloudinary = (imageFile: ImageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile.file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        // You can swap to XHR to get real progress; keeping fetch for brevity
        fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                /* @ts-ignore */
                setImages(prev => {
                    const updated = prev.map(img =>
                        img.id === imageFile.id
                            ? {
                                ...img,
                                progress: 100,
                                status: 'completed',
                                error: '',
                                url: data.secure_url,
                                preview: data.secure_url, // swap to CDN
                            }
                            : img
                    );

                    // Emit only when changed (avoids loops)
                    /* @ts-ignore */
                    emitUrlsIfChanged(updated);

                    // If all done, notify parent once
                    const allDone = updated.length > 0 && updated.every(i => i.status !== 'uploading');

                        /* @ts-ignore */
                    if (allDone) setTimeout(() => onUploadCompleteRef.current?.(updated), 0);

                    // Revoke old blob URL of this file
                    try { URL.revokeObjectURL(imageFile.preview); } catch { }

                    return updated;
                });
            })
            .catch(err => {
                setImages(prev =>
                    prev.map(img =>
                        img.id === imageFile.id ? { ...img, status: 'error', error: err.message } : img
                    )
                );
            });
    };



    const removeImage = useCallback((id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    }, []);

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className={cn('w-full max-w-4xl', className)}>
            {/* Image Grid */}
            <div className="mb-6">
                {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2.5 mt-4">
                        {images.map((imageFile) => (
                            <Card
                                key={imageFile.id}
                                className="flex h-[100px] items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group"
                            >
                                <Image
                                    src={imageFile.preview}
                                    fill
                                    className="h-full w-full object-cover rounded-md"
                                    alt={`Uploaded Image ${imageFile.id}`}
                                />

                                <Button
                                    onClick={() => removeImage(imageFile.id)}
                                    variant="outline"
                                    size="icon"
                                    className="shadow-sm absolute top-2 end-2 size-6 opacity-0 group-hover:opacity-100 rounded-full"
                                >
                                    <XIcon className="size-3.5" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Area */}
            <Card
                className={cn(
                    'border-dashed shadow-none rounded-md transition-colors',
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                )}
            >
                <CardContent className="text-center">
                    <div className="flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3">
                        <CloudUpload className="size-4" />
                    </div>
                    <h3 className="text-2sm text-foreground font-semibold mb-0.5">Choose a file or drag & drop here.</h3>
                    <span className="text-xs text-secondary-foreground font-normal block mb-3">
                        JPEG, PNG, up to {formatBytes(maxSize)}.
                    </span>
                    <Button type="button" size="sm" variant="default" onClick={() => document.getElementById('fileInput')?.click()}>
                        Browse File
                    </Button>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        accept={accept}
                        className="hidden"
                        onChange={(e) => {
                            if (e.target?.files) {
                                addImages(e.target.files);
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Upload Progress */}
            {images.length > 0 && (
                <div className="mt-6 space-y-3">
                    {images.map((imageFile) => (
                        <Card key={imageFile.id} className="shadow-none rounded-md">
                            <CardContent className="flex items-center gap-2 p-3">
                                <div className="flex items-center justify-center size-[32px] rounded-md border border-border shrink-0">
                                    <ImageIcon className="size-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="flex items-center justify-between gap-2.5 -mt-2 w-full">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-xs text-foreground font-medium leading-none">{imageFile.file.name}</span>
                                            <span className="text-xs text-muted-foreground font-normal leading-none">
                                                {formatBytes(imageFile.file.size)}
                                            </span>
                                            {imageFile.status === 'uploading' && (
                                                <p className="text-xs text-muted-foreground">Uploading... {Math.round(imageFile.progress)}%</p>
                                            )}
                                        </div>
                                        <Button onClick={() => removeImage(imageFile.id)} variant="ghost" size="icon" className="size-6">
                                            <CircleX className="size-3.5" />
                                        </Button>
                                    </div>

                                    <Progress
                                        value={imageFile.progress}
                                        className={cn('h-1 transition-all duration-300', '[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50')}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
                <Alert variant="destructive" className="mt-5">
                    <TriangleAlert />
                    <AlertTitle>File upload error(s)</AlertTitle>
                    <AlertDescription>
                        {errors.map((error, index) => (
                            <p key={index} className="last:mb-0">
                                {error}
                            </p>
                        ))}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
