# GTA - Frontend

Este es un proyecto frontend para un sistema de autenticación y gestión de usuarios (CRUD) desarrollado con React, Vite, y Axios, con la finalidad de consumir el proyecto `https://github.com/ACSBITMEN/Login-Backend`. Proporciona una interfaz de usuario para la autenticación (login) y la gestión de usuarios, incluyendo operaciones CRUD, accesibles solo para usuarios con rol de administrador realizando solicitudes HTTP.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

![](https://raw.githubusercontent.com/ACSBITMEN/Login-Frontend/main/public/readmeImg1.jpg)

Esta estructura de carpetas fue elegida para mantener una clara separación de responsabilidades y modularidad en la aplicación. La carpeta src es el núcleo del proyecto, donde se encuentran todos los archivos relacionados con la lógica y el renderizado de la aplicación.

- **api/**: Maneja las solicitudes HTTP configuradas con Axios (axiosConfig.js), permitiendo centralizar la configuración y el manejo de errores para todas las peticiones de la aplicación.
- **assets/**: Contiene recursos estáticos como imágenes, iconos y fuentes que se utilizarán en la interfaz de usuario.
- **components/**: Incluye componentes reutilizables, como LoginForm.jsx y Navbar.jsx, que se utilizan en distintas partes de la aplicación para evitar la duplicación de código.
- **context/**: Gestiona el estado global de la aplicación utilizando los contextos de React. Contiene AuthProvider.jsx para el manejo de la autenticación y useAuth.jsx para acceder a ese contexto de manera más sencilla en los componentes.
- **pages/**: Alberga las vistas completas de la aplicación. Cada archivo en esta carpeta representa una página específica, como AdminUser.jsx para el CRUD de usuarios (solo accesible para administradores), Login.jsx para la página de inicio de sesión, y Dashboard.jsx para la vista principal una vez que el usuario está autenticado.
- **routes/**: Define las rutas de la aplicación y controla la navegación. Incluye PrivateRoute.jsx para proteger las rutas que requieren autenticación y Routes.jsx para gestionar todas las rutas de la aplicación.
- **services//**: Contiene la lógica de negocio relacionada con las peticiones HTTP al backend. Incluye userService.js para realizar operaciones como obtener, crear, actualizar y eliminar usuarios.
- **styles/**: Agrupa todas las hojas de estilo, dividiéndolas en estilos específicos para componentes y páginas. Esto facilita el mantenimiento y la gestión de los estilos, permitiendo una separación clara entre la lógica de la aplicación y su apariencia.
- **utils/**: Almacena funciones auxiliares y utilidades, como jwtUtils.jsx que proporciona funciones para decodificar y verificar tokens JWT, ayudando a mantener la lógica principal de los componentes más limpia y organizada.

- **App.jsx**: Configuración principal de la aplicación, incluyendo la definición de las rutas y la estructura general del layout.
- **main.jsx**: Punto de entrada de la aplicación, donde React se monta en el DOM
- **index.html**: Archivo HTML principal de la aplicación, utilizado por Vite para inyectar el código JavaScript compilado.


## Dependencias

Estas son las principales dependencias utilizadas en el proyecto:

- **axios**: Para realizar solicitudes HTTP a la API del backend.
- **jwt-decode**: Para decodificar los tokens JWT y verificar la autenticación.
- **prop-types**: Para la validación de los props en los componentes.
- **react**: Biblioteca para construir interfaces de usuario.
- **react-dom**: Enlace de React para el DOM.
- **react-router-dom**: Para la gestión de rutas y navegación en la aplicación.

### DevDependencies

- **@vitejs/plugin-react**: Plugin para integrar React con Vite.
- **eslint** y complementos: Herramienta para asegurar la calidad del código.
- **vite**: Herramienta de construcción rápida para proyectos de front-end.

## Instalación y Ejecución

### Requisitos previos

- Node.js y npm (Node Package Manager) deben estar instalados en tu sistema.

### Instrucciones de instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/ACSBITMEN/Login-Frontend.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd frontend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

5. Accede a la aplicación en tu navegador en `http://localhost:3000`. (o en donde corra tu backend, recuerda este proyecto esta hecho en base al proyecto Login - Backend `https://github.com/ACSBITMEN/Login-Backend`)

## Uso

La aplicación proporciona una interfaz de usuario para la autenticación y gestión de usuarios. Solo los usuarios autenticados con el rol de administrador pueden acceder a la vista `AdminUser` para realizar operaciones CRUD sobre otros usuarios. La aplicación utiliza `axios` para interactuar con el backend, manejando el token de autenticación y los estados de las solicitudes.

## Comunicación con la API

Las solicitudes HTTP se configuran en el archivo `axiosConfig.js` dentro de la carpeta `api/`. Las peticiones se envían con el token de autenticación incluido en los encabezados, si el usuario ha iniciado sesión.

Ejemplos de funciones de la API:

### API "/auth" Rutas de authenticación 

- **POST /auth/login**: Iniciar sesión y obtener un token:
    ```bash
    {
    "username": "exampleuser",
    "password": "password123"
    }
    ```

### API "/user" Rutas de Usuarios

Nota: Solo los usuarios autenticados con el rol de administrador (rol_id = 1) pueden acceder a estas rutas.

- **GET /user**: Obtener todos los usuarios.
- **POST /user**: Crear un nuevo usuario. 
Ejemplo JSON
    ```bash
    {
      "username": "UserPrueba",
      "first_name": "User",
      "last_name": "Prueba",
      "password": "prueba01",
      "email": "testuser@example.com",
      "role_id": 2
    }
    ```

- **PUT /user/#ID**: Actualizar un usuario por ID.
- **DELETE /user/#ID**: Eliminar un usuario por ID.


## Notas Adicionales

- **Autenticación**: La aplicación utiliza Context API para manejar la autenticación y el estado del usuario a nivel global.
- **Rutas Protegidas**: Algunas rutas están protegidas y solo son accesibles si el usuario está autenticado.
- **Estilos**: La aplicación utiliza CSS modular para estilos específicos de componentes y páginas.

---

¡Gracias por usar este proyecto! No dudes en contribuir o reportar problemas en el repositorio.

