/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.sql.Connection;
import java.sql.DriverManager;
/**
 *
 * @author Jonathan Ulises
 */
public class Conexion {
    String userName; //Usuario del servidor sql
    String password; //Contraseña
    String url; //URL de conexion
    Connection conexion; //Variable Connection
    
    public Conexion(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            userName = "root";
            password = "root";
            url = "jdbc:mysql://localhost:3306/pruebaCrud";
        } catch (Exception e ) {
            throw new RuntimeException(e);
        }
    }
    
    /**
     * Abre la conexion a la base de datos
     * @return La conexion a la base de datos
     * @throws Exception 
     */
    public Connection abrir() throws Exception {
        conexion = DriverManager.getConnection(url, userName, password);
        return conexion;
    }
    
    /**
     * Cierra la conexion a la base de datos
     * @throws Exception 
     */
    public void cerrar() throws Exception {
        try {
            //Si la conexion fue creada anteriormente, la cierra y la hace nula
            if(conexion != null){
                conexion.close();
                conexion = null;
            }
        } catch (Exception e) {
            //En caso de error, lanza la exception
            //System.out.println(e.getMessage());
            throw e;
        }
    }
    
    /**
     * Obtiene la conexion a la base de datos
     * @return 
     */
    public Connection getConnection(){
        return conexion;
    }
}
