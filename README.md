# angular-boot-seed-project

Example Spring Boot project with Angular front-end

## Getting started

```
git clone git@github.com:amchavan/angular-boot-seed-project.git
```
The project requires no external components, like databases, 
messaging systems, etc.

## Development set-up

In a development environment your best option is to 
run the backend in your IDE, and the front-end via Angular's
CLI.

### Back-end

Open _angular-boot-seed-project_ in your IDE: in Eclipse 
you'll have to import it as a Maven project (I used IntelliJ
Idea for development).
Build it as a Maven project, then run it as a Spring Boot project.

### Front-end
```
cd angular-boot-seed-project/src/main/angular
npm install
ng serve
```

In your browser navigate to http://localhost:4200

## Production set-up

For a more production-style deployment:
```
cd angular-boot-seed-project
mvn 
```


