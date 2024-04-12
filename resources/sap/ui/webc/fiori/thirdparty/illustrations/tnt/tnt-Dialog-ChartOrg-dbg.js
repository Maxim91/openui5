sap.ui.define(function () { 'use strict';

    var dialogSvg = `<svg width="160" height="160" viewBox="0 0 160 160" id="tnt-Dialog-ChartOrg">
    <path fill="var(--sapIllus_PatternShadow)" d="M131,45.8608 C131,43.7288 129.271,41.9998 127.139,41.9998 L127.086,41.9998 L44.914,41.9998 L44.856,41.9998 C42.726,41.9998 41,43.7278 41,45.8578 L41.058,128.1418 C41.058,130.2728 42.785,131.9998 44.914,131.9998 L127.139,131.9998 C129.271,131.9998 131,130.2718 131,128.1388 L131,45.8608 Z" class="sapIllus_PatternShadow"/>
    <path fill="var(--sapIllus_ObjectFillColor)" d="M121.1418,125 L38.8578,125 C36.7278,125 34.9998,123.273 34.9998,121.142 L34.9998,38.858 C34.9998,36.727 36.7278,35 38.8578,35 L121.1418,35 C123.2728,35 124.9998,36.727 124.9998,38.858 L124.9998,121.142 C124.9998,123.273 123.2728,125 121.1418,125" class="sapIllus_ObjectFillColor"/>
    <path fill="var(--sapIllus_BrandColorSecondary)" d="M125,52 L35,52 L35,38.997 C35,36.79 36.79,35 38.997,35 L121.981,35 C123.648,35 125,36.352 125,38.019 L125,52 Z" class="sapIllus_BrandColorSecondary"/>
    <path fill="var(--sapIllus_StrokeDetailColor)" d="M36,52 L36,38.5 C36,37.122 37.122,36 38.5,36 L122.5,36 C123.878,36 125,37.122 125,38.5 L125,52 L36,52 Z M122.5,125 L38.5,125 C37.122,125 36,123.878 36,122.5 L36,52.002 L125,55.603 L125,122.5 C125,123.878 123.878,125 122.5,125 L122.5,125 Z M122.5,35 L38.5,35 C36.57,35 35,36.57 35,38.5 L35,122.5 C35,124.43 36.57,126 38.5,126 L122.5,126 C124.43,126 126,124.43 126,122.5 L126,38.5 C126,36.57 124.43,35 122.5,35 L122.5,35 Z" class="sapIllus_StrokeDetailColor"/>
    <path fill="var(--sapIllus_BackgroundColor)" d="M131,148.5 C131,150.985 108.39,153 80.5,153 C52.61,153 30,150.985 30,148.5 C30,146.015 52.61,144 80.5,144 C108.39,144 131,146.015 131,148.5" class="sapIllus_BackgroundColor"/>
    <path fill="var(--sapIllus_Layering2)" d="M85.8339 95.7764L85.8339 95.7764C84.3849 94.1864 82.4359 93.3264 80.4449 93.2094L80.4449 75.8874C80.4449 75.6114 80.2209 75.3874 79.9449 75.3874 79.6689 75.3874 79.4449 75.6114 79.4449 75.8874L79.4449 93.2154C77.7219 93.3314 76.0239 94.0044 74.6479 95.2584 71.4159 98.2044 71.1839 103.2124 74.1289 106.4444 75.5439 107.9964 77.5179 108.9234 79.6159 109.0204 79.7409 109.0264 79.8659 109.0294 79.9909 109.0294 84.3639 109.0234 87.9049 105.4744 87.8999053 101.1014 87.8979 99.1314 87.1609 97.2324 85.8339 95.7764M103.7428 97.2149C103.6148 97.2149 103.4868 97.1659 103.3888 97.0689L79.8968 73.5759C79.7018 73.3809 79.7018 73.0649 79.8968 72.8689 80.0928 72.6739 80.4088 72.6739 80.6038 72.8689L104.0968 96.3609C104.2918 96.5569 104.2918 96.8729 104.0968 97.0689 103.9988 97.1659 103.8708 97.2149 103.7428 97.2149" class="sapIllus_Layering2"/>
    <path fill="var(--sapIllus_Layering2)" d="M56.3785,97.2149 C56.2505,97.2149 56.1225,97.1659 56.0245,97.0689 C55.8295,96.8729 55.8295,96.5569 56.0245,96.3609 L79.5175,72.8689 C79.7125,72.6739 80.0285,72.6739 80.2245,72.8689 C80.4195,73.0649 80.4195,73.3809 80.2245,73.5759 L56.7325,97.0689 C56.6345,97.1659 56.5065,97.2149 56.3785,97.2149" class="sapIllus_Layering2"/>
    <path fill="var(--sapIllus_AccentColor)" d="M85.9159,69.5557 C82.9699,66.3237 77.9619,66.0917 74.7299,69.0367 C71.4969,71.9827 71.2649,76.9917 74.2109,80.2237 C75.6259,81.7757 77.5989,82.7027 79.6969,82.7997 C79.8229,82.8047 79.9479,82.8077 80.0729,82.8077 C84.4459,82.8027 87.9869,79.2537 87.9819053,74.8797 C87.9789,72.9097 87.2429,71.0117 85.9159,69.5557 Z" class="sapIllus_AccentColor"/>
    <path fill="var(--sapIllus_ObjectFillColor)" d="M80.0637 71.1389C81.2147 71.1389 82.1477 72.0719 82.1477 73.2229 82.1477 74.3739 81.2147 75.3069 80.0637 75.3069 78.9127 75.3069 77.9797 74.3739 77.9797 73.2229 77.9797 72.0719 78.9127 71.1389 80.0637 71.1389M80.3535 75.5885L80.0465 75.5745C77.9885 75.4795 76.1725 76.9115 75.7845 78.9355 75.7255 79.2165 75.8205 79.5075 76.0335 79.6995 78.2785 81.6335 81.5535 81.7855 83.9675 80.0675 84.1975 79.8955 84.3195 79.6145 84.2865 79.3295 84.0875 77.2785 82.4125 75.6845 80.3535 75.5885M79.9821 97.3598C81.1331 97.3598 82.0661 98.2928 82.0661 99.4438 82.0661 100.5948 81.1331 101.5278 79.9821 101.5278 78.8311 101.5278 77.8981 100.5948 77.8981 99.4438 77.8981 98.2928 78.8311 97.3598 79.9821 97.3598M80.2719 101.8094L79.9649 101.7954C77.9069 101.7004 76.0909 103.1324 75.7029 105.1564 75.6439 105.4374 75.7389 105.7284 75.9519 105.9204 78.1969 107.8544 81.4719 108.0064 83.8859 106.2884 84.1159 106.1164 84.2379 105.8354 84.2049 105.5504 84.0059 103.4994 82.3309 101.9054 80.2719 101.8094" class="sapIllus_ObjectFillColor"/>
    <path fill="var(--sapIllus_Layering1)" d="M111.7079,95.7767 C108.7619,92.5447 103.7539,92.3127 100.5219,95.2577 C97.2889,98.2037 97.0569,103.2127 100.0029,106.4447 C101.4179,107.9967 103.3909,108.9237 105.4889,109.0207 C105.6149,109.0257 105.7399,109.0287 105.8649,109.0287 C110.2379,109.0237 113.7789,105.4747 113.773905,101.1007 C113.7709,99.1307 113.0349,97.2327 111.7079,95.7767 Z" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_ObjectFillColor)" d="M105.8558 97.3598C107.0068 97.3598 107.9398 98.2928 107.9398 99.4438 107.9398 100.5948 107.0068 101.5278 105.8558 101.5278 104.7048 101.5278 103.7718 100.5948 103.7718 99.4438 103.7718 98.2928 104.7048 97.3598 105.8558 97.3598M106.1456 101.8094L105.8386 101.7954C103.7806 101.7004 101.9646 103.1324 101.5766 105.1564 101.5176 105.4374 101.6126 105.7284 101.8256 105.9204 104.0706 107.8544 107.3456 108.0064 109.7596 106.2884 109.9896 106.1164 110.1116 105.8354 110.0786 105.5504 109.8796 103.4994 108.2046 101.9054 106.1456 101.8094" class="sapIllus_ObjectFillColor"/>
    <path fill="var(--sapIllus_BrandColorSecondary)" d="M60.1473,95.7767 C57.2013,92.5447 52.1933,92.3127 48.9613,95.2577 C45.7283,98.2037 45.4963,103.2127 48.4423,106.4447 C49.8573,107.9967 51.8303,108.9237 53.9283,109.0207 C54.0543,109.0257 54.1793,109.0287 54.3043,109.0287 C58.6773,109.0237 62.2183,105.4747 62.2133053,101.1007 C62.2103,99.1307 61.4743,97.2327 60.1473,95.7767 Z" class="sapIllus_BrandColorSecondary"/>
    <path fill="var(--sapIllus_ObjectFillColor)" d="M54.2951 97.3598C55.4461 97.3598 56.3791 98.2928 56.3791 99.4438 56.3791 100.5948 55.4461 101.5278 54.2951 101.5278 53.1441 101.5278 52.2111 100.5948 52.2111 99.4438 52.2111 98.2928 53.1441 97.3598 54.2951 97.3598M54.5849 101.8094L54.2779 101.7954C52.2199 101.7004 50.4039 103.1324 50.0159 105.1564 49.9569 105.4374 50.0519 105.7284 50.2649 105.9204 52.5099 107.8544 55.7849 108.0064 58.1989 106.2884 58.4289 106.1164 58.5509 105.8354 58.5179 105.5504 58.3189 103.4994 56.6439 101.9054 54.5849 101.8094" class="sapIllus_ObjectFillColor"/>
</svg>`;

    return dialogSvg;

});
