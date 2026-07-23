import express from 'express';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for development frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Register RESTful API v1
app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`[RESTful API Server] Listening on http://localhost:${PORT}`);
  console.log(`[RESTful API Server] Health Check: http://localhost:${PORT}/api/v1/health`);
});
