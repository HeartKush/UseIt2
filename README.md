# UseIt-Gestión simple de un equipo de ventas

Este es el link del repositorio del proyecto: https://github.com/HeartKush/UseIt2.git, solo hay que descargarse el repo y correr ‘npm install’ seguido de ‘ng serve’ y se podrá acceder desde http://localhost:4200. Y para iniciar sesión pueden proveer los siguientes datos : usuario : andres@andres.co, contraseña: 123456, también pueden registrarse si gustan.

Este sistema no está 100% completado, sin embargo, el diseño y todas las vistan están a más del 75% completadas, desde mi criterio.

Actualmente el sistema cuenta con una autentificación de usuarios por medio de FirebaseAuth. El sistema aparte de las vistas de Inicio de Sesión y Registro de Usuario cuenta con cinco vistas protegidas las cuales son:
•	Inicio:
o	Sección (Mi Empresa): En esta vista el usuario podrá crear su empresa si no ha creado una antes, se le permitirá crear una a través del botón “Crear Empresa” el cual le desplegará un modal con un form.
o	Sección (Invitados): En esta vista se listarán los Usuarios del sistema que no estén invitados a la empresa asociada al usuario logado.
•	Empresas:
o	Si el usuario no tiene empresa y tampoco este invitado a ninguna empresa, no podrá acceder a la sección de empresas. 
o	Si el usuario no tiene empresa y tampoco este invitado a ninguna empresa, no saldrá el botón de agregar empresa, pero podrá acceder a la sección, saldrá un mensaje invitando a crear una empresa redirigiendo al inicio.
o	Se listarán las empresas clientes a las que el usuario actual tenga acceso, mientras que el usuario tenga acceso a ellas podrá eliminar, editar o crear nuevas empresas cliente y asociarlas a las empresas en las que el este invitado o a su propia empresa.
•	Invitados:
o	En esta vista el usuario podrá invitar otros usuarios a su empresa.
o	Se listarán los invitados a los que el usuario actual tenga acceso.
•	Contactos:
o	En esta vista el usuario podrá crear contactos y asociarlos a una empresa cliente del sistema.
o	Se listarán los Contactos a los que el usuario actual tenga acceso.
•	Oportunidades de negocio:
o	En esta vista el usuario podrá crear oportunidades de negocio entre una empresa cliente y una empresa a la que este invitado o a su propia empresa.
o	Se listarán las oportunidades de negocio a las que el usuario actual tenga acceso.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
