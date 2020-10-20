# CarServiceClient

### Componentes

- **CarListComponent:**
Permite visualizar la lista de carros y redirigir hacia la lista de los carros con sus propietarios, y hacia la creación o actualización de un carro en particular al dar click sobre el.

- **CarEditComponent:**
Es usado para la creación y actualización de carros, es decir, permite ver el detalle de un carro en particular, así como editarlo o incluso crear un nuevo carro. Además si este posee propietario muestra cuál es, en caso contrario, habilita la opción de agregar propietario y para esto se utiliza el ```DialogLink```, que actua como un popup y se explica más adelante.

- **OwnerListComponent:**
Permite visualizar la lista de propietarios y redirigir hacia la creación o actualización de un propietario en particular. Además se puede eliminar varios propietarios al tiempo.

- **OwnerEditComponent:**
Es usado para la creación y actualización de propietarios, es decir, permite ver el detalle de un propietario en particular, así como editarlo, eliminarlo o incluso crear un nuevo propietario. Además brinda la opción de relacionar este propietario con un carro, para esto se utiliza el ```DialogLink```, que actua como un popup y se explica más adelante.

- **CarWithOwnerListComponent:**
Permite visualizar la lista de los carros con sus propietarios y redirigir hacia la lista de los carros, y hacia la creación o actualización de un carro o propietario en particular al dar click sobre el.

- **DialogLink:**
Actua como un popup/dialog y permite asociar un owner a un carro.

 > Nota: Al eliminar un propietario se elimina la relación que este tenga con un carro.
 
Se usaron además, componentes de [Angular Material](https://material.angular.io/) en la versión 7.0.2 como: MatTableModule, MatCheckboxModule y MatDialogModule. Y de [sweetalert2](https://sweetalert2.github.io/) en la version 10.6.1, para notificaciones y alertas de un modo mucho más amigable visualmente.

### Servicios

- **OwnerService:**
Se crea utilizando el comando `ng g s shared/owner/owner`, por lo que queda ubicado en la carpeta *"/shared/owner"*. Este servicio se encarga de posibilitar los cuatro tipos de operaciones del CRUD, haciendo uso de los métodos HTTP Get, Post, Put y Delete, que posee la API expuesta para esta actividad.

 > API
 >
 > /cars
 > [https://thawing-chamber-47973.herokuapp.com/cars](https://thawing-chamber-47973.herokuapp.com/cars)
 >
 > /cool-cars
 > [https://thawing-chamber-47973.herokuapp.com/cool-cars](https://thawing-chamber-47973.herokuapp.com/cool-cars)
 >
 > /owners
 > [https://thawing-chamber-47973.herokuapp.com/owners](https://thawing-chamber-47973.herokuapp.com/owners)

### Angular version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
