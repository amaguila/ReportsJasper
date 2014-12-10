$(document).ready(function(){
	
	jQuery.i18n.properties({
	    name:'config', 
	    path:'prop/', 
	    mode:'both',
	    callback: function() {
	    		cnocConnector.ipserver = ip_Server;
	    		cnocConnector.hostname = hostname_Server;
	    		cnocConnector.logout = serviceLogout;
	    		cnocConnector.incidents = incidentService;
	    		cnocConnector.service1 = service1;
	    		cnocConnector.service2 = service2;
	    		cnocConnector.service3 = service3;
	    		cnocConnector.service4 = service4;
	    		cnocConnector.service5 = service5;
	    		cnocConnector.service6 = service6;
	    		cnocConnector.service7 = service7;
	    		cnocConnector.service8 = service8;
	    		cnocConnector.service9 = service9;
	    		cnocConnector.service10 = service10;
	    }
	});
	
	
	$( "#tabs1" ).tabs();
	$( "#tabs2" ).tabs();
	$( "#logout").button({
		icons:{
			primary: "ui-icon-power"
		}
	}).click(function(event){
		 $( "#dialog-confirm" ).dialog({
			 resizable: false,
			 height:140,
			 modal: true,
			 buttons: {
				 	"Ok": function() {
				 		$.ajax({
					        type: 'GET',
					        dataType: 'jsonp',
					        url: cnocConnector.logout,
					        error: function (jqXHR, textStatus, errorThrown) {
					            console.log(jqXHR);
					            window.location = "index.html";
					        },
					        success: function(response){
					        	console.log(response);
					        	window.location = "index.html";	
					        } 
					    });
				 },
				 	Cancel: function() {
				 		$( this ).dialog( "close" );
				 	}
			 	}
			 });
	});
	
	$( "#back").button({
        icons: {
            primary: "ui-icon-home"
        }
	}).click(function(event){
		window.location = "main.html";
	});
	
	
	$('input').prop('disabled', true);

	
	$('#countOpen').click(function(){
//		$("#changesListTable").dataTable().fnDestroy();
		cnocConnector.invokeMashup(cnocConnector.service1,{"code_net":cnocConnector.codeNetGlobal, "flag_stat": "'t'" },drawElements.gridChangesList, "lista", "changesListTable");
	});
	
	$('#countClose').click(function(){
//		$("#changesListTable").dataTable().fnDestroy();
		cnocConnector.invokeMashup(cnocConnector.service1,{"code_net":cnocConnector.codeNetGlobal, "flag_stat": "'f'" },drawElements.gridChangesList, "lista", "changesListTable");
	});
	
	console.log(cnocConnector.refresh);
	
	drawElements.init();
	var refresh = setInterval(function(){
		drawElements.init();
	},cnocConnector.refresh);
	
	

});