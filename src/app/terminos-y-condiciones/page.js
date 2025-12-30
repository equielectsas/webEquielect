"use client";

import React, { useState, useEffect } from "react";

const Terminos = () => {
  const [sections, setSections] = useState({
    terms: false,
    privacy: false,
    dataTreatment: false,
    rights: false,
  });

  useEffect(() => {
    const section = window.location.hash.substring(1);
    if (section && sections.hasOwnProperty(section)) {
      setSections((prev) => ({ ...prev, [section]: true }));
    }
  }, []);

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-lg font-semibold mb-2 text-gray-800">
        Términos y Condiciones
      </h1>
      <p className="text-gray-600 mb-8">
        Bienvenido a Equielect. Por favor, lea atentamente los siguientes
        términos que rigen el uso de nuestros servicios y sitio web.
      </p>

      <div id="terms" className="border-t mb-4">
        <button
          onClick={() => toggleSection("terms")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Términos de Uso
          <span>{sections.terms ? "-" : "+"}</span>
        </button>
        {sections.terms && (
          <div className="p-4 bg-gray-50 text-gray-800">
            <p>
              Al utilizar nuestros servicios, aceptas cumplir con los términos
              descritos aquí. El uso indebido de los servicios está prohibido,
              incluyendo actividades como el uso no autorizado de contenido o
              datos del sitio.
            </p>
            <ul className="list-disc pl-6">
              <li>
                Acceso y uso de contenido bajo licencia exclusiva de Equielect.
              </li>
              <li>
                Prohibición de distribución no autorizada de nuestro material.
              </li>
              <li>
                Cumplimiento con las leyes locales e internacionales aplicables.
              </li>
            </ul>
          </div>
        )}
      </div>

      <div id="privacy" className="border-t mb-4">
        <button
          onClick={() => toggleSection("privacy")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Política de Privacidad
          <span>{sections.privacy ? "-" : "+"}</span>
        </button>
        {sections.privacy && (
          <div className="p-4 bg-gray-50 text-gray-800">
            <p>
              Tu privacidad es importante para nosotros. A continuación, te
              explicamos cómo manejamos y protegemos tu información personal
              cuando usas nuestros servicios.
            </p>
            <ul className="list-disc pl-6">
              <li>
                Recopilamos datos personales solo cuando es necesario para
                ofrecerte nuestros servicios.
              </li>
              <li>
                Protegemos tus datos con medidas de seguridad robustas para
                proteger tu información.
              </li>
              <li>
                Respetamos tu derecho a solicitar la modificación o eliminación
                de tus datos.
              </li>
            </ul>
          </div>
        )}
      </div>

      <div id="dataTreatment" className="border-t mb-4">
        <button
          onClick={() => toggleSection("dataTreatment")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Tratamiento de Datos Personales
          <span>{sections.dataTreatment ? "-" : "+"}</span>
        </button>
        {sections.dataTreatment && (
          <div className="p-4 bg-gray-50 text-gray-800">
            <p>
              El tratamiento de los datos personales cumple con la Ley 1581 de
              2012 y el Decreto 1377 de 2013, garantizando el derecho a la
              privacidad y confidencialidad.
            </p>
            <ul className="list-disc pl-6">
              <li>
                Uso exclusivo de datos para propósitos de prestación de
                servicios.
              </li>
              <li>
                Procedimientos para garantizar el acceso y la rectificación de
                tus datos.
              </li>
              <li>
                Políticas de retención y eliminación de información según los
                estándares legales.
              </li>
            </ul>
          </div>
        )}
      </div>

      <div id="rights" className="border-t mb-4">
        <button
          onClick={() => toggleSection("rights")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Derechos Reservados
          <span>{sections.rights ? "-" : "+"}</span>
        </button>
        {sections.rights && (
          <div className="p-4 bg-gray-50 text-gray-800">
            <p>
              Todo el contenido del sitio, incluidos textos, gráficos, logotipos
              y software, es propiedad exclusiva de Equielect y está protegido
              por las leyes de derechos de autor.
            </p>
            <ul className="list-disc pl-6">
              <li>
                No se permite reproducir, modificar o distribuir contenido sin
                permiso previo.
              </li>
              <li>El uso no autorizado puede resultar en sanciones legales.</li>
              <li>
                Las marcas y logotipos están registrados y protegidos
                legalmente.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminos;
