export const removeLogo = () => {
  const logo = document.querySelector(
    '.mapboxgl-ctrl-attrib-inner, .mapbox-improve-map'
  );
  logo?.remove();
};
