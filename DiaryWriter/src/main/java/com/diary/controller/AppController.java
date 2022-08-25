package com.diary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Apps HTTP Request Handler
 *
 * @author : Harikrishnan M R
 * @version :1.0
 * @since :17-08-2022
 */
@Controller
@CrossOrigin(origins = "*")
public class AppController {

	@GetMapping("/")
	public String initialPage(@CookieValue(name = "systemId", required = false) String accountId) {

		return "login2";

	}

	@GetMapping("/login")
	public String home(@CookieValue(name = "systemId", required = false) String accountId, ModelMap modelMap) {
		return "login2";
	}

}
