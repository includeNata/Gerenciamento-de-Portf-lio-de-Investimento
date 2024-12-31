package data.com;
import data.com.services.FiiService;
import redis.clients.jedis.Jedis;
import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {
        try {
            Jedis jedis = new Jedis("redis_container", 6379);
            String response = jedis.ping();
            System.out.println(response);
            FiiService fiiService = new FiiService(jedis);
            while(true){
                fiiService.addDataRedis();
                Thread.sleep(600000);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}