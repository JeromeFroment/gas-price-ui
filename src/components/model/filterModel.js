import React from "react";

export class FilterModel{
    lat;
    long;
    text;
    color;
    size;

    constructor(lat, long, text, color = colors.PINK, size = [38, 38]){
        this.lat = lat;
        this.long = long;
        this.text = text;
        this.color = color
        this.size = size
    }
}