
import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRDataSource;

public class myFirstJasperReportsBean  extends AbstractBaseReportBean {
private final String COMPILE_FILE_NAME = "ReporteKPIsSupervisores";
	
	@Override
	protected String getCompileFileName() {
		return COMPILE_FILE_NAME;
	}
	
	@Override
	protected Map<String, Object> getReportParameters() {
      
		Map<String, Object> reportParameters = new HashMap<String, Object>();
		
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();		
    	ServletContext context = (ServletContext) externalContext.getContext();
				
		reportParameters.put("assignment", getSector() );
		reportParameters.put("operator", getUsername() );

		reportParameters.put("SUBREPORT_DIR", context.getRealPath("/servlets/report/") );
        System.out.println("SUBREPORT_DIR: " + context.getRealPath("/servlets/report/")  );
        System.out.println("Operator:" + getUsername() );
		return reportParameters;
	}

	//@Override 
	//protected JRDataSource getJRDataSource() {
		// return your custom datasource implementation
	//	MyFirstJasperReportDatasource dataSource = new MyFirstJasperReportDatasource();
		
		//return dataSource;
//	}
	
	public String execute() {
		try {
			super.prepareReport();
		} catch (Exception e) {
			// make your own exception handling
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	protected JRDataSource getJRDataSource() {
		// TODO Auto-generated method stub
		return null;
	}

}
