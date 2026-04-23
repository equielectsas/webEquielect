"use client";

import React, { useState, useEffect } from "react";

const Terminos = () => {
  const [sections, setSections] = useState({
    terms: false,
    privacy: false,
    dataTreatment: false,
    privacyNotice: false,
    dataAuth: false,
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

  const documents = [
    {
      name: "Política Integral 2026",
      filename: "PO 0101-01 POLITICA INTEGRAL 2026.pdf",
      path: "/assets/terminos-condiciones/PO 0101-01 POLITICA INTEGRAL 2026.pdf",
    },
    {
      name: "Política de Sostenibilidad EQUIELECT",
      filename: "PO 0101-02 Política de Sostenibilidad_EQUIELECT.pdf",
      path: "/assets/terminos-condiciones/PO 0101-02 Política de Sostenibilidad_EQUIELECT.pdf",
    },
  ];

  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-lg font-semibold mb-2 text-gray-800">
        Términos y Condiciones
      </h1>
      <p className="text-gray-600 mb-8">
        Bienvenido a Equielect. Por favor, lea atentamente los siguientes
        términos que rigen el uso de nuestros servicios y sitio web.
      </p>

      {/* Términos de Uso */}
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

      {/* Política de Privacidad */}
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

      {/* Tratamiento de Datos Personales */}
      <div id="dataTreatment" className="border-t mb-4">
        <button
          onClick={() => toggleSection("dataTreatment")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Política de Tratamiento de Datos Personales
          <span>{sections.dataTreatment ? "-" : "+"}</span>
        </button>
        {sections.dataTreatment && (
          <div className="p-4 bg-gray-50 text-gray-800 space-y-4">
            <p className="text-sm text-gray-500">
              <strong>Empresa:</strong> EQUIELECT S.A.S. &nbsp;|&nbsp;
              <strong>NIT:</strong> 890.941.103-7 &nbsp;|&nbsp;
              <strong>Sitio web:</strong> www.equielect.com.co &nbsp;|&nbsp;
              <strong>Vigencia:</strong> 1 de enero de 2026
            </p>
            <p>
              En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013,
              EQUIELECT S.A.S. adopta la presente Política de Tratamiento de
              Datos Personales, la cual establece las condiciones bajo las cuales
              se recolectan, almacenan, utilizan, circulan y protegen los datos
              personales obtenidos a través de su sitio web.
            </p>

            <div>
              <h3 className="font-semibold mb-1">
                1. Responsable del tratamiento de datos
              </h3>
              <p>
                EQUIELECT S.A.S., identificada con NIT 890.941.103-7, con
                domicilio en Medellín, Colombia, es responsable del tratamiento
                de los datos personales recolectados a través del sitio web.
              </p>
              <ul className="list-none pl-4 mt-2 space-y-1">
                <li>
                  <strong>Correo electrónico:</strong>{" "}
                  eqsistemas@equielect.com.co
                </li>
                <li>
                  <strong>Teléfono:</strong> 604 444 31 33
                </li>
                <li>
                  <strong>Dirección:</strong> Carrera 72 No. 30 – 53, Medellín
                  (Colombia)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                2. Datos personales recolectados
              </h3>
              <p>
                A través del sitio web se podrán recolectar los siguientes datos
                personales:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nombre y apellidos</li>
                <li>Número de identificación</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de contacto</li>
                <li>Dirección IP y datos de navegación</li>
                <li>Información relacionada con solicitudes o servicios</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">3. Finalidad del tratamiento</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Atender solicitudes, consultas o reclamos realizados a través
                  del sitio web.
                </li>
                <li>Gestionar relaciones comerciales o contractuales.</li>
                <li>
                  Enviar información sobre productos, servicios o novedades de
                  la empresa.
                </li>
                <li>Realizar procesos administrativos internos.</li>
                <li>Dar cumplimiento a obligaciones legales o regulatorias.</li>
                <li>
                  Mejorar la experiencia del usuario y el funcionamiento del
                  sitio web.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">4. Autorización del titular</h3>
              <p>
                Al proporcionar sus datos personales a través del sitio web, el
                titular autoriza de manera previa, expresa e informada a
                EQUIELECT S.A.S. para realizar el tratamiento de sus datos
                personales conforme a lo establecido en la presente política.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">5. Derechos de los titulares</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>
                  Ser informado respecto del uso que se ha dado a sus datos
                  personales.
                </li>
                <li>
                  Presentar quejas ante la autoridad competente por infracciones
                  a la normativa vigente.
                </li>
                <li>
                  Revocar la autorización y/o solicitar la supresión de los
                  datos cuando sea procedente.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                6. Procedimiento para consultas y reclamos
              </h3>
              <p>
                Los titulares podrán presentar consultas o reclamos relacionados
                con sus datos personales mediante comunicación enviada al correo
                electrónico{" "}
                <a
                  href="mailto:eqsistemas@equielect.com.co"
                  className="text-blue-600 underline"
                >
                  eqsistemas@equielect.com.co
                </a>
                . La empresa dará respuesta dentro de los plazos establecidos
                por la normativa aplicable.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                7. Seguridad de la información
              </h3>
              <p>
                EQUIELECT S.A.S. adopta medidas técnicas, humanas y
                administrativas razonables para proteger los datos personales
                contra pérdida, acceso no autorizado, uso indebido o fraude.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                8. Transferencia y transmisión de datos
              </h3>
              <p>
                Los datos personales podrán ser compartidos con proveedores o
                aliados que apoyen la operación del sitio web o la prestación de
                servicios, bajo acuerdos de confidencialidad y protección de
                datos.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">9. Vigencia de la política</h3>
              <p>
                La presente política entra en vigencia a partir del primero de
                enero de 2026 y permanecerá publicada en el sitio web para
                consulta de los titulares.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Aviso de Privacidad */}
      <div id="privacyNotice" className="border-t mb-4">
        <button
          onClick={() => toggleSection("privacyNotice")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Aviso de Privacidad
          <span>{sections.privacyNotice ? "-" : "+"}</span>
        </button>
        {sections.privacyNotice && (
          <div className="p-4 bg-gray-50 text-gray-800 space-y-3">
            <p>
              EQUIELECT S.A.S., identificada con NIT 890.941.103-7, en
              cumplimiento de la Ley 1581 de 2012 de protección de datos
              personales, informa que los datos personales que sean recolectados
              a través de este sitio web serán tratados con las siguientes
              finalidades: atención de consultas, contacto comercial, gestión
              administrativa y envío de información relacionada con nuestros
              productos o servicios.
            </p>
            <p>
              El titular de los datos podrá ejercer sus derechos de conocer,
              actualizar, rectificar o suprimir sus datos personales mediante
              solicitud enviada al correo electrónico{" "}
              <a
                href="mailto:eqsistemas@equielect.com.co"
                className="text-blue-600 underline"
              >
                eqsistemas@equielect.com.co
              </a>
              .
            </p>
            <p>
              La Política de Tratamiento de Datos Personales completa puede
              consultarse en la sección <strong>Política de Tratamiento de Datos Personales</strong> de esta página.
            </p>
          </div>
        )}
      </div>

      {/* Cláusula de Autorización */}
      <div id="dataAuth" className="border-t mb-4">
        <button
          onClick={() => toggleSection("dataAuth")}
          className="w-full flex justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 font-semibold text-left text-gray-800"
        >
          Cláusula de Autorización para Tratamiento de Datos Personales
          <span>{sections.dataAuth ? "-" : "+"}</span>
        </button>
        {sections.dataAuth && (
          <div className="p-4 bg-gray-50 text-gray-800 space-y-3">
            <p>
              Autorizo de manera previa, expresa e informada a EQUIELECT S.A.S.,
              identificada con NIT 890.941.103-7, para que realice el
              tratamiento de los datos personales que suministro a través de
              este formulario web.
            </p>
            <p>El tratamiento de los datos tendrá como finalidades:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Atender solicitudes, consultas o requerimientos.</li>
              <li>
                Contactar al titular para brindar información sobre productos o
                servicios.
              </li>
              <li>Gestionar relaciones comerciales o contractuales.</li>
              <li>Cumplir obligaciones legales.</li>
            </ul>
            <p>
              Como titular de los datos personales, declaro que he sido informado
              sobre mis derechos de conocer, actualizar, rectificar y suprimir
              mis datos personales, así como revocar la autorización otorgada.
            </p>
            <p>
              La Política de Tratamiento de Datos Personales se encuentra
              disponible en la sección <strong>Política de Tratamiento de Datos Personales</strong> de esta página.
            </p>
          </div>
        )}
      </div>

      {/* Derechos Reservados */}
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

      {/* Documentos para visualizar y descargar */}
      <div className="border-t mt-8 pt-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Documentos Corporativos
        </h2>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
                <div className="flex items-center gap-2">
                  {/* PDF icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                    <path d="M8.5 14.5h1.2c.7 0 1.1-.4 1.1-1s-.4-1-1.1-1H8v4h.5v-2zm0-1.5h.7c.4 0 .6.2.6.5s-.2.5-.6.5H8.5v-1zM12 12.5h-1v4h1c.9 0 1.5-.6 1.5-2s-.6-2-1.5-2zm0 3.5h-.5v-3H12c.6 0 1 .4 1 1.5s-.4 1.5-1 1.5zM14.5 12.5v4H15v-1.5h1v-.5h-1v-1.5h1.5v-.5h-2z" />
                  </svg>
                  <span className="font-medium text-gray-800 text-sm">
                    {doc.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveDoc(activeDoc === index ? null : index)
                    }
                    className="text-sm px-3 py-1 border border-gray-400 rounded hover:bg-gray-200 text-gray-700"
                  >
                    {activeDoc === index ? "Ocultar" : "Ver"}
                  </button>
                  <a
                    href={doc.path}
                    download={doc.filename}
                    className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Descargar
                  </a>
                </div>
              </div>
              {activeDoc === index && (
                <div className="w-full bg-gray-200" style={{ height: "600px" }}>
                  <iframe
                    src={doc.path}
                    title={doc.name}
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminos;