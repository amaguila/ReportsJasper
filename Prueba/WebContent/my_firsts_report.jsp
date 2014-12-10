<%@ page language="java" contentType="text/html; charset=ISO-8859-9" pageEncoding="ISO-8859-9"%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<link rel="stylesheet" type="text/css" href="style.css">
 <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.js"></script>

<html>
<head>
<title>Reportes KPIS</title>
</head>
<body>

<!-- <body> -->
 <f:view>			
	<h:form id="form">
	<h1>Reportes KPIS </h1> 
    <h3>Selecciona el grupo de asignación:  </h3> 	
    <h:selectOneMenu id="sector" value="#{myFirstJasperReportsBean.sector}">      
        <f:selectItem id="item1"  itemLabel="SERA" itemValue="SERA" />
        <f:selectItem id="item2"  itemLabel="SERB" itemValue="SERB" />
        <f:selectItem id="item3"  itemLabel="SERC" itemValue="SERC" />
        <f:selectItem id="item4"  itemLabel="INDA" itemValue="INDA" />
        <f:selectItem id="item5"  itemLabel="INDB" itemValue="INDB" />
        <f:selectItem id="item6"  itemLabel="INDC" itemValue="INDC" />
        <f:selectItem id="item8"  itemLabel="GOVA" itemValue="GOVA" />
        <f:selectItem id="item9"  itemLabel="GOVB" itemValue="GOVB" />
        <f:selectItem id="item10" itemLabel="GOVC" itemValue="GOVC" />
        <f:selectItem id="item11" itemLabel="FINA" itemValue="FINA" />
        <f:selectItem id="item12" itemLabel="FINB" itemValue="FINB" />
        <f:selectItem id="item13" itemLabel="FINC" itemValue="FINC" />      
        <f:selectItem id="item14" itemLabel="BANCOMER" itemValue="BANCOMER" />                
        <f:selectItem id="item15" itemLabel="INTERNATIONAL" itemValue="INTERNATIONAL" /> 
        <f:selectItem id="item16" itemLabel="SERVICES" itemValue="SERVICES" />      
        <f:selectItem id="item17" itemLabel="FINANCIAL" itemValue="FINANCIAL" />      
        <f:selectItem id="item18" itemLabel="GOVERNMENT" itemValue="GOVERNMENT" />
        <f:selectItem id="item19" itemLabel="INDUSTRY" itemValue="INDUSTRY" />                              
                                      
    </h:selectOneMenu>
      <h:panelGrid>
       <table> 
        <tr>
   		 	<h3>Operador:  </h3> 
            <td>
           		<input name="username" type="text" name="username" value=<%=request.getParameter("username") %>>
            </td>
            <td>
            	<input type="submit" value="Submit">
        		<%
            		String first = request.getParameter("username");
            		out.println(first);
        		%>
       		
        	</td>
       </tr>
       </table>
    </h:panelGrid>

	<h3>Selecciona el reporte Supevisores:  </h3> 	   
     <h:selectOneRadio value = "#{myFirstJasperReportsBean.nameReport}">
	     <table width="100%" class="col-lg-12">
            <tr>
 		    	<f:selectItem itemValue="ReporteKPIsSupervisores" itemLabel="Resumen Diario KPI'S Supervisores"/>
 		  	</tr>
 			<tr>
				<f:selectItem itemValue="ReporteKPISxOperadorv2" itemLabel="Resumen Diario KPI'S Operadores"/>
			</tr>		
			<tr>
				<f:selectItem itemValue="ResumenDiario" itemLabel="Resumen Diario Operativo"/>
			</tr>
			<tr>
				<f:selectItem itemValue="ReporteOperador" itemLabel="Reporte Diario por Operador"/>
			</tr>
       					
		</table>
  </h:selectOneRadio>
  
    <h3>Exportar a:  </h3> 

        <h:selectOneRadio value = "#{myFirstJasperReportsBean.exportOption}">
 					<f:selectItem itemValue="PDF"   itemLabel="PDF"/>
					<f:selectItem itemValue="HTML"  itemLabel="HTML"/>
					<f:selectItem itemValue="EXCEL" itemLabel="EXCEL"/>
					<f:selectItem itemValue="RTF"   itemLabel="WORD"/>
		</h:selectOneRadio>
		   <h:commandButton action="#{myFirstJasperReportsBean.execute}" value="Get Report" />      
			</h:form>
		</f:view>
     </body>
</html>