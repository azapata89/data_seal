<template>
  <div id="app">
    <h1>Bienvenido a DataSeal</h1>
    <p>Haz clic en el botón de abajo para empezar a firmar.</p>
    <button @click="navigateToForm">Ir al Formulario</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToForm() {
      console.log('Aquí puedes redirigir a un formulario.');
    },
  },
};
</script>