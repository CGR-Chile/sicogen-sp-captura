package cl.contraloria.sicogen.service;

import cl.contraloria.sicogen.dao.InformesDAO;
import cl.contraloria.sicogen.model.Informes;
import cl.contraloria.sicogen.model.Periodos;
import cl.contraloria.sicogen.utils.ErroresSicogen;
import cl.contraloria.sicogen.utils.EstadoInformeAnualDTO;
import cl.contraloria.sicogen.utils.InfoInformeDTO;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Vector;

@Controller
public class InformesPersistencia {

    private InformesService informesService;
    private Vector<EstadoInformeAnualDTO> listStateInfAnual ;
    private Vector<EstadoInformeAnualDTO> listEstInfAnual ;
    private Vector<Informes> ListaInfValidados;
    private Vector<Periodos> ListaPeriodos;

    public InformesPersistencia(InformesService informesService) {
        this.informesService = informesService;

    }
    private EstadoInformeAnualDTO listEstadoInformes;

    private Vector<Informes> _listaInformeConCorrecciones ;
    //private Vector<Correcciones> listaCorrecciones;
    private Vector<InfoInformeDTO> listaInfoInforme;
    private ErroresSicogen errorMUN;
    private String error;



    public List<Informes> getInformesAEnviar(int entidad, int ejercicio, int tpInforme, int codigo, String mensaje) throws Exception {

        InformesDAO infDAO = null;//new InformesDAO();
        List<Informes> listaInfValidados = informesService.getInformesForSend(entidad, ejercicio, tpInforme);

    return listaInfValidados;
    }

    public Periodos getPeriodoEjercicio(int periodo) {

        Periodos per=null;
        try {
            //per = infDAO.getPeriodoEjercicio(periodo); //PENDIENTE
        }catch(Exception e){
            this.error="Ha ocurrido un error en el método getPeriodoEjercicio en cl.seidor.contraloria.persistencia";
        }

        return per;
    }


