import {fetchWithHeaderService} from "./fetchWithHeader.service";

class NationalStatisticsService {

    url = "http://localhost:8080/api/national-statistics";
    nationalStats = [];

    getNationalStats = ((callback) => {
        fetchWithHeaderService.fetchWithHeaders("GET", this.url, null, callback, null);
    })

    setStats(jsonResponse) {
        this.nationalStats = jsonResponse;
        console.log(this.nationalStats);
    }
}

export const nationalStatisticsService = new NationalStatisticsService();