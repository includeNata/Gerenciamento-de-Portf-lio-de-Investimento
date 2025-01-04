package projectn.com.server.services;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import projectn.com.server.entities.Coin;
import projectn.com.server.entities.Fii;

import java.util.ArrayList;
import java.util.List;

@Service
public class CoinService {

    @Autowired
    private Gson gson = new Gson();

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public List<Coin> findAll(){
        List<String>  list = redisTemplate.opsForList().range("coins",0,-1);
        List<Coin> coins = new ArrayList<>();
        for(String s : list){
            coins.add(gson.fromJson(s,Coin.class));
        }

        return coins;
    }
}
