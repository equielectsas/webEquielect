"use client";

export default function ProductGhostPLP() {
  return (
    <div
      className="border border-dashed border-gray-700 bg-black/90 h-full flex flex-col justify-between opacity-70"
      style={{ borderRadius: 0 }}
    >
      {/* Imagen fantasma */}
      <div className="h-64 bg-black flex items-center justify-center">
        <span className="text-gray-600 text-xs uppercase tracking-widest">
          Próximamente
        </span>
      </div>

      {/* Info fantasma */}
      <div className="p-4">
        <div className="h-3 w-2/3 bg-gray-700 mb-2" />
        <div className="h-3 w-1/2 bg-gray-700 mb-4" />

        <div className="h-4 w-1/3 bg-gray-600 mb-3" />

        <div className="h-8 w-full bg-gray-800" />
      </div>
    </div>
  );
}
