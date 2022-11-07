
function load()
{
	Webservices();
}

function Webservices(){
console.log("Paso 1");
$('#ExpenseTableContainer').jtable('load');	
return false;
	} 

    $(document).ready(function () {
    	 $(document).ready(function() {       
    		 
    		 var codigo = $("#Edit-codigo").val();
    		 var nombre = $("#Edit-nombre").val();
    		    		 
             //setup the jtable that will display the results
             $('#ExpenseTableContainer').jtable({
                 title: 'Tabla de Webservices',
                 selecting: true, //Enable selecting 
                 paging: true, //Enable paging
                 pageSize: 10, //Set page size (default: 10)
                 sorting: true, //Enable sorting
                 actions: {
                     listAction: 'listTblWebservices',
                     createAction: 'addTblWebservices',
                     updateAction: 'updTblWebservices',
                     deleteAction: 'delTblWebservices'
                 },
                 fields: {
                	 areaID: {
                		 title: 'ID',
                         key: true,
                         list: true,
                         create: false,
                         edit: false
                     },
                     tipo: {
                         title: 'Tipo',
                         width: '30%'
                     },
                     url: {
                         title: 'URL',
                         width: '15%'
                     },
                     timeout: {
                         title: 'Timeout',
                         width: '15%'
                     },
                     recordDate: {
                         title: 'Fecha Anulación',
                         width: '15%',
                         edit: false,
                         create: false
                     }
                 },
                 rowInserted: function (event, data) {
                     //if (data.record.Name.indexOf('Andrew') >= 0) {
                	 console.log("records inserted");
                         $('#ExpenseTableContainer').jtable('selectRows', data.row);
                         
                         //$('#PeopleTableContainer').jtable('load');
                     //}
                 },
                 //Register to selectionChanged event to hanlde events                                     
                 recordAdded: function(event, data){
                     //after record insertion, reload the records
                     $('#ExpenseTableContainer').jtable('load');
                 },
                 recordUpdated: function(event, data){
                     //after record updation, reload the records
                     $('#ExpenseTableContainer').jtable('load');
                 }
             });
                     

         });    
    });
    
    function loadData(){
    	$('#ExpenseTableContainer').click(function (e) {
    		e.preventDefault();
    		$('#ExpenseTableContainer').jtable('load', {
    			tipoInforme: $("#TipoInforme :selected").val(),
    			moneda: $("#cbWebservicesC1 :selected").val(),
    			regionId : $("#cbRegion :selected").val(),
    			comunaId : $("#cbComuna :selected").val()
    		});
    		});
    	$('#LoadRecordsButton').click();}