import { Request, Response } from "express";
import { filteredProducts, homePageProducts } from "../../utils/helpers";

// Home page
export const getHomepageProducts = async (_req: Request, res: Response) => {
  try {
    const { trending, newArrivals, topDeals, electronics } =
      await homePageProducts();

    res.status(200).json({
      data: {
        trending,
        newArrivals,
        topDeals,
        electronics,
      },
      message: "Products fetched successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch homepage products", success: false });
  }
};

// product filters
export const getFilteredproducts = async (req: Request, res: Response) => {
  const {
    productType,
    categories,
    colors,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    limit,
  } = req.body;

  try {
    const products = await filteredProducts({
      productType,
      categories,
      colors,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      limit,
    });

    res.status(200).json({
      data: products,
      message: "Product filter results",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product filter failed",
      success: false,
    });
  }
};
