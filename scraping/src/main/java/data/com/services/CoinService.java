package data.com.services;

import com.google.gson.Gson;
import data.com.entities.Coin;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class CoinService {


    private static final Logger log = LoggerFactory.getLogger(CoinService.class);
    private static final String URL = "https://coinmarketcap.com";
    private Coin coin;
    private List<Coin> coins =  Collections.synchronizedList(new ArrayList<>());



    public List<Coin> getCoins(){
        String xpathCoin = "//*[@id=\"__next\"]/div[2]/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[#]/td[3]/a";
        String first10 = "//*[@id=\"__next\"]/div[2]/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[#]/td[3]/div/a";
        ExecutorService executor = Executors.newFixedThreadPool(2);
        try {
            long timestamp = System.currentTimeMillis();
            Document doc = Jsoup.connect(URL+"?timestamp="+ timestamp).get();

            executor.submit(()->{
                String aux = first10;
                for(int i =1;i<10;i++){
                    aux = aux.replace("#",i+"");
                    coin = getInformation(doc.selectXpath(aux).attr("href"));
                    coins.add(coin);
                    aux = first10;
                }
            });

            executor.submit(()-> {
                String aux = xpathCoin;
                for(int i =10 ;i<55;i++){
                    aux = aux.replace("#",i+"");
                    coin = getInformation(doc.selectXpath(aux).attr("href"));
                    coins.add(coin);
                    aux = xpathCoin;
                }
            });
            executor.submit(()->{
                String aux = xpathCoin;
                for(int i =55 ;i <=100;i++){
                    aux = aux.replace("#",i+"");
                    coin = getInformation(doc.selectXpath(aux).attr("href"));
                    coins.add(coin);
                    aux = xpathCoin;
                }
            });

            executor.shutdown();
            executor.awaitTermination(10, TimeUnit.SECONDS);

        }catch (IOException e){
            log.error(e.getMessage());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return coins;
    }
    public Coin getInformation(String name){
        String url = "https://coinmarketcap.com"+name;

        Coin coin = new Coin();
        coin.setName(formatName(name));
        try {
            long timestamp = System.currentTimeMillis();
            Document doc = Jsoup.connect(url+"?timestamp="+ timestamp)
                    .get();
            coin.setImage(doc.head().select("meta[property=og:image]").attr("content"));
            String price = doc.selectXpath("/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/div/section/div/div[2]/span").text();

            price = price.replace("$","");
            price = price.replace(".","");
            price = price.replace(",",".");
            coin.setPrice(Double.parseDouble(price));
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return coin;
    }

    public String formatName(String name){

        int count =0;
        name = name.toUpperCase();
        StringBuilder result = new StringBuilder();
        for(int i=0;i<name.length();i++){
            if(name.charAt(i)=='/')
                count++;
            if(name.charAt(i) >= 'A' && name.charAt(i) <= 'Z' && count ==2 || name.charAt(i)=='-')
                result.append(name.charAt(i));
        }
        return result.toString();
    }

}
