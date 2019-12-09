package com.cldiaz.springreact.projmanagetool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cldiaz.springreact.projmanagetool.domain.Project;
import com.cldiaz.springreact.projmanagetool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projRespository;
	
	public Project saveOrUpdatePrj(Project project) {
		return projRespository.save(project);
	}
	
	
	
}
