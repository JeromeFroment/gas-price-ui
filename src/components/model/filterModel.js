import React from "react";

export class FilterModel{
    limit;
    road;
    distance;
    price;
    fuel;

    constructor(limit = 1000, road = null, distance = null, price = null, fuel = null){
        this.setLimit(limit);
        this.setRoad(road);
        this.setDistance(distance);
        this.setPrice(price);
        this.setFuel(fuel);
    }

    setLimit(limit = 1000) {
        if(limit <= 0) { limit = 1000; }
        this.limit = limit;
    }

    setRoad(road = null) {
        if(road === "") { road = null; }
        this.road = road;
    }

    setDistance(distance = null) {
        if(distance <= 0) { distance = null; }
        this.distance = distance;
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
        this.setDistance(this.distance);
        this.setPrice(this.price);
        this.setFuel(this.fuel);
    }

    clearFilters() {
        this.setLimit(1000);
        this.setRoad("");
        this.setDistance(0);
        this.setPrice(0);
        this.setFuel("");
    }
}