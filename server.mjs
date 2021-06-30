import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import generateToken from './api/token.mjs';
import getBalance from './api/balance.mjs';
import {getApplications, getApplicationByID, updateApplicationByID, createApplication, deleteApplicationByID} from './api/application.mjs';
import { getNumbersByApplicationID } from './api/number.mjs';
import { sendSMS } from './api/sms.mjs';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const privateKey = fs.readFileSync(__dirname + '/private.key', 'utf8');
const app = express();
const apikey = process.env.API_KEY;
const secret = process.env.API_SECRET;

app.use(express.json());
app.set('view engine', 'ejs');

// VIEWS
app.get('/', async (req, res) => {
    res.render('pages/index');
})

app.get('/application', (req, res) => {
    res.render('pages/application');
})

app.get('/application/:id/edit', (req, res) => {
    res.render('pages/edit', {id: req.params.id});
})

app.get('/application/create', (req, res) => {
    res.render('pages/create');
})

app.get('/sms', (req, res) => {
    res.render('pages/sms');
})

// API
app.get('/api/balance', async (req, res, next) => {
    try {
        const balance = await getBalance(apikey, secret);
        res.json(balance);
    } catch(error) {
        next(error)
    }
})

app.get('/api/application', async (req, res, next) => {
    try {
        const applications = await getApplications(apikey, secret);
        res.json(applications);
    } catch(error) {
        next(error)
    }
})

app.get('/api/application/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const application = await getApplicationByID(apikey, secret, id);
        res.json(application);
    } catch(error) {
        next(error)
    }
})

app.post('/api/application/:id/edit', async (req, res, next) => {
    const id = req.params.id;
    try {
        const application = await updateApplicationByID(apikey, secret, id, req.body);
        res.json(application)
    }catch(error) {
        next(error)
    }
})

app.post('/api/application', async (req, res, next) => {
    try {
        const application = await createApplication(apikey, secret, req.body, privateKey);
        res.json(application);
    } catch(error) {
        next(error);
    }
})

app.delete('/api/application/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteApplicationByID(apikey, secret, id);
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

app.get('/api/number/:id', async (req, res, next) => {
    try {
        const numbers = await getNumbersByApplicationID(apikey, secret, req.params.id);
        res.json(numbers);
    } catch (error) {
        next(error);
    }
})

app.post('/api/sms', async (req, res, next) => {
    try {
        const body = req.body;
        const token = generateToken(privateKey, body.application_id);
        const sms = await sendSMS(body.to, body.from, body.message, token);
        res.json(sms);
    } catch (error) {
        next(error);
    }
})

const port = process.env.PORT || 3000;
console.log("starting on port: " + port);
app.listen(port);