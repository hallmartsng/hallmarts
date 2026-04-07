import { Router } from "express";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getVendorProducts,
  productImagesUpload,
  updateProduct,
  uploadProductImages,
} from "../../controllers/vendor/product.controllers";

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all products for the logged-in vendor
 *     tags: [Vendor Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", vendorAuthenticateMiddleWare, getVendorProducts);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a single vendor product by ID
 *     tags: [Vendor Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get("/:id", vendorAuthenticateMiddleWare, getProductById);

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Vendor Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - productType
 *               - productCategories
 *               - quantity
 *               - deliveryFee
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               metaData:
 *                 type: string
 *               discount:
 *                 type: number
 *               productType:
 *                 type: string
 *               productCategories:
 *                 type: array
 *                 items:
 *                   type: string
 *               quantity:
 *                 type: number
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               deliveryFee:
 *                 type: number
 *               deliveryDuration:
 *                 type: string
 *               isBid:
 *                 type: boolean
 *               isSwap:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/", vendorAuthenticateMiddleWare, createProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update a vendor product
 *     tags: [Vendor Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               title: "Updated product title"
 *               quantity: 10
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found or unauthorized
 */
router.patch("/:id/update", vendorAuthenticateMiddleWare, updateProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a vendor product
 *     tags: [Vendor Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found or unauthorized
 */
router.delete("/:id/delete", vendorAuthenticateMiddleWare, deleteProduct);

router.post(
  "/:id/upload",
  vendorAuthenticateMiddleWare,
  productImagesUpload.array("images", 10),
  uploadProductImages,
);

export default router;
