package consamables;

import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsamablesConfiguration extends Configuration
{
	@Valid
	@NotNull
	private DataSourceFactory database = new DataSourceFactory();
	
	@JsonProperty("database")
	public void setDataSourceFactory(DataSourceFactory factory)
	{
		this.database = factory;
	}
	
	@JsonProperty("database")
	public DataSourceFactory getDataSourceFactory()
	{
		return database;
	}
}
