/* ******************************************************************************
 * ALMA - Atacama Large Millimeter Array
 * Copyright (c) ESO - European Southern Observatory, 2014
 * (in the framework of the ALMA collaboration).
 * All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307  USA
 *******************************************************************************/

package alma.obops.angularspringseedproject.controllers;

import alma.obops.angularspringseedproject.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @author amchavan, 09-Oct-2020
 */

@RestController
@RequestMapping("/service/api")
@CrossOrigin(allowCredentials="true")
public class MainController {

    final private TimeService timeService;

	public MainController( @Autowired TimeService timeService ) {
		this.timeService = timeService;
    }

	/**
	 * Return a list of {@code TimeZone} entities:
	 * <pre>
	 *     [ ... {"zoneId":"America/Jujuy","zoneOffset":"-03:00"},{"zoneId":"America/Miquelon","zoneOffset":"-02:00"},...]
	 * </pre>
	 * Call example:
	 * {@code curl -u user:passwd http://localhost:10020/angular-spring-seed/service/api/timezones }
	 */
	@RequestMapping( value = "/timezones", method = RequestMethod.GET )
	public Object doTimeZones() {
		return timeService.timeZones();
	}

	/**
	 * Return the current datetime in the given timezone, ISO format: {@code 2020-10-09T12:06:31.23133}<br>
	 *     Request parameter {@code timezone} defaults to {@code UTC}.
	 *
	 * Call example:
	 * {@code curl -u user:passwd http://localhost:10020/angular-spring-seed/service/api/datetime?timezone=Europe/Paris}
	 */
    @RequestMapping( value = "/datetime", method = RequestMethod.GET )
    public Object doDatetime( @RequestParam( name = "timezone", defaultValue = "UTC" ) String timeZone,
							  HttpServletResponse response ) {
		try {
			final var datetime = timeService.currentTime(timeZone);
			return Map.of( "datetime", datetime, "timezone", timeZone );
		}
		catch (Exception e) {
			response.setStatus( HttpServletResponse.SC_BAD_REQUEST );
			return "Invalid timezone='" + timeZone + "'";
		}
	}
}
