

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.j2ee.servlets.BaseHttpServlet;

public abstract class AbstractBaseReportBean {
	public enum ExportOption {PDF, HTML, EXCEL, RTF}
	public enum NameReport {ReporteKPIsSupervisores, ReporteKPISxOperadorv2, ReporteOperador, ResumenDiario}
    public enum Sector { INTERNATIONAL, BANCOMER, FINANCIAL, FINA, FINB, 
    	                 FINC, GOVERNMENT, GOVA, GOVB, GOVC, SERVICES, SERA,
    	                 SERB, SERC, INDUSTRY, INDA, INDB, INDC }
    public enum Username { amaguila }
	private ExportOption exportOption;
	private NameReport nameReport;
	private Sector sector;
	private Username username;

	
	private final String COMPILE_DIR = "/jrxml/";
			
	public AbstractBaseReportBean() {
		super();
		setExportOption(ExportOption.PDF);
		setNameReport(NameReport.ReporteKPIsSupervisores);
		setSector(Sector.INTERNATIONAL);
	}

	protected void prepareReport() throws JRException, IOException, ClassNotFoundException, SQLException {
		System.out.println("Prepara el Reporte");
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();
		
		ServletContext context = (ServletContext) externalContext.getContext();
		HttpServletRequest request = (HttpServletRequest) externalContext.getRequest();
		HttpServletResponse response = (HttpServletResponse) externalContext.getResponse();
		
		ReportConfigUtil.compileReport(context, getCompileDir(),  getNameReport().toString() );
        String filename = "Supervisor";
		File reportFile = new File(ReportConfigUtil.getJasperFilePath(context, getCompileDir(), getNameReport() +".jasper"));
        System.out.println("File: "+ reportFile);
		JasperPrint jasperPrint = ReportConfigUtil.fillReport(reportFile, getReportParameters(), getConnection());

		if(getExportOption().equals(ExportOption.HTML)) {
			ReportConfigUtil.exportReportAsHtml(jasperPrint, response.getWriter());
		}else {		
			

			request.getSession().setAttribute(BaseHttpServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);		
			//response.setHeader(request.getContextPath()+"/servlets/report/"+getExportOption(), getNameReport().toString());
			response.setHeader("Content-Disposition", "attachment; filename=" + filename); 
			response.sendRedirect(request.getContextPath()+"/servlets/report/"+getExportOption()  );

		}
		
		FacesContext.getCurrentInstance().responseComplete();
	}
	
	private static Connection getConnection() throws ClassNotFoundException, SQLException {
	    //Configuración de la conexión.
	    //String driver = "org.postgresql.Driver";
	    //String driver="com.informix.jdbc.IfxDriver";
		String driver = "oracle.jdbc.OracleDriver";
	    //String connectString = "jdbc:postgresql://192.168.1.7:5432/bdtest";
	    String connectString = "jdbc:oracle:thin:@10.237.5.168:1521:BDSM";
	    String user = "PRESTO";
	    String password = "2014Kp1spr3st0";

	    Class.forName(driver);
	    Connection conn = DriverManager.getConnection(connectString, user, password);
	     //Retornamos la conexión establecida.
        
	    Statement stmt = conn.createStatement();
	    ResultSet rs;
	    
        rs = stmt.executeQuery(" SELECT NAME FROM SM.assignmentm1 "
        		+ "WHERE module = 'INCIDENTS' AND active = 't' "
        		+ "ORDER BY NAME ");
        while ( rs.next() ) {
            String name = rs.getString("name");
            System.out.println(name);
        }
        conn.close();
        
	return conn;
	}
	
	
	public ExportOption getExportOption() {
		return exportOption;
	}

	public void setExportOption(ExportOption exportOption) {
		this.exportOption = exportOption;
	}
	
	public NameReport getNameReport() {
		return nameReport;
	}

	public void setNameReport(NameReport nameReport) {
		this.nameReport = nameReport;
	}

	public Sector getSector() {
		return sector;
	}

	public void setSector(Sector sector) {
		this.sector = sector;
	}
	
	public Username getUsername() {
		return username;
	}

	public void setUsername(Username username) {
		this.username = username;
	}	
	
	protected Map<String, Object> getReportParameters() {
		return new HashMap<String, Object>();
	}

	protected String getCompileDir() {
		return COMPILE_DIR;
	}
	
	protected abstract JRDataSource getJRDataSource();

	protected abstract String getCompileFileName();

}
