const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-gray-100 to-foreground">
      <div className="flex flex-col items-center gap-10 animate-fadeIn">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-gray-300 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-8 border-t-transparent border-yellow-500 animate-spin"></div>
          <div className="absolute inset-10 rounded-full bg-yellow-500 opacity-30"></div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-montserrat font-bold text-gray-700 tracking-wide">
            Procesando su solicitud
          </h1>
          <p className="text-lg text-gray-600 mt-2 animate-blink">
            Esto puede tardar unos segundos...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
