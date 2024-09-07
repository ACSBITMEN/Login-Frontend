# React + Vite

Estructura de carpetas

src/
│
├── api/
│   └── auth.js         # Maneja las solicitudes HTTP relacionadas con la autenticación (login, etc.)
│
├── components/
│   └── LoginForm.jsx   # El formulario de login, donde el usuario ingresa sus 
credenciales
│
├── context/
│   └── AuthContext.js  # Contexto para manejar la autenticación (guardar y recuperar el token del usuario)
│
├── pages/
│   ├── Login.jsx       # Página principal para el login, se usa dentro de React Router
│   └── Dashboard.jsx   # Página a la que se accede una vez autenticado (visual principal)
│
├── App.jsx             # Configuración principal de la app y las rutas
├── main.jsx            # Punto de entrada de la aplicación, donde se monta React
└── index.css           # Estilos globales
