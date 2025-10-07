import { getCartFromCookies } from "@/features/dashboard/shopping-cart/actions/shopping-cart-actions";
import { CiShoppingBasket } from "react-icons/ci";

export const CartBadget = async () => {
  const cartCookie = await getCartFromCookies();

  const total = Object.values(cartCookie).reduce((a, b) => a + b, 0);

  return (
    <>
      {total > 0 && (
        <span className="flex w-6 justify-center text-xl font-bold text-blue-600 transition-all">
          {total}
        </span>
      )}
      <CiShoppingBasket size={25} />
    </>
  );
};
