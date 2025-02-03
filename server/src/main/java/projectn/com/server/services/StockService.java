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

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.*;

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

    public List<Stock> recommendationStock(List<Stock> stockUser){
        List<String> list = redisTemplate.opsForList().range("stock",0,-1);
        List<Stock> stock = new ArrayList<>();
        Set<String> addedPapers = new HashSet<>();

        for(String s : list){
            Stock stockAux = gson.fromJson(s,Stock.class);

            if (!addedPapers.contains(stockAux.getPaper())) {
                stock.add(stockAux);
                addedPapers.add(stockAux.getPaper());  // Marca o papel como adicionado
            }
        }

        double avgPl = sortStockByPL(stockUser);
        double avgPvp = sortStockByPvp(stockUser);
        double avgRoe = sortStockByRoe(stockUser);
        double avgDividend = sortStockByDividend(stockUser);

        double weightPl = 0.25;
        double weightPvp = 0.25;
        double weightRoe = 0.25;
        double weightDividend = 0.25;

        stock.sort(Comparator.comparingDouble(stockSort -> {
            double normalizedPl = parseDividend(stockSort.getpL());
            double normalizedPvp = parseDividend(stockSort.getpVp());
            double normalizedRoe = parseDividend(stockSort.getRoe());
            double normalizedDividend = parseDividend(stockSort.getDividend());

            return (weightPl * Math.abs(normalizedPl - avgPl)) +
                    (weightPvp * Math.abs(normalizedPvp - avgPvp)) +
                    (weightRoe * Math.abs(normalizedRoe - avgRoe)) +
                    (weightDividend * Math.abs(normalizedDividend - avgDividend));
        }));

        return stock;
    }

    private double parseDividend(String dividend) {
        try {
            NumberFormat nf = new DecimalFormat("#.###");
            return nf.parse(dividend.replace("%", "").replace(",", ".")).doubleValue();
        } catch (ParseException e) {
            throw new RuntimeException("Erro ao parsear dividend: " + dividend, e);
        }
    }

    private Double sortStockByPL(List<Stock> stockUser){
        Double sumPl= stockUser.stream().mapToDouble(stock -> Double.parseDouble(stock.getpL().replace(",", ".")))
                .sum();

        sumPl = sumPl/stockUser.size();
        return sumPl;
    }

    private Double sortStockByPvp(List<Stock> stockUser){
        Double sumPvp = stockUser.stream().mapToDouble(stock -> Double.parseDouble(stock.getpVp().replace(",", ".")))
                .sum();

        sumPvp = sumPvp/stockUser.size();
        return sumPvp;
    }

    public Double sortStockByRoe(List<Stock> stockUser){
        Double sumRoe = stockUser.stream().mapToDouble(stock -> Double.parseDouble(stock.getRoe().replace("%", "").replace(",", ".")))
                .sum();

        sumRoe = sumRoe/stockUser.size();
        return sumRoe;
    }

    public Double sortStockByDividend(List<Stock> stockUser){
        Double sumDividend = stockUser.stream().mapToDouble(stock -> Double.parseDouble(stock.getDividend().replace("%", "").replace(",", ".")))
                .sum();

        sumDividend = sumDividend/stockUser.size();
        return sumDividend;
    }
}
