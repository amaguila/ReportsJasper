var cnocConnector = {
	refresh: 0,	
	codeNetGlobal : '',
	hostname : '',
	logout : '',
	ipserver : '',
	incidents : '',
	service1 : '',
	service2 : '',
	service3 : '',
	service4 : '',
	service5 : '',
	service6 : '',
	service7 : '',
	service8 : '',
	service9 : '',
	service10 : '',
	service11 : '',
	service12 : '',	
	
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) {	
		$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				url : invokeUrl,
				data : params,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				},
				success : function(response) {
					try {						
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboard/index.html";
						}
					} catch (err) {
						//console.log(invokeUrl);
						$.ajax({
							type : 'GET',
							dataType : 'jsonp',
							url : invokeUrl,
							data : params,
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
							},
							success : function(response) {
								//console.log(response);
								callback(response, divcontainer, divelements);
								$( "#" + divcontainer ).unmask();
							}
						});
					}
				}
			});
		} catch (error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},
	/*
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) {
		$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : invokeUrl,
				data : params,
				statusCode : {
					401 : function() {
						alert('Session Time Out');
						window.location = "/dashboard/index.html";
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				},
				success : function(response) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboard/index.html";
						}
					} catch (err) {
						$.ajax({
							type : 'GET',
							dataType : 'jsonp',
							url : invokeUrl,
							data : params,
							error : function(jqXHR, textStatus, errorThrown) { console.log(jqXHR); },
							success: function(response){
								callback(response, divcontainer,divelements);
								$( "#" + divcontainer ).unmask();
							}
						});
					}
				}
			});
		} catch(error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},*/
	drawGrid : function(container, divTable, rowsData, rowsHeaders, pagination) {

		jQuery("#" + container).empty();		
		
		//jQuery("#" + container).append('<table class="table table-striped table-bordered" id="'+ divTable + '"></table>');
		//jQuery("#" + container).append('<table class="table table-striped table-hover " id="'+ divTable + '"></table>');

//		var domData = "";
//		if (divTable === "changesListTable") {
//			domData = '<"H"lfr<"toolbarList">>t<"F"ip>';
//		} else if (divTable === "changesListActivities") {
//			domData = '<"H"lfr<"toolbarActivities">>t<"F"ip>';
//		}		
//
//		$("div.toolbarList").html('<h1>Changes List</h1>');
//		$("div.toolbarActivities").html('<h1>Activities</h1>');
		var dTable;
		if(divTable === "listNodesG"){
			jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '">'+rowsData+'</table>');
			dTable = jQuery("#" + divTable).dataTable({
				"aoColumns" : rowsHeaders
			});
		}else{
			jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '"></table>');
			dTable = jQuery("#" + divTable).dataTable({
				//"sDom": domData,
				//"bJQueryUI" : true,
				"aaData" : rowsData,
				"aoColumns" : rowsHeaders
			});
		}

		if (divTable === "changesListTable") {
			/* Add a click handler to the rows - this could be used as a callback */
			$("#" + divTable).delegate("tbody tr", "click", function () {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');		        
				} 
				else {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var id = $(nTds[0]).text();
					
					cnocConnector.invokeMashup(cnocConnector.service8, {"ci" : "'" + id + "'"}, 
							drawElements.formDetail, "detailForm1", "d");

					cnocConnector.invokeMashup(cnocConnector.service4, {"ci" : "'" + id + "'"}, 
							drawElements.gridChangesActivities, "tabsChangesActivities","changesListActivities");
					
					cnocConnector.invokeMashup(cnocConnector.service10, {"change_id" : id}, 
							drawElements.gridChangeTasks, "tabsChangesTasks", "changesListTasks");
				}
			});
			
			/*
			jQuery('#' + divTable + ' tbody tr').on(
					'click',
					function() {
						var nTds = jQuery('td', this);
						var id = jQuery(nTds[0]).text();
						cnocConnector.invokeMashup(cnocConnector.service8, {
							"ci" : "'" + id + "'"
						}, drawElements.formDetail, "detailForm1", "d");
						// $("#changesListActivities").dataTable().fnDestroy();
						cnocConnector.invokeMashup(cnocConnector.service4, {
							"ci" : "'" + id + "'"
						}, drawElements.gridChangesActivities,
								"tabsChangesActivities",
								"changesListActivities");
						cnocConnector.invokeMashup(cnocConnector.service10, {
							"change_id" : "'" + id + "'"
						}, drawElements.gridChangeTasks, "tabsChangesTasks",
								"changesListTasks");

					});*/
		}
		return dTable;
	},drawPanel : function(rowsData, container, idPanel) {
		jQuery("#" + container).empty();
		jQuery("#" + container).append(
				'<p id="' + idPanel + '">' + rowsData + '</p>');
		return null;
	},drawHeader : function(rowsData, container, idHead) {
		jQuery("#" + container).append(
				'<h1 id="' + idHead
						+ '" style="text-align:center; color:#FFF">' + rowsData
						+ '</h1>');
		return null;
	},drawForm : function(container, divTable, rowsData, rowsHeaders) {

		for ( var i = 0; i < rowsData.length; i++) {

			/*
			 * jQuery("#"+container).append( '<tr><td width="10%"><label
			 * for='+rowsHeaders[i].label+'>'+rowsHeaders[i].label+'</label></td><td width="30%" id="td+'+rowsHeaders[i].label+'"><input
			 * type="text" name="'+rowsHeaders[i].label+'"
			 * id="'+rowsHeaders[i].label+'" size="15" value='+
			 * rowsData[i].value +'></td></tr>' );
			 * console.log(rowsData[i].value);
			 */

			jQuery("#detail" + i).val(rowsData[i].value);
		}

		return null;

	},drawChartGroups : function(type, container, nameChart, dataChart, categorias) {
		var optChart = {
				 chart: {
					 	renderTo : container,
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false,
		                type: type
		            },
		            title: {
		                text: nameChart
		            },
		            xAxis: {
		                categories: categorias
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'Total Nodes'
		                }
		            },
		            legend: {
		                reversed: true
		            },
		            plotOptions: {
		                series: {
		                    stacking: 'normal',
		                    events: {
		                        click: function(event) {
		                        	
		                        	cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":event.point.category,"status":event.point.series.name},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
		                        	/*console.log(cnocConnector.codeNetGlobal);
		                        	console.log(event);
		                        	console.log(event.point.series.name);
		                        	console.log(event.point.y);
		                        	console.log(event.point.category);*/                        	
		                          //alert(event.point.category);
		                        }
		                      }
		                },
		                color: ['#FF0000','#000000']
		            },
		                series: dataChart
		};
		return optChart;
	},drawChart : function(type, container, nameChart, dataChart, categorias) {
		var optChart = {
			chart : {
				renderTo : container,
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			},
			xAxis : {
				categories : categorias,
				labels : {
					//align : 'center',
					style : {
						fontSize : '8px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			},
			credits : {
				enabled : false
			},

			title : {
				style : {
					fontWeight : 'bold',
					fontSize : '10px'
				}
			},
			tooltip : {
				formatter : function() {
					var s;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y;
					} else {
						s = '' + this.x + ': ' + this.y;
					}
					return s;
				}
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false
					},
					showInLegend : true
				},
				series : {
					cursor : 'pointer',
					point : {
						events : {
							click : null
						}
					}
				}
			},
			series : [ {
				type : type,
				name : nameChart,
				data : dataChart,
				dataLabels : {
					enabled : false,
					color : '#FFFFFF',
					align : 'right',
					style : {
						fontSize : '10px',
						fontFamily : 'Verdana, sans-serif',
						textShadow : '0 0 3px black'
					}
				}
			} ]
		};

		return optChart;
	},drawSelect : function(datos, container, module) {

		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].network_code
										.toString() + "'>"
								+ datos.records.record[i].dept_name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option value='"
							+ datos.records.record.network_code.toString()
							+ "'>" + datos.records.record.dept_name.toString()
							+ "</option>");

		}

		$("#" + container).chosen({
			allow_single_deselect : true
		}).change(function() {
			if(module==="changes"){
				drawElements.init($(this).val());
			}else if(module==="general"){
				drawElementsGral.init($(this).val());
			}				
			cnocConnector.codeNetGlobal = $(this).val();

		});
	}
};
