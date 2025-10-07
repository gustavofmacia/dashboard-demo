"use client";

import { RatingStars } from "@/features/dashboard/products/";
import {
  addProductToCart,
  clearProductFromCart,
} from "@/features/dashboard/shopping-cart/actions/shopping-cart-actions";
import type { ProductModel } from "@/generated/prisma/models";
import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

interface Props {
  product: Omit<ProductModel, "price"> & { price: string };
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="max-w-sm rounded-lg bg-white shadow dark:border-gray-100 dark:bg-gray-800">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={product.imageUrl}
          alt="product image"
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h3>
        </a>
        <div className="mt-2.5 mb-5 flex items-center">
          {/* Rating Stars */}
          <RatingStars value={product.rating} />
          {/* Rating Number */}
          <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            {product.rating}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </span>

          <div className="flex">
            <button
              onClick={() => addProductToCart(product.id)}
              className="mr-2 cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button
              onClick={() => clearProductFromCart(product.id)}
              className="cursor-pointer rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
