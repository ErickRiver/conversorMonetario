package com.conversor.rest;


import com.conversor.core.ConversorMoneda;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path ("convertir")
public class RESTConversorMonetario extends Application {
    
    @Path("convertirMoneda")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response convertirDivisa(@QueryParam("cantidad") @DefaultValue("0.0") double cantidad,
                                    @QueryParam("precioDivisa") @DefaultValue("0.0") double precioDivisa) {
        ConversorMoneda cm = new ConversorMoneda();
        String out = """
                     {"total": %f}
                     """;
        
        out = String.format(out, cm.convertirCantidad(precioDivisa, cantidad));
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
