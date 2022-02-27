import {fetchWithHeaderService} from "./fetchWithHeader.service";
class FetchDataService {
    constructor() {}

    url = "http://localhost:8080/api/sales-points";

    getListOfGasStation = ((callBack, errorCallBack, limit = null, road= null, distance= null, lat= null, long= null, price= null, fuel= null) => {
        const url = new URL(this.url);
        if(limit != null) { url.searchParams.append('limit', limit);}
        if(road != null) { url.searchParams.append('road', road); }
        if(distance != null) { url.searchParams.append('distance', distance); url.searchParams.append('latitude', lat); url.searchParams.append('longitude', long); }
        if(price != null) { url.searchParams.append('price', price); }
        if(fuel != null) { url.searchParams.append('fuel', fuel); }

        fetchWithHeaderService.fetchWithHeaders("GET", url, null, callBack, errorCallBack);
    })

    getAllGasStation = ((callBack, errorCallBack) => {
        fetchWithHeaderService.fetchWithHeaders("GET", this.url, null, callBack, errorCallBack);
    })
}

export const fetchDataService = new FetchDataService();