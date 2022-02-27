import {fetchWithHeaderService} from "./fetchWithHeader.service";
class RegionStatisticsService {

    url = "http://localhost:8080/api/regional-statistics";
    allRegionStats = [];

    getAllRegionStats = (() => {
        this.allRegionStats = fetchWithHeaderService.fetchWithHeaders("GET", this.url, null, null, null);
    })

    regionLastDataLoader(regionCode) {
        for(const element of this.allRegionStats) {
            if (element.code === regionCode) {
                return element;
            }
        }
        return null;
    }

    setStats(jsonResponse) {
        this.allRegionStats = jsonResponse;
    }
}

export const regionStatisticsService = new RegionStatisticsService();