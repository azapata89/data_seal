<template>
  <div class="container">
    <h1>Política de Tratamiento de Datos Personales</h1>
    <p>
      DIMA S.A.S., en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, informa a sus usuarios, empleados, contratistas, proveedores y demás partes interesadas sobre los lineamientos y procedimientos adoptados para garantizar el adecuado tratamiento de sus datos personales.
    </p>
    <ul>
      <li>Gestión administrativa y operativa.</li>
      <li>Cumplimiento de obligaciones legales.</li>
      <li>Realización de estudios y encuestas de satisfacción.</li>
    </ul>
    <p>
      Puede consultar la política completa en nuestra página web: <a href="https://www.dima.com.co" target="_blank">www.dima.com.co</a>
    </p>
    <div class="checkbox-container">
      <input type="checkbox" id="acceptPolicy" v-model="acceptPolicy" />
      <label for="acceptPolicy">Acepto los términos de la política</label>
    </div>

    <h2>Firma Digital</h2>
    <canvas
      ref="signatureCanvas"
      width="400"
      height="200"
      style="border: 1px solid black;"
    ></canvas>
    <div class="buttons">
      <button @click="clearSignature">Limpiar Firma</button>
      <button @click="submitForm">Enviar Formulario</button>
    </div>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
import axios from "axios";

export default {
  data() {
    return {
      acceptPolicy: false, // Checkbox para aceptar la política
      signaturePad: null, // Referencia al canvas de la firma
      user: {
        fullName: "Juliana Andrea Pineda",
        documentType: "CC",
        documentNumber: "123456789",
      },
    };
  },
  mounted() {
    // Inicializar SignaturePad
    const canvas = this.$refs.signatureCanvas;
    this.signaturePad = new SignaturePad(canvas);
  },
  methods: {
    clearSignature() {
      // Limpiar el canvas de la firma
      this.signaturePad.clear();
    },
    async submitForm() {
      // Validar que se aceptó la política
      if (!this.acceptPolicy) {
        alert("Debes aceptar la política de tratamiento de datos.");
        return;
      }

      // Validar que la firma no esté vacía
      if (this.signaturePad.isEmpty()) {
        alert("Por favor, firma antes de enviar.");
        return;
      }

      // Convertir la firma a base64
      const signatureData = this.signaturePad.toDataURL();

      // Enviar los datos al backend
      try {
        const payload = {
          ...this.user, // Información del usuario
          signature: signatureData, // Firma digital en formato base64
        };

        await axios.post("http://localhost:3000/send-email", payload);

        alert("Formulario enviado con éxito.");
        this.clearSignature(); // Limpiar el canvas después del envío
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Error al enviar el formulario. Por favor, intente nuevamente.");
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.checkbox-container {
  margin-top: 10px;
}

canvas {
  display: block;
  margin: 10px 0;
}

.buttons button {
  margin-right: 10px;
}
</style>