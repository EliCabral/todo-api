import { MiniExpress } from './lib/mini-express';

const app = new MiniExpress();

// Middleware 1: registra o método e a URL da requisição(cria log)
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    if (next) next();
});

// Middleware 2: verifica a autenticação (simulação)
app.use((req, res, next) => {
    const authenticated = true; 
    if(authenticated) {
        if (next) next(); 
} else {
        res.statusCode = 401;
        res.end('Not authenticated'); 
    }
});

// Middleware 3: Manipula a rota raiz "/"
app.use((req, res, next) => {
    if (req.url === '/') {
        res.write('Welcome to the Home Page');
        res.end(); 
    } else {
        if (next) next(); 
    }
});

// Middleware 4: Manipula a rota about "/about"
app.use((req, res, next) => {
    if (req.url === '/about') {
        res.write('About Page');
        res.end(); 
    } else {
        if (next) next(); 
    }
});

// Middleware final: manipula todas as outras rotas
app.use((req, res) => {
    res.statusCode = 404;
    res.end("404 Not found");
});

app.listen(3000, () => {console.log('Servidor rodando em http://localhost:3000')});
