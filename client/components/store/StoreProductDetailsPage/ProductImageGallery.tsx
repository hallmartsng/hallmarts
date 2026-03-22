// "use client";
import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

const ProductImageGallery = () => {
  const galleryRef = useRef<ImageGalleryRef>(null);

  const ITEM: GalleryItem[] = [
    {
      original: "/max-payne.jpg",
      thumbnail: "/max-payne.jpg",
    },
    {
      original: "/sample_image.jfif",
      thumbnail: "/sample_image.jfif",
    },
  ];

  return <ImageGallery ref={galleryRef} items={ITEM} showPlayButton={false} />;
};

export default ProductImageGallery;
