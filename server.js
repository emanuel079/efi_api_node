const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models'); // Ruta corregida
const userRoutes = require('./src/routes/userRoutes');
const packageRoutes = require('./src/routes/packageRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const destinationRoutes = require('./src/routes/destinationRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', packageRoutes);
app.use('/api', bookingRoutes);
app.use('/api', destinationRoutes);
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3309;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
