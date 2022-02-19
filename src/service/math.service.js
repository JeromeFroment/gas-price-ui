class MathService{
    distanceBeetweenPoints(x1, y1, x2, y2){
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt( a*a + b*b );
    }
}

export const mathService = new MathService();