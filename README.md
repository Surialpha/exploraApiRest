<h1>API Rest Parque Explora</h1>
<p>El api consta de los siguientes enrutados</p>


| Metodo y ruta                                               | Acción |
| -------------                                               | ------------- |
| GET "/"                                                     | traer todas las experiencias  |
| GET "/:ID"                                                     | Buscar experiencias por su id  |
| PUT "/:ID"                                                     | Actualizar una experiencia  |
| DELETE "/:ID"                                                  | Elimina experiencias por su id  |
| GET "/sala/:nombre"                                                     | Buscar experiencias de una misma sala |

<p>Unicamente es importante enviar información de la siguiente manera si se hace petición por http para la acción de MODIFICAR</p>
<h6>**[{"propName":"NOMBRE_DEL_CAMPO","value":"VALOR_A_MODIFICAR"}]**</h6>

<p>Para iniciar el server el modo desarrollo: npm run test</p>
<p>Para iniciar el server el modo producción: npm run start</p>


