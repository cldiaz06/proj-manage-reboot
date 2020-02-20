package com.cldiaz.springreact.projmanagetool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cldiaz.springreact.projmanagetool.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

}
