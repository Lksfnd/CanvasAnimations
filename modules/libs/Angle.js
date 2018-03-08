function Angle(x, y, length, angle) {
    let offset = {
        x: length * Math.cos(angle),
        y: length * Math.sin(angle)
    };
    return {
        x: offset.x + x,
        y: offset.y + y
    };
}
function rad(degreeAngle) {
    return (degreeAngle / 180) * Math.PI;
}
function deg(radAngle) {
    return (radAngle / Math.PI) * 180;
}