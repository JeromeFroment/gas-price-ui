class FetchDataService {
    constructor() {}

    url = "http://localhost:8080/";

    getListOfGasStation = (( limit = 5, road= null, distance= null, price= null, fuel= null, callBack, errorCallBack) => {
        let request = '?limit=${limit}';
        if(road != null) { request = request + '&road=' + road }
        if(distance != null) { request = request + '&distance=' + distance }
        if(price != null) { request = request + '&price=' + price }
        if(fuel != null) { request = request + '&fuel=' + fuel }

        fetch(`http://localhost:8080/api/sales-points${request}`)
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