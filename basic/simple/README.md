# JAX-RS & ShrinkWrap Example

This examples uses JAX-RS resource implementations and deploys
them through a user-provided `main()` programatically without
construction a `.war` file during the build.

> Please raise any issues found with this example in this repo:
> https://github.com/wildfly-swarm/wildfly-swarm-examples
>
> Issues related to WildFly Swarm core should be raised in the main repo:
> https://github.com/wildfly-swarm/wildfly-swarm/issues

## Project `pom.xml`

The project is a normal maven project with `jar` packaging, not `war`.

    <packaging>jar</packaging>

The project adds a `<plugin>` to configure `wildfly-swarm-plugin` to
create the runnable `.jar`.

    <plugin>
      <groupId>org.wildfly.swarm</groupId>
      <artifactId>wildfly-swarm-plugin</artifactId>
      <version>${version.wildfly-swarm}</version>
      <configuration>
        <mainClass>org.wildfly.swarm.examples.jaxrs.shrinkwrap.Main</mainClass>
      </configuration>
      <executions>
        <execution>
          <goals>
            <goal>package</goal>
          </goals>
        </execution>
      </executions>
    </plugin>

To define the needed parts of WildFly Swarm, a dependency is added

    <dependency>
        <groupId>org.wildfly.swarm</groupId>
        <artifactId>wildfly-swarm-jaxrs</artifactId>
        <version>${version.wildfly-swarm}</version>
    </dependency>

This dependency allows usage of ShrinkWrap APIs within the `main()` in addition
to providing the JAX-RS APIs.

## Project `main()`

Since this project deploys JAX-RS resources without a `.war` being construction, it
provides its own `main()` method (specified above via the `wildfly-swarm-plugin`) to
configure the container and deploy the resources programatically.

    package org.wildfly.swarm.examples.jaxrs.shrinkwrap;

    import org.wildfly.swarm.container.Container;
    import org.wildfly.swarm.jaxrs.JAXRSDeployment;
    
    public class Main {

        public static void main(String[] args) throws Exception {
            Container container = new Container();
    
            JAXRSDeployment deployment = new JAXRSDeployment( container );
            deployment.addResource(MyResource.class);

            container.start(deployment);
        }
    }

This method constructs a new default Container, which automatically
initializes all fractions (or subsystems) that are available.

A `JAXRSDeployment` is constructed, and the JAX-RS resource class is
added to it.

The container is then started with the deployment.

By default, if no JAX-RS `Application` is provided a default is added
to the deployment specifying an `@ApplicationPath("/")` to bind the
deployment to the root URL.

## Run

You can run it many ways:

* mvn package && java -jar ./target/wildfly-swarm-example-jaxrs-shrinkwrap-swarm.jar
* mvn wildfly-swarm:run
* In your IDE run the `org.wildfly.swarm.examples.jaxrs.shrinkwrap.Main` class

## Use

    http://localhost:8080/
