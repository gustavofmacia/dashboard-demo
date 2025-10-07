import { getServerAuthSession } from "@/lib/auth";
import Image from "next/image";

export const User = async () => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!session) return;

  return (
    <div className="mt-8 text-center">
      <Image
        src={user?.image ?? ""}
        width={100}
        height={100}
        alt=""
        className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
      />
      <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block">
        {user?.name}
      </h5>

      <span className="hidden text-gray-400 capitalize lg:block">
        ({user?.roles?.join(", ")})
      </span>
    </div>
  );
};
