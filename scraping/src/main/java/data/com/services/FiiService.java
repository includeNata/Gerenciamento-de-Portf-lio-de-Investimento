package data.com.services;

import com.google.gson.Gson;
import data.com.entities.Fii;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import redis.clients.jedis.Jedis;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

public class FiiService {
    private static final String URL = "https://www.fundamentus.com.br/fii_resultado.php";
    CopyOnWriteArrayList<Fii> fiis = new CopyOnWriteArrayList<>();

    private Jedis jedis;
    private Gson gson = new Gson();
    private static final Logger log = Logger.getLogger(FiiService.class.getName());

    public FiiService(Jedis jedis) {
        this.jedis = jedis;
    }

    public List<Fii> getFii() {
        String xpath = "//*[@id=\"tabelaResultado\"]/tbody/tr[#]";
        ExecutorService executorService = Executors.newFixedThreadPool(4);
        try {
            Document doc = Jsoup.connect(URL).get();

            for(int i=1;i<=496;i++){
                int pos = i;
                executorService.submit(()->{
                    String aux = xpath;
                    aux = aux.replace("#", pos +"");
                    fiis.add(create(doc,aux));
                    aux = xpath;
                });

            }
            executorService.shutdown();
            while (!executorService.isTerminated()) {
            }


        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fiis;
    }

    public Fii create(Document doc,String xpath){
            Fii f = new Fii();
            String aux;
            f.setPaper(doc.selectXpath(xpath+"/td[1]").text());

            f.setSegment(doc.selectXpath(xpath+"/td[2]").text());

            aux = doc.selectXpath(xpath+"/td[3]").text();
            aux = aux.replace(",","").replace(",",".");
            f.setQuotation(Double.parseDouble(aux));

            f.setFfO(doc.selectXpath(xpath+"/td[4]").text());

            f.setDividend(doc.selectXpath(xpath+"/td[5]").text());

            aux = doc.selectXpath(xpath+"/td[6]").text();
            aux = aux.replace(",",".");
            f.setpVp(Double.parseDouble(aux));

            aux = doc.selectXpath(xpath+"/td[7]").text();
            String validNumber = aux.replaceAll("\\.(?=.*\\.)", "");
            f.setMarketValue(Double.parseDouble(validNumber));

            aux = doc.selectXpath(xpath+"/td[8]").text();
            validNumber = aux.replaceAll("\\.(?=.*\\.)", "");
            f.setLiquidity(Double.parseDouble(validNumber));

            f.setQuantityProperty(Integer.parseInt(doc.selectXpath(xpath+"/td[9]").text()));

            aux  = doc.selectXpath(xpath+"/td[10]").text();
            aux =aux.replace(",","").replace(",",".");
            aux = aux.replaceAll("\\.(?=.*\\.)", "");
            f.setPriceM2(Double.parseDouble(aux));

            aux  = doc.selectXpath(xpath+"/td[11]").text();
            aux =aux.replace(",","").replace(",",".");
            aux = aux.replaceAll("\\.(?=.*\\.)", "");
            f.setRentM2(Double.parseDouble(aux));

            f.setCapRate(doc.selectXpath(xpath+"/td[12]").text());

            f.setAverageVacancy(doc.selectXpath(xpath+"/td[13]").text());
            return f;
    }

   public void addDataRedis(){

        if(jedis.exists("fiis"))
            jedis.del("fiis");

           List<Fii> list = getFii();
           for (Fii fii : list) {
               jedis.lpush("fiis", gson.toJson(fii));
           }
       log.info("Add fii in redis");
    }

}
