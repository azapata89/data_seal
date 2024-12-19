const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json()); // Middleware para procesar JSON

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
    const { fullName, documentType, documentNumber, signature } = req.body;

    // Configuración de transporte para el correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andreszapata89@gmail.com', // Cambia esto por tu correo
            pass: 'iaur ooed brzx fbvj'
        }
    });

    // Opciones del correo
    const mailOptions = {
        from: 'andreszapata89@gmail.com', // Cambia esto por tu correo
        to: 'andreszapata89@gmail.com', // Cambia esto por el destinatario
        subject: 'Consentimiento Informado',
        html: `
            <p>El paciente <strong>${fullName}</strong>, identificado con 
            <strong>${documentType} ${documentNumber}</strong>, ha firmado el consentimiento informado.</p>`,
        attachments: [
            {
                filename: 'signature.png',
                content: signature.split('base64,')[1],
                encoding: 'base64'
            }
        ]
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend escuchando en el puerto ${PORT}`));