sap.ui.define(["exports"],function(T){"use strict";var _={BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT:"Отменить",BARCODE_SCANNER_DIALOG_LOADING_TXT:"Загрузка",FCL_START_COLUMN_TXT:"Первый столбец",FCL_MIDDLE_COLUMN_TXT:"Средний столбец",FCL_END_COLUMN_TXT:"Последний столбец",FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP:"Развернуть первый столбец",FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Свернуть первый столбец",FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP:"Развернуть последний столбец",FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"Свернуть последний столбец",NOTIFICATION_LIST_ITEM_TXT:"Уведомление",NOTIFICATION_LIST_ITEM_SHOW_MORE:"Показать больше",NOTIFICATION_LIST_ITEM_SHOW_LESS:"Показать меньше",NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE:"Еще",NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE:"Закрыть",NOTIFICATION_LIST_ITEM_READ:"Прочитано",NOTIFICATION_LIST_ITEM_UNREAD:"Не прочитано",NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT:"Высокий приоритет",NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT:"Средний приоритет",NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT:"Низкий приоритет",NOTIFICATION_LIST_GROUP_ITEM_TXT:"Группа уведомлений",NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT:"Счетчик",NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE:"Закрыть все",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE:"Свернуть группу",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE:"Развернуть группу",TIMELINE_ARIA_LABEL:"Временная шкала",UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT:"Отменить",UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT:"Переименовать",UPLOADCOLLECTIONITEM_ERROR_STATE:"Прервано",UPLOADCOLLECTIONITEM_READY_STATE:"В ожидании",UPLOADCOLLECTIONITEM_UPLOADING_STATE:"Загрузка",UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT:"Прервать",UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT:"Повторить",UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT:"Редактировать",UPLOADCOLLECTION_NO_DATA_TEXT:"Файлы не найдены.",UPLOADCOLLECTION_NO_DATA_DESCRIPTION:'Перетащите сюда файлы для загрузки или нажмите "Загрузить".',UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION:"Загрузить коллекцию",UPLOADCOLLECTION_DRAG_FILE_INDICATOR:"Перетащите файлы сюда.",UPLOADCOLLECTION_DROP_FILE_INDICATOR:"Перетащите файлы для загрузки.",SHELLBAR_LABEL:"Панель оболочки",SHELLBAR_LOGO:"Логотип",SHELLBAR_COPILOT:"CoPilot",SHELLBAR_NOTIFICATIONS:"Уведомления: {0}",SHELLBAR_PROFILE:"Профиль",SHELLBAR_PRODUCTS:"Продукты",PRODUCT_SWITCH_CONTAINER_LABEL:"Продукты",SHELLBAR_SEARCH:"Поиск",SHELLBAR_OVERFLOW:"Больше",SHELLBAR_CANCEL:"Отменить",WIZARD_NAV_ARIA_LABEL:"Индикатор выполнения ассистента",WIZARD_LIST_ARIA_LABEL:"Шаги ассистента",WIZARD_LIST_ARIA_DESCRIBEDBY:"Для активации нажмите клавишу пробела или Enter",WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL:"Шаги",WIZARD_OPTIONAL_STEP_ARIA_LABEL:"Опционально",WIZARD_STEP_ACTIVE:"Активно",WIZARD_STEP_INACTIVE:"Неактивно",WIZARD_STEP_ARIA_LABEL:"Шаг {0}",WIZARD_NAV_ARIA_ROLE_DESCRIPTION:"Ассистент",WIZARD_NAV_STEP_DEFAULT_HEADING:"Шаг",VSD_DIALOG_TITLE_SORT:"Настройки ракурса",VSD_SUBMIT_BUTTON:"ОК",VSD_CANCEL_BUTTON:"Отменить",VSD_RESET_BUTTON:"Сбросить",VSD_SORT_ORDER:"Порядок сортировки",VSD_FILTER_BY:"Фильтровать по",VSD_SORT_BY:"Сортировать по",VSD_ORDER_ASCENDING:"По восходящей",VSD_ORDER_DESCENDING:"По нисходящей",IM_TITLE_BEFORESEARCH:"Получить результаты",IM_SUBTITLE_BEFORESEARCH:"Сначала укажите критерии поиска.",IM_TITLE_NOACTIVITIES:"Операции еще не добавлены",IM_SUBTITLE_NOACTIVITIES:"Добавить сейчас?",IM_TITLE_NODATA:"Пока нет данных",IM_SUBTITLE_NODATA:"Когда появятся, вы увидите их здесь.",IM_TITLE_NOMAIL:"Нет новых сообщений",IM_SUBTITLE_NOMAIL:"Проверьте позже.",IM_TITLE_NOENTRIES:"Пока нет записей",IM_SUBTITLE_NOENTRIES:"Когда появятся, вы увидите их здесь.",IM_TITLE_NONOTIFICATIONS:"Для вас нет новых уведомлений",IM_SUBTITLE_NONOTIFICATIONS:"Проверьте позже.",IM_TITLE_NOSAVEDITEMS:"Избранное еще не добавлено.",IM_SUBTITLE_NOSAVEDITEMS:"Хотите создать список избранного сейчас?",IM_TITLE_NOSEARCHRESULTS:"Нет результатов",IM_SUBTITLE_NOSEARCHRESULTS:"Попробуйте изменить критерии поиска.",IM_TITLE_NOTASKS:"Для вас нет новых задач",IM_SUBTITLE_NOTASKS:"Когда появятся, вы увидите их здесь.",IM_TITLE_UNABLETOLOAD:"Невозможно загрузить данные",IM_SUBTITLE_UNABLETOLOAD:"Проверьте Интернет-соединение. Если соединение в порядке, перезагрузите приложение. Если после перезагрузки проблема не исчезла, обратитесь к администратору.",IM_TITLE_UNABLETOLOADIMAGE:"Невозможно загрузить изображение",IM_SUBTITLE_UNABLETOLOADIMAGE:"Изображение на найдено в указанном месте, или сервер не отвечает.",IM_TITLE_UNABLETOUPLOAD:"Невозможно загрузить данные",IM_SUBTITLE_UNABLETOUPLOAD:"Проверьте Интернет-соединение. Если соединение в порядке, проверьте формат и размер файла. Или обратитесь к администратору.",IM_TITLE_ADDCOLUMN:"Кажется, здесь есть свободное пространство",IM_SUBTITLE_ADDCOLUMN:"Можно добавить больше столбцов в настройках таблицы.",IM_TITLE_ADDPEOPLE:"В календарь пока никто не добавлен",IM_SUBTITLE_ADDPEOPLE:"Добавить кого-нибудь сейчас?",IM_TITLE_BALLOONSKY:"Отлично!",IM_SUBTITLE_BALLOONSKY:"Хорошая работа!",IM_TITLE_EMPTYPLANNINGCALENDAR:"Пока ничего не запланировано",IM_SUBTITLE_EMPTYPLANNINGCALENDAR:"В этом временном интервале нет операций.",IM_TITLE_FILTERTABLE:"Доступны опции фильтра",IM_SUBTITLE_FILTERTABLE:"Фильтры помогают сосредоточиться на важном.",IM_TITLE_GROUPTABLE:"Для лучшего обзора попробуйте сгруппировать позиции",IM_SUBTITLE_GROUPTABLE:"Категории группировки можно выбрать в настройках группы.",IM_TITLE_NOFILTERRESULTS:"Нет результатов",IM_SUBTITLE_NOFILTERRESULTS:"Попробуйте изменить критерий фильтра.",IM_TITLE_PAGENOTFOUND:"К сожалению, невозможно найти эту страницу",IM_SUBTITLE_PAGENOTFOUND:"Проверьте URL, используемый для вызова приложения.",IM_TITLE_RESIZECOLUMN:"Выберите свою ширину столбца",IM_SUBTITLE_RESIZECOLUMN:"Изменить размер столбцов можно путем перетаскивания рамок столбцов.",IM_TITLE_SORTCOLUMN:"Наиболее важные позиции не отображаются первыми?",IM_SUBTITLE_SORTCOLUMN:"Выберите критерии сортировки в настройках сортировки.",IM_TITLE_SUCCESSSCREEN:"Готово!",IM_SUBTITLE_SUCCESSSCREEN:"Вы прошли все назначенные вам обучения.",IM_TITLE_UPLOADCOLLECTION:"Перетащите файлы сюда",IM_SUBTITLE_UPLOADCOLLECTION:"Можно загрузить сразу несколько файлов.",DSC_SIDE_ARIA_LABEL:"Дополнительное содержимое"};T.default=_});