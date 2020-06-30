/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package library;

import java.sql.*;



/**
 *
 * @author USER
 */
public class Library {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
                try 
        {
            String str = "SELECT * FROM Authors WHERE city LIKE 'S%'";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            try (Connection con = DriverManager.getConnection("jdbc:sqlserver://localhost; databaseName=Library;integratedsecurity=true");
                    Statement stmt = con.createStatement();) 
            {
                ResultSet rs = stmt.executeQuery(str);

                System.out.println("Author ID\tAuthor Name\tCity");
                System.out.println("----------- ---------------------- ------------");

                while (rs.next()) 
                {
                    String id = rs.getString("au_id");
                    String name = rs.getString("au_name");
                    String city = rs.getString("city");
                    System.out.print(id + "\t");

                    if (name.length() <= 7) 
                    {
                        System.out.print(name + "\t\t");
                    } 
                    else 
                    {
                        System.out.print("\t" + name + "\t");
                    }
                    System.out.println(city);
                }
            }
        } 
        catch (Exception ex) 
        {
            System.out.println("Error occurred");
            System.out.println("Error:" + ex);
        }

    }
    
}
