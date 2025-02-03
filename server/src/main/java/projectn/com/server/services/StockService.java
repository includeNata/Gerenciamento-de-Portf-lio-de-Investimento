package projectn.com.server.services;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import projectn.com.server.entities.Fii;
import projectn.com.server.entities.Stock;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class StockService {
    @Autowired
    private Gson gson = new Gson();

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public Page<Stock> findAll(Pageable pageable){
        List<String> list = redisTemplate.opsForList().range("stock",0,-1);
        List<Stock> stock = new ArrayList<>();
        for(String s : list){
            stock.add(gson.fromJson(s,Stock.class));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(),list.size());
        List<Stock> pageContent  = stock.subList(start,end);
        return new PageImpl<>(pageContent,pageable,pageable.getPageSize());
    }
}
