package alma.obops.angularspringseedproject.domain;

import org.junit.Test;

import java.time.ZoneId;
import java.time.ZoneOffset;

import static org.junit.Assert.*;

/**
 * @author amchavan, 09-Oct-2020
 */
public class TestTimeZone {

    @Test
    public void testComparator() {
        TimeZone utc    = new TimeZone( ZoneId.of( "UTC" ),           ZoneOffset.of( "+00:00" ));
        TimeZone berlin = new TimeZone( ZoneId.of( "Europe/Berlin" ), ZoneOffset.of( "+02:00" ));
        System.out.println( "Comparing " + utc + " and " + berlin );
        assertTrue( utc.compareTo( berlin ) < 0 );
    }
}
