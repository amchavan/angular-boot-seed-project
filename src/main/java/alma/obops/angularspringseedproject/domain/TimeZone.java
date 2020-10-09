package alma.obops.angularspringseedproject.domain;

import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 * @author amchavan, 09-Oct-2020
 */
public class TimeZone implements Comparable<Object> {

    final public ZoneId zoneId;
    final public ZoneOffset zoneOffset;

    public TimeZone( ZoneId zoneId, ZoneOffset zoneOffset ) {
        this.zoneId = zoneId;
        this.zoneOffset = zoneOffset;
    }

    @Override
    public int compareTo( Object o ) {
        if( ! (o instanceof TimeZone) ) {
            throw new IllegalArgumentException( "Not a " + TimeZone.class.getSimpleName() );
        }
        TimeZone other = (TimeZone) o;
        return -1 * this.zoneOffset.compareTo( other.zoneOffset );  // Need to revert, see ZoneOffset#compareTo()
    }

    @Override
    public String toString() {
        return zoneOffset.toString() + " " + zoneId.toString();
    }
}
