sap.ui.define(function () { 'use strict';

	var spotSvg = `<svg width="94" height="128" viewBox="0 0 94 128" fill="none" xmlns="http://www.w3.org/2000/svg" id="sapIllus-Spot-SimpleNoSavedItems">
<g clip-path="url(#clip0_101_5764)">
<path d="M21.618 127.225H84.535C85.2866 127.224 86.0291 127.059 86.7102 126.741C87.3913 126.423 87.9945 125.96 88.4777 125.384C88.9608 124.808 89.3121 124.134 89.507 123.408C89.7018 122.682 89.7354 121.922 89.6055 121.182L73.9402 32.2024C73.7307 31.01 73.1074 29.9297 72.1799 29.1515C71.2524 28.3733 70.0803 27.9472 68.8696 27.948H5.92791C5.17623 27.9487 4.43379 28.1139 3.7527 28.4319C3.0716 28.7499 2.46835 29.2131 1.9852 29.7889C1.50206 30.3648 1.15074 31.0393 0.955896 31.7653C0.761052 32.4913 0.727423 33.2511 0.857313 33.9915L16.5227 122.971C16.736 124.166 17.3638 125.247 18.2957 126.026C19.2276 126.804 20.404 127.228 21.618 127.225Z" fill="var(--sapContent_Illustrative_Color6)"/>
<path d="M84.5352 128H21.6182C20.2244 128.002 18.8747 127.511 17.8068 126.615C16.739 125.719 16.0215 124.475 15.7808 123.103L0.0907771 34.1729C-0.059729 33.3204 -0.0217254 32.4452 0.202192 31.609C0.42611 30.7727 0.830469 29.9956 1.38685 29.3324C1.94322 28.6691 2.63815 28.1358 3.42271 27.7699C4.20727 27.4039 5.06243 27.2142 5.92814 27.2142H68.8451C70.239 27.2126 71.5887 27.703 72.6565 28.5989C73.7243 29.4948 74.4418 30.7387 74.6825 32.1117L90.3478 121.083C90.4984 121.935 90.4603 122.81 90.2364 123.646C90.0125 124.483 89.6081 125.26 89.0517 125.923C88.4954 126.586 87.8005 127.12 87.0159 127.486C86.2314 127.852 85.3761 128.041 84.5104 128.041L84.5352 128ZM5.92814 28.723C5.28897 28.723 4.65755 28.8629 4.07822 29.1329C3.49889 29.403 2.98573 29.7966 2.57477 30.2861C2.16381 30.7757 1.86502 31.3493 1.6994 31.9666C1.53378 32.5839 1.50532 33.2301 1.61607 33.8596L17.2814 122.83C17.4583 123.845 17.9879 124.765 18.7769 125.427C19.5659 126.089 20.5634 126.452 21.5935 126.45H84.5352C85.1739 126.449 85.8046 126.308 86.3833 126.037C86.9619 125.767 87.4744 125.373 87.8851 124.884C88.2958 124.395 88.5946 123.822 88.7608 123.205C88.927 122.588 88.9565 121.943 88.8473 121.313L73.1819 32.3425C73.0051 31.3277 72.4754 30.4081 71.6864 29.7458C70.8975 29.0835 69.8999 28.7213 68.8699 28.723H5.92814Z" fill="var(--sapContent_Illustrative_Color6)"/>
<path d="M25.0066 123.861H87.9236C88.6757 123.862 89.4188 123.698 90.1007 123.38C90.7825 123.062 91.3864 122.599 91.8698 122.023C92.3532 121.447 92.7044 120.772 92.8987 120.045C93.093 119.318 93.1256 118.558 92.9942 117.818L77.3289 28.8467C77.1211 27.6528 76.4985 26.5705 75.5709 25.7907C74.6432 25.0109 73.4701 24.5836 72.2582 24.584H9.3413C8.58855 24.5848 7.84505 24.7502 7.16297 25.0686C6.48089 25.387 5.87671 25.8508 5.39281 26.4274C4.9089 27.004 4.55701 27.6795 4.36174 28.4065C4.16647 29.1335 4.13258 29.8943 4.26245 30.6358L19.9278 119.607C20.1391 120.8 20.764 121.88 21.6929 122.658C22.6217 123.436 23.795 123.862 25.0066 123.861Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path d="M87.9235 124.644H25.0066C23.6051 124.646 22.2488 124.149 21.1796 123.243C20.1104 122.337 19.3979 121.08 19.1692 119.697L3.50385 30.7265C3.35334 29.874 3.39139 28.9989 3.61531 28.1626C3.83923 27.3264 4.24359 26.5493 4.79996 25.886C5.35634 25.2228 6.05122 24.6894 6.83578 24.3235C7.62034 23.9575 8.47555 23.7679 9.34126 23.7678H72.2582C73.6516 23.7679 75.0005 24.2589 76.068 25.1545C77.1355 26.0501 77.8534 27.2931 78.0956 28.6653L93.7609 117.636C93.9114 118.49 93.8731 119.366 93.6488 120.203C93.4244 121.04 93.0195 121.818 92.4624 122.482C91.9052 123.146 91.2094 123.68 90.4239 124.047C89.6383 124.413 88.7821 124.603 87.9153 124.603L87.9235 124.644ZM9.34126 25.3591C8.70208 25.359 8.07066 25.499 7.49134 25.769C6.91201 26.0391 6.39885 26.4327 5.98789 26.9222C5.57692 27.4118 5.27809 27.9854 5.11247 28.6027C4.94685 29.22 4.91844 29.8662 5.02918 30.4957L20.6945 119.475C20.8731 120.488 21.4035 121.406 22.1923 122.066C22.9811 122.727 23.9777 123.088 25.0066 123.086H87.9153C88.5549 123.088 89.1871 122.949 89.7671 122.679C90.3472 122.409 90.861 122.016 91.2722 121.526C91.6835 121.036 91.9821 120.462 92.1472 119.844C92.3122 119.226 92.3396 118.579 92.2274 117.949L76.5621 28.9786C76.3837 27.9646 75.8535 27.0458 75.0649 26.3838C74.2763 25.7219 73.2796 25.359 72.2499 25.3591H9.34126Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M33.6063 23.6277L38.2811 50.6627C38.3966 51.3553 37.6216 51.7098 37.0362 51.2234L27.9668 43.7205C27.8153 43.5838 27.6184 43.5081 27.4143 43.5081C27.2103 43.5081 27.0134 43.5838 26.8619 43.7205L20.7195 51.0255C20.299 51.5202 19.3838 51.1574 19.2684 50.4566L14.7749 23.6029C14.7457 23.5042 14.7407 23.3999 14.7602 23.2988C14.7797 23.1977 14.8232 23.1027 14.887 23.0219C14.9508 22.9411 15.0331 22.8769 15.1269 22.8345C15.2208 22.7921 15.3234 22.7729 15.4263 22.7784H32.6746C32.9044 22.7896 33.1232 22.8805 33.2932 23.0355C33.4633 23.1904 33.574 23.3999 33.6063 23.6277Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M35.4613 22.4898L40.1362 49.5249C40.2599 50.2257 39.4849 50.5803 38.8913 50.0938L29.8219 42.5909C29.6704 42.4542 29.4735 42.3785 29.2694 42.3785C29.0653 42.3785 28.8685 42.4542 28.717 42.5909L22.5333 49.9042C22.1211 50.3989 21.2059 50.0361 21.0905 49.3271L16.5887 22.4734C16.5689 22.3775 16.5709 22.2784 16.5946 22.1834C16.6183 22.0885 16.6632 22.0001 16.7258 21.9248C16.7883 21.8496 16.8671 21.7894 16.9561 21.7488C17.0452 21.7081 17.1422 21.688 17.2401 21.6901H34.505C34.7324 21.6919 34.952 21.7727 35.1265 21.9185C35.301 22.0644 35.4193 22.2664 35.4613 22.4898Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path d="M40.0866 50.0114C39.9034 50.0121 39.7259 49.9479 39.5856 49.8302C39.4452 49.7125 39.3511 49.5488 39.3199 49.3683L38.6603 45.5509C38.6253 45.3475 38.6725 45.1386 38.7916 44.9701C38.9106 44.8015 39.0918 44.6872 39.2952 44.6522C39.4985 44.6172 39.7075 44.6644 39.876 44.7835C40.0445 44.9026 40.1588 45.0837 40.1938 45.2871L40.8534 49.1044C40.8768 49.3061 40.825 49.5094 40.7078 49.6752C40.5907 49.841 40.4165 49.9578 40.2186 50.0032L40.0866 50.0114ZM37.539 49.7476C37.3596 49.7452 37.1859 49.6844 37.0443 49.5744L34.0514 47.1009C33.8928 46.9697 33.7929 46.7809 33.7736 46.5761C33.7542 46.3712 33.8171 46.167 33.9483 46.0085C34.0795 45.85 34.2683 45.75 34.4732 45.7307C34.6781 45.7114 34.8822 45.7742 35.0408 45.9054L38.0337 48.3789C38.1553 48.481 38.2426 48.6179 38.2838 48.7712C38.3251 48.9244 38.3183 49.0867 38.2643 49.236C38.2103 49.3853 38.1119 49.5144 37.9821 49.6059C37.8524 49.6974 37.6977 49.7468 37.539 49.7476ZM23.4649 49.5991C23.2835 49.6005 23.1078 49.536 22.9702 49.4178C22.8215 49.2793 22.7291 49.0908 22.7109 48.8884C22.6926 48.686 22.7497 48.484 22.8713 48.3212L25.3447 45.353C25.477 45.1956 25.6665 45.0971 25.8714 45.0794C26.0762 45.0616 26.2797 45.1259 26.4372 45.2582C26.5946 45.3905 26.6931 45.5799 26.7108 45.7848C26.7286 45.9897 26.6643 46.1932 26.532 46.3506L24.0585 49.3188C23.9877 49.4079 23.8974 49.4796 23.7944 49.5282C23.6915 49.5768 23.5787 49.6011 23.4649 49.5991ZM20.9914 49.5991C20.808 49.5993 20.6306 49.5336 20.4914 49.4141C20.3523 49.2946 20.2605 49.1292 20.2329 48.9478L19.5898 45.1222C19.5703 44.9265 19.6259 44.7309 19.7453 44.5747C19.8648 44.4185 20.039 44.3136 20.2329 44.2811C20.4268 44.2486 20.6258 44.291 20.7896 44.3997C20.9534 44.5084 21.0698 44.6753 21.1151 44.8666L21.7582 48.6922C21.7759 48.7929 21.7736 48.8962 21.7512 48.996C21.7289 49.0958 21.6869 49.1902 21.6279 49.2738C21.5689 49.3573 21.494 49.4283 21.4074 49.4828C21.3208 49.5372 21.2242 49.574 21.1233 49.5909L20.9914 49.5991ZM31.5284 44.8501C31.3511 44.8503 31.1793 44.7891 31.042 44.6769L29.2858 43.2258H29.2198L29.022 43.4567C28.8904 43.6136 28.7021 43.7121 28.4982 43.7306C28.2943 43.7492 28.0913 43.6862 27.9336 43.5556C27.7849 43.4172 27.6926 43.2287 27.6743 43.0263C27.6561 42.8239 27.7132 42.6219 27.8347 42.459L28.082 42.1705C28.3707 41.8864 28.7537 41.7185 29.1582 41.6988C29.5627 41.679 29.9603 41.8088 30.2752 42.0633L32.0231 43.5144C32.1447 43.6164 32.232 43.7534 32.2733 43.9067C32.3145 44.0599 32.3077 44.2222 32.2538 44.3715C32.1998 44.5208 32.1013 44.6499 31.9716 44.7414C31.8418 44.8329 31.6872 44.8823 31.5284 44.883V44.8501ZM38.7427 42.3766C38.5595 42.3773 38.382 42.3131 38.2417 42.1954C38.1013 42.0777 38.0071 41.914 37.9759 41.7335L37.3164 37.9161C37.2986 37.8154 37.301 37.7121 37.3234 37.6123C37.3457 37.5125 37.3876 37.4181 37.4466 37.3346C37.5057 37.251 37.5806 37.18 37.6672 37.1255C37.7538 37.0711 37.8504 37.0344 37.9512 37.0174C38.0515 36.9997 38.1542 37.0022 38.2535 37.0246C38.3528 37.0471 38.4467 37.0891 38.5295 37.1482C38.6124 37.2073 38.6827 37.2823 38.7363 37.3688C38.7899 37.4554 38.8257 37.5517 38.8417 37.6523L39.5013 41.4697C39.5373 41.6719 39.4915 41.8802 39.374 42.0487C39.2565 42.2172 39.0769 42.3322 38.8747 42.3684L38.7427 42.3766ZM19.7135 41.9149C19.5303 41.9156 19.3527 41.8514 19.2124 41.7337C19.072 41.616 18.9779 41.4523 18.9467 41.2718L18.3118 37.4461C18.2873 37.3429 18.2843 37.2357 18.3029 37.1312C18.3216 37.0267 18.3615 36.9271 18.4202 36.8387C18.4789 36.7502 18.5551 36.6748 18.6442 36.617C18.7332 36.5593 18.8332 36.5204 18.9379 36.5029C19.0425 36.4853 19.1497 36.4895 19.2527 36.5151C19.3557 36.5406 19.4524 36.5871 19.5367 36.6516C19.621 36.7161 19.6912 36.7972 19.7429 36.8899C19.7946 36.9826 19.8266 37.0849 19.8371 37.1906L20.4803 41.0162C20.5012 41.2177 20.4472 41.4199 20.3286 41.5841C20.21 41.7483 20.035 41.8632 19.8371 41.9066L19.7135 41.9149ZM37.4235 34.7336C37.2404 34.7343 37.0628 34.6701 36.9224 34.5524C36.7821 34.4346 36.688 34.271 36.6568 34.0905L35.9972 30.2731C35.9739 30.1705 35.9718 30.0643 35.9909 29.9609C36.0099 29.8575 36.0499 29.759 36.1082 29.6715C36.1666 29.584 36.2421 29.5093 36.3302 29.452C36.4184 29.3946 36.5173 29.3558 36.6209 29.3379C36.7245 29.32 36.8307 29.3233 36.933 29.3477C37.0353 29.3721 37.1315 29.4171 37.2159 29.4799C37.3002 29.5427 37.3709 29.6221 37.4236 29.7131C37.4763 29.8041 37.51 29.9048 37.5225 30.0092L38.1821 33.8266C38.2181 34.0289 38.1723 34.2372 38.0548 34.4057C37.9373 34.5742 37.7577 34.6892 37.5554 34.7253L37.4235 34.7336ZM18.4602 34.2636C18.278 34.264 18.1016 34.1995 17.9626 34.0817C17.8236 33.9639 17.7311 33.8003 17.7017 33.6205L17.0586 29.7949C17.0418 29.6942 17.045 29.5911 17.0681 29.4917C17.0911 29.3922 17.1335 29.2983 17.1928 29.2152C17.2521 29.1322 17.3273 29.0616 17.4139 29.0076C17.5005 28.9535 17.5969 28.9171 17.6976 28.9003C17.7983 28.8835 17.9013 28.8867 18.0007 28.9098C18.1002 28.9328 18.1942 28.9752 18.2772 29.0345C18.3603 29.0938 18.4309 29.1689 18.4849 29.2556C18.5389 29.3422 18.5754 29.4386 18.5921 29.5393L19.2353 33.3484C19.2687 33.5506 19.2206 33.7578 19.1017 33.9247C18.9827 34.0916 18.8024 34.2045 18.6004 34.2389L18.4602 34.2636ZM36.1291 27.0905C35.9469 27.091 35.7704 27.0265 35.6314 26.9086C35.4925 26.7908 35.4 26.6273 35.3706 26.4474L34.711 22.63C34.6877 22.5275 34.6856 22.4213 34.7047 22.3179C34.7237 22.2144 34.7637 22.116 34.822 22.0285C34.8804 21.941 34.9559 21.8663 35.044 21.8089C35.1322 21.7516 35.2311 21.7128 35.3347 21.6948C35.4383 21.6769 35.5445 21.6803 35.6468 21.7047C35.7491 21.7291 35.8453 21.7741 35.9297 21.8369C36.014 21.8997 36.0847 21.979 36.1374 22.07C36.1901 22.161 36.2238 22.2618 36.2363 22.3662L36.8959 26.1836C36.9136 26.2843 36.9112 26.3876 36.8889 26.4874C36.8665 26.5872 36.8246 26.6816 36.7656 26.7651C36.7066 26.8487 36.6316 26.9197 36.545 26.9742C36.4584 27.0286 36.3619 27.0653 36.261 27.0823L36.1291 27.0905ZM17.1658 26.6206C16.984 26.6118 16.8103 26.5432 16.6716 26.4254C16.5329 26.3076 16.437 26.1472 16.399 25.9692L15.8384 22.6135C15.7919 22.2836 15.8465 21.9472 15.995 21.6489C16.0945 21.4685 16.2616 21.335 16.4595 21.2778C16.6574 21.2206 16.8699 21.2443 17.0503 21.3438C17.2307 21.4433 17.3643 21.6104 17.4215 21.8083C17.4787 22.0062 17.4549 22.2188 17.3554 22.3992L17.9326 25.6971C17.966 25.8993 17.918 26.1066 17.799 26.2734C17.68 26.4403 17.4998 26.5533 17.2977 26.5876L17.1658 26.6206ZM32.0726 22.4981H28.1892C27.9837 22.4981 27.7866 22.4164 27.6412 22.2711C27.4959 22.1258 27.4142 21.9286 27.4142 21.7231C27.4142 21.5175 27.4959 21.3204 27.6412 21.1751C27.7866 21.0297 27.9837 20.9481 28.1892 20.9481H32.0726C32.2782 20.9481 32.4753 21.0297 32.6206 21.1751C32.766 21.3204 32.8476 21.5175 32.8476 21.7231C32.8476 21.9286 32.766 22.1258 32.6206 22.2711C32.4753 22.4164 32.2782 22.4981 32.0726 22.4981ZM24.3141 22.4981H20.439C20.2335 22.4981 20.0364 22.4164 19.891 22.2711C19.7457 22.1258 19.664 21.9286 19.664 21.7231C19.664 21.5175 19.7457 21.3204 19.891 21.1751C20.0364 21.0297 20.2335 20.9481 20.439 20.9481H24.3141C24.5197 20.9481 24.7168 21.0297 24.8622 21.1751C25.0075 21.3204 25.0891 21.5175 25.0891 21.7231C25.0891 21.9286 25.0075 22.1258 24.8622 22.2711C24.7168 22.4164 24.5197 22.4981 24.3141 22.4981Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M28.816 71.3492H70.2054C70.6399 71.3641 71.072 71.2789 71.4684 71.1002C71.8647 70.9215 72.2147 70.6541 72.4912 70.3186C72.7677 69.9831 72.9634 69.5885 73.0631 69.1654C73.1629 68.7422 73.164 68.3018 73.0664 67.8781C72.8759 66.9247 72.3694 66.0634 71.6288 65.4335C70.8882 64.8036 69.9568 64.442 68.9852 64.407H27.5957C27.1607 64.3905 26.7278 64.4745 26.3306 64.6527C25.9334 64.8309 25.5828 65.0984 25.3059 65.4343C25.029 65.7702 24.8334 66.1655 24.7344 66.5894C24.6353 67.0133 24.6354 67.4543 24.7347 67.8781C24.9266 68.8309 25.4335 69.6913 26.1738 70.321C26.9141 70.9506 27.8448 71.3128 28.816 71.3492Z" fill="var(--sapContent_Illustrative_Color3)"/>
<path d="M56.2385 82.15H71.7555C72.1898 82.1653 72.6218 82.0802 73.0179 81.9015C73.414 81.7228 73.7636 81.4551 74.0395 81.1194C74.3155 80.7836 74.5103 80.3888 74.6089 79.9656C74.7076 79.5423 74.7073 79.1021 74.6082 78.6789C74.4177 77.7255 73.9112 76.8642 73.1706 76.2343C72.43 75.6044 71.4986 75.2428 70.527 75.2078H55.0183C54.5838 75.193 54.1517 75.2781 53.7554 75.4568C53.359 75.6355 53.0091 75.903 52.7326 76.2385C52.4561 76.5739 52.2604 76.9685 52.1606 77.3917C52.0609 77.8149 52.0597 78.2553 52.1573 78.6789C52.3491 79.6317 52.856 80.4922 53.5963 81.1218C54.3367 81.7514 55.2674 82.1136 56.2385 82.15Z" fill="var(--sapContent_Illustrative_Color6)"/>
<path d="M31.4131 81.9934H46.9301C47.3646 82.0083 47.7966 81.923 48.193 81.7443C48.5893 81.5656 48.9393 81.2982 49.2158 80.9627C49.4923 80.6272 49.688 80.2327 49.7877 79.8095C49.8875 79.3864 49.8886 78.9459 49.791 78.5223C49.5989 77.5622 49.0863 76.6958 48.3373 76.0651C47.5884 75.4345 46.6474 75.077 45.6686 75.0512H30.1929C29.7579 75.0346 29.325 75.1187 28.9278 75.2969C28.5306 75.475 28.1799 75.7425 27.9031 76.0784C27.6262 76.4143 27.4306 76.8097 27.3315 77.2335C27.2325 77.6574 27.2326 78.0984 27.3319 78.5223C27.5237 79.475 28.0306 80.3355 28.7709 80.9651C29.5112 81.5948 30.4419 81.957 31.4131 81.9934Z" fill="var(--sapContent_Illustrative_Color3)"/>
<path d="M32.5591 91.3844H48.0925C48.527 91.3992 48.9592 91.314 49.3555 91.1353C49.7518 90.9566 50.1017 90.6892 50.3783 90.3537C50.6548 90.0182 50.8505 89.6237 50.9502 89.2005C51.05 88.7773 51.0511 88.3369 50.9535 87.9132C50.7597 86.9547 50.2465 86.0902 49.4977 85.4612C48.7488 84.8321 47.8087 84.4758 46.8311 84.4504H31.3389C30.9048 84.4341 30.4727 84.5182 30.0763 84.6959C29.6799 84.8736 29.3298 85.1403 29.0531 85.4752C28.7764 85.8101 28.5806 86.2042 28.4808 86.627C28.3811 87.0499 28.3801 87.49 28.4779 87.9132C28.6684 88.8666 29.1749 89.7279 29.9155 90.3578C30.6561 90.9877 31.5875 91.3494 32.5591 91.3844Z" fill="var(--sapContent_Illustrative_Color6)"/>
</g>
<path d="M6.33602 8.03247C6.55092 7.97843 6.77645 7.98359 6.98865 8.04743C7.20084 8.11127 7.39179 8.2314 7.5412 8.39505L11.225 12.1616C11.3513 12.2911 11.45 12.4449 11.5152 12.6136C11.5804 12.7824 11.6108 12.9626 11.6044 13.1433C11.5981 13.3241 11.5552 13.5018 11.4783 13.6655C11.4014 13.8293 11.2921 13.9757 11.157 14.0961C10.9655 14.2999 10.7129 14.4358 10.4373 14.4833C10.1617 14.5307 9.87809 14.487 9.62952 14.3588C9.51017 14.2952 9.4 14.2156 9.30202 14.1224L5.61823 10.3559C5.45273 10.1933 5.33426 9.98899 5.27539 9.76458C5.21651 9.54017 5.21939 9.30401 5.28375 9.08111C5.35264 8.82982 5.48596 8.60088 5.67053 8.41695C5.85509 8.23302 6.08449 8.10049 6.33602 8.03247Z" fill="var(--sapContent_Illustrative_Color5)"/>
<path d="M34.4492 2.75213C34.6042 2.79624 34.748 2.87277 34.8711 2.97665C34.9942 3.08054 35.0939 3.20941 35.1635 3.35471C35.233 3.50002 35.2709 3.65845 35.2746 3.81951C35.2783 3.98057 35.2478 4.14057 35.185 4.28893L33.4641 9.12653C33.4015 9.30008 33.3049 9.45938 33.1799 9.59505C33.0549 9.73073 32.9041 9.84005 32.7362 9.91658C32.5684 9.99311 32.3869 10.0353 32.2025 10.0407C32.0181 10.0461 31.8345 10.0145 31.6625 9.94793C31.5902 9.92304 31.5204 9.89124 31.4542 9.85297C31.206 9.72176 31.0159 9.50222 30.9216 9.23771C30.8273 8.9732 30.8356 8.68294 30.9449 8.42426L32.6675 3.59711C32.7278 3.42381 32.822 3.26422 32.9446 3.12766C33.0672 2.99109 33.2157 2.88028 33.3815 2.80165C33.5473 2.72302 33.7271 2.67814 33.9104 2.66964C34.0937 2.66114 34.2768 2.68918 34.4492 2.75213Z" fill="var(--sapContent_Illustrative_Color5)"/>
<path d="M20.2324 0.719321C20.3778 0.813883 20.503 0.936412 20.6007 1.07977C20.6983 1.22312 20.7665 1.38446 20.8013 1.55439L22.3944 9.16269C22.4633 9.5049 22.3973 9.86049 22.2103 10.1553C22.0233 10.45 21.7297 10.6612 21.3907 10.7446C21.0777 10.823 20.7466 10.7787 20.4652 10.6208C20.3025 10.531 20.1613 10.4071 20.0511 10.2574C19.9409 10.1078 19.8644 9.93612 19.8269 9.75413L18.2339 2.14585C18.1616 1.80365 18.2252 1.44674 18.4114 1.15067C18.5976 0.854591 18.8917 0.642581 19.2314 0.55951C19.4005 0.517418 19.5762 0.509871 19.7482 0.537334C19.9202 0.564797 20.0849 0.626691 20.2324 0.719321Z" fill="var(--sapContent_Illustrative_Color5)"/>
<defs>
<clipPath id="clip0_101_5764">
<rect width="93.8601" height="107.085" fill="var(--sapContent_Illustrative_Color8)" transform="translate(0 20.9151)"/>
</clipPath>
</defs>
</svg>
`;

	return spotSvg;

});
