package consamables;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.oauth.OAuthCredentialAuthFilter;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.jdbi.DBIFactory;

import org.skife.jdbi.v2.DBI;
import consamables.ConsamablesConfiguration;
import consamables.api.User;
import consamables.auth.OAuthAuthenticator;
import consamables.jdbi.AccessTokenDAO;
import consamables.jdbi.GroupDAO;
import consamables.jdbi.ItemDAO;
import consamables.jdbi.MenuSectionDAO;
import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;
import consamables.jdbi.RestaurantDAO;
import consamables.jdbi.SplitwiseTokenDAO;
import consamables.jdbi.SplitwiseUserDAO;
import consamables.jdbi.UserDAO;
import consamables.jdbi.VoteDAO;
import consamables.payment.PaymentManager;
import consamables.resources.GroupResource;
import consamables.resources.OrderResource;
import consamables.resources.PaymentResource;
import consamables.resources.RestaurantResource;
import consamables.resources.UserResource;

public class ConsamablesApplication extends Application<ConsamablesConfiguration> {

    @Override
    public String getName() {
        return "Consamables Server";
    }

    @Override
    public void run(ConsamablesConfiguration config, Environment environment)
            throws ClassNotFoundException {
        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, config.getDataSourceFactory(), "postgresql");
        final RestaurantDAO restaurantDAO = jdbi.onDemand(RestaurantDAO.class);
        final GroupDAO groupDAO = jdbi.onDemand(GroupDAO.class);
        final MenuSectionDAO menuSectionDAO = jdbi.onDemand(MenuSectionDAO.class);
        final ItemDAO itemDAO = jdbi.onDemand(ItemDAO.class);
        final OrderDAO orderDAO = jdbi.onDemand(OrderDAO.class);
        final OrderItemDAO orderItemDAO = jdbi.onDemand(OrderItemDAO.class);
        final VoteDAO voteDAO = jdbi.onDemand(VoteDAO.class);
        final AccessTokenDAO accessTokenDAO = jdbi.onDemand(AccessTokenDAO.class);
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final SplitwiseTokenDAO splitwiseTokenDAO = jdbi.onDemand(SplitwiseTokenDAO.class);
        final SplitwiseUserDAO splitwiseUserDAO = jdbi.onDemand(SplitwiseUserDAO.class);

        final PaymentManager paymentManager = new PaymentManager(
                config.getSplitwiseConsumerKey(),
                config.getSplitwiseConsumerSecret(),
                config.getSplitwiseGroupId(),
                splitwiseTokenDAO, splitwiseUserDAO);

        environment.jersey().register(new RestaurantResource(restaurantDAO, menuSectionDAO, itemDAO));
        environment.jersey().register(new GroupResource(groupDAO, voteDAO, orderDAO, orderItemDAO));
        environment.jersey().register(new OrderResource(orderDAO, orderItemDAO));
        environment.jersey().register(new UserResource(userDAO, accessTokenDAO));
        environment.jersey().register(new PaymentResource(paymentManager));

        environment.jersey().register(new AuthDynamicFeature(
                new OAuthCredentialAuthFilter.Builder<User>()
                    .setAuthenticator(new OAuthAuthenticator(accessTokenDAO, userDAO))
                    .setPrefix("Bearer")
                    .buildAuthFilter()));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
    }

    @Override
    public void initialize(Bootstrap<ConsamablesConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/build/", "/static/"));
    }

    public static void main(String[] args) throws Exception {
        new ConsamablesApplication().run(args);
    }
}
