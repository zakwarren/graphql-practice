const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const fileUpload = require('./middleware/file-upload');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(fileUpload.imageUpload);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(auth);

app.put('/post-image', (req, res, next) => {
    if (!req.isAuth) {
        const error = new Error('Not authenticated');
        error.statusCode = 403;
        throw error;
    }
    if (!req.file) {
        return res.status(200).json({ message: 'No file provided' });
    }
    if (req.body.oldPath) {
        fileUpload.clearImage(oldPath);
    }
    return res.status(201).json({
        message: 'File stored',
        filePath: req.file.path.replace('\\', '/')
    });
});

app.use('/graphql', graphqlHttp({
    schema:graphqlSchema,
    rootValue: graphqlResolver,
    customFormatErrorFn: error => {
        return {
            message: error.message || 'An error occurred',
            status: error.code || 500,
            data: error.data || []
        };
    },
    graphiql: true
}));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        process.env.MONGO_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err));
