import React from "react";

export class FilterModel {
    road;
    price;
    fuel;

    constructor(road = null, price = null, fuel = null) {
        this.setRoad(road);
        this.setPrice(price);
        this.setFuel(fuel);
    }

    setRoad(road = null) {
        if(road === "") { road = null; }
        this.road = road;
    }

    setPrice(price = null) {
        if(price <= 0) { price = null; }
        this.price = price;
    }

    setFuel(fuel = null) {
        if(fuel === "") { fuel = null; }
        this.fuel = fuel;
    }

    checkFilters() {
        this.setRoad(this.road);
        this.setPrice(this.price);
        this.setFuel(this.fuel);
    }
}