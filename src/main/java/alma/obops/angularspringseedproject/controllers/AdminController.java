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

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * @author amchavan, 09-Oct-2020
 */

@RestController
@RequestMapping("/admin")
@CrossOrigin(allowCredentials="true")
public class AdminController {

	private static final String VERSION = "0.0.1";

	/**
	 * Return this application's version string -- hardcoded, should be extracted from Git info
	 * Call example:
	 * {@code curl -u user:passwd http://localhost:10020/angular-spring-seed/admin/version }
	 */
	@RequestMapping(value = "/version", method = RequestMethod.GET)
	public Object doTimeZones() {
		var ret = new HashMap<String,String>();
		ret.put( "version", VERSION );
		return ret;
	}
}
