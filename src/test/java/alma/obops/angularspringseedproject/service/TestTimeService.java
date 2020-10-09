package alma.obops.angularspringseedproject.service;

import alma.obops.angularspringseedproject.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class TestTimeService {

    @Autowired
    private TimeService timeService;

    @Test
    public void testTimezones() {
        assertNotNull( "Autowire of timeService failed", timeService );       // did autowire work?

        var timeZones = timeService.timeZones();
        assertNotNull( timeZones );
        assertNotEquals( 0, timeZones.size() );
        for( int i = 1; i < timeZones.size(); i++ ) {
            assertTrue( timeZones.get(i-1) + " should come *after* " + timeZones.get(i),
                        timeZones.get(i-1).compareTo( timeZones.get(i) ) <= 0 );
        }
        System.out.println( ">>> timeZones: " + timeZones );
    }

    @Test
    public void testCurrentTime() {
        System.out.println( ">>> Europe/Paris:   " + timeService.currentTime( "Europe/Paris" ));
        System.out.println( ">>> Asia/Singapore: " + timeService.currentTime( "Asia/Singapore" ));
        System.out.println( ">>> UTC:            " + timeService.currentTime( "UTC" ));
        try {
            timeService.currentTime( "bogus" );
            fail( "Expected IllegalArgumentException" );
        }
        catch ( IllegalArgumentException e ) {
            // no-op, expected
        }
    }
}
