package data.com.services;

import com.google.gson.Gson;
import data.com.entities.Stock;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.Elements;
import redis.clients.jedis.Jedis;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

public class StockService {
    private static final String URL = "https://www.fundamentus.com.br/resultado.php?interface=classic&interface=mobile";
    CopyOnWriteArrayList<Stock> stock = new CopyOnWriteArrayList<>();

    private Jedis jedis;
    private Gson gson = new Gson();
    private static final Logger log = Logger.getLogger(StockService.class.getName());

    public StockService(Jedis jedis) {this.jedis = jedis;}

    public List<Stock> getStock() {
       // String xpath = "//*[@id=\"resultado\"]/tbody/tr[#]";
        String xpath = "/html/body/div[2]/div/div[2]/table/tbody/tr[#]";

        ExecutorService executorService = Executors.newFixedThreadPool(4);
        try {
            Document doc = Jsoup.connect(URL).get();

            for(int i=1;i<=496;i++){
                int pos = i;
                executorService.submit(()->{
                    String aux = xpath;
                    aux = aux.replace("#", pos +"");
                    stock.add(create(doc,aux));
                    aux = xpath;
                });

            }
            executorService.shutdown();
            while (!executorService.isTerminated()) {
            }


        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return stock;
    }

    public Stock create(Document doc, String xpath) {
            Stock s = new Stock();
            Element element = doc.selectXpath(xpath).getFirst();
            Elements elements = element.children();
            String [] fields =  convertToArray(elements);
            s.setPaper(fields[0]);
            s.setQuotation(fields[1]);
            s.setpL(fields[2]);
            s.setpVp(fields[3]);
            s.setPsr(fields[4]);
            s.setDividend(fields[5]);
            s.setpActive(fields[6]);
            s.setpWorkCapital(fields[7]);
            s.setpEbit(fields[8]);
            s.setpLiquidCurrentAssets(fields[9]);
            s.setEvEbit(fields[10]); //
            s.setEvEbitda(fields[11]); //
            s.setEbitMargin(fields[12]);
            s.setLiquidMargin(fields[13]);//
            s.setLiquidCurrent(fields[14]);
            s.setRoic(fields[15]);
            s.setRoe(fields[16]);
            s.setLiquid2Month(fields[17]);
            s.setLiquidWorth(fields[18]);
            s.setLiquidDebtEquity(fields[19]);
            s.setRevenueGrowth5Years(fields[20]);
            s.setLiquityDebtEbitida(fields[21]);
            s.setMarketValue(fields[22]);

        return s;
    }

    public String[] convertToArray(Elements elements) {
        String [] result = new String[elements.size()];

        for(int i=0;i<elements.size();i++){
            result[i] = elements.get(i).text();
        }
        return result;
    }

    public void addDataRedis(){
        if(jedis.exists("stock"))
            jedis.del("stock");

        List<Stock> list = getStock();
        for (Stock stock : list) {
            jedis.lpush("stock", gson.toJson(stock));
        }
        log.info("Add stock in redis");
    }
}
