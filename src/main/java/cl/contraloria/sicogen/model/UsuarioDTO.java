package cl.contraloria.sicogen.model;

import java.util.Set;

public class UsuarioDTO {

    private String 	userLogin;
    private String 	passLogin;
    private int 	userIPerfil;
    private String 	userSPerfil;
    private String  userFono;
    private String  userMail;
    private String  userCargo;

    private String  entidadID;
    private int 	entidadId;
    private String  entidadCodigo;
    private String  entidadNombre;



    private String  partidaID;
    private String  partidaCodigo;
    private String  partidaNombre;

    private String  capituloID;
    private String  capituloCodigo;
    private String  capituloNombre;

    private int 	userId;
    private String  usuario;
    private Set<String> paginasAutorizadas;


    public UsuarioDTO() {
        super();
    }

    public UsuarioDTO(String userLogin, String passLogin, int userIPerfil,
                   String userSPerfil, String userFono, String userMail,
                   String userCargo, String entidadID, String entidadCodigo,
                   String entidadNombre, String partidaID, String partidaCodigo,
                   String partidaNombre, String capituloID, String capituloCodigo,
                   String capituloNombre, int userId, String usuario,int entidadId) {
        super();
        this.userLogin = userLogin;
        this.passLogin = passLogin;
        this.userIPerfil = userIPerfil;
        this.userSPerfil = userSPerfil;
        this.userFono = userFono;
        this.userMail = userMail;
        this.userCargo = userCargo;
        this.entidadID = entidadID;
        this.entidadId = entidadId;
        this.entidadCodigo = entidadCodigo;
        this.entidadNombre = entidadNombre;
        this.partidaID = partidaID;
        this.partidaCodigo = partidaCodigo;
        this.partidaNombre = partidaNombre;
        this.capituloID = capituloID;
        this.capituloCodigo = capituloCodigo;
        this.capituloNombre = capituloNombre;
        this.userId = userId;
        this.usuario = usuario;
        this.paginasAutorizadas = paginasAutorizadas;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public String getPassLogin() {
        return passLogin;
    }

    public int getUserIPerfil() {
        return userIPerfil;
    }

    public String getUserSPerfil() {
        return userSPerfil;
    }

    public String getUserFono() {
        return userFono;
    }

    public String getUserMail() {
        return userMail;
    }

    public String getUserCargo() {
        return userCargo;
    }

    public String getEntidadID() {
        return entidadID;
    }

    public String getEntidadCodigo() {
        return entidadCodigo;
    }

    public String getEntidadNombre() {
        return entidadNombre;
    }

    public String getPartidaID() {
        return partidaID;
    }

    public String getPartidaCodigo() {
        return partidaCodigo;
    }

    public String getPartidaNombre() {
        return partidaNombre;
    }

    public String getCapituloID() {
        return capituloID;
    }

    public String getCapituloCodigo() {
        return capituloCodigo;
    }

    public String getCapituloNombre() {
        return capituloNombre;
    }

    public int getUserId() {
        return userId;
    }

    public String getUsuario() {
        return usuario;
    }

   public Set<String> getPaginasAutorizadas() {
        return paginasAutorizadas;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public void setPassLogin(String passLogin) {
        this.passLogin = passLogin;
    }

    public void setUserIPerfil(int userIPerfil) {
        this.userIPerfil = userIPerfil;
    }

    public void setUserSPerfil(String userSPerfil) {
        this.userSPerfil = userSPerfil;
    }

    public void setUserFono(String userFono) {
        this.userFono = userFono;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public void setUserCargo(String userCargo) {
        this.userCargo = userCargo;
    }

    public void setEntidadID(String entidadID) {
        this.entidadID = entidadID;
    }

    public void setEntidadCodigo(String entidadCodigo) {
        this.entidadCodigo = entidadCodigo;
    }

    public void setEntidadNombre(String entidadNombre) {
        this.entidadNombre = entidadNombre;
    }

    public void setPartidaID(String partidaID) {
        this.partidaID = partidaID;
    }

    public void setPartidaCodigo(String partidaCodigo) {
        this.partidaCodigo = partidaCodigo;
    }

    public void setPartidaNombre(String partidaNombre) {
        this.partidaNombre = partidaNombre;
    }

    public void setCapituloID(String capituloID) {
        this.capituloID = capituloID;
    }

    public void setCapituloCodigo(String capituloCodigo) {
        this.capituloCodigo = capituloCodigo;
    }

    public void setCapituloNombre(String capituloNombre) {
        this.capituloNombre = capituloNombre;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setPaginasAutorizadas(Set<String> paginasAutorizadas) {
        this.paginasAutorizadas = paginasAutorizadas;
    }

    public int getEntidadId() {
        return entidadId;
    }

    public void setEntidadId(int entidadId) {
        this.entidadId = entidadId;
    }

}
