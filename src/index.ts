import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  let healthCheck: {
    uptime?: number,
    message?: string,
    timestamp?: number
  } = {};
  try {
    healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    };
    res.json(healthCheck);
  } catch (error: any) {
    healthCheck.message = error.message;
    res.status(503).send();
  }
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

export default app;