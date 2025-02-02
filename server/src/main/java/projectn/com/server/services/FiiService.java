package projectn.com.server.services;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import projectn.com.server.entities.Fii;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class FiiService {
    @Autowired
    private Gson gson = new Gson();

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public Page<Fii> findAll(Pageable pageable){
         List<String>  list = redisTemplate.opsForList().range("fiis",0,-1);
         List<Fii> fiis = new ArrayList<>();
         for(String s : list){
             fiis.add(gson.fromJson(s,Fii.class));
         }
        fiis.sort(Comparator.comparing(Fii::getPaper));
        int start = (int) pageable.getOffset();
         int end = Math.min(start + pageable.getPageSize(),list.size());
         List<Fii> pageContent  = fiis.subList(start,end);
         return new PageImpl<>(pageContent,pageable,pageable.getPageSize());
    }
}
