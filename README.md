# JavaScript Moderno: Guía para dominar el lenguaje (Black Jack)

## Acerca de

Este es un repositorio personal para ejecución del proyecto del curso **JavaScript Moderno: Guía para dominar el lenguaje** de **Fernando Herrera** en la plataforma Udemy. Para acceder al curso completo puede hacer [clic aquí](https://www.udemy.com/course/javascript-fernando-herrera/)

El proyecto desarrollado a continuación es un juego de Black Jack para explorar conceptos fundamentales del lenguaj. Por favor abstenerse de usar este código en producción.

## Requerimientos

- Node 20.9.0 LTS

## Instalación del proyecto

Para instalar el proyecto siga los siguientes pasos

Instalar módulos o dependencias

```
npm install
```

## Ejecución del proyecto

Para ejecutar el proyecto se deben seguir los siguientes pasos:

1. Clonar el archivo `.env.template` a `.env`
2. Configurar variables de entorno

```
# Server port
PORT=3000

# Database
MONGO_URL=
MONGO_DB_NAME=

# JWT
JWT_SEED=semilla-para-firmar-jwt
```

3. Levantar las bases de datos

```
docker compose up -d

```

4. Correr el proyecto usando alguno de los siguientes scripts según el entorno

Ejecutar entorno de desarrollo

```
npm run dev
```

Ejecutar entorno de producción

```
npm start
```
