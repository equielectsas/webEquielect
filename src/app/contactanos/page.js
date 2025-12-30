"use client";

import { useState } from "react";
import ThankYouPage from "@/components/utils/ThankYouPage/ThankYouPage";

const ContactPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChangeField = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3900/api/guardar", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userInfo),
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       setIsSubmitted(true);
  //     } else {
  //       alert("Hubo un error al enviar el mensaje");
  //     }
  //   } catch (error) {
  //     console.error("Error al enviar el mensaje:", error);
  //     alert("No se pudo enviar el mensaje. Intenta de nuevo.");
  //   }
  // };
  const onSubmit = async (e) => {
  e.preventDefault();

  try {
    // Cambia esta línea para usar la ruta correcta
    const response = await fetch("http://localhost:3900/api/mensajes/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Error al enviar el mensaje");
    }

    if (data.success) {
      setIsSubmitted(true);
    } else {
      alert(data.message || "Hubo un error al enviar el mensaje");
    }
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    alert(error.message || "No se pudo enviar el mensaje. Intenta de nuevo.");
  }
};

  if (isSubmitted) {
    return (
      <ThankYouPage
        title="¡Mensaje enviado con éxito!"
        message="Hemos recibido tu mensaje. En breve nos pondremos en contacto contigo para resolver tus inquietudes."
        buttonText="Ir al inicio"
        redirectPath="/"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-left text-xl font-semibold text-gray-800">
            Contáctanos
          </h2>
          <p className="text-left mt-4 text-medium text-gray-600">
            Déjanos tu mensaje. Estamos aquí para ayudarte.
          </p>
        </div>

        <form
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={onSubmit}
        >
          <div className="col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
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
              className="mt-2 w-full p-3 border border-gray-300 focus-visible:outline-0 focus-visible:border-[#343434]"
              placeholder="Tu nombre"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-700"
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
              className="mt-2 w-full p-3 border border-gray-300 focus-visible:outline-0 focus-visible:border-[#343434]"
              placeholder="Tus apellidos"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
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
              className="mt-2 w-full p-3 border border-gray-300 focus-visible:outline-0 focus-visible:border-[#343434]"
              placeholder="Tu correo electrónico"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700"
            >
              Teléfono (opcional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={userInfo.phone}
              onChange={onChangeField}
              className="mt-2 w-full p-3 border border-gray-300 focus-visible:outline-0 focus-visible:border-[#343434]"
              placeholder="Número de teléfono"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700"
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
              className="mt-2 w-full p-3 border border-gray-300 focus-visible:outline-0 focus-visible:border-[#343434]"
              placeholder="Escribe tu mensaje aquí"
            ></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold text-white bg-gray-800 hover:bg-gray-700 transition"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
