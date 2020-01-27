package com.cldiaz.springreact.projmanagetool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cldiaz.springreact.projmanagetool.domain.Backlog;
import com.cldiaz.springreact.projmanagetool.domain.Project;
import com.cldiaz.springreact.projmanagetool.exception.ProjectIdException;
import com.cldiaz.springreact.projmanagetool.repositories.BacklogRepository;
import com.cldiaz.springreact.projmanagetool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projRespository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	public Project saveOrUpdatePrj(Project project) {
		
		String projIdentifier = project.getProjectIdentifier().toUpperCase();
		
		try {
			project.setProjectIdentifier(projIdentifier);
			
			if(project.getId() == null) {
				Backlog log = new Backlog();
				project.setBacklog(log);
				log.setProject(project);
				log.setProjectIdentifier(projIdentifier);
			}
			
			if(project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projIdentifier));
			}
			
			return projRespository.save(project);
			
		}catch(Exception x) {
			throw new ProjectIdException("Project ID '" +projIdentifier+"' already exists");
		}
	}
	
	public Project findProjectByIdentifier(String projectId) {
		Project proj = projRespository.findByProjectIdentifier(projectId.toUpperCase());
		
		if(proj == null) {
			throw new ProjectIdException("Project Id '" +projectId + "' does not exists");
		}
		
		return proj;
	}
	
	public Iterable<Project> findAllProjects(){
		return projRespository.findAll();
	}
	
	public void deleteProjByIdentifier(String projectId) {
		Project proj = projRespository.findByProjectIdentifier(projectId);
		
		if(proj == null) {
			throw new ProjectIdException("Cannot find Project with ID:'" + projectId +"'. this project does not exist.");		
		}
		
		projRespository.delete(proj);
	}
	
	
	
}
