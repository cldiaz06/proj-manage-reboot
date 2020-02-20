package com.cldiaz.springreact.projmanagetool.domain;

import java.security.KeyStore.PrivateKeyEntry;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Email(message = "Username needs to be an email.")
	@NotBlank(message = "Username field is required.")
	@Column(unique = true)
	private String username;
	
	@NotBlank(message = "Please enter full name")
	private String fullName; 
	
	@NotBlank(message = "Password is required")
	private String password;
	
	@Transient
	private String confirmPassword;
	private Date createDate;
	private Date lastModfDate;
	
	//OneToMany with project
	
	@PrePersist
	protected void onCreate() {
		this.createDate = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.lastModfDate = new Date();
	}

	public User() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getLastModfDate() {
		return lastModfDate;
	}

	public void setLastModfDate(Date lastModfDate) {
		this.lastModfDate = lastModfDate;
	}
	
	
	
	
}
