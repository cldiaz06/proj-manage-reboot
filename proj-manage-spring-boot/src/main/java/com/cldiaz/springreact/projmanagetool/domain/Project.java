package com.cldiaz.springreact.projmanagetool.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Project Name is required")
	private String projectName;
	
	@NotBlank(message="Project identifier is required")
	@Size(min=4, max=5, message="Please user 4 to 5 characters")
	@Column(updatable=false, unique=true)
	private String projectIdentifier;
	
	@NotBlank(message="Description is required")
	private String projDescription;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date startDate;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date endDate;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date lastModfDate;
	
	public Project() {}
	
	@PrePersist
	protected void onCreate() {
		this.createDate = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.lastModfDate = new Date();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getProjectName() {
		return projectName;
	}



	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}



	public String getProjectIdentifier() {
		return projectIdentifier;
	}



	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}



	public String getProjDescription() {
		return projDescription;
	}



	public void setProjDescription(String projDescription) {
		this.projDescription = projDescription;
	}



	public Date getStartDate() {
		return startDate;
	}



	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}



	public Date getEndDate() {
		return endDate;
	}



	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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
