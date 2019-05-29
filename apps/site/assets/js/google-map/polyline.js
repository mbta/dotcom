const dottedLineOpts = ({ weight, polyline }) => ({
  icons: [
    {
      icon: {
        path: `M 0,-${weight} 0,${weight}`,
        strokeOpacity: 1,
        scale: 2
      },
      index: "0",
      repeat: "10px"
    }
  ],
  path: window.google.maps.geometry.encoding.decodePath(polyline),
  geodesic: true,
  strokeOpacity: 0
});

const solidLineOpts = ({ weight, polyline, color }) => ({
  path: window.google.maps.geometry.encoding.decodePath(polyline),
  geodesic: true,
  strokeColor: `#${color}`,
  strokeOpacity: 1.0,
  strokeWeight: weight
});

export default class Polyline {
  constructor(data, map) {
    const opts = data["dotted?"] ? dottedLineOpts(data) : solidLineOpts(data);
    this.polyline = new window.google.maps.Polyline(opts);
    this.polyline.setMap(map);
  }
}
