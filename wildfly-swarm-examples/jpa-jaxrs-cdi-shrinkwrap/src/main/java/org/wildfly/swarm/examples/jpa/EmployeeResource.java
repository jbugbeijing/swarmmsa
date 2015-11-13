package org.wildfly.swarm.examples.jpa;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Ken Finnigan
 */
@Path("/")
@ApplicationScoped
public class EmployeeResource {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces("application/json")
    public Employee[] get() {
        return em.createNamedQuery("Employee.findAll", Employee.class).getResultList().toArray(new Employee[0]);
    }

    //implement this
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEmployee(Employee employee) {
    	//persistent employee
    	return Response.ok().build();    	
    }

}
