import 'dotenv/config';
import express from 'express';
import  cors from 'cors';
import https  from 'https';
import http from 'http';
import siteRoutes  from './routes/site';
import adminRoutes from  './routes/admin';
import { requestItercepter } from './utils/requestIntercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all('*', requestItercepter)

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server | https.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
}


const regularServer = http.createServer(app);
if(process.env.NODE_ENV === 'production') {
    
}else{
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
    }
    