package com.medassist.basic.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.medassist.basic.model.User;
import java.util.Optional;



public interface UserRepository extends MongoRepository<User,String> {


     Optional<User> findByEmail(String email);

}
