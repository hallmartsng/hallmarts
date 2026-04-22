"use client";
import { ImagePreview } from "@/types";
import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

interface ProductImageGalleryProps {
  productImages: ImagePreview[];
}
const ProductImageGallery = ({ productImages }: ProductImageGalleryProps) => {
  const galleryRef = useRef<ImageGalleryRef>(null);

  const ITEM: GalleryItem[] = productImages.map((image) => {
    return {
      original: image.url,
      thumbnail: image.url,
    };
  });

  return <ImageGallery ref={galleryRef} items={ITEM} showPlayButton={false} />;
};

export default ProductImageGallery;
