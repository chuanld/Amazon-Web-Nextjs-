"use client";
import Link from "next/link";
import React from "react";
import { store } from "../lib/store";
import { useSession } from "next-auth/react";

const FavoriteButton = () => {
  const { data: session } = useSession();
  const { favoriteProduct } = store();
  return (
    <Link
      href={"/favorite"}
      className="text-xs text-gray-100 hidden xl:inline-flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
    >
      <p>Marked</p>
      <p className="text-white font-bold">& Favorite</p>
      {session?.user && (
        <span className="absolute right-1 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazonOrangeDark font-medium rounded-sm">
          {favoriteProduct?.length > 0 ? favoriteProduct?.length : 0}
        </span>
      )}

    </Link>
  );
};

export default FavoriteButton;
