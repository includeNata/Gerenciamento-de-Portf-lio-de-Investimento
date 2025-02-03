package projectn.com.server.services;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import projectn.com.server.entities.Fii;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FiiService {
    @Autowired
    private Gson gson = new Gson();

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public Page<Fii> findAll(Pageable pageable){
         List<String>  list = redisTemplate.opsForList().range("fiis",0,-1);
         List<Fii> fiis = new ArrayList<>();
         for(String s : list){
             fiis.add(gson.fromJson(s,Fii.class));
         }

        int start = (int) pageable.getOffset();
         int end = Math.min(start + pageable.getPageSize(),list.size());
         List<Fii> pageContent  = fiis.subList(start,end);
         return new PageImpl<>(pageContent,pageable,pageable.getPageSize());
    }

    public List<Fii> recommendationFiis(List<Fii> fiisUser) {
        List<String> list = redisTemplate.opsForList().range("fiis", 0, -1);
        List<Fii> fiis = new ArrayList<>();
        for (String s : list) {
            fiis.add(gson.fromJson(s, Fii.class));
        }

        double avgDividend = sortFiisByDividend(fiisUser);
        double avgPvp = sortFiisByPvp(fiisUser);
        double avgLiquidity = sortFiisByLiquidity(fiisUser);
        double avgMarketValue = sortFiisByMarketValue(fiisUser);

        double weightDividend = 0.25;
        double weightPvp = 0.25;
        double weightLiquidity = 0.25;
        double weightMarketValue = 0.25;

        fiis.sort(Comparator.comparingDouble(fii -> {
            double normalizedDividend = parseDividend(fii.getDividend());
            double normalizedPvp = fii.getpVp();
            double normalizedLiquidity = fii.getLiquidity();
            double normalizedMarketValue = fii.getMarketValue();

            return (weightDividend * Math.abs(normalizedDividend - avgDividend)) +
                    (weightPvp * Math.abs(normalizedPvp - avgPvp)) +
                    (weightLiquidity * Math.abs(normalizedLiquidity - avgLiquidity)) +
                    (weightMarketValue * Math.abs(normalizedMarketValue - avgMarketValue));
        }));

        return fiis;
    }

    private double parseDividend(String dividend) {
        try {
            NumberFormat nf = new DecimalFormat("#.###");
            return nf.parse(dividend.replace("%", "").replace(",", ".")).doubleValue();
        } catch (ParseException e) {
            throw new RuntimeException("Erro ao parsear dividend: " + dividend, e);
        }
    }

    private Double sortFiisByDividend(List<Fii> fiisUser){
        Double sumDividen = fiisUser.stream().mapToDouble(fii -> Double.parseDouble(fii.getDividend().replace("%", "").replace(",", ".")))
                .sum();

        sumDividen = sumDividen/fiisUser.size();
        return sumDividen;
    }

    private Double sortFiisByPvp(List<Fii> fiisUser){
        Double sumPvp = fiisUser.stream().mapToDouble(Fii::getpVp)
                .sum();

        sumPvp = sumPvp/fiisUser.size();
        return sumPvp;
    }

    public Double sortFiisByLiquidity(List<Fii> fiisUser){
        Double sumLiquidity = fiisUser.stream().mapToDouble(Fii::getLiquidity)
                .sum();

        sumLiquidity = sumLiquidity/fiisUser.size();
        return sumLiquidity;
    }

    public Double sortFiisByMarketValue(List<Fii> fiisUser){
        Double sumMarketValue = fiisUser.stream().mapToDouble(Fii::getMarketValue)
                .sum();

        sumMarketValue = sumMarketValue/fiisUser.size();
        return sumMarketValue;
    }
}
