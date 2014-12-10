/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsGral = {
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsGral.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){
			
			cnocConnector.invokeMashup(cnocConnector.service13, {"codenet" : codenet},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			
			cnocConnector.invokeMashup(cnocConnector.service12, {"codenet" : codenet},drawElementsGral.chartGroups, "chartGrupos", "chartGruposG");
			//this.mapaGeneral(null, null, null);
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : ""},drawElementsGral.countStatus, "countAll", "countAllG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "reachable"},drawElementsGral.countStatus, "countReachable", "countReachableG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "degraded"},drawElementsGral.countStatus, "countDegraded", "countDegradedG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "unreachable"},drawElementsGral.countStatus, "countUnreachable", "countUnreachableG");
		},selectCustom : function(datos, selector, opt) {
			
			var selText = cnocConnector.drawSelect(datos, selector, "general");
			
			drawElementsGral.builder($("#SelectCustomer").val());

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);

			
		},mapaGeneral:function(datos, container, divgroups){
			
			var mapOptions = {
					zoom: 4,
					center: new google.maps.LatLng(21.8833, -102.3),
					mapTypeId: google.maps.MapTypeId.TERRAIN, 
					infoWindow: null
				};
			map = new google.maps.Map(document.getElementById('mapGral'), mapOptions);
			
		},chartGroups:function(datos, container, divgroups){
			
			var categorias = new Array();
			var unreachable = new Array();
			var reachable = new Array();
			var degraded = new Array();
			var i = 0;

			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias.push(datos.records.record[i].groups.toString());
						unreachable.push(parseInt(datos.records.record[i].unreachable.toString()));
						reachable.push(parseInt(datos.records.record[i].reachable.toString()));
						degraded.push(parseInt(datos.records.record[i].degraded.toString()));
					}
				} else {
					categorias.push(datos.records.record.groups.toString());
					unreachable.push(parseInt(datos.records.record.unreachable.toString()));
					reachable.push(parseInt(datos.records.record.reachable.toString()));
					degraded.push(parseInt(datos.records.record.degraded.toString()));
				}
			} catch (err) {
				var categorias = new Array();
				var unreachable = new Array();
				var reachable = new Array();
				var degraded = new Array();
			}
			
			var totalNodos = [{
					"name" : "reachable",
					"data" : reachable,									
				},{
					"name" : "unreachable",
					"data" : unreachable,									
				},{
					"name" : "degraded",
					"data" : degraded,									
				}];

			var optChart = cnocConnector.drawChartGroups("bar", container, "",totalNodos, categorias);
			
			console.log(optChart);
			chart = new Highcharts.Chart(optChart);
			chart.setTitle({text : "Nodes By Group"});
			
			
	},drawListNodes: function (datos, container, divTable){
		console.log(datos);
		console.log(container);
		console.log(divTable);
		jQuery("#" + container).empty();	
		
		var rowsData = new Array();
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].status_value.toString()==="degraded"){
						tableT += "<tr class='warning'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="reachable"){
						tableT += "<tr class='success'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="unreachable"){
						tableT += "<tr class='danger'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}					
					/*var fields = new Array();
					fields.push(datos.records.record[i].status_value.toString());
					fields.push(datos.records.record[i].name.toString());
					rowsData.push(fields);*/
				}
			} else {
				tableT += "<tr><td>"+datos.records.record.name.toString()+"</td></tr>";
				/*var fields = new Array();
				fields.push(datos.records.record.status_value.toString());
				fields.push(datos.records.record.name.toString());
				rowsData.push(fields);*/
			}
		} catch (err) {	};
		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [{
				"sTitle" : "Node Name"
			}];
		} catch (err) {	};
		/*$('#listNodes').append(tableT);
		console.log(tableT);
		$('#listNodesG').dataTable();
		jQuery("#listNodesG").dataTable();*/
		
				
		
		
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);		
	}		
};