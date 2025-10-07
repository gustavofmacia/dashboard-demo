import { WidgetItem } from "@/features/dashboard";
import { ItemCard } from "@/features/dashboard/shopping-cart";
import { getProductsInCart } from "@/features/dashboard/shopping-cart/actions/shopping-cart-actions";
import type { Metadata } from "next";
import { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Carrito de compras",
};

export default async function CartPage() {
  const productsInCart = await getProductsInCart();

  const subtotal = productsInCart.reduce(
    (sum, { product, quantity }) => sum.add(product.price.mul(quantity)),
    new Prisma.Decimal(0)
  );

  const tax = subtotal.mul(new Prisma.Decimal(0.15));
  const totalToPay = subtotal.add(tax);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Productos en el carrito</h1>

      <div className="flex flex-col gap-4">
        {!productsInCart.length && <div>No hay productos en el carrito</div>}

        {productsInCart.map(({ product, quantity }) => {
          const totalPrice = product.price.mul(quantity);

          const productSerialized = {
            ...product,
            price: product.price.toString(),
          };

          return (
            <ItemCard
              key={product.id}
              product={productSerialized}
              quantity={quantity}
              totalPrice={totalPrice.toString()}
            />
          );
        })}
      </div>

      <WidgetItem title="Total a pagar">
        <div className="mt-2 flex flex-col gap-2">
          <h4 className="text-center text-3xl">${totalToPay.toFixed(2)}</h4>
          <div>Subtotal: ${subtotal.toFixed(2)}</div>
          <div>Impuestos 15%: ${tax.toFixed(2)}</div>
        </div>
      </WidgetItem>
    </div>
  );
}
