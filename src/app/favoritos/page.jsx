"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "@/context/Favorites/FavoritesContext";
import { useCart } from "@/context/Cart/CartContext";

export default function FavoritosPage() {
  const favCtx = useFavorites();
  const cartCtx = useCart();

  // ✅ Soporta diferentes nombres de props (por si tu contexto usa items/favorites/list)
  const favorites = useMemo(() => {
    return (
      favCtx?.favorites ||
      favCtx?.items ||
      favCtx?.list ||
      favCtx?.favoriteItems ||
      []
    );
  }, [favCtx]);

  // ✅ Helpers para acciones (se adaptan a tu contexto)
  const removeFav =
    favCtx?.removeFavorite ||
    favCtx?.remove ||
    favCtx?.deleteFavorite ||
    favCtx?.toggleFavorite; // si tu toggle sirve para quitar

  const clearFavs = favCtx?.clearFavorites || favCtx?.clear || favCtx?.reset;

  // Carrito (ajusta según tu CartContext)
  const addToCart =
    cartCtx?.addToCart || cartCtx?.add || cartCtx?.addItem || (() => {});

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>{" "}
          <span className="mx-2">{">"}</span>
          <span className="text-gray-700 font-medium">Favoritos</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-equielect-blue flex items-center gap-2">
              <Heart className="text-equielect-blue" size={22} />
              Mis favoritos
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Guarda productos para comprarlos después.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 bg-white text-equielect-blue font-semibold hover:bg-black/5 transition"
              style={{ borderRadius: 8 }}
            >
              <ArrowLeft size={16} />
              Seguir comprando
            </Link>

            {favorites.length > 0 && clearFavs && (
              <button
                type="button"
                onClick={() => clearFavs()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-equielect-blue text-white font-semibold hover:opacity-95 transition"
                style={{ borderRadius: 8 }}
              >
                <Trash2 size={16} />
                Vaciar favoritos
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div
            className="border border-gray-200 bg-gray-50 p-8 sm:p-10 text-center"
            style={{ borderRadius: 12 }}
          >
            <div className="mx-auto h-12 w-12 grid place-items-center bg-white border border-gray-200"
              style={{ borderRadius: 9999 }}
            >
              <Heart size={20} className="text-equielect-blue" />
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              Aún no tienes favoritos
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Cuando marques un producto con ❤️, aparecerá aquí.
            </p>

            <Link
              href="/productos"
              className="inline-flex mt-6 items-center justify-center px-6 py-3 bg-equielect-yellow text-black font-extrabold hover:opacity-95 transition"
              style={{ borderRadius: 10 }}
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Count */}
            <div className="text-sm text-gray-600 mb-4">
              Tienes <span className="font-bold">{favorites.length}</span>{" "}
              producto(s) en favoritos.
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favorites.map((p, idx) => {
                // ✅ Campos típicos (adapta si tus productos usan otros nombres)
                const id = p?.id ?? p?._id ?? idx;
                const title = p?.title ?? p?.name ?? p?.nombre ?? "Producto";
                const slug = p?.slug ?? p?.handle ?? p?.id ?? "";
                const href = p?.href || (slug ? `/producto/${slug}` : "#");
                const img = p?.image || p?.img || p?.thumbnail || "/assets/placeholder.png";
                const price =
                  p?.price ?? p?.precio ?? p?.priceCOP ?? null;

                return (
                  <div
                    key={id}
                    className="border border-gray-200 bg-white overflow-hidden hover:shadow-md transition"
                    style={{ borderRadius: 12 }}
                  >
                    {/* Imagen */}
                    <Link href={href} className="block">
                      <div className="relative w-full h-[190px] bg-gray-50">
                        <Image
                          src={img}
                          alt={title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-4">
                      <Link href={href} className="block">
                        <p className="text-sm font-extrabold text-gray-900 line-clamp-2 hover:underline">
                          {title}
                        </p>
                      </Link>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-equielect-blue font-extrabold">
                          {price != null
                            ? new Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency: "COP",
                                maximumFractionDigits: 0,
                              }).format(Number(price))
                            : "—"}
                        </p>

                        {/* Quitar */}
                        {removeFav && (
                          <button
                            type="button"
                            onClick={() => removeFav(p)}
                            className="h-9 w-9 grid place-items-center hover:bg-black/5 transition"
                            style={{ borderRadius: 10 }}
                            aria-label="Quitar de favoritos"
                            title="Quitar"
                          >
                            <Trash2 size={16} className="text-gray-700" />
                          </button>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(p)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-equielect-yellow text-black font-extrabold hover:opacity-95 transition"
                          style={{ borderRadius: 10 }}
                        >
                          <ShoppingCart size={16} />
                          Agregar al carrito
                        </button>

                        <Link
                          href={href}
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 text-equielect-blue font-semibold hover:bg-black/5 transition"
                          style={{ borderRadius: 10 }}
                        >
                          Ver producto
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
