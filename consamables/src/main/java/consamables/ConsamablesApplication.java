package consamables;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.jdbi.DBIFactory;
import org.skife.jdbi.v2.DBI;
import consamables.ConsamablesConfiguration;
import consamables.jdbi.RestaurantDAO;
import consamables.resources.RestaurantResource;

public class ConsamablesApplication extends Application<ConsamablesConfiguration>
{

    @Override
    public void run(ConsamablesConfiguration config,
                    Environment environment) throws ClassNotFoundException
    {
        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, config.getDataSourceFactory(), "postgresql");
        final RestaurantDAO restaurantDAO = jdbi.onDemand(RestaurantDAO.class);

        environment.jersey().register(new RestaurantResource(restaurantDAO));
    }

    @Override
    public void initialize(Bootstrap<ConsamablesConfiguration> bootstrap)
    {
        bootstrap.addBundle(new AssetsBundle("/static/", "/static/"));
    }

    public static void main(String[] args) throws Exception
    {
        new ConsamablesApplication().run(args);
    }

}
