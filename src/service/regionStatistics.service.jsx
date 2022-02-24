class RegionStatisticsService {

    url = "http://localhost:8080/api/regional-statistics";
    allRegionStats = [];

    getAllRegionStats = ((callBack, errorCallBack) => {
        fetch(this.url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.allRegionStats = jsonResponse;
            }, (error) => {
                errorCallBack(error);
            })
    })

    regionLastDataLoader(regionCode) {
        for(const element of this.allRegionStats) {
            if (element.code === regionCode) {
                return element;
            }
        }
        return null;
    }
}

export const regionStatisticsService = new RegionStatisticsService();