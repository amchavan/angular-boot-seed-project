package alma.obops.angularspringseedproject.service;

import alma.obops.angularspringseedproject.domain.TimeZone;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * @author amchavan 09-Oct-2020
 */
@Component
public class TimeService {

    /** @return A sorted list of {@link TimeZone} instances */
    public List<TimeZone> timeZones() {

        LocalDateTime now = LocalDateTime.now();
        List<TimeZone> timeZones = new ArrayList<>();

        ZoneId.getAvailableZoneIds().forEach( zoneId -> {
            ZoneId zone = ZoneId.of( zoneId );
            ZoneOffset zoneOffSet = findByZoneId( zoneId, now );
            timeZones.add( new TimeZone( zone, zoneOffSet ));
        });

        timeZones.sort( TimeZone::compareTo );
        return timeZones;
    }

    /**
     * @param timeZone A string like Europe/Berlin
     * @return The current system time in the given timezone, ISO format, like {@code 2020-10-09T13:12:58.433693}
     * @throws IllegalArgumentException If timeZone is invalid
     */
    public String currentTime( String timeZone ) {

        try {
            ZoneId zoneId = ZoneId.of( timeZone );
            return ZonedDateTime.now( zoneId ).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }
        catch (Exception e) {
            throw new IllegalArgumentException( e.getMessage() );
        }
    }

    private ZoneOffset findByZoneId( String zoneId, LocalDateTime dateTime ) {
        ZoneId zone = ZoneId.of( zoneId );
        return zone.getRules().getOffset( dateTime );
    }
}
