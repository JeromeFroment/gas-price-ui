import {regionStatisticsService} from "./regionStatistics.service";
import {depStatisticsService} from "./depStatistics.service";

class FetchWithHeaderService {
    constructor() {}

    fetchWithHeaders = (verb, url, data, callBack, errorCallBack) => {
        var myHeaders = new Headers();
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        myHeaders.append("Authorization", "Bearer " + userToken.access_token);

        const request = {
                method: verb,
                headers: myHeaders
            };

        if (data && verb !== "GET")    {
            request.body = JSON.stringify(data);
        }
        
        fetch(url, request)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (callBack !== null)
                    callBack(jsonResponse);
                else {
                    if (url.includes("regional"))
                        regionStatisticsService.setStats(jsonResponse);
                    else if (url.includes("departmental"))
                        depStatisticsService.setStats(jsonResponse);
                }
            }, (error) => {
                if (errorCallBack !== null)
                    errorCallBack(error);
                })
    }
}

export const fetchWithHeaderService = new FetchWithHeaderService();