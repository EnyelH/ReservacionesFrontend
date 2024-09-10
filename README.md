
**************************************************
****CODIGO FUENTE FRONTEND Y CONSUMOS A LA API****
**************************************************

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reservaciones';

// Obtener reservaciones por nombre
export const obtenerReservacionPorNombre = (nombreTitular) => {
  return axios.get(`${BASE_URL}/nombre/${nombreTitular}`);
};

// Actualizar una reservación
export const actualizarReservacion = (id, reservacion) => {
  return axios.put(`${BASE_URL}/${id}`, reservacion);
};

// Borrar una reservación por fecha
export const borrarReservacion = (fecha) => {
  return axios.delete(`${BASE_URL}/fecha/${fecha}`);
};

// Obtener todas las reservaciones
export const getReservaciones = () => {
  return axios.get(BASE_URL);
};

// Obtener reservaciones por nombre (similar al anterior)
export const getReservacionesPorNombre = (nombreTitular) => {
  return axios.get(`${BASE_URL}/nombre/${nombreTitular}`);
};

// Registrar una nueva reservación
export const registrarReservacion = (reservacion) => {
  return axios.post(BASE_URL, reservacion);
};


*****************************************************
******INSTRUCIONES DE USO Y DESPLIEGUE BACKEND*******
*****************************************************

Proyecto no muy grande que en resumen realiza un crud para reservaciones: 

Configuración del Backend (Spring Boot)

1- Pre-requisitos:

	*- Java 11 o superior instalado en tu sistema.
	*- Maven o Gradle configurado como gestor de dependencias.
	*- PostgreSQL (o la base de datos que estás utilizando) instalado y en ejecución.

2- Configuración de la base de datos (PostgreSQL):

	*- Asegurarnos de tener una base de datos configurada en este caso usaremos PostgreSQL
   	   CREATE DATABASE reservaciones

	*- Configurar el archivo application.properties o application.yml con los detalles de conexión de la base de datos:
		spring.datasource.url=jdbc:postgresql://localhost:5432/reservaciones
		spring.datasource.username=tu_usuario
		spring.datasource.password=tu_contraseña
		spring.jpa.hibernate.ddl-auto=update
		spring.jpa.show-sql=true

3- Compilación y ejecución del proyecto Spring Boot:

	*-Desde la línea de comandos, en la carpeta raíz del proyecto, ejecuta: 
		mvn clean install
		mvn spring-boot:run

	*-Esto iniciará el servidor backend en el puerto configurado (por defecto 8080). 
	  Puedes acceder a la API en http://localhost:8080.

4- Pruebas del backend:

	*-Verifica que la API esté funcionando correctamente accediendo a los endpoints de prueba, como:
	      GET http://localhost:8080/apireservaciones 
	  NOTA: primero debes crear una reservacion antes de consultarla.

	*-Usamos Postman para probar los diferentes endpoints del API.
	  NOTA: la documentacion de Postman esta en el archivo de texto del BACKEND.
	  link: https://warped-astronaut-279843.postman.co/workspace/Heinsohn-Panas~666a932b-e0ba-415c-870a-282cc0ba6f49/documentation/26045723-8ef2eb95-5a06-4b59-96e2-af84026e1526

***************************************************
******INSTRUCIONES DE USO Y DESPLIEGUE BACKEND*****
***************************************************

Configuración del Frontend (React)

1-Pre-requisitos:

	*- Node.js y npm (Node Package Manager) instalados en nuestro sistema.

2-Instalación de dependencias:

	*-Navega a la carpeta del frontend y ejecuta el siguiente comando para instalar las dependencias:
		npm install

	*-Asegúrate de que los archivos package.json incluyan todas las dependencias necesarias como:
 	  react, axios, bootstrap, etc.

3-Configuración de la conexión con el backend:

	*- Asegúrarnos de que las solicitudes de la API en el frontend apunten a la URL correcta
 	   del backend (por ejemplo, http://localhost:8080 si ambos están corriendo en local).
	   NOTA: desde el back configure las conexciones vengan desde cualquier puerto. archivo (WebConfig)

	*- En este caso estamos usando AXIOS:
		axios.get('http://localhost:8080/api/reservaciones')
  			.then(response => {
    				console.log(response.data);
  		});

4-Compilación y ejecución del frontend:

	*-Ejecuta el siguiente comando para iniciar el servidor de desarrollo del frontend:
		npm start

	*-Esto iniciará el servidor frontend en http://localhost:3000, y ya se puede interactuar con la interfaz.