    public Vector<EstadoInformeAnualDTO> getEstadoInformesAnual(int entidad, int ejercicio, int tipoInforme ){

        listStateInfAnual = informesService.getEstadoInformesAnual2(entidad, ejercicio, tipoInforme); //OK EJECUTADO

        listEstInfAnual = new Vector<EstadoInformeAnualDTO>();
        for (int i=0;i<listStateInfAnual.size();i++){

            EstadoInformeAnualDTO estInfAnual = new EstadoInformeAnualDTO();

            estInfAnual.setIdInforme(	listStateInfAnual.get(i).getIdInforme() );
            estInfAnual.setInforme(	 	listStateInfAnual.get(i).getInforme() );

            estInfAnual.setsEstApe(		listStateInfAnual.get(i).getsEstApe() );
            estInfAnual.setsEstEne(		listStateInfAnual.get(i).getsEstEne() );
            estInfAnual.setsEstFeb(		listStateInfAnual.get(i).getsEstFeb() );
            estInfAnual.setsEstMar(		listStateInfAnual.get(i).getsEstMar() );
            estInfAnual.setsEstAbr(		listStateInfAnual.get(i).getsEstAbr() );
            estInfAnual.setsEstMay(		listStateInfAnual.get(i).getsEstMay() );
            estInfAnual.setsEstJun(		listStateInfAnual.get(i).getsEstJun() );
            estInfAnual.setsEstJul(		listStateInfAnual.get(i).getsEstJul() );
            estInfAnual.setsEstAgo(		listStateInfAnual.get(i).getsEstAgo() );
            estInfAnual.setsEstSep(		listStateInfAnual.get(i).getsEstSep() );
            estInfAnual.setsEstOct(		listStateInfAnual.get(i).getsEstOct() );
            estInfAnual.setsEstNov(		listStateInfAnual.get(i).getsEstNov() );
            estInfAnual.setsEstDic(		listStateInfAnual.get(i).getsEstDic() );
            estInfAnual.setsEstCie(		listStateInfAnual.get(i).getsEstCie() );

            estInfAnual.setiEstApe(		listStateInfAnual.get(i).getiEstApe() );
            estInfAnual.setiEstEne(		listStateInfAnual.get(i).getiEstEne() );
            estInfAnual.setiEstFeb(		listStateInfAnual.get(i).getiEstFeb() );
            estInfAnual.setiEstMar(		listStateInfAnual.get(i).getiEstMar() );
            estInfAnual.setiEstAbr(		listStateInfAnual.get(i).getiEstAbr() );
            estInfAnual.setiEstMay(		listStateInfAnual.get(i).getiEstMay() );
            estInfAnual.setiEstJun(		listStateInfAnual.get(i).getiEstJun() );
            estInfAnual.setiEstJul(		listStateInfAnual.get(i).getiEstJul() );
            estInfAnual.setiEstAgo(		listStateInfAnual.get(i).getiEstAgo() );
            estInfAnual.setiEstSep(		listStateInfAnual.get(i).getiEstSep() );
            estInfAnual.setiEstOct(		listStateInfAnual.get(i).getiEstOct() );
            estInfAnual.setiEstNov(		listStateInfAnual.get(i).getiEstNov() );
            estInfAnual.setiEstDic(		listStateInfAnual.get(i).getiEstDic() );
            estInfAnual.setiEstCie(		listStateInfAnual.get(i).getiEstCie() );

            estInfAnual.setUserApe(		listStateInfAnual.get(i).getUserApe() );
            estInfAnual.setUserEne(		listStateInfAnual.get(i).getUserEne() );
            estInfAnual.setUserFeb(		listStateInfAnual.get(i).getUserFeb() );
            estInfAnual.setUserMar(		listStateInfAnual.get(i).getUserMar() );
            estInfAnual.setUserAbr(		listStateInfAnual.get(i).getUserAbr() );
            estInfAnual.setUserMay(		listStateInfAnual.get(i).getUserMay() );
            estInfAnual.setUserJun(		listStateInfAnual.get(i).getUserJun() );
            estInfAnual.setUserJul(		listStateInfAnual.get(i).getUserJul() );
            estInfAnual.setUserAgo(		listStateInfAnual.get(i).getUserAgo() );
            estInfAnual.setUserSep(		listStateInfAnual.get(i).getUserSep() );
            estInfAnual.setUserOct(		listStateInfAnual.get(i).getUserOct() );
            estInfAnual.setUserNov(		listStateInfAnual.get(i).getUserNov() );
            estInfAnual.setUserDic(		listStateInfAnual.get(i).getUserDic() );
            estInfAnual.setUserCie(		listStateInfAnual.get(i).getUserCie() );

            estInfAnual.setDateApe(		listStateInfAnual.get(i).getDateApe() );
            estInfAnual.setDateEne(		listStateInfAnual.get(i).getDateEne() );
            estInfAnual.setDateFeb(		listStateInfAnual.get(i).getDateFeb() );
            estInfAnual.setDateMar(		listStateInfAnual.get(i).getDateMar() );
            estInfAnual.setDateAbr(		listStateInfAnual.get(i).getDateAbr() );
            estInfAnual.setDateMay(		listStateInfAnual.get(i).getDateMay() );
            estInfAnual.setDateJun(		listStateInfAnual.get(i).getDateJun() );
            estInfAnual.setDateJul(		listStateInfAnual.get(i).getDateJul() );
            estInfAnual.setDateAgo(		listStateInfAnual.get(i).getDateAgo() );
            estInfAnual.setDateSep(		listStateInfAnual.get(i).getDateSep() );
            estInfAnual.setDateOct(		listStateInfAnual.get(i).getDateOct() );
            estInfAnual.setDateNov(		listStateInfAnual.get(i).getDateNov() );
            estInfAnual.setDateDic(		listStateInfAnual.get(i).getDateDic() );
            estInfAnual.setDateCie(		listStateInfAnual.get(i).getDateCie() );

            estInfAnual.setPejrApe(		listStateInfAnual.get(i).getPejrApe() );
            estInfAnual.setPejrEne(		listStateInfAnual.get(i).getPejrEne() );
            estInfAnual.setPejrFeb(		listStateInfAnual.get(i).getPejrFeb() );
            estInfAnual.setPejrMar(		listStateInfAnual.get(i).getPejrMar() );
            estInfAnual.setPejrAbr(		listStateInfAnual.get(i).getPejrAbr() );
            estInfAnual.setPejrMay(		listStateInfAnual.get(i).getPejrMay() );
            estInfAnual.setPejrJun(		listStateInfAnual.get(i).getPejrJun() );
            estInfAnual.setPejrJul(		listStateInfAnual.get(i).getPejrJul() );
            estInfAnual.setPejrAgo(		listStateInfAnual.get(i).getPejrAgo() );
            estInfAnual.setPejrSep(		listStateInfAnual.get(i).getPejrSep() );
            estInfAnual.setPejrOct(		listStateInfAnual.get(i).getPejrOct() );
            estInfAnual.setPejrNov(		listStateInfAnual.get(i).getPejrNov() );
            estInfAnual.setPejrDic(		listStateInfAnual.get(i).getPejrDic() );
            estInfAnual.setPejrCie(		listStateInfAnual.get(i).getPejrCie() );

            estInfAnual.setCertApe(		listStateInfAnual.get(i).getCertApe() );
            estInfAnual.setCertEne(		listStateInfAnual.get(i).getCertEne() );
            estInfAnual.setCertFeb(		listStateInfAnual.get(i).getCertFeb() );
            estInfAnual.setCertMar(		listStateInfAnual.get(i).getCertMar() );
            estInfAnual.setCertAbr(		listStateInfAnual.get(i).getCertAbr() );
            estInfAnual.setCertMay(		listStateInfAnual.get(i).getCertMay() );
            estInfAnual.setCertJun(		listStateInfAnual.get(i).getCertJun() );
            estInfAnual.setCertJul(		listStateInfAnual.get(i).getCertJul() );
            estInfAnual.setCertAgo(		listStateInfAnual.get(i).getCertAgo() );
            estInfAnual.setCertSep(		listStateInfAnual.get(i).getCertSep() );
            estInfAnual.setCertOct(		listStateInfAnual.get(i).getCertOct() );
            estInfAnual.setCertNov(		listStateInfAnual.get(i).getCertNov() );
            estInfAnual.setCertDic(		listStateInfAnual.get(i).getCertDic() );
            estInfAnual.setCertCie(		listStateInfAnual.get(i).getCertCie() );

            if( listStateInfAnual.get(i).getsEstApe() != "null"){
                estInfAnual.setEvApe("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdApe() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserApe() + "','"
                        + listStateInfAnual.get(i).getDateApe() + "','"
                        + listStateInfAnual.get(i).getPejrApe() + "',"
                        + listStateInfAnual.get(i).getCertApe() + ","
                        + listStateInfAnual.get(i).getiEstApe() +")");
            }
            if( listStateInfAnual.get(i).getsEstEne() != "null"){
                estInfAnual.setEvEne("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdEne() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserEne() + "','"
                        + listStateInfAnual.get(i).getDateEne() + "','"
                        + listStateInfAnual.get(i).getPejrEne() + "',"
                        + listStateInfAnual.get(i).getCertEne() + ","
                        + listStateInfAnual.get(i).getiEstEne() + ")");
            }
            if( listStateInfAnual.get(i).getsEstFeb() != "null"){
                estInfAnual.setEvFeb("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdFeb() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserFeb() + "','"
                        + listStateInfAnual.get(i).getDateFeb() + "','"
                        + listStateInfAnual.get(i).getPejrFeb() + "',"
                        + listStateInfAnual.get(i).getCertFeb() + ","
                        + listStateInfAnual.get(i).getiEstFeb() + ")");
            }
            if( listStateInfAnual.get(i).getsEstMar() != "null"){
                estInfAnual.setEvMar("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdMar() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserMar() + "','"
                        + listStateInfAnual.get(i).getDateMar() + "','"
                        + listStateInfAnual.get(i).getPejrMar() + "',"
                        + listStateInfAnual.get(i).getCertMar() +  ","
                        + listStateInfAnual.get(i).getiEstMar() + ")");
            }
            if( listStateInfAnual.get(i).getsEstAbr() != "null"){
                estInfAnual.setEvAbr("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdAbr() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserAbr() + "','"
                        + listStateInfAnual.get(i).getDateAbr() + "','"
                        + listStateInfAnual.get(i).getPejrAbr() + "',"
                        + listStateInfAnual.get(i).getCertAbr() +  ","
                        + listStateInfAnual.get(i).getiEstAbr() + ")");
            }
            if( listStateInfAnual.get(i).getsEstMay() != "null"){
                estInfAnual.setEvMay("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdMay() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserMay() + "','"
                        + listStateInfAnual.get(i).getDateMay() + "','"
                        + listStateInfAnual.get(i).getPejrMay() + "',"
                        + listStateInfAnual.get(i).getCertMay() +  ","
                        + listStateInfAnual.get(i).getiEstMay() + ")");
            }
            if( listStateInfAnual.get(i).getsEstJun() != "null"){
                estInfAnual.setEvJun("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdJun() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserJun() + "','"
                        + listStateInfAnual.get(i).getDateJun() + "','"
                        + listStateInfAnual.get(i).getPejrJun() + "',"
                        + listStateInfAnual.get(i).getCertJun() +  ","
                        + listStateInfAnual.get(i).getiEstJun() + ")");
            }
            if( listStateInfAnual.get(i).getsEstJul() != "null"){
                estInfAnual.setEvJul("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdJul() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserJul() + "','"
                        + listStateInfAnual.get(i).getDateJul() + "','"
                        + listStateInfAnual.get(i).getPejrJul() + "',"
                        + listStateInfAnual.get(i).getCertJul() +  ","
                        + listStateInfAnual.get(i).getiEstJul() + ")");
            }
            if( listStateInfAnual.get(i).getsEstAgo() != "null"){
                estInfAnual.setEvAgo("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdAgo() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserAgo() + "','"
                        + listStateInfAnual.get(i).getDateAgo() + "','"
                        + listStateInfAnual.get(i).getPejrAgo() + "',"
                        + listStateInfAnual.get(i).getCertAgo() + ","
                        + listStateInfAnual.get(i).getiEstAgo() + ")");
            }
            if( listStateInfAnual.get(i).getsEstSep() != "null"){
                estInfAnual.setEvSep("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdSep() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserSep() + "','"
                        + listStateInfAnual.get(i).getDateSep() + "','"
                        + listStateInfAnual.get(i).getPejrSep() + "',"
                        + listStateInfAnual.get(i).getCertSep() + ","
                        + listStateInfAnual.get(i).getiEstSep() + ")");
            }
            if( listStateInfAnual.get(i).getsEstOct() != "null"){
                estInfAnual.setEvOct("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdOct() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserOct() + "','"
                        + listStateInfAnual.get(i).getDateOct() + "','"
                        + listStateInfAnual.get(i).getPejrOct() + "',"
                        + listStateInfAnual.get(i).getCertOct() + ","
                        + listStateInfAnual.get(i).getiEstOct() + ")");
            }
            if( listStateInfAnual.get(i).getsEstNov() != "null"){
                estInfAnual.setEvNov("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdNov() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserNov() + "','"
                        + listStateInfAnual.get(i).getDateNov() + "','"
                        + listStateInfAnual.get(i).getPejrNov() + "',"
                        + listStateInfAnual.get(i).getCertNov() +  ","
                        + listStateInfAnual.get(i).getiEstNov() + ")");
            }
            if( listStateInfAnual.get(i).getsEstDic() != "null"){
                estInfAnual.setEvDic("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdDic() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserDic() + "','"
                        + listStateInfAnual.get(i).getDateDic() + "','"
                        + listStateInfAnual.get(i).getPejrDic() + "',"
                        + listStateInfAnual.get(i).getCertDic() +  ","
                        + listStateInfAnual.get(i).getiEstDic() + ")");
            }
            if( listStateInfAnual.get(i).getsEstCie() != "null"){
                estInfAnual.setEvCie("abrePopUp(" + listStateInfAnual.get(i).getIdInforme() + ","
                        + listStateInfAnual.get(i).getIdCie() + ","
                        + ejercicio  + ",'"
                        + listStateInfAnual.get(i).getUserCie() + "','"
                        + listStateInfAnual.get(i).getDateCie() + "','"
                        + listStateInfAnual.get(i).getPejrCie() + "',"
                        + listStateInfAnual.get(i).getCertCie() +  ","
                        + listStateInfAnual.get(i).getiEstCie() + ")");
            }
            estInfAnual.setImageApe(	recuperaUrlImage(estInfAnual.getsEstApe() ));
            estInfAnual.setImageEne(	recuperaUrlImage(estInfAnual.getsEstEne() ));
            estInfAnual.setImageFeb(	recuperaUrlImage(estInfAnual.getsEstFeb() ));
            estInfAnual.setImageMar(	recuperaUrlImage(estInfAnual.getsEstMar() ));
            estInfAnual.setImageAbr(	recuperaUrlImage(estInfAnual.getsEstAbr() ));
            estInfAnual.setImageMay( 	recuperaUrlImage(estInfAnual.getsEstMay() ));
            estInfAnual.setImageJun(	recuperaUrlImage(estInfAnual.getsEstJun() ));
            estInfAnual.setImageJul(	recuperaUrlImage(estInfAnual.getsEstJul() ));
            estInfAnual.setImageAgo(	recuperaUrlImage(estInfAnual.getsEstAgo() ));
            estInfAnual.setImageSep(	recuperaUrlImage(estInfAnual.getsEstSep() ));
            estInfAnual.setImageOct(	recuperaUrlImage(estInfAnual.getsEstOct() ));
            estInfAnual.setImageNov(	recuperaUrlImage(estInfAnual.getsEstNov() ));
            estInfAnual.setImageDic(	recuperaUrlImage(estInfAnual.getsEstDic() ));
            estInfAnual.setImageCie(	recuperaUrlImage(estInfAnual.getsEstCie() ));

            estInfAnual.setAltApe(		recuperaAltImage(estInfAnual.getsEstApe() ));
            estInfAnual.setAltEne(		recuperaAltImage(estInfAnual.getsEstEne() ));
            estInfAnual.setAltFeb(		recuperaAltImage(estInfAnual.getsEstFeb() ));
            estInfAnual.setAltMar(		recuperaAltImage(estInfAnual.getsEstMar() ));
            estInfAnual.setAltAbr(		recuperaAltImage(estInfAnual.getsEstAbr() ));
            estInfAnual.setAltMay( 		recuperaAltImage(estInfAnual.getsEstMay() ));
            estInfAnual.setAltJun(		recuperaAltImage(estInfAnual.getsEstJun() ));
            estInfAnual.setAltJul(		recuperaAltImage(estInfAnual.getsEstJul() ));
            estInfAnual.setAltAgo(		recuperaAltImage(estInfAnual.getsEstAgo() ));
            estInfAnual.setAltSep(		recuperaAltImage(estInfAnual.getsEstSep() ));
            estInfAnual.setAltOct(		recuperaAltImage(estInfAnual.getsEstOct() ));
            estInfAnual.setAltNov(		recuperaAltImage(estInfAnual.getsEstNov() ));
            estInfAnual.setAltDic(		recuperaAltImage(estInfAnual.getsEstDic() ));
            estInfAnual.setAltCie(		recuperaAltImage(estInfAnual.getsEstCie() ));

            estInfAnual.setIdApe(		listStateInfAnual.get(i).getIdApe() );
            estInfAnual.setIdEne(		listStateInfAnual.get(i).getIdEne() );
            estInfAnual.setIdFeb(		listStateInfAnual.get(i).getIdFeb() );
            estInfAnual.setIdMar(		listStateInfAnual.get(i).getIdMar() );
            estInfAnual.setIdAbr(		listStateInfAnual.get(i).getIdAbr() );
            estInfAnual.setIdMay( 		listStateInfAnual.get(i).getIdMay() );
            estInfAnual.setIdJun(		listStateInfAnual.get(i).getIdJun() );
            estInfAnual.setIdJul(		listStateInfAnual.get(i).getIdJul() );
            estInfAnual.setIdAgo(		listStateInfAnual.get(i).getIdAgo() );
            estInfAnual.setIdSep(		listStateInfAnual.get(i).getIdSep() );
            estInfAnual.setIdOct(		listStateInfAnual.get(i).getIdOct() );
            estInfAnual.setIdNov(		listStateInfAnual.get(i).getIdNov() );
            estInfAnual.setIdDic(		listStateInfAnual.get(i).getIdDic() );
            estInfAnual.setIdCie(		listStateInfAnual.get(i).getIdCie() );

            listEstInfAnual.add(estInfAnual);
        }
        return listEstInfAnual;
    }

