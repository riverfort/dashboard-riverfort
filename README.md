# DashboardRiverfort

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Dockerisation

* `docker built -t <username_docker>/riverfort-dashboard:<version> .`
* `docker push <username_docker>/riverfort-dashboard:<version> .`
* Example:
  * `docker built -t rgctech/riverfort-dashboard:v3.0.0 .`
  * `docker push rgctech/riverfort-dashboard:v3.0.0`

## Deployment
* Connect to riverfort-dashboard instance
* `docker run -d --name riverfort-dashboard-<version> -p 80:8080 <username_docker>/riverfort-dashboard:<version>`
* Example:
  * `docker run -d --name riverfort-dashboard-v3.0.0 -p 80:8080 rgctech/riverfort-dashboard:v3.0.0`
* Update the CHANGELOG.md