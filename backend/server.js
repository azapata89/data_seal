const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const PDFDocument = require('pdfkit'); // Importar pdfkit
const fs = require('fs'); // Para manejar archivos temporales
const path = require('path');

// Crear la carpeta 'temp' si no existe
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
    console.log('Carpeta temp creada.');
}
const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
    const { fullName, documentType, documentNumber, signature } = req.body;

    // Crear el PDF
    const doc = new PDFDocument();
    const pdfPath = `./temp/consentimiento-${Date.now()}.pdf`; // Ruta temporal para el PDF
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);
    doc.fontSize(18).text('Consentimiento Informado', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`
        De conformidad con la Ley 1581 de 2012, autorizo el tratamiento de mis
        datos personales conforme a las siguientes condiciones:
        
        1. Gestión administrativa y operativa.
        2. Cumplimiento de obligaciones legales.
        3. Realización de estudios y encuestas de satisfacción.
    `);
    doc.moveDown();
    doc.text(`Paciente: ${fullName}`, { align: 'left' });
    doc.text(`Documento: ${documentType} ${documentNumber}`, { align: 'left' });
    doc.moveDown();

    // Agregar la firma como imagen al PDF
    const signatureData = signature.split('base64,')[1];
    const signatureBuffer = Buffer.from(signatureData, 'base64');
    doc.text('Firma del paciente:', { align: 'left' });
    doc.image(signatureBuffer, { fit: [200, 100], align: 'left' });

    doc.end();

    // Esperar a que el PDF se termine de escribir
    writeStream.on('finish', async () => {
        // Configuración de transporte para el correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'andreszapata89@gmail.com',
                pass: 'iaur ooed brzx fbvj'
            }
        });

        // Opciones del correo
        const mailOptions = {
            from: 'andreszapata89@gmail.com',
            to: 'andreszapata89@gmail.com',
            subject: 'Consentimiento Informado',
            html: `
                <p>El paciente <strong>${fullName}</strong>, identificado con 
                <strong>${documentType} ${documentNumber}</strong>, ha firmado el consentimiento informado.</p>`,
            attachments: [
                {
                    filename: 'consentimiento.pdf',
                    path: pdfPath // Adjuntar el PDF generado
                }
            ]
        };

        try {
            // Enviar el correo
            await transporter.sendMail(mailOptions);
            fs.unlinkSync(pdfPath); // Eliminar el archivo temporal después de enviar el correo
            res.status(200).json({ message: 'Correo enviado exitosamente con el PDF adjunto.' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ error: 'Error al enviar el correo' });
        }
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend escuchando en el puerto ${PORT}`));