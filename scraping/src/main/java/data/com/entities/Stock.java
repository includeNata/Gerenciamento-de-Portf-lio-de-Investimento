package data.com.entities;

public class Stock {
    private String paper;
    private Double quotation;
    private Double pL;
    private Double pVp;
    private Double psr;
    private String dividend;
    private Double pActive;
    private Double pWorkCapital;
    private Double pEbit;
    private Double pLiquidCurrentAssets;
    private Double evEbit;
    private Double evEbitda;
    private String liquidMargin;
    private Double liquidCurrent;
    private String roic;
    private String roe;
    private Double liquid2Month;
    private Double liquidWorth;
    private Double liquidDebtEquity;
    private String revenueGrowth5Years;
    private Double liquityDebtEbitida;
    private Double marketValue;

    public Stock() {
    }

    public Stock(String paper, Double quotation, Double pL, Double pVp, Double psr, String dividend, Double pActive, Double pWorkCapital, Double pEbit, Double pLiquidCurrentAssets, Double evEbit, Double evEbitda, String liquidMargin, Double liquidCurrent, String roic, String roe, Double liquid2Month, Double liquidWorth, Double liquidDebtEquity, String revenueGrowth5Years, Double liquityDebtEbitida, Double marketValue) {
        this.paper = paper;
        this.quotation = quotation;
        this.pL = pL;
        this.pVp = pVp;
        this.psr = psr;
        this.dividend = dividend;
        this.pActive = pActive;
        this.pWorkCapital = pWorkCapital;
        this.pEbit = pEbit;
        this.pLiquidCurrentAssets = pLiquidCurrentAssets;
        this.evEbit = evEbit;
        this.evEbitda = evEbitda;
        this.liquidMargin = liquidMargin;
        this.liquidCurrent = liquidCurrent;
        this.roic = roic;
        this.roe = roe;
        this.liquid2Month = liquid2Month;
        this.liquidWorth = liquidWorth;
        this.liquidDebtEquity = liquidDebtEquity;
        this.revenueGrowth5Years = revenueGrowth5Years;
        this.liquityDebtEbitida = liquityDebtEbitida;
        this.marketValue = marketValue;
    }

    public String getPaper() {
        return paper;
    }

    public void setPaper(String paper) {
        this.paper = paper;
    }

    public Double getQuotation() {
        return quotation;
    }

    public void setQuotation(Double quotation) {
        this.quotation = quotation;
    }

    public Double getpL() {
        return pL;
    }

    public void setpL(Double pL) {
        this.pL = pL;
    }

    public Double getpVp() {
        return pVp;
    }

    public void setpVp(Double pVp) {
        this.pVp = pVp;
    }

    public Double getPsr() {
        return psr;
    }

    public void setPsr(Double psr) {
        this.psr = psr;
    }

    public String getDividend() {
        return dividend;
    }

    public void setDividend(String dividend) {
        this.dividend = dividend;
    }

    public Double getpActive() {
        return pActive;
    }

    public void setpActive(Double pActive) {
        this.pActive = pActive;
    }

    public Double getpWorkCapital() {
        return pWorkCapital;
    }

    public void setpWorkCapital(Double pWorkCapital) {
        this.pWorkCapital = pWorkCapital;
    }

    public Double getpEbit() {
        return pEbit;
    }

    public void setpEbit(Double pEbit) {
        this.pEbit = pEbit;
    }

    public Double getpLiquidCurrentAssets() {
        return pLiquidCurrentAssets;
    }

    public void setpLiquidCurrentAssets(Double pLiquidCurrentAssets) {
        this.pLiquidCurrentAssets = pLiquidCurrentAssets;
    }

    public Double getEvEbit() {
        return evEbit;
    }

    public void setEvEbit(Double evEbit) {
        this.evEbit = evEbit;
    }

    public Double getEvEbitda() {
        return evEbitda;
    }

    public void setEvEbitda(Double evEbitda) {
        this.evEbitda = evEbitda;
    }

    public String getLiquidMargin() {
        return liquidMargin;
    }

    public void setLiquidMargin(String liquidMargin) {
        this.liquidMargin = liquidMargin;
    }

    public Double getLiquidCurrent() {
        return liquidCurrent;
    }

    public void setLiquidCurrent(Double liquidCurrent) {
        this.liquidCurrent = liquidCurrent;
    }

    public String getRoic() {
        return roic;
    }

    public void setRoic(String roic) {
        this.roic = roic;
    }

    public String getRoe() {
        return roe;
    }

    public void setRoe(String roe) {
        this.roe = roe;
    }

    public Double getLiquid2Month() {
        return liquid2Month;
    }

    public void setLiquid2Month(Double liquid2Month) {
        this.liquid2Month = liquid2Month;
    }

    public Double getLiquidWorth() {
        return liquidWorth;
    }

    public void setLiquidWorth(Double liquidWorth) {
        this.liquidWorth = liquidWorth;
    }

    public Double getLiquidDebtEquity() {
        return liquidDebtEquity;
    }

    public void setLiquidDebtEquity(Double liquidDebtEquity) {
        this.liquidDebtEquity = liquidDebtEquity;
    }

    public String getRevenueGrowth5Years() {
        return revenueGrowth5Years;
    }

    public void setRevenueGrowth5Years(String revenueGrowth5Years) {
        this.revenueGrowth5Years = revenueGrowth5Years;
    }

    public Double getLiquityDebtEbitida() {
        return liquityDebtEbitida;
    }

    public void setLiquityDebtEbitida(Double liquityDebtEbitida) {
        this.liquityDebtEbitida = liquityDebtEbitida;
    }

    public Double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(Double marketValue) {
        this.marketValue = marketValue;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "paper='" + paper + '\'' +
                ", quotation=" + quotation +
                ", pL=" + pL +
                ", pVp=" + pVp +
                ", psr=" + psr +
                ", dividend='" + dividend + '\'' +
                ", pActive=" + pActive +
                ", pWorkCapital=" + pWorkCapital +
                ", pEbit=" + pEbit +
                ", pLiquidCurrentAssets=" + pLiquidCurrentAssets +
                ", evEbit=" + evEbit +
                ", evEbitda=" + evEbitda +
                ", liquidMargin='" + liquidMargin + '\'' +
                ", liquidCurrent=" + liquidCurrent +
                ", roic='" + roic + '\'' +
                ", roe='" + roe + '\'' +
                ", liquid2Month=" + liquid2Month +
                ", liquidWorth=" + liquidWorth +
                ", liquidDebtEquity=" + liquidDebtEquity +
                ", revenueGrowth5Years='" + revenueGrowth5Years + '\'' +
                ", liquityDebtEbitida=" + liquityDebtEbitida +
                ", marketValue=" + marketValue +
                '}';
    }
}
