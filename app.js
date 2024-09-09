// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// middelware para gestionar aplicaciones de express
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();

// importar las rutas públicas
const indexRoutes = require('./routes/index.js');

// importar las rutas de administrador
const adminRoutes = require('./routes/admin.js');

// rutas de autentificación
const authRoutes = require('./routes/auth.js')

// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

// Configuramos la sesión
app.use(session({
    // Cadena de texto para firmar la cookie de sesión
    secret: 'miSecretoSuperSecreto',
    // Opción que indica que la sesión solo se guardará de nuevo si ha sido modificada para no enviar datos innecesarios
    resave: false,
    // Guarda sesiones nuevas (aunque estén vacías). En producción, podemos cambiarlo a false para optimizar el almacenamiento
    saveUninitialized: true,
    // La cookie se puede enviar a través de conexiones no seguras.
    cookie: { secure: false } // secure: true en producción con HTTPS
}));

app.use((req, res, next) => {
    // La variable req.locals es un objeto que permite almacenar variables globales solo disponibles durante el ciclo de vida de la solicitud actual.
    // En este caso almacena la variable global isAdmin
    // Si el usuario esta autentificado entonces es que es de tipo administrador
    res.locals.isAdmin = req.session.isAuthenticated;
    // tenemos que ejecutar next() para que la petición HTTP siga su curso
    next();
})

// Protegemos las rutas del administrador
app.use('/admin', (req, res, next) => {
    // ¿El usuario está autentificado?
    if(req.session.isAuthenticated){
        // Si es que sí, establecemos que es de tipo administrador
        res.locals.isAdmin = true
        // y permitimos que continúe la petición
        next();
    } else {
        res.redirect('/login')
    }
})

// Todas las rutas que se encuentren en 'indexRouter' estarán prefijados por '/'
app.use('/', indexRoutes);
// Todas las rutas de administrador prefijadas con '/admin'
app.use('/admin', adminRoutes);
app.use(authRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});
