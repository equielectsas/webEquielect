"use client";

import { useState } from "react";

const CotizacionForm = ({ sendCotizacion }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChangeField = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendCotizacion(userInfo);
  };

  const generalClassName =
    "mt-2 w-full p-3 border border-gray-300 focus:ring-gray-500 focus:border-gray-500";

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-white w-full">
      <div className="text-center">
        <p className="text-left mt-4 text-lg text-gray-600">
          Diligencia tus datos y nos contactaremos contigo para compartirte una
          cotización formal.
        </p>
      </div>

      <form
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        onSubmit={onSubmit}
      >
        <div className="col-span-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={userInfo.name}
            onChange={onChangeField}
            required
            className={generalClassName}
            placeholder="Tu nombre"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            value={userInfo.lastname}
            onChange={onChangeField}
            required
            className={generalClassName}
            placeholder="Tus apellidos"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={onChangeField}
            required
            className={generalClassName}
            placeholder="Tu correo electrónico"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={userInfo.phone}
            onChange={onChangeField}
            className={generalClassName}
            placeholder="Número de teléfono"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={userInfo.message}
            onChange={onChangeField}
            rows="6"
            required
            className={generalClassName}
            placeholder="Escribe tu mensaje aquí"
          ></textarea>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold text-white bg-gray-800 hover:bg-gray-700 transition"
          >
            Enviar cotizacion
          </button>
        </div>
      </form>
    </div>
  );
};

export default CotizacionForm;
