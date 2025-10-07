import { ProductCard } from "@/features/dashboard/products";
import prisma from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ take: 10 });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Products page</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={{...product, price: product.price.toString()}} />
        ))}
      </div>
    </div>
  );
}
