package com.cldiaz.springreact.projmanagetool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true,
							jsr250Enabled = true,
							prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	

	@Autowired
	private JwtAuthenticationEntryPoint unAuthorizedHandler;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unAuthorizedHandler).and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.headers().frameOptions().sameOrigin() //Enables H2 from Employer Demos
			.and()
			.authorizeRequests()
			.antMatchers(
						"/",
						"/favicon.ico",
						"/**/*.png",
						"/**/*.gif",
						"/**/*.svg",
						"/**/*.html",
						"/**/*.css",
						"/**/*.js"
			).permitAll()
			.anyRequest().authenticated();
	}

	
	
	
}
