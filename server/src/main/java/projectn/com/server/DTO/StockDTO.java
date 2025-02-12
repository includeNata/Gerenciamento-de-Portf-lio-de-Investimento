package projectn.com.server.DTO;

import projectn.com.server.entities.Stock;

public class StockDTO {
    private String pL;
    private String pVp;
    private String roe;
    private String dividend;
    private String quotation;
    private Integer quantity;

    public StockDTO() {
    }

    public StockDTO(String pL, String pVp, String roe, String dividend, String quotation, Integer quantity) {
        this.pL = pL;
        this.pVp = pVp;
        this.roe = roe;
        this.dividend = dividend;
        this.quotation = quotation;
        this.quantity = quantity;
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

    public String getRoe() {
        return roe;
    }

    public void setRoe(String roe) {
        this.roe = roe;
    }

    public String getDividend() {
        return dividend;
    }

    public void setDividend(String dividend) {
        this.dividend = dividend;
    }

    public String getQuotation() {
        return quotation;
    }

    public void setQuotation(String quotation) {
        this.quotation = quotation;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
