require('dotenv').config();
const express = require('express');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
 console.log(`Server corriendo en http://localhost:${PORT}`);
});
