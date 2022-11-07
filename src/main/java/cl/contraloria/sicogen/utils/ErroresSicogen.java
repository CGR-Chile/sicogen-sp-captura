package cl.contraloria.sicogen.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ErroresSicogen {

    private String errorUsuario;	//mensaje de error usuario final
    private String errorTecnico;	//mensaje de excepcion
    private int errorCode;			//Codigo de excepcion
    private boolean nuevaPestania;	//control de ventanas
    private String metodo;			//clase y metodo
    public void setTipo(int tipo, int codigoError) {
        this.errorCode=codigoError;
        switch (tipo) {
            case 1:		this.errorUsuario="Ha ocurrido un error en la aplicacion. Por favor intente nuevamente. Si el error persiste contacte al administrador del sistema."; break;
            case 2: 	this.errorUsuario="Ha ocurrido un error en la aplicacion. Por favor intente nuevamente. Si el error persiste contacte al administrador del sistema.";break;
            case 3:
                getErrorSQL(codigoError);
                switch(codigoError){
                    case 6550:
                        this.errorUsuario="Hay un problema en la declaracion del procedimiento de almacenado dentro del paquete";
                        break;
                    default:
                        this.errorUsuario="Hay un problema en el procedimiento de almacenado dentro del paquete";
                        break;
                }

                break;
            default:	this.errorUsuario="se ha poduc"; break;
        }
    }
    private String getError(Exception ex){
        StringWriter errors = new StringWriter();
        ex.printStackTrace(new PrintWriter(errors));
        return errors.toString();
    }
    private void getErrorSQL(int codigo){
        switch (codigo) {
            case 1:		this.errorUsuario=""; break;

            case 17006:	this.errorUsuario="nombre de la columna no valido"; break;
            case 17041:	this.errorUsuario=""; break;
            case 65550:	this.errorUsuario=""; break;
            default:	this.errorUsuario="se ha poduc"; break;
        }
    }
    public String getMetodo() {
        return metodo;
    }
    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }
    public String getErrorUsuario() {
        return errorUsuario;
    }
    public void setErrorUsuario(String errorUsuario) {
        this.errorUsuario = errorUsuario;
    }
    public String getErrorTecnico() {
        return errorTecnico;
    }
    public void setErrorTecnico(Exception ex) {
        this.errorTecnico =  getError(ex);
    }
    public void setErrorTecnico(String errorTecnico) {
        this.errorTecnico = errorTecnico;
    }
    public int getErrorCode() {
        return errorCode;
    }
    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
    public boolean isNuevaPestania() {
        return nuevaPestania;
    }
    public void setNuevaPestania(boolean nuevaPestania) {
        this.nuevaPestania = nuevaPestania;
    }
}
