package alma.obops.angularspringseedproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		TimeZone.setDefault( TimeZone.getTimeZone( "Etc/GMT" ));    // Make sure this application operates in UT
		SpringApplication.run(Application.class, args);
	}
}
