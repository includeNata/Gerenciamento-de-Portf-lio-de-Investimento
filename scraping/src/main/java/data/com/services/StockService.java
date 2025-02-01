package data.com.services;

import com.google.gson.Gson;
import data.com.entities.Stock;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import redis.clients.jedis.Jedis;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

public class StockService {
    private static final String URL = "https://www.fundamentus.com.br/resultado.php";
    CopyOnWriteArrayList<Stock> stock = new CopyOnWriteArrayList<>();

    private Jedis jedis;
    private Gson gson = new Gson();
    private static final Logger log = Logger.getLogger(StockService.class.getName());

    public StockService(Jedis jedis) {this.jedis = jedis;}

    public List<Stock> getStock() {
        String xpath = "//*[@class=\"table-resultado\"]/tbody/tr[#]";
        ExecutorService executorService = Executors.newFixedThreadPool(4);
        try {
            Document doc = Jsoup.connect(URL).get();

            for (int i = 1; i <= 496; i++) {
                int pos = i;
                executorService.submit(() -> {
                    String aux = xpath;
                    aux = aux.replace("#", pos + "");
                    stock.add(create(doc, aux));
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
        String aux;

        // Extraindo e atribuindo os valores ao objeto Stock
        s.setPaper(doc.selectXpath(xpath + "/td[1]").text());

        aux = doc.selectXpath(xpath + "/td[2]").text().replace(",", ".");
        s.setQuotation(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[3]").text().replace(",", ".");
        s.setpL(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[4]").text().replace(",", ".");
        s.setpVp(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[5]").text().replace(",", ".");
        s.setPsr(Double.parseDouble(aux));

        s.setDividend(doc.selectXpath(xpath + "/td[6]").text());

        aux = doc.selectXpath(xpath + "/td[7]").text().replace(",", ".");
        s.setpActive(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[8]").text().replace(",", ".");
        s.setpWorkCapital(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[9]").text().replace(",", ".");
        s.setpEbit(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[10]").text().replace(",", ".");
        s.setpLiquidCurrentAssets(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[11]").text().replace(",", ".");
        s.setEvEbit(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[12]").text().replace(",", ".");
        s.setEvEbitda(Double.parseDouble(aux));

        s.setLiquidMargin(doc.selectXpath(xpath + "/td[13]").text());

        aux = doc.selectXpath(xpath + "/td[14]").text().replace(",", ".");
        s.setLiquidCurrent(Double.parseDouble(aux));

        s.setRoic(doc.selectXpath(xpath + "/td[15]").text());

        s.setRoe(doc.selectXpath(xpath + "/td[16]").text());

        aux = doc.selectXpath(xpath + "/td[17]").text().replace(",", ".");
        s.setLiquid2Month(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[18]").text().replace(",", ".");
        s.setLiquidWorth(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[19]").text().replace(",", ".");
        s.setLiquidDebtEquity(Double.parseDouble(aux));

        s.setRevenueGrowth5Years(doc.selectXpath(xpath + "/td[20]").text());

        aux = doc.selectXpath(xpath + "/td[21]").text().replace(",", ".");
        s.setLiquityDebtEbitida(Double.parseDouble(aux));

        aux = doc.selectXpath(xpath + "/td[22]").text().replace(",", ".");
        s.setMarketValue(Double.parseDouble(aux));

        return s;
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
