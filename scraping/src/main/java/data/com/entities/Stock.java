package data.com.entities;

public class Stock {
    private String paper;
    private String quotation;
    private String pL;
    private String pVp;
    private String psr;
    private String dividend;
    private String pActive;
    private String pWorkCapital;
    private String pEbit;
    private String pLiquidCurrentAssets;
    private String evEbit;
    private String evEbitda;
    private String ebitMargin;
    private String liquidMargin;
    private String liquidCurrent;
    private String roic;
    private String roe;
    private String liquid2Month;
    private String liquidWorth;
    private String liquidDebtEquity;
    private String revenueGrowth5Years;
    private String liquityDebtEbitida;
    private String marketValue;

    public Stock() {
    }

    public Stock(String paper, String quotation, String pL, String pVp, String psr, String dividend, String pActive, String pWorkCapital, String pEbit, String pLiquidCurrentAssets, String evEbit, String evEbitda, String ebitMargin, String liquidMargin, String liquidCurrent, String roic, String roe, String liquid2Month, String liquidWorth, String liquidDebtEquity, String revenueGrowth5Years, String liquityDebtEbitida, String marketValue) {
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
        this.ebitMargin = ebitMargin;
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

    public String getQuotation() {
        return quotation;
    }

    public void setQuotation(String quotation) {
        this.quotation = quotation;
    }

    public String getpL() {
        return pL;
    }

    public void setpL(String pL) {
        this.pL = pL;
    }

    public String getpVp() {
        return pVp;
    }

    public void setpVp(String pVp) {
        this.pVp = pVp;
    }

    public String getPsr() {
        return psr;
    }

    public void setPsr(String psr) {
        this.psr = psr;
    }

    public String getDividend() {
        return dividend;
    }

    public void setDividend(String dividend) {
        this.dividend = dividend;
    }

    public String getpActive() {
        return pActive;
    }

    public void setpActive(String pActive) {
        this.pActive = pActive;
    }

    public String getpWorkCapital() {
        return pWorkCapital;
    }

    public void setpWorkCapital(String pWorkCapital) {
        this.pWorkCapital = pWorkCapital;
    }

    public String getpEbit() {
        return pEbit;
    }

    public void setpEbit(String pEbit) {
        this.pEbit = pEbit;
    }

    public String getpLiquidCurrentAssets() {
        return pLiquidCurrentAssets;
    }

    public void setpLiquidCurrentAssets(String pLiquidCurrentAssets) {
        this.pLiquidCurrentAssets = pLiquidCurrentAssets;
    }

    public String getEvEbit() {
        return evEbit;
    }

    public void setEvEbit(String evEbit) {
        this.evEbit = evEbit;
    }

    public String getEvEbitda() {
        return evEbitda;
    }

    public void setEvEbitda(String evEbitda) {
        this.evEbitda = evEbitda;
    }

    public String getEbitMargin() {
        return ebitMargin;
    }

    public void setEbitMargin(String ebitMargin) {
        this.ebitMargin = ebitMargin;
    }

    public String getLiquidMargin() {
        return liquidMargin;
    }

    public void setLiquidMargin(String liquidMargin) {
        this.liquidMargin = liquidMargin;
    }

    public String getLiquidCurrent() {
        return liquidCurrent;
    }

    public void setLiquidCurrent(String liquidCurrent) {
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

    public String getLiquid2Month() {
        return liquid2Month;
    }

    public void setLiquid2Month(String liquid2Month) {
        this.liquid2Month = liquid2Month;
    }

    public String getLiquidWorth() {
        return liquidWorth;
    }

    public void setLiquidWorth(String liquidWorth) {
        this.liquidWorth = liquidWorth;
    }

    public String getLiquidDebtEquity() {
        return liquidDebtEquity;
    }

    public void setLiquidDebtEquity(String liquidDebtEquity) {
        this.liquidDebtEquity = liquidDebtEquity;
    }

    public String getRevenueGrowth5Years() {
        return revenueGrowth5Years;
    }

    public void setRevenueGrowth5Years(String revenueGrowth5Years) {
        this.revenueGrowth5Years = revenueGrowth5Years;
    }

    public String getLiquityDebtEbitida() {
        return liquityDebtEbitida;
    }

    public void setLiquityDebtEbitida(String liquityDebtEbitida) {
        this.liquityDebtEbitida = liquityDebtEbitida;
    }

    public String getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(String marketValue) {
        this.marketValue = marketValue;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "paper='" + paper + '\'' +
                ", quotation='" + quotation + '\'' +
                ", pL='" + pL + '\'' +
                ", pVp='" + pVp + '\'' +
                ", psr='" + psr + '\'' +
                ", dividend='" + dividend + '\'' +
                ", pActive='" + pActive + '\'' +
                ", pWorkCapital='" + pWorkCapital + '\'' +
                ", pEbit='" + pEbit + '\'' +
                ", pLiquidCurrentAssets='" + pLiquidCurrentAssets + '\'' +
                ", evEbit='" + evEbit + '\'' +
                ", evEbitda='" + evEbitda + '\'' +
                ", ebitMargin='" + ebitMargin + '\'' +
                ", liquidMargin='" + liquidMargin + '\'' +
                ", liquidCurrent='" + liquidCurrent + '\'' +
                ", roic='" + roic + '\'' +
                ", roe='" + roe + '\'' +
                ", liquid2Month='" + liquid2Month + '\'' +
                ", liquidWorth='" + liquidWorth + '\'' +
                ", liquidDebtEquity='" + liquidDebtEquity + '\'' +
                ", revenueGrowth5Years='" + revenueGrowth5Years + '\'' +
                ", liquityDebtEbitida='" + liquityDebtEbitida + '\'' +
                ", marketValue='" + marketValue + '\'' +
                '}';
    }
}
