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

        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                callBack(jsonResponse);
            }, (error) => {
                errorCallBack(error);
            })
    })

    getAllGasStation = ((callBack, errorCallBack) => {
        fetch(this.url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                callBack(jsonResponse);
            }, (error) => {
                errorCallBack(error);
            })
    })
}

export const fetchDataService = new FetchDataService();