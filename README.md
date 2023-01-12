
![Logo](https://static.vecteezy.com/system/resources/previews/002/220/403/non_2x/weather-banner-vector.jpg)


# API de Clima

Una API de clima que permite a los desarrolladores acceder a datos meteorológicos a través de peticiones HTTP. Esta API utiliza Node.js como su plataforma de programación y Fastify como su framework web para manejar las solicitudes y las respuestas HTTP.


## Instalación

Clonar el proyecto

```bash
  git clone https://github.com/Taaddde/weather-backend.git
```

Instalar módulos

```bash
  npm i
```

Se recomienda usar una versión de node ^19.0.0


## Variables de entorno

Para ejecutar este proyecto, se requiere tener un archivo .env ubicado en la raíz del mismo, se puede encontrar una copia del archivo en la carpeta example.env

## API Reference

#### Location

```http
  GET /v1/location
```

#### Current

```http
  GET /v1/current/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | *Optional*. Nombre de la ciudad |

#### Forecast

```http
  GET /v1/forecast/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | *Optional*. Nombre de la ciudad |



## Tests

Para correr los tests, ejecutar el siguiente comando:

```bash
  npm run test
```


## Autor

- [@Taaddde](https://github.com/Taaddde)

