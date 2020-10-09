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

import alma.obops.angularspringseedproject.Application;
import alma.obops.angularspringseedproject.service.TimeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author amchavan, 09-Oct-2020
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
public class TestMainController {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private TimeService timeService;

    @Test
    @WithMockUser(username = "user", password = "pwd")
    public void testTimeZones() throws Exception {
        assertNotNull( "Autowire of mvc failed", mvc );       // did autowire work?

        mvc .perform( get("/service/api/timezones"))
                .andExpect( status().isOk() )
                .andExpect( jsonPath( "$.length()").value( is( equalTo( timeService.timeZones().size() ))));
    }

    @Test
    @WithMockUser(username = "user", password = "pwd")
    public void testDatetime() throws Exception {

        String ret;

        ret = mvc .perform( get("/service/api/datetime"))
                .andExpect( status().isOk() )
                .andReturn().getResponse().getContentAsString();
        System.out.println( ">>> current time: " + ret );

        ret = mvc .perform( get("/service/api/datetime").queryParam( "timezone", "Europe/Paris" ))
                  .andExpect( status().isOk() )
                  .andReturn().getResponse().getContentAsString();
        System.out.println( ">>> current time: " + ret );

        ret = mvc .perform( get("/service/api/datetime").queryParam( "timezone", "Asia/Singapore" ))
                .andExpect( status().isOk() )
                .andReturn().getResponse().getContentAsString();
        System.out.println( ">>> current time: " + ret );

        mvc.perform( get("/service/api/datetime").queryParam( "timezone", "BOGUS" ))
                .andExpect( status().is4xxClientError() );
    }
}
