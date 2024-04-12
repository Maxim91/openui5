sap.ui.define(["exports"],function(T){"use strict";var _={BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT:"Zrušiť",BARCODE_SCANNER_DIALOG_LOADING_TXT:"Načítavanie prebieha",FCL_START_COLUMN_TXT:"Prvý stĺpec",FCL_MIDDLE_COLUMN_TXT:"Stredný stĺpec",FCL_END_COLUMN_TXT:"Posledný stĺpec",FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP:"Rozbaliť prvý stĺpec",FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Zbaliť prvý stĺpec",FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP:"Rozbaliť posledný stĺpec",FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Zbaliť posledný stĺpec",NOTIFICATION_LIST_ITEM_TXT:"Oznámenie",NOTIFICATION_LIST_ITEM_SHOW_MORE:"Zobraziť viac",NOTIFICATION_LIST_ITEM_SHOW_LESS:"Zobraziť menej",NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE:"Viac",NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE:"Zavrieť",NOTIFICATION_LIST_ITEM_READ:"Prečítané",NOTIFICATION_LIST_ITEM_UNREAD:"Neprečítané",NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT:"Vysoká priorita",NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT:"Stredná priorita",NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT:"Nízka priorita",NOTIFICATION_LIST_GROUP_ITEM_TXT:"Skupina oznámení",NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT:"Čítač",NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE:"Zavrieť všetko",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE:"Zbaliť skupinu",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE:"Rozbaliť skupinu",TIMELINE_ARIA_LABEL:"Časová os",UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT:"Zrušiť",UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT:"Premenovať",UPLOADCOLLECTIONITEM_ERROR_STATE:"Ukončené",UPLOADCOLLECTIONITEM_READY_STATE:"Nevybavené",UPLOADCOLLECTIONITEM_UPLOADING_STATE:"Prebieha upload",UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT:"Ukončiť",UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT:"Opakovať",UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT:"Upraviť",UPLOADCOLLECTION_NO_DATA_TEXT:"Nenašli sa žiadne súbory.",UPLOADCOLLECTION_NO_DATA_DESCRIPTION:'Presuňte súbory na ich odovzdanie alebo použite tlačidlo "Odovzdať".',UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION:"Odovzdať kolekciu",UPLOADCOLLECTION_DRAG_FILE_INDICATOR:"Presunúť súbory sem.",UPLOADCOLLECTION_DROP_FILE_INDICATOR:"Presuňte súbory na ich odovzdanie.",SHELLBAR_LABEL:"Lišta shellu",SHELLBAR_LOGO:"Logo",SHELLBAR_COPILOT:"CoPilot",SHELLBAR_NOTIFICATIONS:"{0} oznámenia",SHELLBAR_PROFILE:"Profil",SHELLBAR_PRODUCTS:"Produkty",PRODUCT_SWITCH_CONTAINER_LABEL:"Produkty",SHELLBAR_SEARCH:"Hľadať",SHELLBAR_OVERFLOW:"Viac",SHELLBAR_CANCEL:"Zrušiť",WIZARD_NAV_ARIA_LABEL:"Indikátor priebehu sprievodcu",WIZARD_LIST_ARIA_LABEL:"Kroky sprievodcu",WIZARD_LIST_ARIA_DESCRIBEDBY:"Ak chcete aktivovať, stlačte medzerník alebo ENTER",WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL:"Kroky",WIZARD_OPTIONAL_STEP_ARIA_LABEL:"Voliteľné",WIZARD_STEP_ACTIVE:"Aktívne",WIZARD_STEP_INACTIVE:"Neaktívne",WIZARD_STEP_ARIA_LABEL:"Krok {0}",WIZARD_NAV_ARIA_ROLE_DESCRIPTION:"Asistent",WIZARD_NAV_STEP_DEFAULT_HEADING:"Krok",VSD_DIALOG_TITLE_SORT:"Nastavenie zobrazenia",VSD_SUBMIT_BUTTON:"OK",VSD_CANCEL_BUTTON:"Zrušiť",VSD_RESET_BUTTON:"Resetovať",VSD_SORT_ORDER:"Poradie triedenia",VSD_FILTER_BY:"Filtrovať podľa",VSD_SORT_BY:"Triediť podľa",VSD_ORDER_ASCENDING:"Vzostupne",VSD_ORDER_DESCENDING:"Zostupne",IM_TITLE_BEFORESEARCH:"Pozrime si výsledky.",IM_SUBTITLE_BEFORESEARCH:"Začnite zadaním svojich kritérií hľadania.",IM_TITLE_NOACTIVITIES:"Ešte ste nepridali žiadne aktivity",IM_SUBTITLE_NOACTIVITIES:"Chcete nejakú pridať teraz?",IM_TITLE_NODATA:"Ešte tu nie sú žiadne údaje.",IM_SUBTITLE_NODATA:"Keď budú, uvidíte ich tu.",IM_TITLE_NOMAIL:"Žiadny nový e-mail",IM_SUBTITLE_NOMAIL:"Skontrolujte opäť neskôr.",IM_TITLE_NOENTRIES:"Ešte tu nie sú žiadne záznamy.",IM_SUBTITLE_NOENTRIES:"Keď budú, uvidíte ich tu.",IM_TITLE_NONOTIFICATIONS:"Nemáte žiadne nové oznámenia",IM_SUBTITLE_NONOTIFICATIONS:"Skontrolujte opäť neskôr.",IM_TITLE_NOSAVEDITEMS:"Ešte ste nepridali žiadne obľúbené položky.",IM_SUBTITLE_NOSAVEDITEMS:"Chcete teraz vytvoriť zoznam svojich obľúbených položiek?",IM_TITLE_NOSEARCHRESULTS:"Nenašli sa žiadne výsledky",IM_SUBTITLE_NOSEARCHRESULTS:"Skúste zmeniť kritériá hľadania.",IM_TITLE_NOTASKS:"Nemáte žiadne nové úlohy",IM_SUBTITLE_NOTASKS:"Keď budú, uvidíte ich tu.",IM_TITLE_UNABLETOLOAD:"Dáta nie je možné načítať.",IM_SUBTITLE_UNABLETOLOAD:"Skontrolujte pripojenie k internetu. Ak to nie je tým, skúste ich znovu načítať. Ak nepomôže ani to, kontaktujte svojho správcu.",IM_TITLE_UNABLETOLOADIMAGE:"Obrázok nie je možné načítať",IM_SUBTITLE_UNABLETOLOADIMAGE:"Obrázok sme nemohli nájsť na zadanom mieste alebo server nereaguje.",IM_TITLE_UNABLETOUPLOAD:"Nie je možné odovzdať dáta",IM_SUBTITLE_UNABLETOUPLOAD:"Skontrolujte pripojenie k internetu. Ak to nie je tým, skontrolujte formát a veľkosť súboru. Ak to nepomôže, kontaktujte svojho správcu.",IM_TITLE_ADDCOLUMN:"Je tu voľné miesto",IM_SUBTITLE_ADDCOLUMN:"V nastaveniach tabuľky môžete pridať ďalšie stĺpce.",IM_TITLE_ADDPEOPLE:"Ku kalendáru ste zatiaľ nepridali nikoho",IM_SUBTITLE_ADDPEOPLE:"Chcete niekoho pridať teraz?",IM_TITLE_BALLOONSKY:"Skvelá práca!",IM_SUBTITLE_BALLOONSKY:"Pokračujte v skvelej práci!",IM_TITLE_EMPTYPLANNINGCALENDAR:"Ešte nič naplánované",IM_SUBTITLE_EMPTYPLANNINGCALENDAR:"V tomto období nie sú žiadne aktivity.",IM_TITLE_FILTERTABLE:"Sú k dispozícii možnosti filtra",IM_SUBTITLE_FILTERTABLE:"Filtre vám pomáhajú zamerať sa na to, čo je pre vás najdôležitejšie.",IM_TITLE_GROUPTABLE:"Skúste položky zoskupiť pre lepší prehľad",IM_SUBTITLE_GROUPTABLE:"Kategórie zoskupenia môžete vybrať v nastaveniach zoskupenia.",IM_TITLE_NOFILTERRESULTS:"Nenašli sa žiadne výsledky",IM_SUBTITLE_NOFILTERRESULTS:"Skúste upraviť svoje kritériá filtra.",IM_TITLE_PAGENOTFOUND:"Ľutujeme, túto stránku nie je možné nájsť",IM_SUBTITLE_PAGENOTFOUND:"Skontrolujte URL, ktoré používate na vyvolanie aplikácie.",IM_TITLE_RESIZECOLUMN:"Zvoľte svoju vlastnú šírku stĺpca",IM_SUBTITLE_RESIZECOLUMN:"Veľkosti stĺpcov môžete meniť potiahnutím okrajov stĺpcov.",IM_TITLE_SORTCOLUMN:"Nevidíte najskôr najdôležitejšie položky?",IM_SUBTITLE_SORTCOLUMN:"Vyberte kritériá triedenia v nastaveniach triedenia.",IM_TITLE_SUCCESSSCREEN:"Hotovo!",IM_SUBTITLE_SUCCESSSCREEN:"Dokončili ste všetky svoje priradenia učenia",IM_TITLE_UPLOADCOLLECTION:"Umiestniť súbory sem",IM_SUBTITLE_UPLOADCOLLECTION:"Môžete tiež odovzdať viacero súborov odrazu.",DSC_SIDE_ARIA_LABEL:"Bočný obsah"};T.default=_});