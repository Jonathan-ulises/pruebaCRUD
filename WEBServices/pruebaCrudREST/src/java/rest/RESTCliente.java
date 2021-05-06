/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import model.Cliente;
import controller.ControllerCliente;
import java.util.List;
import javax.ws.rs.Consumes;
/**
 *
 * @author Jonathan Ulises
 */
@Path("clientes")
public class RESTCliente {
    
    /**
     * Servicio que obtiene los clientes de la base de datos
     * @return Respuesta JSON de clientes
     */
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerCliente objC = new ControllerCliente(); //Controller Cliente
        String out; //Respuesta 
        try {
            /*
            Se obtiene la lista de clientes de la base de datos con el metodo
            .selectAll(). Para crear la entidad debemos hacer uso de la
            libreria Gson para convertir la Lista (List) a una estructura JSON,
            esto se logra con el metodo .toJson(List). Las estructura generada
            se guarda en una cadena "out".
            */
            List<Cliente> listCliente = objC.selectAll(); 
            Gson gson = new Gson();
            out = gson.toJson(listCliente);
        } catch (Exception e) {
            /*
            En caso de error, la respuesta sera el mensaje del error obtenido
            */
            e.printStackTrace();
            out = "{\"error:\"" + e.toString() + "\"}";
        }
        
        /*
        Se retorna construccion de la respuesta usando la entidad "out" con
        su estructura JSON establecida.
        */
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    /**
     * Servicio que inserta un cliente en la base de datos
     * @param nombre
     * @param a_paterno
     * @param a_materno
     * @param telefono
     * @param rfc
     * @param longitud
     * @param latitud
     * @return 
     */
    @Path("insert")
    @POST
    //@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(
            @FormParam("nombre") String nombre,
            @FormParam("a_paterno") String a_paterno,
            @FormParam("a_materno") String a_materno,
            @FormParam("telefono") String telefono,
            @FormParam("rfc") String rfc,
            @FormParam("longitud") double longitud,
            @FormParam("latitud") double latitud
    ){
        /*
        Los valores que recevira el servicio deben ser @FormParam ya que
        estos no seran enviados atrabes de la url
        */
        ControllerCliente objController = new ControllerCliente();
        
        /*
        Instancia de cliente con los datos obtenidos
        */
        Cliente objCl = new Cliente(
                nombre, a_paterno, a_materno, telefono, rfc, 
                longitud, latitud);
        
        String out = "";
        
        try {
            /*
            Si no hay errores, la entidad a responder sera una mensaje de OK
            */
            objController.insertCliente(objCl);
            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
            /*
            En caso de error, la entidad a responser sera el mensaje del error
            */
            out = "{\"error\":\"" + e.getMessage() + "\"}";
        }
        
        /*
        Se retorna la entidad preparada para ser enviada al cliente.
        */
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    /**
     * Servicio que modifica un cliente registrado en la base de datos
     * @param nombre
     * @param a_paterno
     * @param a_materno
     * @param telefono
     * @param rfc
     * @param longitud
     * @param latitud
     * @param idCliente
     * @return 
     */
    @Path("update")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(
            @FormParam("nom") String nombre,
            @FormParam("a_pat") String a_paterno,
            @FormParam("a_mat") String a_materno,
            @FormParam("tel") String telefono,
            @FormParam("rfc") String rfc,
            @FormParam("longt") double longitud,
            @FormParam("latitud") double latitud,
            @FormParam("idC") int idCliente){
        
        ControllerCliente objController = new ControllerCliente();
        Cliente objCl = new Cliente(
                idCliente, nombre, a_paterno, a_materno, telefono, rfc, 
                longitud, latitud);
        
        String out = "";
        
        try {
            objController.updateCliente(objCl);
            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
            out = "{\"error\":\"" + e.getMessage() + "\"}";
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    /**
     * Servicio que elimina un cliente en la base de datos (Eliminacion Logica)
     * @param idCliente
     * @return 
     */
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idC") int idCliente){
        ControllerCliente objController = new ControllerCliente();
        String out = "";
        
        try {
            objController.deleteCliente(idCliente);
            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
            out = "{\"error\":\"" + e.getMessage() + "\"}";
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
