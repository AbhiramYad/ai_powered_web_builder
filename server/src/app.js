import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
	origin: (origin, callback) => {
		// allow requests with no origin (like mobile apps or curl)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
		return callback(new Error('CORS policy: origin not allowed'), false);
	},
	credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
