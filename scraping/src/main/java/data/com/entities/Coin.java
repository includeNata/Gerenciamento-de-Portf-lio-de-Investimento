package data.com.entities;

public class Coin {
    
    private String name;
    private String image;
    private Double price;
    private String FDV;
    private String marketCap;
    private String marketCapPercentage;
    private String volume;
    private String volumePercentage;
    private String volumeMarketCap;
    private String CirculatingSupply;


    public Coin() {
    }

    public Coin(String name, String image, Double price) {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getFDV() {
        return FDV;
    }

    public void setFDV(String FDV) {
        this.FDV = FDV;
    }


    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getVolumeMarketCap() {
        return volumeMarketCap;
    }

    public void setVolumeMarketCap(String volumeMarketCap) {
        this.volumeMarketCap = volumeMarketCap;
    }

    public String getCirculatingSupply() {
        return CirculatingSupply;
    }

    public void setCirculatingSupply(String circulatingSupply) {
        CirculatingSupply = circulatingSupply;
    }

    public String getVolumePercentage() {
        return volumePercentage;
    }

    public void setVolumePercentage(String volumePercentage) {
        this.volumePercentage = volumePercentage;
    }

    public String getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(String marketCap) {
        this.marketCap = marketCap;
    }

    public String getMarketCapPercentage() {
        return marketCapPercentage;
    }

    public void setMarketCapPercentage(String marketCapPercentage) {
        this.marketCapPercentage = marketCapPercentage;
    }
}
