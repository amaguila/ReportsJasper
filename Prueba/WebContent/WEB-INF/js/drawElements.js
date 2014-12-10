/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */
var drawElements = {
	gridChangesList : function(datos, container, divTable) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].current_phase.toString());
					fields.push(datos.records.record[i].opentime.toString());
					fields.push(datos.records.record[i].close_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.current_phase.toString());
				fields.push(datos.records.record.opentime.toString());
				fields.push(datos.records.record.close_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {
		}
		;

		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [ {
				"sTitle" : "Change ID"
			}, {
				"sTitle" : "Location"
			}, {
				"sTitle" : "Brief Description"
			}, {
				"sTitle" : "Current Phase"
			}, {
				"sTitle" : "Open Time"
			}, {
				"sTitle" : "Close Time"
			} ];
		} catch (err) {
		}
		;

		var grid = cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);

	},
	gridChangesActivities : function(datos, container, divTable) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].datestamp.toString());
					fields.push(datos.records.record[i].operator.toString());
					fields.push(datos.records.record[i].description.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.datestamp.toString());
				fields.push(datos.records.record.operator.toString());
				fields.push(datos.records.record.description.toString());
				rowsData.push(fields);
			}
		} catch (err) {
		}
		;

		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [ {
				"sTitle" : "Date"
			}, {
				"sTitle" : "Operator"
			}, {
				"sTitle" : "Description"
			} ];
		} catch (err) {
		}
		;

		var grid = cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);

	},
	formDetail : function(datos, container, divTable) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {

			var rowsData = [ {
				"value" : datos.records.record.number.toString()
			}, {
				"value" : datos.records.record.status.toString()
			}, {
				"value" : datos.records.record.category.toString()
			}, {
				"value" : datos.records.record.subcategory.toString()
			}, {
				"value" : datos.records.record.phase.toString()
			}, {
				"value" : datos.records.record.app_status.toString()
			}, {
				"value" : datos.records.record.open_time.toString()
			}, {
				"value" : datos.records.record.close_time.toString()
			}, {
				"value" : datos.records.record.company.toString()
			}, {
				"value" : datos.records.record.coordinator.toString()
			}, {
				"value" : datos.records.record.assigned_to.toString()
			}, {
				"value" : datos.records.record.affected_ci.toString()
			}, {
				"value" : datos.records.record.requested_by.toString()
			}, {
				"value" : datos.records.record.location.toString()
			}, {
				"value" : datos.records.record.description.toString()
			}, {
				"value" : datos.records.record.brief_description.toString()
			} ];

		} catch (err) {
		}
		;

		try {
			var rowsHeaders = [ {
				"label" : "Change ID"
			}, {
				"label" : "Status"
			}, {
				"label" : "Category"
			}, {
				"label" : "Subcategory"
			}, {
				"label" : "Phase"
			}, {
				"label" : "Approval Status"
			}, {
				"label" : "Open Time"
			}, {
				"label" : "Close Time"
			}, {
				"label" : "Customer"
			}, {
				"label" : "Request by"
			}, {
				"label" : "Assigned to"
			}, {
				"label" : "Affected CI"
			}, {
				"label" : "Coodinator"
			}, {
				"label" : "Location"
			}, {
				"label" : "Description"
			}, {
				"label" : "Brief Description"
			} ];
		} catch (err) {
		}
		;

		var formd = cnocConnector.drawForm(container, divTable, rowsData, rowsHeaders);

	},
	pieCategory : function(datos, container, divPie) {

		var dataSector = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var array = new Array();
					array.push(datos.records.record[i].category);
					array.push(parseInt(datos.records.record[i].column2));
					dataSector.push(array);
				}
			} else {
				var array = new Array();
				array.push(datos.records.record.category);
				array.push(parseInt(datos.records.record.column2));
				dataSector.push(array);
			}
		} catch (err) {
			dataSector = new Array();
		}
		var optChart = cnocConnector.drawChart("pie", container, "",
				dataSector, null);
		optChart.plotOptions.series.point.events.click = function() {
			//		    	$("#changesListTable").dataTable().fnDestroy();		    	
			cnocConnector.invokeMashup(cnocConnector.service1, {
				"code_net" : cnocConnector.codeNetGlobal,
				"flag_stat" : "'t'",
				"category" : this.name
			}, drawElements.gridChangesList, "lista", "changesListTable");
		};

		chart = new Highcharts.Chart(optChart);

		chart.setTitle({
			text : "Changes Category"
		});

	},
	barPhase : function(datos, container, divPie) {
		var categorias = new Array();
		var totalIncidents = new Array();
		var i = 0;

		try {
			if (datos.records.record.length > 1) {
				for (i = 0; i < datos.records.record.length; i++) {
					categorias[i] = datos.records.record[i].current_phase
							.toString();
					totalIncidents[i] = parseInt(datos.records.record[i].column2
							.toString());
				}
			} else {
				categorias[0] = datos.records.record.current_phase.toString();
				totalIncidents[0] = parseInt(datos.records.record.column2
						.toString());
			}
		} catch (err) {
			categorias = new Array();
			totalIncidents = new Array();
		}

		var optChart = cnocConnector.drawChart("column", container, "",
				totalIncidents, categorias);
		optChart.plotOptions.series.point.events.click = function() {

			//		        $("#changesListTable").dataTable().fnDestroy();
			cnocConnector.invokeMashup(cnocConnector.service1, {
				"code_net" : cnocConnector.codeNetGlobal,
				"flag_stat" : "'t'",
				"phase" : this.category
			}, drawElements.gridChangesList, "lista", "changesListTable");

		};
		chart = new Highcharts.Chart(optChart);
		chart.setTitle({
			text : "Changes Phase"
		});

	},
	countTotal : function(datos, container, divPanel) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {
			var fields = new Array();
			fields.push(datos.records.record.column1.toString());
			rowsData.push(fields);

		} catch (err) {
		}
		;

		var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);

	},
	headerText : function(datos, container, divHeader) {

		var rowsData = new Array();

		if (datos.records.record.length > 1) {
			try {
				var fields = new Array();
				fields.push("CNOC");
				rowsData.push(fields);
			} catch (err) {
			}
			;
		} else {
			try {
				var fields = new Array();
				fields.push(datos.records.record.company.toString());
				rowsData.push(fields);
			} catch (err) {
			}
			;
		}
		var textHeader = cnocConnector.drawHeader(rowsData, container,
				divHeader);

	},
	selectCustom : function(datos, selector, opt) {

		var selText = cnocConnector.drawSelect(datos, selector, "changes");

	},
	init : function(codeNet) {		
		if (codeNet != undefined) {

			$("#countClose").empty();
			$("#countOpen").empty();
			//				 $("#changesListTable").dataTable().fnDestroy();
			//				 $("#changesListActivities").dataTable().fnDestroy();

			this.builder(codeNet);
		} else {

			cnocConnector.invokeMashup(cnocConnector.service9, {},
					drawElements.selectCustom, "SelectCustomer", "opt");

			this.builder(codeNet);

		}

	},
	builder : function(codeNet) {
		try {
			cnocConnector.invokeMashup(cnocConnector.service1, {"code_net" : codeNet,"flag_stat" : "'t'"}, 
					drawElements.gridChangesList, "lista", "changesListTable");
			cnocConnector.invokeMashup(cnocConnector.service2, {"code_net" : codeNet}, 
					drawElements.pieCategory, "containerCategory", "divContainerCategory");
			cnocConnector.invokeMashup(cnocConnector.service3, {"code_net" : codeNet}, 
					drawElements.barPhase, "containerPhase", "divContainerPhase");				
			this.drawTabs(new Array("Activities", "Tasks"), "bitacora", "tabsChanges");
			cnocConnector.invokeMashup(cnocConnector.service4, {"ci" : "''"}, 
					drawElements.gridChangesActivities, "tabsChangesActivities", "changesListActivities");
			cnocConnector.invokeMashup(cnocConnector.service10, {"change_id" : "''"}, 
					drawElements.gridChangeTasks, "tabsChangesTasks", "changesListTasks");
			cnocConnector.invokeMashup(cnocConnector.service5, {"code_net" : codeNet}, 
					drawElements.countTotal, "countOpen", "pOpen");
			cnocConnector.invokeMashup(cnocConnector.service6, {"code_net" : codeNet}, 
					drawElements.countTotal, "countClose", "pClose");
			cnocConnector.invokeMashup(cnocConnector.service7, {}, 
					drawElements.headerText, "company", "headerText");
			cnocConnector.invokeMashup(cnocConnector.service8, {"ci" : "''"}, 
					drawElements.formDetail, "detailForm1", "d");
		} catch (error) {
			alert(error);
		}

	},
	drawTabs : function(tabTitles, container, id) {
		/** Create jQuery tabs **/

		$('#' + container).empty();

		$('#' + container).append('<div id="' + id + '"></div>');
		$('#' + id).append('<ul></ul>');

		$(tabTitles)
				.each(
						function(k, v) {
							$('#' + id + ' ul').append(
									'<li><a href="#tabs-' + k + '">' + v
											+ '</a></li>');
							$('#' + id).append(
									'<div id="tabs-' + k + '"><div id="' + id
											+ v + '"></div></div>');
						});

		$('#' + id).tabs();

	},
	gridChangeTasks : function(datos, container, divTable) {
		
		/* GENERA ARRAY DE DATOS A GRAFICAR */
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].category.toString());					
					fields.push(datos.records.record[i].description.toString());
					fields.push(datos.records.record[i].status.toString());
					fields.push(datos.records.record[i].orig_date_entered.toString());
					fields.push(datos.records.record[i].current_phase.toString());
					rowsData.push(fields);
				}

			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.category.toString());				
				fields.push(datos.records.record.description.toString());
				fields.push(datos.records.record.status.toString());
				fields.push(datos.records.record.orig_date_entered.toString());
				fields.push(datos.records.record.current_phase.toString());
				rowsData.push(fields);
			}
		} catch (err) {};

		/* GENERA ARRAY DE ENCABEZADOS DE GRAFICA */
		var rowsHeaders = [ {
			"sTitle" : "Task ID"
		}, {
			"sTitle" : "Category"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Status"
		}, {
			"sTitle" : "Date"
		}, {
			"sTitle" : "Phase"
		} ];

		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	},test:function (datos){
		console.log(datos);
	}
};