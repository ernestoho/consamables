package consamables;

import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsamablesConfiguration extends Configuration {

	@Valid
	@NotNull
	@JsonProperty
	private DataSourceFactory database = new DataSourceFactory();
	
	public DataSourceFactory getDataSourceFactory() {
		return database;
	}
}
