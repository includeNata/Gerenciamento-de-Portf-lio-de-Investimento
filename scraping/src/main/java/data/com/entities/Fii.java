package data.com.entities;

public class Fii {

    private String paper;
    private String segment;
    private Double quotation;
    private String ffO;
    private String dividend;
    private Double pVp;
    private Double marketValue;
    private Double liquidity;
    private Integer quantityProperty;
    private Double priceM2;
    private Double  rentM2;
    private String capRate;
    private String averageVacancy;


    public Fii() {
    }

    public Fii(String paper, String segment, Double quotation, String ffO, String dividend, Double pVp, Double marketValue, Double liquidity, Integer quantityProperty, Double priceM2, Double rentM2, String capRate, String averageVacancy) {
        this.paper = paper;
        this.segment = segment;
        this.quotation = quotation;
        this.ffO = ffO;
        this.dividend = dividend;
        this.pVp = pVp;
        this.marketValue = marketValue;
        this.liquidity = liquidity;
        this.quantityProperty = quantityProperty;
        this.priceM2 = priceM2;
        this.rentM2 = rentM2;
        this.capRate = capRate;
        this.averageVacancy = averageVacancy;
    }

    public String getPaper() {
        return paper;
    }

    public void setPaper(String paper) {
        this.paper = paper;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }

    public Double getQuotation() {
        return quotation;
    }

    public void setQuotation(Double quotation) {
        this.quotation = quotation;
    }

    public String getFfO() {
        return ffO;
    }

    public void setFfO(String ffO) {
        this.ffO = ffO;
    }

    public String getDividend() {
        return dividend;
    }

    public void setDividend(String dividend) {
        this.dividend = dividend;
    }

    public Double getpVp() {
        return pVp;
    }

    public void setpVp(Double pVp) {
        this.pVp = pVp;
    }

    public Double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(Double marketValue) {
        this.marketValue = marketValue;
    }

    public Double getLiquidity() {
        return liquidity;
    }

    public void setLiquidity(Double liquidity) {
        this.liquidity = liquidity;
    }

    public Integer getQuantityProperty() {
        return quantityProperty;
    }

    public void setQuantityProperty(Integer quantityProperty) {
        this.quantityProperty = quantityProperty;
    }

    public Double getPriceM2() {
        return priceM2;
    }

    public void setPriceM2(Double priceM2) {
        this.priceM2 = priceM2;
    }

    public Double getRentM2() {
        return rentM2;
    }

    public void setRentM2(Double rentM2) {
        this.rentM2 = rentM2;
    }

    public String getCapRate() {
        return capRate;
    }

    public void setCapRate(String capRate) {
        this.capRate = capRate;
    }

    public String getAverageVacancy() {
        return averageVacancy;
    }

    public void setAverageVacancy(String averageVacancy) {
        this.averageVacancy = averageVacancy;
    }

    @Override
    public String toString() {
        return "Fii{" +
                "paper='" + paper + '\'' +
                ", segment='" + segment + '\'' +
                ", quotation=" + quotation +
                ", ffO=" + ffO +
                ", dividend=" + dividend +
                ", pVp=" + pVp +
                ", marketValue=" + marketValue +
                ", liquidity=" + liquidity +
                ", quantityProperty=" + quantityProperty +
                ", priceM2=" + priceM2 +
                ", rentM2=" + rentM2 +
                ", capRate=" + capRate +
                ", averageVacancy=" + averageVacancy +
                '}';
    }
}
