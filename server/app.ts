// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';
import * as flash from 'connect-flash';
import * as session from 'express-session';
import setRoutes from './routes';
import setPassport from './config/passport';
import User from './models/user';
import * as compression from 'compression';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as https from 'https';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();



const app = express();

app.use(compression());
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
const sslOptions = {
  key: readFileSync(process.env.CERT_ROOT + 'neurim_com.key'),
  cert: readFileSync(process.env.CERT_ROOT + '914ec6ddaaa08331.crt'),
  ca: readFileSync (process.env.CERT_ROOT + 'gd_bundle-g2-g1.crt')
 };
const DIST_FOLDER = join(process.cwd(), 'dist');
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER));

// Angular Server
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../middle/main.bundle');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
// End angular

app.all(/.*/, function (req, res, next) {
  const host = req.header('host');
  if (host.match(/^www\..*/i)) {
      if (req.protocol === 'http') {
          res.redirect(301, 'https://' + host + req.url);
      }
      next();
  } else {
      res.redirect(301, 'https://www.' + host + req.url);
  }
});


app.use(bodyParser.json({limit: '300mb'}));
app.use(bodyParser.urlencoded({limit: '300mb', extended: false }));

app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI, { useMongoClient : true });
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

// passport
// require('./config/passport')(passport);
setPassport(passport);
app.use(session({
  secret: process.env.SECRET_TOKEN,
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app, passport);

  // Server static files from /browser
  app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

  // All regular routes use the Universal engine
  app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), {
      req,
      res,
      providers: [{
        provide: 'serverUrl',
        useValue: `${req.protocol}://${req.get('host')}`
      }]
    });
  });
  const server = https.createServer(sslOptions, app).listen(4000, function(){
    console.log('Express server listening on port 4000');
  });
  app.listen(app.get('port'), () => {
    console.log('Angular Full Stack listening on port ' + app.get('port'));
  });

});

export { app };
