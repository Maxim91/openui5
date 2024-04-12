sap.ui.define(function () { 'use strict';

    var sceneSvg = `<svg width="320" height="240" viewBox="0 0 320 240" id="tnt-Scene-Teams">
    <path fill="var(--sapIllus_BackgroundColor)" d="M234.576949,186.3622 C205.980949,205.1972 145.032949,224.2542 111.860949,218.5082 C97.2479491,215.9772 82.6019491,211.3912 70.9629491,202.1992 C50.7369491,186.2272 32.6559491,162.6112 28.7269491,136.3032 C24.0499491,104.9942 42.4119491,82.0762 70.2469491,70.8912 C85.0619491,64.9382 100.935949,61.8432 115.521949,55.3192 C130.055949,48.8192 142.632949,38.7112 156.219949,30.5992 C170.244949,22.2252 188.039949,19.2012 204.147949,20.9442 C235.713949,24.3602 260.186949,46.4662 276.647949,72.2562 C288.558949,90.9182 293.842949,116.5162 282.901949,136.8722 C272.129949,156.9122 254.479949,173.2522 234.576949,186.3622" class="sapIllus_BackgroundColor"/>
    <path fill="var(--sapIllus_Layering1)" d="M251.811749 78.6366L251.811749 89.3686 251.811749 100.1006C251.811749 100.1006 259.352749 98.9936 259.059749 90.9286L259.059749 89.3686 259.059749 87.8096C259.352749 79.7436 251.811749 78.6366 251.811749 78.6366M193.397249 78.6366L193.397249 89.3686 193.397249 100.1006C193.397249 100.1006 185.856249 98.9936 186.149249 90.9286L186.149249 89.3686 186.149249 87.8096C185.856249 79.7436 193.397249 78.6366 193.397249 78.6366" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_ObjectFillColor)" d="M273.903149,122.19 C273.853149,122.14 273.803149,122.1 273.753149,122.06 C272.903149,121.23 272.003149,120.47 271.063149,119.76 C267.593149,117.16 263.493149,115.18 258.693149,113.2 C258.623149,113.17 258.553149,113.14 258.473149,113.11 C257.663149,112.78 256.843149,112.45 255.993149,112.12 L255.993149,112.11 C255.903149,112.08 255.803149,112.04 255.703149,112 C254.983149,111.72 254.233149,111.43 253.463149,111.13 C251.593149,110.41 249.173149,109.71 246.453149,109.07 C245.863149,108.93 245.253149,108.79 244.633149,108.66 C244.632149,108.66 244.630149,108.659 244.629149,108.659 C250.497149,104.592 253.998149,98.184 254.100149,89.075 C254.305149,71.28 241.127149,54.814 222.622149,54.621 C204.109149,54.426 191.315149,70.571 191.108149,88.362 C191.004149,97.809 194.570149,104.45 200.709149,108.631 C200.060149,108.771 199.432149,108.91 198.813149,109.05 C196.073149,109.7 193.633149,110.4 191.743149,111.13 C190.973149,111.43 190.223149,111.72 189.503149,112 C189.413149,112.04 189.313149,112.07 189.223149,112.11 C188.463149,112.41 187.723149,112.71 186.993149,113.01 C185.953149,113.43 184.943149,113.85 183.963149,114.28 C181.473149,115.38 179.193149,116.51 177.103149,117.77 C176.073149,118.4 175.093149,119.06 174.153149,119.76 C173.793149,120.02 173.453149,120.3 173.113149,120.58 C172.493149,121.09 171.883149,121.63 171.303149,122.19 C170.073149,123.38 168.473149,125.34 166.773149,128.05 C166.693149,128.19 166.603149,128.33 166.513149,128.48 C164.883149,127.8 163.193149,127.12 161.433149,126.42 C160.473149,126.05 159.473149,125.66 158.443149,125.27 C155.953149,124.31 152.723149,123.38 149.103149,122.53 C148.310149,122.344 147.495149,122.158 146.660149,121.98 C154.488149,116.56 159.158149,108.017 159.295149,95.871 C159.568149,72.155 142.005149,50.21 117.341149,49.952 C92.6691491,49.692 75.6171491,71.21 75.3411491,94.92 C75.2021491,107.518 79.9601491,116.372 88.1511491,121.944 C87.2831491,122.12 86.4331491,122.315 85.6131491,122.51 C81.9531491,123.37 78.7031491,124.3 76.1931491,125.27 C75.1631491,125.66 74.1631491,126.05 73.2031491,126.42 C63.1031491,130.41 55.1431491,133.99 48.9431491,140.01 C45.3831491,143.44 41.1031491,152.22 37.6831491,163 C37.8031491,163.23 37.9231491,163.47 38.0631491,163.71 C46.0931491,178.78 58.0931491,192.04 70.9631491,202.2 C73.0231491,203.83 75.1831491,205.31 77.4131491,206.66 L78.3731491,207.23 C88.5231491,213.16 100.203149,216.49 111.863149,218.51 C124.393149,220.68 140.873149,219.31 158.083149,215.75 C158.413149,215.69 158.743149,215.62 159.063149,215.55 C170.663149,213.1 182.553149,209.67 193.753149,205.68 C196.663149,204.64 199.523149,203.57 202.313149,202.46 C202.483149,202.4 202.653149,202.33 202.823149,202.26 C202.993149,202.2 203.163149,202.13 203.333149,202.06 C215.473149,197.2 226.353149,191.77 234.573149,186.36 C239.553149,183.08 244.383149,179.6 249.003149,175.92 C249.323149,175.66 249.633149,175.41 249.953149,175.15 C263.423149,164.26 275.013149,151.56 282.903149,136.87 C283.123149,136.47 283.333149,136.06 283.533149,135.65 C280.173149,128.7 276.253149,124.46 273.903149,122.19" class="sapIllus_ObjectFillColor"/>
    <path fill="var(--sapIllus_Layering1)" d="M196.413149 163.46C196.393149 162.2 196.353149 160.94 196.293149 159.67 195.733149 146.73 193.273149 133.2 187.033149 122.19 190.313149 118.94 189.483149 113.39 189.223149 112.11 181.823149 115.03 175.993149 117.65 171.463149 122.06 173.473149 122.91 181.583149 126.01 185.993149 123.05 186.093149 122.99 186.173149 122.91 186.263149 122.85 191.833149 132.75 194.323149 144.71 195.133149 156.42L195.133149 156.43C195.213149 157.68 195.283149 158.92 195.333149 160.16L195.333149 160.17 195.333149 160.18 196.413149 163.46zM255.994349 112.1096C255.727349 113.4136 254.864349 119.1226 258.333349 122.3396 258.333349 122.3396 258.333349 122.3396 258.333349 122.3396 249.423349 139.1696 248.073349 159.5496 249.003349 175.9196 249.323349 175.6596 249.633349 175.4096 249.953349 175.1496 249.113349 159.1006 250.523349 139.3416 259.132349 122.9816 259.163349 123.0026 259.188349 123.0276 259.220349 123.0486 263.628349 126.0036 271.740349 122.9056 273.752349 122.0586 269.217349 117.6516 263.388349 115.0316 255.994349 112.1096M249.874249 88.8383C249.710249 103.3733 238.653249 109.6733 222.282249 109.5003 205.912249 109.3213 195.233249 102.7293 195.393249 88.2033 195.562249 73.6753 206.521249 64.2493 222.892249 64.4223 239.257249 64.5943 250.042249 74.3073 249.874249 88.8383M235.286949 161.3432L209.921949 161.3432C207.768949 161.3432 206.007949 159.5812 206.007949 157.4282L206.007949 145.8312C206.007949 143.6782 207.768949 141.9172 209.921949 141.9172L235.286949 141.9172C237.439949 141.9172 239.201949 143.6782 239.201949 145.8312L239.201949 157.4282C239.201949 159.5812 237.439949 161.3432 235.286949 161.3432" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_Layering1)" d="M222.979049,114.2292 L222.288049,114.2292 C222.288049,114.2292 207.441049,114.7342 198.465049,106.8662 C198.439049,106.8432 198.399049,106.8532 198.400977,106.8882 C198.472049,108.0612 199.778049,121.4012 222.288049,121.4012 L222.979049,121.4012 C245.490049,121.4012 246.795049,108.0612 246.866121,106.8882 C246.868049,106.8532 246.828049,106.8432 246.802049,106.8662 C237.826049,114.7342 222.979049,114.2292 222.979049,114.2292" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_StrokeDetailColor)" d="M170.523149,212.66 C170.603149,212.92 170.443149,213.2 170.183149,213.28 C154.203149,217.88 129.873149,219.81 129.623149,219.83 L129.583149,219.83 C129.323149,219.83 129.103149,219.64 129.083149,219.37 C129.063149,219.1 129.273149,218.86 129.543149,218.84 C129.733149,218.82 144.113149,217.68 157.973149,215.07 C156.923149,208.22 155.723149,196.52 156.773149,182.4 C157.683149,170.14 160.293149,156.06 166.153149,141.73 C167.293149,138.95 168.553149,136.17 169.943149,133.38 L170.843149,133.83 C169.443149,136.63 168.183149,139.43 167.043149,142.22 C160.423149,158.43 158.003149,174.32 157.483149,187.57 C157.013149,199.29 158.033149,208.93 158.963149,214.89 C162.783149,214.14 166.533149,213.29 169.903149,212.32 C170.173149,212.24 170.443149,212.39 170.523149,212.66" class="sapIllus_StrokeDetailColor"/>
    <path fill="var(--sapIllus_BrandColorSecondary)" d="M185.366249,140.3179 C182.684249,141.4459 171.872249,145.5749 165.998249,141.6369 C159.996249,137.6359 161.315249,128.9309 161.698249,127.0579 C171.553249,130.9529 179.321249,134.4439 185.366249,140.3179" class="sapIllus_BrandColorSecondary"/>
    <path fill="var(--sapIllus_Layering1)" d="M134.221049,192.1877 L100.416049,192.1877 C97.5460491,192.1877 95.1980491,189.8397 95.1980491,186.9707 L95.1980491,171.5137 C95.1980491,168.6447 97.5460491,166.2967 100.416049,166.2967 L134.221049,166.2967 C137.090049,166.2967 139.438049,168.6447 139.438049,171.5137 L139.438049,186.9707 C139.438049,189.8397 137.090049,192.1877 134.221049,192.1877" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_BrandColorSecondary)" d="M153.662449,95.5557 C153.443449,114.9267 138.707449,123.3237 116.888449,123.0927 C95.0704491,122.8547 80.8384491,114.0697 81.0514491,94.7097 C81.2774491,75.3477 95.8834491,62.7847 117.702449,63.0157 C139.512449,63.2447 153.885449,76.1887 153.662449,95.5557" class="sapIllus_BrandColorSecondary"/>
    <path fill="var(--sapIllus_PatternHighlight)" d="M101.970849,94.9267 C101.751849,114.2977 112.240849,118.3697 116.888849,123.0927 C95.0708491,122.8547 80.8388491,114.0697 81.0518491,94.7097 C81.2778491,75.3477 95.8828491,62.7847 117.701849,63.0157 C111.570849,72.0427 102.193849,75.5597 101.970849,94.9267" class="sapIllus_PatternHighlight"/>
    <path fill="var(--sapIllus_BrandColorPrimary)" d="M184.756949,35.9717 L182.820949,34.4427 C182.421949,34.1267 182.353949,33.5477 182.668949,33.1487 L184.198949,31.2127 C184.513949,30.8137 185.092949,30.7457 185.491949,31.0607 L187.427949,32.5897 C187.827949,32.9057 187.895949,33.4847 187.579949,33.8837 L186.050949,35.8197 C185.735949,36.2187 185.155949,36.2867 184.756949,35.9717" class="sapIllus_BrandColorPrimary"/>
    <path fill="var(--sapIllus_AccentColor)" d="M60.5006491,205.4477 C56.6586491,204.6997 54.3466491,201.6897 52.4196491,198.5477 C52.3296491,198.4027 52.1606491,198.3257 51.9926491,198.3537 C51.8316491,198.3957 51.7016491,198.5147 51.6466491,198.6717 C50.5596491,203.2497 48.5156491,205.4867 45.5226491,208.3757 C45.3576491,208.5347 45.3526491,208.7977 45.5116491,208.9627 C45.5776491,209.0317 45.6646491,209.0757 45.7596491,209.0877 C48.7406491,209.4877 53.8776491,214.1207 54.3456491,216.8337 C54.3826491,217.0387 54.5646491,217.1857 54.7726491,217.1787 C54.7936491,217.1777 54.8136491,217.1757 54.8336491,217.1727 C55.0166491,217.1417 55.1586491,216.9937 55.1816491,216.8087 C55.4796491,214.2907 56.8926491,208.9097 60.1056491,206.5617 C60.2756491,206.4377 60.4516491,206.3217 60.6316491,206.2157 C60.8306491,206.1007 60.8986491,205.8467 60.7846491,205.6487 C60.7236491,205.5437 60.6206491,205.4697 60.5006491,205.4477 Z" class="sapIllus_AccentColor"/>
    <path fill="var(--sapIllus_BrandColorPrimary)" d="M237.994249 207.7907C237.956249 207.7907 237.917249 207.7967 237.878249 207.8077L235.088249 208.6117C234.864249 208.6767 234.734249 208.9097 234.799249 209.1337L235.603249 211.9247C235.668249 212.1477 235.904249 212.2737 236.125249 212.2127L238.916249 211.4087C239.140249 211.3447 239.268249 211.1097 239.204249 210.8867L238.400249 208.0967C238.347249 207.9117 238.178249 207.7907 237.994249 207.7907M236.009249 213.2287C235.391249 213.2287 234.821249 212.8227 234.642249 212.2017L233.838249 209.4097C233.621249 208.6557 234.057249 207.8677 234.811249 207.6507L237.601249 206.8467C238.358249 206.6307 239.143249 207.0667 239.361249 207.8187L240.165249 210.6097C240.382249 211.3637 239.945249 212.1527 239.193249 212.3697L236.401249 213.1737C236.270249 213.2107 236.139249 213.2287 236.009249 213.2287M48.2680491 114.4159L47.0020491 111.8009C46.7800491 111.3429 46.9720491 110.7919 47.4300491 110.5709L50.0440491 109.3049C50.5020491 109.0829 51.0530491 109.2749 51.2750491 109.7329L52.5410491 112.3469C52.7630491 112.8049 52.5710491 113.3559 52.1130491 113.5779L49.4990491 114.8439C49.0410491 115.0649 48.4900491 114.8739 48.2680491 114.4159z" class="sapIllus_BrandColorPrimary"/>
    <path fill="var(--sapIllus_Layering1)" d="M53.2613491 51.141C52.6963491 51.155 52.2283491 50.708 52.2143491 50.143 52.2143491 50.143 52.2143491 50.143 52.2143491 50.143L52.1683491 43.854C52.1843491 43.28 52.6623491 42.827 53.2363491 42.843 53.7823491 42.858 54.2243491 43.293 54.2473491 43.839L54.2933491 50.127C54.2883491 50.692 53.8273491 51.146 53.2623491 51.141 53.2623491 51.141 53.2613491 51.141 53.2613491 51.141M53.0938491 28.315C52.5288491 28.328 52.0608491 27.881 52.0478491 27.316 52.0478491 27.316 52.0478491 27.316 52.0478491 27.315L52.0018491 21.017C52.0128491 20.443 52.4878491 19.988 53.0618491 20 53.6128491 20.011 54.0598491 20.451 54.0788491 21.002L54.1258491 27.3C54.1208491 27.865 53.6598491 28.319 53.0948491 28.315L53.0938491 28.315zM44.8866491 36.6661L38.5946491 36.7121C38.0216491 36.7161 37.5536491 36.2551 37.5496233 35.6821 37.5456491 35.1091 38.0066491 34.6411 38.5796491 34.6361L44.8716491 34.5901C45.4446491 34.5861 45.9126491 35.0471 45.9166749 35.6211 45.9206491 36.1941 45.4596491 36.6621 44.8866491 36.6661M67.7226491 36.501L61.4386491 36.547C60.8666491 36.533 60.4136491 36.058 60.4276491 35.486 60.4406491 34.939 60.8766491 34.496 61.4236491 34.475L67.7076491 34.429C68.2796491 34.443 68.7326491 34.918 68.7186491 35.49 68.7056491 36.037 68.2696491 36.48 67.7226491 36.501M269.896749 195.1929C269.516749 195.1989 269.202749 194.8959 269.196749 194.5159L269.196749 194.5149 269.196749 190.2799C269.209749 189.8929 269.534749 189.5899 269.920749 189.6039 270.288749 189.6169 270.583749 189.9119 270.596749 190.2799L270.596749 194.5149C270.590749 194.8949 270.277749 195.1989 269.897749 195.1929 269.896749 195.1929 269.896749 195.1929 269.896749 195.1929M269.896749 179.8181C269.516749 179.8241 269.202749 179.5211 269.196749 179.1401 269.196749 179.1401 269.196749 179.1401 269.196749 179.1391L269.196749 174.8971C269.207749 174.5111 269.529749 174.2061 269.916749 174.2171 270.287749 174.2281 270.585749 174.5261 270.596749 174.8971L270.596749 179.1391C270.590749 179.5201 270.277749 179.8241 269.896749 179.8181 269.896749 179.8181 269.896749 179.8181 269.896749 179.8181M264.327649 185.4023L260.089649 185.4023C259.703649 185.4023 259.390649 185.0893 259.390649 184.7033 259.390649 184.3173 259.703649 184.0043 260.089649 184.0043L264.327649 184.0043C264.713649 184.0043 265.026649 184.3173 265.026649 184.7033 265.026649 185.0893 264.713649 185.4023 264.327649 185.4023M279.709149 185.404L275.476149 185.404C275.091149 185.392 274.788149 185.069 274.801149 184.684 274.812149 184.316 275.108149 184.02 275.476149 184.008L279.709149 184.008C280.094149 184.02 280.397149 184.343 280.385149 184.728 280.373149 185.097 280.077149 185.392 279.709149 185.404" class="sapIllus_Layering1"/>
    <path fill="var(--sapIllus_AccentColor)" d="M291.131649,73.4548 C285.840649,71.4948 283.251649,66.6738 281.241649,61.7558 C281.147649,61.5278 280.925649,61.3798 280.679649,61.3798 C280.440649,61.4018 280.229649,61.5418 280.114649,61.7518 C277.500649,68.0118 274.072649,70.7178 269.141649,74.1318 C268.868649,74.3188 268.800649,74.6918 268.987649,74.9638 C269.065649,75.0768 269.179649,75.1598 269.311649,75.1988 C273.459649,76.4638 279.687649,84.2508 279.722649,88.2188 C279.727649,88.5198 279.951649,88.7718 280.250649,88.8098 C280.278649,88.8138 280.307649,88.8148 280.337649,88.8148 C280.605649,88.8138 280.841649,88.6358 280.917649,88.3778 C281.928649,84.8658 285.192649,77.5388 290.309649,74.9488 C290.581649,74.8108 290.857649,74.6868 291.139649,74.5778 C291.448649,74.4618 291.605649,74.1158 291.488649,73.8068 C291.426649,73.6428 291.296649,73.5148 291.131649,73.4548 Z" class="sapIllus_AccentColor"/>
    <path fill="var(--sapIllus_StrokeDetailColor)" d="M103.839949 217.2467C103.800949 217.2467 103.760949 217.2417 103.721949 217.2317 98.1759491 215.8797 90.1309491 213.0237 90.0499491 212.9947 89.7899491 212.9027 89.6539491 212.6167 89.7469491 212.3557 89.8389491 212.0967 90.1249491 211.9587 90.3859491 212.0537 90.4659491 212.0817 98.4629491 214.9207 103.957949 216.2617 104.226949 216.3267 104.390949 216.5977 104.324949 216.8647 104.269949 217.0937 104.065949 217.2467 103.839949 217.2467M182.710049 209.8913C182.508049 209.8913 182.317049 209.7673 182.242049 209.5673 182.145049 209.3083 182.275049 209.0203 182.534049 208.9233 182.758049 208.8393 188.027049 206.8653 190.334049 206.1873 190.598049 206.1093 190.877049 206.2593 190.954049 206.5263 191.032049 206.7903 190.881049 207.0683 190.615049 207.1463 188.344049 207.8143 182.939049 209.8393 182.886049 209.8593 182.828049 209.8813 182.769049 209.8913 182.710049 209.8913M116.833149 128.85C104.093149 128.71 94.0631491 125.91 87.0431491 120.53 82.7431491 117.23 79.6631491 113.02 77.8431491 107.93 76.4531491 104.09 75.7831491 99.75 75.8431491 94.93 75.8931491 90.3 76.5131491 85.98 77.5931491 82 83.0331491 61.96 100.253149 50.45 116.953149 50.45L117.333149 50.45C127.993149 50.56 138.063149 54.91 145.673149 62.7 150.913149 68.06 154.743149 74.72 156.863149 81.97 158.133149 86.27 158.793149 90.78 158.793149 95.33L158.793149 95.86C158.743149 100.29 158.073149 104.3 156.813149 107.87 151.923149 121.71 138.123149 129.04 116.833149 128.85M219.923149 194.44C219.793149 194.2 219.493149 194.11 219.253149 194.24 215.463149 196.32 208.683149 199.15 203.353149 201.28 203.393149 200.49 203.403149 199.69 203.403149 198.89 203.403149 186.33 200.333149 171.57 196.313149 159.72 195.923149 158.6 195.533149 157.51 195.143149 156.44L195.133149 156.43C192.233149 148.63 188.973149 142.47 186.043149 139.65 180.753149 134.51 174.183149 131.15 166.773149 128.05 165.093149 127.34 163.373149 126.65 161.613149 125.95L158.623149 124.8C156.173149 123.86 152.923149 122.92 149.233149 122.05 149.403149 121.39 149.513149 120.83 149.573149 120.41 152.703149 117.69 155.143149 114.4 156.843149 110.56 157.423149 110.47 166.853149 108.76 166.473149 98.34L166.473149 94.18C166.783149 85.71 160.613149 83 157.983149 82.24L157.983149 82.23C155.853149 74.62 151.883149 67.61 146.383149 61.99 138.583149 54.02 128.273149 49.57 117.343149 49.45 105.623149 49.33 94.7531491 54.18 86.8231491 63.12 82.0731491 68.47 78.5731491 75.1 76.6231491 82.25 73.9631491 83.04 67.8831491 85.77 68.1831491 94.18L68.1831491 98.34C67.8031491 108.8 77.3131491 110.48 77.8231491 110.56 79.5331491 114.32 81.9731491 117.56 85.1331491 120.27 85.1931491 120.7 85.2931491 121.31 85.4731491 122.03 81.7431491 122.91 78.4731491 123.85 76.0131491 124.8L73.0131491 125.96C63.4931491 129.72 55.0831491 133.35 48.5931491 139.65 45.1431491 142.97 40.8331491 151.63 37.3431491 162.36 37.4031491 162.48 37.4731491 162.61 37.5431491 162.73 37.6031491 162.85 37.7131491 163.06 37.8631491 163.35 40.4731491 168.41 56.5931491 197.77 85.2531491 210.97 85.3231491 211 85.3931491 211.01 85.4631491 211.01 85.6531491 211.01 85.8331491 210.91 85.9131491 210.72 86.0331491 210.47 85.9231491 210.18 85.6731491 210.06 83.1731491 208.91 80.7631491 207.63 78.4531491 206.26 79.7831491 191.07 79.4831491 166.57 69.0631491 141.34 67.9631491 138.69 66.7631491 136.03 65.4331491 133.38L64.5331491 133.83C65.8831491 136.52 67.1031491 139.22 68.2031491 141.91 78.3631491 166.61 78.7631491 190.61 77.5031491 205.67 53.0631491 190.68 39.7831491 164.97 38.4931491 162.38 41.8731491 151.92 46.0231491 143.51 49.2931491 140.37L49.3031491 140.36C52.4831491 137.27 56.1331491 134.84 60.1831491 132.71 60.8031491 132.38 61.4331491 132.06 62.0831491 131.75 62.6531491 131.46 63.2431491 131.19 63.8331491 130.91 65.5831491 130.1 67.4131491 129.32 69.3231491 128.53 69.9031491 128.28 70.5031491 128.04 71.1031491 127.81 71.7031491 127.57 72.3031491 127.32 72.9231491 127.08 73.0731491 127.01 73.2331491 126.95 73.3831491 126.89L76.3731491 125.73C78.8131491 124.79 82.0631491 123.85 85.7531491 122.99 87.5531491 128.58 93.9731491 138.95 116.893149 138.95L117.813149 138.95C140.723149 138.95 147.153149 128.59 148.953149 123 152.623149 123.86 155.843149 124.79 158.263149 125.73L161.253149 126.89C161.403149 126.95 161.553149 127.01 161.703149 127.07 163.253149 127.68 164.773149 128.29 166.253149 128.91 169.123149 130.11 171.863149 131.35 174.453149 132.71 178.493149 134.83 182.153149 137.26 185.313149 140.34 185.323149 140.35 185.333149 140.36 185.343149 140.37 188.453149 143.36 192.173149 150.85 195.333149 160.16L195.333149 160.17C195.713149 161.26 196.073149 162.37 196.423149 163.51 196.973149 165.27 197.503149 167.08 197.993149 168.93 201.183149 180.88 202.693149 192.41 202.343149 201.69 198.523149 203.19 195.683149 204.27 195.613149 204.29 195.353149 204.39 195.223149 204.68 195.323149 204.93 195.393149 205.14 195.583149 205.26 195.783149 205.26 195.843149 205.26 195.903149 205.25 195.963149 205.23 196.133149 205.16 212.833149 198.9 219.733149 195.12 219.973149 194.99 220.063149 194.68 219.923149 194.44" class="sapIllus_StrokeDetailColor"/>
    <path fill="var(--sapIllus_BackgroundColor)" d="M238.697349,183.9635 C238.531349,183.9635 238.368349,183.8815 238.273349,183.7305 C238.126349,183.4965 238.19642,183.1885 238.429349,183.0405 C238.729349,182.8515 268.594349,163.7595 282.893349,134.8055 C283.016349,134.5585 283.318349,134.4575 283.563349,134.5785 C283.810349,134.7005 283.912349,135.0005 283.790349,135.2485 C269.364349,164.4595 239.265349,183.6945 238.963349,183.8865 C238.880349,183.9385 238.788349,183.9635 238.697349,183.9635" class="sapIllus_BackgroundColor"/>
    <path fill="var(--sapIllus_BrandColorSecondary)" d="M49.2559491,140.3406 C51.9379491,141.4686 62.7499491,145.5976 68.6239491,141.6596 C74.6259491,137.6586 73.3069491,128.9536 72.9239491,127.0806 C63.0689491,130.9756 55.3009491,134.4666 49.2559491,140.3406" class="sapIllus_BrandColorSecondary"/>
</svg>`;

    return sceneSvg;

});
