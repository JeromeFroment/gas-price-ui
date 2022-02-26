import React from "react";

export class FilterModel {
    road;
    distance;
    price;
    fuel;

    constructor(road = null, distance = null, price = null, fuel = null) {
        this.setRoad(road);
        this.setDistance(distance);
        this.setPrice(price);
        this.setFuel(fuel);
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
        this.setRoad(this.road);
        this.setDistance(this.distance);
        this.setPrice(this.price);
        this.setFuel(this.fuel);
    }
}