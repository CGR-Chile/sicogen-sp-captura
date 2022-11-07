package cl.contraloria.sicogen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jndi.JndiTemplate;

import javax.naming.NamingException;
import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean(destroyMethod = "")
    public DataSource dataSource() throws NamingException {
        return (DataSource) new JndiTemplate().lookup("jdbc/jdbcContraloriaPUB");
    }
}
