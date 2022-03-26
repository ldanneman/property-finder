export const removeLogo = () => {
  const classLogos = [
    '.mapboxgl-ctrl-attrib-inner',
    '.mapbox-improve-map',
    '.mapboxgl-ctrl-logo',
    '.mapboxgl-compact',
    '.mapboxgl-ctrl-bottom-right',
  ];
  classLogos.forEach((el) => {
    document.querySelector(el)?.remove();
  });
};
