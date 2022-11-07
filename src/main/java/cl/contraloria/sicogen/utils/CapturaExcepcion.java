package cl.contraloria.sicogen.utils;


public class CapturaExcepcion extends  RuntimeException{

	private static final long serialVersionUID = 1L;

	public CapturaExcepcion(){
		
	}
	
	public CapturaExcepcion(String s){
		super(s);
	}
	
	public CapturaExcepcion(String s, Throwable ex) {
	    super(s, ex);
	}	
}
