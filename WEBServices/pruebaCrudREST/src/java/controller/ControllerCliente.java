/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import model.Cliente;
import data.Conexion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.ArrayList;
/**
 *
 * @author Jonathan Ulises
 */
public class ControllerCliente {
    
    /**
     * Consulta todos los clientes registrados en la base de datos
     * @return List Clientes
     * @throws Exception 
     */
    public ArrayList selectAll() throws Exception{
        String query = "SELECT * FROM vCliente"; //Consulta SQL
        Conexion objConn = new Conexion(); //Instancia de Conexion
        Connection conn = null; //Conexion a la BD
        Statement stmt = null;  //Instancia de la declaracion sql
        ResultSet rs = null; //Resultado de la consulta
        ArrayList<Cliente> clientes = new ArrayList<>(); //Lista de clientes
        try {
            objConn.abrir(); //Se abre la conexion
            conn = objConn.getConnection(); //Se obtiene la conexion
            stmt = conn.createStatement(); //Se crea la declaracion sql
            rs = stmt.executeQuery(query); //Se executa la consulta
            
            /*
            El rs es el resultado que se obtuvo de la consulta, para obtener
            todos sus datos, utilizamos un ciclo, en este se evalua si rs tiene
            un siguiente dato.
            */
            while(rs.next()){
                /*
                Por cada vuelta del ciclo, se creara un objeto cliente y se
                agregara a la lista
                */
                Cliente objC = new Cliente();
                objC.setIdCliente(rs.getInt("idCliente"));
                objC.setNombre(rs.getString("nombre"));
                objC.setA_paterno(rs.getString("a_paterno"));
                objC.setA_materno(rs.getString("a_materno"));
                objC.setTelefono(rs.getString("telefono"));
                objC.setRfc(rs.getString("rfc"));
                objC.setLongitud(rs.getDouble("longitud"));
                objC.setLatitud(rs.getDouble("latitud"));
                clientes.add(objC);
            }
            
            /*
            Para terminar, por seguridad, cerramos el resultset, la declaracion
            (stmt), la conexion obtenida (conn) y la conexion a la base de
            datos (.cerrar()).
            */
            rs.close();
            stmt.close();
            conn.close();
            objConn.cerrar();
            
            return clientes;
        } catch (SQLException e) {
            /*
            En caso de error, se verifica si el stmt esta creado, si es asi,
            este se cierra. Se cierra la conexion a la base de datos (.cerrar())
            y se lanza la excepcion.
            */
            if(stmt != null){
                stmt.close();
            }
            objConn.cerrar();
            e.printStackTrace();
            throw e;
        }
    }
    
    
    /**
     * Inserta un cliente en la base de datos
     * @param c Objeto Cliente
     * @throws java.lang.Exception
     */
    public void insertCliente(Cliente c) throws Exception{
        /*
        Consulta sql a un Stored Procedure, en este se especifica con "?" los
        campos que pide la llamada sl procedimiento.
        */
        String sql = "{CALL insertCliente(?, ?, ?, ?, ?, ?, ?)}";
        CallableStatement cstmt = null; //Declaracion pata CALL
        Conexion objConn = new Conexion(); //Instancia de conexion
        Connection conn = null; //Conexion a la BD
        
        try {
            conn = objConn.abrir(); //Se abre la conexion
            cstmt = conn.prepareCall(sql); //Se prepara la llamada
            
            /*
            Despues de prepararse la declaracion, se deben asignar los valores
            a cada uno de los campos declarados en la consulta.
            */
            cstmt.setString(1, c.getNombre());
            cstmt.setString(2, c.getA_paterno());
            cstmt.setString(3, c.getA_materno());
            cstmt.setString(4, c.getTelefono());
            cstmt.setString(5, c.getRfc());
            cstmt.setDouble(6, c.getLongitud());
            cstmt.setDouble(7, c.getLatitud());
            
            /*
            Para terminar, cerramos la declaracion
            (cstmt), la conexion obtenida (conn) y la conexion a la base de
            datos (.cerrar()).
            */
            cstmt.executeUpdate();
            cstmt.close();
            objConn.cerrar(); 
            conn.close();
        } catch (Exception e) {
            /*
            En caso de error, se verifica si el cstmt esta creado, si es asi,
            este se cierra. Se cierra la conexion a la base de datos (.cerrar())
            y se lanza la excepcion.
            */
            if(cstmt != null){
                cstmt.close();
            }
            objConn.cerrar();
            throw e;
        }
    }
    
    /**
     * Modifica un cliente en la base de datos
     * @param c Objeto Cliente
     * @throws Exception 
     */
    public void updateCliente(Cliente c) throws Exception{
        String sql = "{CALL updateCliente(?, ?, ?, ?, ?, ?, ?, ?)}";
        
        CallableStatement cstmt = null;
        Conexion objConn = new Conexion();
        Connection conn = null;
        
        try {
            conn = objConn.abrir();
            cstmt = conn.prepareCall(sql);
            
            cstmt.setString(1, c.getNombre());
            cstmt.setString(2, c.getA_paterno());
            cstmt.setString(3, c.getA_materno());
            cstmt.setString(4, c.getTelefono());
            cstmt.setString(5, c.getRfc());
            cstmt.setDouble(6, c.getLongitud());
            cstmt.setDouble(7, c.getLatitud());
            cstmt.setInt(8, c.getIdCliente());
            
            cstmt.executeUpdate();
            
            cstmt.close();
            objConn.cerrar();
            conn.close();
        } catch (Exception e) {
            if(cstmt != null){
                cstmt.close();
            }
            objConn.cerrar();
            throw e;
        }
    }
    
    /**
     * Elimina un cliente de la base de datos (Eliminacion Logica)
     * @param idCliente id del cliente a eliminar
     * @throws Exception 
     */
    public void deleteCliente(int idCliente) throws Exception{
        String sql = "{CALL deleteCliente(?)}";
        
        CallableStatement cstmt = null;
        Conexion objConn = new Conexion();
        Connection conn = null;
        
        try {
            conn = objConn.abrir();
            cstmt = conn.prepareCall(sql);
            
            cstmt.setInt(1, idCliente);
            
            cstmt.executeUpdate();
            
            cstmt.close();
            objConn.cerrar();
            conn.close();
            
        } catch (Exception e) {
            if(cstmt != null){
                cstmt.close();
            }
            
            objConn.cerrar();
            throw e;
        }
    }
}
