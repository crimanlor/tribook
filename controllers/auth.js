const dotenv = require('dotenv');
dotenv.config();

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const getLoginForm = (req, res) => {
    // res.send(`
    //     <form method="POST" action="/login">
    //         <input type="text" name="username" placeholder="Usuario" required />
    //         <input type="password" name="password" placeholder="Contraseña" required />
    //         <button type="submit">Iniciar sesión</button>
    //     </form>
    // `)
    res.render('auth')
}

const postLoginForm = (req, res) => {
    const { username, password } = req.body;
    // TODO.: Crear un modelo de Users. Crear un Schema que guarde los usuarios de tipo administrador en tu base de datos de MongoDB (username, password).

    // TODO+: Crear una pagina para registrar nuevos usuarios administradores

    if(username === USERNAME && password === PASSWORD){
        req.session.isAuthenticated = true;
        res.locals.isAdmin = true;
        req.flash('success_msg', `Sesión iniciada correctamente para el usuario ${username}`);
        return res.redirect('/');
    } else {
        req.flash('error_msg', `Hubo un problema iniciar la sesión. Por favor, inténtalo de nuevo.`);
        return res.redirect('/');
    }
}

const logout = (req, res) => {
    console.log('Logout');
    req.session.destroy(err => {
        if (err){
            req.flash('error_msg', `Hubo un problema cerrar la sesión. Por favor, inténtalo de nuevo.`);
        }
        return res.redirect('/')
    })
}

module.exports = {
    getLoginForm,
    postLoginForm,
    logout
}