package consamables;

import io.dropwizard.Configuration;
import io.dropwizard.client.JerseyClientConfiguration;
import io.dropwizard.db.DataSourceFactory;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsamablesConfiguration extends Configuration {
    @Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

    @Valid
    @NotNull
    private JerseyClientConfiguration jerseyClient = new JerseyClientConfiguration();
    
    @Valid
    @NotNull
    @JsonProperty
    private String splitwiseConsumerKey;
    
    @Valid
    @NotNull
    @JsonProperty
    private String splitwiseConsumerSecret;

    @JsonProperty("database")
    public void setDataSourceFactory(DataSourceFactory factory) {
        this.database = factory;
    }

    @JsonProperty("database")
    public DataSourceFactory getDataSourceFactory() {
        return database;
    }

    @JsonProperty("jerseyClient")
    public JerseyClientConfiguration getJerseyClientConfiguration() {
        return jerseyClient;
    }
    
    @JsonProperty("jerseyClient")
    public void setJerseyClientConfiguration(JerseyClientConfiguration jerseyClient) {
        this.jerseyClient = jerseyClient;
    }

    public String getSplitwiseConsumerKey() {
        return splitwiseConsumerKey;
    }

    public void setSplitwiseConsumerKey(String splitwiseConsumerKey) {
        this.splitwiseConsumerKey = splitwiseConsumerKey;
    }

    public String getSplitwiseConsumerSecret() {
        return splitwiseConsumerSecret;
    }

    public void setSplitwiseConsumerSecret(String splitwiseConsumerSecret) {
        this.splitwiseConsumerSecret = splitwiseConsumerSecret;
    }
}
