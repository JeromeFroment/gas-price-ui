class DepStatisticsService {

    url = "http://localhost:8080/api/departmental-statistics";
    allDepStats = [];

    getAllDepartmentStats = ((callBack, errorCallBack) => {
        fetch(this.url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.allDepStats = jsonResponse;
                callBack(jsonResponse);
            }, (error) => {
                errorCallBack(error);
            })
    })

    departLastDataLoader(depCode) {
        for(const element of this.allDepStats) {
            if (element.code === depCode) {
                return element;
            }
        }
        return null;
    }
}

export const depStatisticsService = new DepStatisticsService();