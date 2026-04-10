import Product from "../models/products.models";
import { ProductFiltersTypes } from "../types/products.types";

export const filteredProducts = async (filters: ProductFiltersTypes) => {
  const query: any = { status: "approved" }; // only approved products

  // Basic filters
  if (filters.visible !== undefined) query.visible = filters.visible;
  if (filters.isVerified !== undefined) query.isVerified = filters.isVerified;
  if (filters.productType) query.productType = filters.productType;
  if (filters.categories && filters.categories.length > 0)
    query.categories = { $in: filters.categories };
  if (filters.colors && filters.colors.length > 0)
    query.colors = { $in: filters.colors };
  if (filters.sizes && filters.sizes.length > 0)
    query.sizes = { $in: filters.sizes };
  if (filters.isBid !== undefined) query.isBid = filters.isBid;
  if (filters.isSwap !== undefined) query.isSwap = filters.isSwap;

  // Price filters (sellingPrice)
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.sellingPrice = {};
    if (filters.minPrice !== undefined)
      query.sellingPrice.$gte = filters.minPrice;
    if (filters.maxPrice !== undefined)
      query.sellingPrice.$lte = filters.maxPrice;
  }

  // Merge extra dynamic conditions
  if (filters.extraConditions) {
    Object.assign(query, filters.extraConditions);
  }

  // Search text
  if (filters.search) {
    const searchRegex = new RegExp(filters.search, "i");
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { metaData: searchRegex },
    ];
  }

  // Sorting
  const sort: any = {};
  if (filters.sortBy)
    sort[filters.sortBy] = filters.sortOrder === "asc" ? 1 : -1;
  else sort.createdAt = -1; // default: newest first

  // Execute query
  const products = await Product.find(query)
    .sort(sort)
    .skip(filters.skip || 0)
    .limit(filters.limit || 20)
    .lean();

  return products;
};

export const homePageProducts = async () => {
  const trendingQuery = Product.aggregate([
    { $match: { status: "approved", clicks: { $gt: 10 } } },
    { $sort: { clicks: -1 } },
    { $limit: 10 },
  ]);

  const newArrivalsQuery = Product.aggregate([
    { $match: { status: "pending" } },
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
    // {
    //   $lookup: {
    //     from: "vendors", // The collection to join
    //     localField: "vendor", // Field in 'product'
    //     foreignField: "_id", // Field in 'vendor'
    //     as: "vendorDetails", // Output array field
    //   },
    // },
    // {
    //   $unwind: "$vendorDetails", // Flatten the array from lookup
    // },
  ]);

  const topDealsQuery = Product.aggregate([
    {
      $match: {
        status: "approved",
        discount: { $gt: 0 },
        stock: { $gt: 0 },
      },
    },
    { $addFields: { isDiscounted: { $lt: ["$sellingPrice", "$price"] } } },
    { $match: { isDiscounted: true } },
    { $sort: { discount: -1 } },
    { $limit: 10 },
  ]);

  const electronicsQuery = Product.aggregate([
    {
      $match: {
        status: "pending",
        categories: { $in: ["electronics", "gadgets"] },
        // visible: true,
        // isVerified: true,
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
  ]);

  const [trending, newArrivals, topDeals, electronics] = await Promise.all([
    trendingQuery,
    newArrivalsQuery,
    topDealsQuery,
    electronicsQuery,
  ]);

  return { trending, newArrivals, topDeals, electronics };
};
