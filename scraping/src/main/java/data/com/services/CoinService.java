package data.com.services;

import com.google.gson.Gson;
import data.com.entities.Coin;
import data.com.entities.Fii;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import redis.clients.jedis.Jedis;

import java.io.IOException;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class CoinService {


    private static final Logger log = Logger.getLogger(CoinService.class.getName());
    private static final String URL = "https://coinmarketcap.com";
    private Coin coin;
    CopyOnWriteArrayList<Coin> coins = new CopyOnWriteArrayList<>();
    private Gson gson = new Gson();
    private Jedis jedis;

    public CoinService(Jedis jedis) {
        this.jedis = jedis;
    }

    public List<Coin> getCoins(){
        String xpathCoin = "//*[@id=\"__next\"]/div[2]/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[#]/td[3]/a";
        String first10 = "//*[@id=\"__next\"]/div[2]/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[#]/td[3]/div/a";
        ExecutorService executor = Executors.newFixedThreadPool(3);
        try {
            long timestamp = System.currentTimeMillis();
            Document doc = Jsoup.connect(URL+"?timestamp="+ timestamp).get();

            executor.submit(()->{
                String aux = first10;
                for(int i =1;i<=100;i++){
                    if(i <=10){
                        aux = aux.replace("#",i+"");
                        coin = getInformation(doc.selectXpath(aux).attr("href"));
                        coins.add(coin);
                        aux = first10;

                    }
                    else{
                        aux = xpathCoin;
                        aux = aux.replace("#",i+"");
                        coin = getInformation(doc.selectXpath(aux).attr("href"));
                        coins.add(coin);
                        aux = xpathCoin;
                    }
                }
            });

            executor.shutdown();
            while (!executor.isTerminated()) {
            }


        }catch (IOException e){
            log.warning(e.getMessage());
        }
        return coins;
    }


    public Coin getInformation(String name){
        String url = "https://coinmarketcap.com"+name;
        String fdvXpath = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[3]/div/dd/div/div/div/span";
        String marketCapXpath = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[1]/div/dd/div/div[1]/div/span";
        String circulatingSupplyXpath = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[7]/div/dd/div/div[1]/span";
        String marketCapVolumeXpath = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[4]/div/dd/div/div";
        String marketCapXpathColor = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[1]/div/dd/div/div[2]/p";
        String volumeXpath = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[2]/div/dd/div/div[1]/div/span";
        String volumePercentage = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[2]/div/dd/div/div[2]/p";
        String volumeColor = "//*[@id=\"section-coin-stats\"]/div/div/dl/div[2]/div/dd/div/div[2]/p";
        String aux ="-";
        Coin coin = new Coin();
        coin.setName(formatName(name));
        try {
            long timestamp = System.currentTimeMillis();
            Document doc = Jsoup.connect(url+"?timestamp="+ timestamp)
                    .get();
            coin.setImage(doc.head().select("meta[property=og:image]").attr("content"));
            String price = doc.selectXpath("/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/div/section/div/div[2]/span").text();
            NumberFormat format = NumberFormat.getCurrencyInstance(Locale.US);
            Number number = format.parse(price);
            if(doc.selectXpath(volumeColor).attr("color").equals("red")){
                aux = aux.concat(doc.selectXpath(volumePercentage).text());
                coin.setVolumePercentage(aux);
                coin.setVolume(doc.selectXpath(volumeXpath).text());
            }
            else {
                coin.setVolumePercentage(doc.selectXpath(volumePercentage).text());
                coin.setVolume(doc.selectXpath(volumeXpath).text());
            }
            aux = "-";
            if(doc.selectXpath(marketCapXpathColor).attr("color").equals("red")){
                aux = aux.concat(doc.selectXpath(marketCapXpathColor).text());
                coin.setMarketCapPercentage(aux);
                coin.setMarketCap(doc.selectXpath(marketCapXpath).text());
            }else{
                coin.setMarketCap(doc.selectXpath(marketCapXpath).text());
                coin.setMarketCapPercentage(doc.selectXpath(marketCapXpathColor).text());
            }

            coin.setVolumeMarketCap(doc.selectXpath(marketCapVolumeXpath).text());
            coin.setCirculatingSupply(doc.selectXpath(circulatingSupplyXpath).text());
            coin.setFDV(doc.selectXpath(fdvXpath).text());
            coin.setPrice(number.doubleValue());
        } catch (IOException | ParseException e) {
            log.warning(e.getMessage());
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


    public  void addDataRedis(){
        List<Coin> coinList = getCoins();
        if(jedis.exists("coins"))
            jedis.del("coins");
        for(Coin coin : coinList){
            jedis.lpush("coins", gson.toJson(coin));
        }
        log.info("Add coins in redis");
    }
}