    private String recuperaAltImage(String estado){

        if ("CARGADO".equals(estado)){
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("CARGADO CON OBSERVACIONES".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("CON ERRORES".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("VALIDADO".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("VALIDADO CON OBSERVACIONES".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("PROCESADO".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("PROCESADO CON OBSERVACIONES".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("ANULADO".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("SIN MOVIMIENTO".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("PROCESADO SIN MOVIMIENTO".equals(estado)) {
            return "Para Acceder a más Informacion Haga Click sobre el Icono del Estado del Informe";
        }
        else if("S/I".equals(estado)) {
            return "";
        }
        else{
            return "";
        }
    }

    private String recuperaUrlImage(String estado){

        if ("null".equals(estado)){
            return "/SICOGEN2_PUB/resources/img/blanco.png";
        }
        else if("CARGADO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/enviado.png";
        }
        else if("CARGADO CON OBSERVACIONES".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/enviadoOBS.png";
        }
        else if("CON ERRORES".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/error.png";
        }
        else if("VALIDADO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/Validado.png";
        }
        else if("VALIDADO CON OBSERVACIONES".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/ValidadoOBS.png";
        }
        else if("PROCESADO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/Procesado.png";
        }
        else if("PROCESADO CON OBSERVACIONES".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/ProcesadoOBS.png";
        }
        else if("ANULADO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/blanco.png";
        }
        else if("SIN MOVIMIENTO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/NotMov.png";
        }
        else if("PROCESADO SIN MOVIMIENTO".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/NotMovProc.png";
        }
        else if("S/I".equals(estado)) {
            return "/SICOGEN2_PUB/resources/img/blanco.png";
        }
        else{
            return "/SICOGEN2_PUB/resources/img/blanco.png";
        }
    }

    public Vector<EstadoInformeAnualDTO> getListStateInfAnual() {
        return listStateInfAnual;
    }

    public void setListStateInfAnual(Vector<EstadoInformeAnualDTO> listStateInfAnual) {
        this.listStateInfAnual = listStateInfAnual;
    }

    public Vector<EstadoInformeAnualDTO> getListEstInfAnual() {
        return listEstInfAnual;
    }

    public void setListEstInfAnual(Vector<EstadoInformeAnualDTO> listEstInfAnual) {
        this.listEstInfAnual = listEstInfAnual;
    }

    public Vector<Informes> getListaInfValidados() {
        return ListaInfValidados;
    }

    public void setListaInfValidados(Vector<Informes> listaInfValidados) {
        ListaInfValidados = listaInfValidados;
    }

    public Vector<Periodos> getListaPeriodos() {
        return ListaPeriodos;
    }

    public void setListaPeriodos(Vector<Periodos> listaPeriodos) {
        ListaPeriodos = listaPeriodos;
    }

    public EstadoInformeAnualDTO getListEstadoInformes() {
        return listEstadoInformes;
    }

    public void setListEstadoInformes(EstadoInformeAnualDTO listEstadoInformes) {
        this.listEstadoInformes = listEstadoInformes;
    }
    public void setListaInfoInforme(Vector<InfoInformeDTO> listaInfoInforme) {
        this.listaInfoInforme = listaInfoInforme;
    }

}
