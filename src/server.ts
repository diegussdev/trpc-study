import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter, createContext } from './router';
const express = require('express');
const app = express();

app.use(express.json());

const apiEndpoint = '/trpc';

app.listen(3000, () => {
    console.log("Server running...");
});

app.use(apiEndpoint, trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
}));