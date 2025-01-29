package data.com;
import data.com.services.CoinService;
import data.com.services.FiiService;
import redis.clients.jedis.Jedis;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

    public static void main(String[] args) throws IOException {
        Jedis jedis = new Jedis("redis_container", 6379);
        CoinService coinService = new CoinService(jedis);

        FiiService fiiService = new FiiService(jedis);
        while(true){
            try{
                coinService.addDataRedis();
                fiiService.addDataRedis();

                Thread.sleep(300000);

            }catch(Exception e){
                System.out.println(e.getMessage());
            }
        }
    }



}