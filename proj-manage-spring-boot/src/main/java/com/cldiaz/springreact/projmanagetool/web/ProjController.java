package com.cldiaz.springreact.projmanagetool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cldiaz.springreact.projmanagetool.domain.Project;
import com.cldiaz.springreact.projmanagetool.services.MapValidErrorService;
import com.cldiaz.springreact.projmanagetool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjController {

	@Autowired
	private ProjectService projService;
	
	@Autowired
	private MapValidErrorService mapValidErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project proj, BindingResult result){
		
		ResponseEntity<?> errorMap = mapValidErrorService.MapValidation(result);
		if(errorMap != null) return errorMap;

		Project project = projService.saveOrUpdatePrj(proj);
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId){
		Project proj = projService.findProjectByIdentifier(projectId);
		return new ResponseEntity<Project>(proj, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects(){
		return projService.findAllProjects();
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProj(@PathVariable String projectId){
		projService.deleteProjByIdentifier(projectId);
		
		return new ResponseEntity<String>("Project with ID: '" + projectId+"'was deleted.", HttpStatus.OK);
	}
	
}
