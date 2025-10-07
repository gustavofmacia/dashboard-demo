// /api/seed/
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const todosSeed = [
  { description: "Piedra del alma", complete: true },
  { description: "Piedra del agua" },
  { description: "Piedra del viento" },
  { description: "Piedra del rayo" },
  { description: "Piedra del tiempo" },
];

const productsSeed = [
  {
    name: "Teslo Hoodie",
    price: 15,
    rating: 5,
    imageUrl: "/images/products/1623735-00-A_0_2000.webp",
  },
  {
    name: "Teslo Cap",
    price: 25,
    rating: 3,
    imageUrl: "/images/products/1657916-00-A_1.webp",
  },
  {
    name: "Let the sunshine",
    price: 36,
    rating: 2,
    imageUrl: "/images/products/1700280-00-A_1.webp",
  },
  {
    name: "Cybertruck Hoodie",
    price: 45,
    rating: 5,
    imageUrl: "/images/products/1742702-00-A_0_2000.webp",
  },
];

export async function GET() {
  try {
    await Promise.all([prisma.todo.deleteMany(), prisma.product.deleteMany()]);

    await Promise.all([
      prisma.todo.createMany({ data: todosSeed }),
      prisma.product.createMany({ data: productsSeed }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Database seeded successfully",
        todos: todosSeed.length,
        products: productsSeed.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding database:", error);

    return NextResponse.json(
      { success: false, message: "Error seeding database" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
