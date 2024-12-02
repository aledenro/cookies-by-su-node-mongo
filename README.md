# cookies-by-su-node-mongo

Proyecto NoSQL

# COMANDOS DE INICIO

npm init -y

npm install express mongoose dotenv lodash

npm install --save-dev nodemon

# Instancia para react + vite para FRONT (cliente)

npm create vite

> nombrar proyecto como "client"

> elegir javascript

> entrar a la carpeta de client con "cd client"

npm install

npm run dev

# Correr ambos proyectos

abrir una consola para el backend y otra para el frontend

utilizar en ambas

npm run dev

> backend > localhost:3000
> frontend > locahost:5173

# Instalar tailwind

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

> Luego modificar archivo tailwind.config.js exactamente
> el "content" reemplazarlo por esto:

content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],

> Ahora en el la carpeta de client en src/index.css agrega esto:

@tailwind base;
@tailwind components;
@tailwind utilities;

Puedes volver a correr el Front ahora con tailwind instalado

# Archivo .env

MONGO_URL=mongodb+srv://USER:PASSWORD@COLLECTIONCODE/COLLECTIONAME?retryWrites=true&w=majority

> EJEMPLO 

MONGO_URL=mongodb+srv://user:password@cookiesbysudb.ej38r.mongodb.net/CookiesBySuDB?retryWrites=true&w=majority