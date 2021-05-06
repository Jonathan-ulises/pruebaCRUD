/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author Jonathan Ulises
 */
public class Cliente {
    //Atributos
    private int idCliente;
    private String nombre;
    private String a_paterno;
    private String a_materno;
    private String telefono;
    private String rfc;
    private double longitud;
    private double latitud;

    //Constuctior basico
    public Cliente() {
    }

    //Constructor para inserciones
    public Cliente(String nombre, String a_paterno, String a_materno, 
            String telefono, String rfc, double longitud, double latitud) {
        this.nombre = nombre;
        this.a_paterno = a_paterno;
        this.a_materno = a_materno;
        this.telefono = telefono;
        this.rfc = rfc;
        this.longitud = longitud;
        this.latitud = latitud;
    }

    //Constructor para mostrar datos
    public Cliente(int idCliente, String nombre, String a_paterno, 
            String a_materno, String telefono, String rfc, double longitud, 
            double latitud) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.a_paterno = a_paterno;
        this.a_materno = a_materno;
        this.telefono = telefono;
        this.rfc = rfc;
        this.longitud = longitud;
        this.latitud = latitud;
    }
    
    //Getters
    public int getIdCliente() {
        return idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public String getA_paterno() {
        return a_paterno;
    }

    public String getA_materno() {
        return a_materno;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getRfc() {
        return rfc;
    }

    public double getLongitud() {
        return longitud;
    }

    public double getLatitud() {
        return latitud;
    }
    
    //Setters
    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setA_paterno(String a_paterno) {
        this.a_paterno = a_paterno;
    }

    public void setA_materno(String a_materno) {
        this.a_materno = a_materno;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }

    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }
    
}
