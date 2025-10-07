"use server";

import type { ActionResponsePromise } from "@/features/dashboard/types";
import type { ProductModel } from "@/generated/prisma/models";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

interface Cart {
  [productId: string]: number;
}

interface ProductInCart {
  product: ProductModel;
  quantity: number;
}

export const addProductToCart = async (
  productId: string
): ActionResponsePromise<Cart> => {
  const cartFromCookies = await getCartFromCookies();

  cartFromCookies[productId] = (cartFromCookies[productId] || 0) + 1;

  const saved: boolean = await saveCartToCookies(cartFromCookies);

  return saved
    ? { success: true, status: 201 }
    : { success: false, message: "No se pudo guardar el carrito", status: 500 };
};

export const removeProductFromCart = async (
  productId: string
): ActionResponsePromise<Cart> => {
  const cartFromCookies = await getCartFromCookies();

  if (!cartFromCookies[productId])
    return {
      success: false,
      message: "Producto no existe en el carrito",
      status: 404,
    };

  cartFromCookies[productId] -= 1;

  if (cartFromCookies[productId] <= 0) {
    delete cartFromCookies[productId];
  }

  const saved = await saveCartToCookies(cartFromCookies);

  return saved
    ? { success: true, status: 200 }
    : { success: false, message: "No se pudo guardar el carrito", status: 500 };
};

export const clearProductFromCart = async (
  productId: string
): ActionResponsePromise<Cart> => {
  const cartFromCookies = await getCartFromCookies();

  if (!cartFromCookies[productId])
    return {
      success: false,
      message: "Producto no existe en el carrito",
      status: 404,
    };

  delete cartFromCookies[productId];

  const saved = await saveCartToCookies(cartFromCookies);

  return saved
    ? { success: true, status: 200 }
    : { success: false, message: "No se pudo guardar el carrito", status: 500 };
};

export const getCartFromCookies = async (): Promise<Cart> => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("cart")?.value;

  try {
    return cookieValue ? JSON.parse(cookieValue) : {};
  } catch (error) {
    console.error("Error al parsear la cookie del carrito:", error);
    return {};
  }
};

const saveCartToCookies = async (cartFromCookies: Cart): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "cart",
      value: JSON.stringify(cartFromCookies),
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return true;
  } catch (error) {
    console.error("Error al guardar la cookie del carrito:", error);

    return false;
  }
};

export const getProductsInCart = async (): Promise<ProductInCart[]> => {
  const cartFromCookies = await getCartFromCookies();
  const ids = Object.keys(cartFromCookies);

  if (ids.length === 0) return [];

  const foundProducts = await prisma.product.findMany({
    where: { id: { in: ids } },
  });

  const productsInCart: ProductInCart[] = foundProducts.map((product) => ({
    product,
    quantity: cartFromCookies[product.id],
  }));

  return productsInCart;
};
