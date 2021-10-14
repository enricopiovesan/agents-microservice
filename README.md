Just a simple Node.js microservice 

- The architecture design is inspired by the Clean Architecture by Uncle Bob :)
- Javascript doesn't support interfaces very well so in this case dependency injection it's one the best way to go.
- The microservice has been designed following the SOLID principles

![image](https://user-images.githubusercontent.com/4609982/137056291-b198e1d1-06fd-4a16-860b-2e50fc62eb21.png)

Entity: customer, order, product
Use cases: interaction between entities: customer an order
Adaptor (controllers): isolate the use cases from the interface
Interface: DB, Framework

The flow of dependencies:
 - An outer circle can depend on an intern circle
 - An intern circle can NOT depend on an outer circle
- If something changes on an outer circle will not impact the nested circle, 
- On the other hand, if something changes on an intern circle will impact the out outer circles. 
- A good practice is:
 	- keeping the things that can change outside such as a 3rt party API 
 	- Things that are not supposed to change inside.
- That is what makes this architecture so resilient.

 Dependency injection in Javascript
 Dependency injection (DI) is a programming pattern in which a dependency is passed using the parameters instead of instantiating it within the function or class. DI enables creating isolated individual components within application code and makes it easy to switch those dependencies in the future as the requirement changes. Passing parameters as a dependency also allows to easily unit test those components in isolation by injecting their mocked version.

 Pro:
 - the code is easy to mock and test
 - you don't need to write all the code for the dependencies you can just mock and tested