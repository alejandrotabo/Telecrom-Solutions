# TeleCrom Solutions


El proyecto esta organizado para que cada persona sepa donde trabajar:

```text
app/
  models/       Datos y reglas del negocio.
  views/        HTML que ve el usuario y plantillas de interfaz.
  controllers/  Eventos, navegacion y comunicacion entre modelo y vista.
public/
  assets/       Imagenes y otros recursos estaticos.
  css/          Estilos visuales compartidos.
index.html      Punto de entrada compatible que abre la vista principal.
```

## Como funciona

1. Una vista HTML carga su controlador.
2. El controlador escucha clics y formularios.
3. El controlador pide o modifica datos en un modelo.
4. La vista vuelve a dibujar la informacion actualizada.

Por ejemplo, en el dashboard:

- `app/models/dashboard-model.js` guarda productos, cuenta y persistencia.
- `app/views/dashboard-view.js` genera tarjetas, tienda, estadisticas y formularios.
- `app/controllers/dashboard-controller.js` conecta los eventos y cambia de seccion.

## Vistas disponibles

- `app/views/home.html`: pagina publica.
- `app/views/login.html`: inicio de sesion.
- `app/views/register.html`: registro de clientes.
- `app/views/dashboard.html`: portal del cliente.

La persistencia actual usa `localStorage` para demostracion. Cuando se conecte PHP/MVC, las operaciones del modelo deben reemplazarse por llamadas al backend sin cambiar la vista.

## Ejecutar localmente

Desde `telecrom-website`:

```powershell
python -m http.server 8000
```

Luego abrir `http://localhost:8000/`.
