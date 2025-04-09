// server/index.ts (v3: try direct usage with namespace import)
import * as express from 'express';
import * as cors from 'cors';
// keep assessmentroutes import as is for now
import assessmentroutes from './src/routes/assessment';

const app = express(); // <--- use express directly, instead of express.default()

app.use(cors({ origin: '*' })); // <--- use cors directly, instead of cors.default()
app.use(express.json()); // <--- use express.json directly (this is usually correct)

// mount routes
app.use('/api/assessment', assessmentroutes);

const port = process.env.port || 3001; // make sure env var name matches case used in greengeeks
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;