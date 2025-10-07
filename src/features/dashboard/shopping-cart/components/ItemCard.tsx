"use client";

import {
  addProductToCart,
  removeProductFromCart,
} from "@/features/dashboard/shopping-cart/actions/shopping-cart-actions";
import type { ProductModel } from "@/generated/prisma/models";
import Image from "next/image";
import { IoAddCircleOutline, IoRemove } from "react-icons/io5";

interface Props {
  product: Omit<ProductModel, "price"> & { price: string };
  totalPrice: string;
  quantity: number;
}

export const ItemCard = ({ product, quantity, totalPrice }: Props) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg border-gray-100 bg-gray-800 shadow sm:flex-row">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className="flex w-full flex-col px-5 py-4">
        <a href="#">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {product.name} -{" "}
            <small className="text-sm">
              ${Number(product.price).toFixed(2)}
            </small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-white dark:text-gray-900">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-white">
            Total: ${Number(totalPrice).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center p-5">
        <button
          onClick={() => addProductToCart(product.id)}
          className="cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className="mx-4 w-10 text-center text-2xl text-white">
          {quantity}
        </span>
        <button
          onClick={() => removeProductFromCart(product.id)}
          className="cursor-pointer rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  );
};
