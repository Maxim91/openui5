sap.ui.define(function () { 'use strict';

  var spotSvg = `<svg width="128" height="128" viewBox="0 0 128 128" id="tnt-Spot-UnsuccessfulAuth">
  <path fill="var(--sapIllus_PatternShadow)" d="M109.9999,34.0991 L109.9559,34.0991 L108.9999,34.0991 L108.9999,42.0491 L108.9999,45.0921 L108.9999,96.0991 C108.9999,97.7551 107.6569,99.0991 105.9999,99.0991 L23.0439,99.0991 L23.0449,101.0981 C23.0449,102.7551 24.3879,104.0991 26.0439,104.0991 L109.9999,104.0991 C111.6569,104.0991 112.9999,102.7551 112.9999,101.0991 L112.9999,37.0991 C112.9999,35.4421 111.6569,34.0991 109.9999,34.0991" class="sapIllus_PatternShadow"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M105.9991,99 L22.0011,99 C20.3441,99 19.0001,97.656 19.0001,95.999 L19.0001,32.001 C19.0001,30.343 20.3441,29 22.0011,29 L105.9991,29 C107.6571,29 109.0001,30.343 109.0001,32.001 L109.0001,95.999 C109.0001,97.656 107.6571,99 105.9991,99" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M109,42 L19,42 L19,31.995 C19,30.341 20.341,29 21.995,29 L106.005,29 C107.659,29 109,30.341 109,31.995 L109,42 Z" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M106,98 L22,98 C20.896,98 20,97.104 20,96 L20,42 L21.821,42 L107.999,41.977 L108,96 C108,97.104 107.104,98 106,98 M108,32 L108,41 L20,41 L20,32 C20,30.896 20.896,30 22,30 L106,30 C107.104,30 108,30.896 108,32 M106,29 L105.526,29 L21.59,29 L21.545,29 C19.817,29 19,30.691 19,31.896 L19,42 L19,96 C19,97.656 20.343,99 22,99 L106,99 C107.657,99 109,97.656 109,96 L109,44.993 L109,41.95 L109,32 C109,30.343 107.657,29 106,29" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M28.5332 35.5C28.5332 36.574 27.6622 37.444 26.5882 37.444 25.5142 37.444 24.6432 36.574 24.6432 35.5 24.6432 34.426 25.5142 33.555 26.5882 33.555 27.6622 33.555 28.5332 34.426 28.5332 35.5M34.5147 35.5C34.5147 36.574 33.6437 37.444 32.5697 37.444 31.4957 37.444 30.6247 36.574 30.6247 35.5 30.6247 34.426 31.4957 33.555 32.5697 33.555 33.6437 33.555 34.5147 34.426 34.5147 35.5M40.4956 35.5C40.4956 36.574 39.6246 37.444 38.5506 37.444 37.4766 37.444 36.6056 36.574 36.6056 35.5 36.6056 34.426 37.4766 33.555 38.5506 33.555 39.6246 33.555 40.4956 34.426 40.4956 35.5" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_Layering1)" d="M49.8377 57.9296C54.6137 57.9296 58.6077 61.2386 59.6787 65.6866L59.6787 65.6866 86.0137 65.6866C87.2737 65.6866 88.2947 66.7076 88.2947 67.9666 88.2947 69.2276 87.2737 70.2486 86.0137 70.2486L86.0137 70.2486 85.1897 70.2486 85.1897 75.3116C85.1897 75.5246 85.0167 75.6986 84.8027 75.6986L84.8027 75.6986 81.9467 75.6986C81.7327 75.6986 81.5587 75.5246 81.5587 75.3116L81.5587 75.3116 81.5587 74.0036C81.5587 73.7906 81.3867 73.6176 81.1727 73.6176L81.1727 73.6176 78.2737 73.6176C78.0587 73.6176 77.8847 73.7926 77.8877 74.0076L77.8877 74.0076 77.8907 75.3066C77.8937 75.5226 77.7197 75.6986 77.5037 75.6986L77.5037 75.6986 74.5757 75.6986C74.3627 75.6986 74.1897 75.5246 74.1897 75.3116L74.1897 75.3116 74.1897 70.2486 59.7267 70.2486C58.7267 74.7916 54.6817 78.1946 49.8377 78.1946 44.2417 78.1946 39.7057 73.6586 39.7057 68.0626 39.7057 62.4666 44.2417 57.9296 49.8377 57.9296zM49.914 63.1764C47.257 63.1764 45.104 65.3304 45.104 67.9864 45.104 70.6424 47.257 72.7964 49.914 72.7964 52.57 72.7964 54.723 70.6424 54.723 67.9864 54.723 65.3304 52.57 63.1764 49.914 63.1764zM108.0004 16.1275C99.5434 16.1275 92.6644 23.0075 92.6644 31.4625 92.6644 39.9185 99.5434 46.7985 108.0004 46.7985 116.4554 46.7985 123.3344 39.9185 123.3344 31.4625 123.3344 23.0075 116.4554 16.1275 108.0004 16.1275" class="sapIllus_Layering1"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M110.291,31.4634 L115.858,25.8944 C116.164,25.5874 116.333,25.1804 116.333,24.7474 C116.333,24.3154 116.164,23.9074 115.858,23.6024 C115.247,22.9884 114.177,22.9874 113.566,23.6024 L107.999,29.1704 L102.434,23.6024 C101.824,22.9884 100.754,22.9874 100.142,23.6014 C99.836,23.9074 99.667,24.3154 99.667,24.7474 C99.667,25.1804 99.836,25.5874 100.142,25.8934 L105.709,31.4634 L100.142,37.0314 C99.51,37.6634 99.51,38.6924 100.142,39.3244 C100.756,39.9374 101.822,39.9374 102.434,39.3244 L107.999,33.7554 L113.566,39.3244 C113.873,39.6314 114.279,39.7994 114.711,39.7994 C115.145,39.7994 115.551,39.6314 115.858,39.3244 C116.49,38.6924 116.49,37.6634 115.858,37.0324 L110.291,31.4634 Z" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M123.3349,31.4624 C123.3349,39.9184 116.4559,46.7984 108.0009,46.7984 C99.5439,46.7984 92.6649,39.9184 92.6649,31.4624 C92.6649,23.0074 99.5439,16.1274 108.0009,16.1274 C116.4559,16.1274 123.3349,23.0074 123.3349,31.4624 M108.0009,13.0004 C97.8199,13.0004 89.5369,21.2824 89.5369,31.4634 C89.5369,41.6444 97.8199,49.9264 108.0009,49.9264 C118.1809,49.9264 126.4629,41.6444 126.4629,31.4634 C126.4629,21.2824 118.1809,13.0004 108.0009,13.0004" class="sapIllus_ObjectFillColor"/>
</svg>`;

  return spotSvg;

});
