package consamables;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.jdbi.DBIFactory;
import org.skife.jdbi.v2.DBI;
import consamables.ConsamablesConfiguration;
import consamables.jdbi.GroupDAO;
import consamables.resources.OrdersResource;

public class ConsamablesApplication extends Application<ConsamablesConfiguration>
{

	@Override
	public void run(ConsamablesConfiguration config,
					Environment environment) throws ClassNotFoundException
	{
		final DBIFactory factory = new DBIFactory();
		final DBI jdbi = factory.build(environment, config.getDataSourceFactory(), "postgresql");
		final GroupDAO dao = jdbi.onDemand(GroupDAO.class);
		environment.jersey().register(new OrdersResource(dao));
	}

	@Override
	public void initialize(Bootstrap<ConsamablesConfiguration> bootstrap)
	{
		// nothing to do yet
	}

	public static void main(String[] args) throws Exception
	{
		new ConsamablesApplication().run(args);
	}

}
