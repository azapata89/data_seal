# **DataSeal**

## **Descripción del Proyecto**
**DataSeal** es una solución diseñada para capturar, gestionar y validar las autorizaciones para el tratamiento de datos personales, cumpliendo con las normativas colombianas (Ley 1581 de 2012 y el Decreto 1377 de 2013). Este proyecto permite recolectar la firma digital del titular de los datos, junto con información que lo identifique, y registrar dicha autorización con trazabilidad (hora y ubicación de la firma).

El sistema facilita el envío del documento firmado a un correo electrónico definido, lo que permite un manejo seguro y organizado de las autorizaciones para cualquier entidad que lo implemente.

---

## **Características Principales**
- **Captura de Datos Personales**:
  - Registro de datos básicos del titular (nombre, tipo y número de documento).
  - Presentación de un documento de autorización para el tratamiento de datos personales.

- **Firma Digital**:
  - Captura de la firma digital del titular utilizando una interfaz interactiva.
  - Generación de un documento con la firma digital integrada.

- **Envío de Autorización por Correo Electrónico**:
  - Registro del consentimiento firmado y su envío automatizado a un correo electrónico predefinido.

- **Trazabilidad**:
  - Registro de la hora exacta y, opcionalmente, la ubicación geográfica de la firma.

- **Cumplimiento Legal**:
  - Adaptado a las normativas colombianas de protección de datos personales.

---

## **Tecnologías Utilizadas**
- **Frontend**:
  - **Vue 3**: Para construir la interfaz de usuario.
  - **JavaScript**: Para la interacción con el usuario y la lógica de la firma.
  - **Axios**: Para la comunicación entre el frontend y el backend.

- **Backend**:
  - **Node.js**: Para gestionar las solicitudes y procesar los datos.
  - **Nodemailer**: Para el envío de correos electrónicos.
  - **Express**: Para la configuración del servidor backend.

- **Contenerización**:
  - **Docker**: Para contenerizar el proyecto y facilitar el despliegue.
  - **Docker Compose**: Para orquestar el frontend y el backend.

---

## **Estructura del Proyecto**
project/
├── backend/             # Código y configuración del backend
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
├── frontend/            # Código y configuración del frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── App.vue
│   │   ├── main.js
├── docker-compose.yml   # Configuración para Docker Compose
└── README.md            # Documentación del proyecto

---

## **Configuración y Ejecución**
1. **Clonar el Proyecto**:
   ```bash
   git clone https://github.com/tu-usuario/data_seal.git
   cd data_seal

	2.	Ejecutar con Docker:
docker-compose up --build

3.	Acceso a la Aplicación:
 
	Acceso a la Aplicación:
	•	Frontend: http://localhost:8080
	•	Backend: http://localhost:3000


## Licencia

Este proyecto está licenciado bajo los términos de la MIT License.

