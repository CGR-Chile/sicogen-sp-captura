<%response.setHeader("Cache-Control","no-cache"); response.setHeader("Pragma","no-cache"); response.setDateHeader("Expires", 0);%>
<%@ page contentType="text/html;charset=windows-1252" pageEncoding="windows-1252"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Error</title>
		<link href="css/error/errorPageStyles.css" rel="stylesheet" media="all"></link>
		
		<link href="css/error/bootstrap.min.css" rel="stylesheet" type="text/css"></link>
		<link href="css/error/brain-theme.css" rel="stylesheet" type="text/css"></link>
		<link href="css/error/errorPageStyles.css" rel="stylesheet" type="text/css"></link>
		<link href="css/error/cuprum.css" rel="stylesheet" type="text/css"></link>
		<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"></link>
		<link href="css/mensaje/jquery.alerts.css" rel="stylesheet" type="text/css" ></link>
		
		<script src="js/jquery-1.7.2.js"></script>
		<script src="js/less-1.3.0.min.js"></script>
		<script src="js/bootstrap/bootstrap-dropdown.js"></script>
		<script src="js/errores.js"></script>
		<script src="js/mensaje/jquery.alerts.js"></script>
	</head>
	<body>
		<div class="page-content">
			<div>
				<img id="logo" src="images/logo.png"  height="92px" width="320px"></img>
			</div>
            <!-- Page title -->
        	<div class="page-title">
                <h5><i class="fa fa-warning"></i> 500 error</h5>
                <div class="btn-group">
                    <a href="#" class="btn btn-link btn-lg btn-icon dropdown-toggle" data-toggle="dropdown">
						<i class="fa fa-cogs"></i><span class="caret"></span>
					</a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li><a id="home">Inicio</a></li>
                        <li><a id="correoTec">Enviar Correo</a></li>
                    </ul>
                </div>
            </div>
            <!-- /page title -->
            <!-- Error wrapper -->
            <div class="error-wrapper text-center">
                <h1 style="font-size: 150px;">Error 500</h1>
               
                <h5><s:property value="errorMUN.errorUsuario"/></h5>
				<div id="detalleError" style="padding: 15px 15px 15px 15px; display:none;text-align: left;">
					<pre><s:property value="errorMUN.errorTecnico"/></pre>
				</div>
            </div>  
            <!-- /error wrapper -->
        </div>
	
	</body>
</html>