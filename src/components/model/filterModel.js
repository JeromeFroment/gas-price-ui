import React from "react";

export class FilterModel {
    limit;
    road;
    price;
    fuel;

    constructor(limit = null, road = null, price = null, fuel = null) {
        this.setLimit(limit);
        this.setRoad(road);
        this.setPrice(price);
        this.setFuel(fuel);
    }

    setLimit(limit = null) {
        if(limit <= 0) { limit = null; }
        this.limit = limit;
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
        this.setLimit(this.limit);
        this.setRoad(this.road);
        this.setPrice(this.price);
        this.setFuel(this.fuel);
    }
}