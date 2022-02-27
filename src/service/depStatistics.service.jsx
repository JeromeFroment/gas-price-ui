import {fetchWithHeaderService} from "./fetchWithHeader.service";

class DepStatisticsService {

    url = "http://localhost:8080/api/departmental-statistics";
    allDepStats = [];

    getAllDepartmentStats = (() => {
        fetchWithHeaderService.fetchWithHeaders("GET", this.url, null, null, null);
    })

    departLastDataLoader(depCode) {
        for(const element of this.allDepStats) {
            if (element.code === depCode) {
                return element;
            }
        }
        return null;
    }

    setStats(jsonResponse) {
        this.allDepStats = jsonResponse;
        console.log(this.allDepStats);
    }
}

export const depStatisticsService = new DepStatisticsService();