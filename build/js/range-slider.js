const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {

    start: [100, 700],
    connect: true,
    range: {
      'min': [0],
      'max': [1000]
    }
  });

  const inputStart = document.getElementById('filter-price__start');
  const inputEnd = document.getElementById('filter-price__end');
  const inputs = [inputStart, inputEnd];

  rangeSlider.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = Math.round(values[handle])
  
  })
}