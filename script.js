// Данные для диагностики
const troubleshootingFlows = {
    noResponse: {
        start: {
            content: 'Проверьте статус сервера',
            options: [
                { text: 'Сервер работает', nextStep: 'checkToken' },
                { text: 'Сервер не работает', nextStep: 'restartServer' }
            ]
        },
        restartServer: {
            content: 'Необходимо перезапустить сервер',
            options: [
                { text: 'Сервер успешно перезапущен', nextStep: 'checkToken' },
                { text: 'Проблема с перезапуском', nextStep: 'contactAdmin' }
            ]
        },
        checkToken: {
            content: 'Проверьте токен бота',
            options: [
                { text: 'Токен верный', nextStep: 'restartBot' },
                { text: 'Токен неверный', nextStep: 'updateToken' }
            ]
        },
        restartBot: {
            content: 'Перезапустите скрипт бота',
            options: [
                { text: 'Бот заработал', nextStep: 'success' },
                { text: 'Бот все еще не работает', nextStep: 'contactAdmin' }
            ]
        },
        updateToken: {
            content: 'Обновите токен бота',
            options: [
                { text: 'Токен обновлен', nextStep: 'restartBot' },
                { text: 'Не удается обновить токен', nextStep: 'contactAdmin' }
            ]
        },
        contactAdmin: {
            content: 'Обратитесь к системному администратору для решения проблемы',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        },
        success: {
            content: 'Проблема успешно решена! Бот работает корректно.',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        }
    },
    noRequests: {
        start: {
            content: 'Проверьте логи сайта на отправку данных',
            options: [
                { text: 'Данные отправляются', nextStep: 'checkWebhook' },
                { text: 'Данные не отправляются', nextStep: 'configureSite' }
            ]
        },
        configureSite: {
            content: 'Настройте отправку данных с сайта',
            options: [
                { text: 'Отправка настроена', nextStep: 'checkWebhook' },
                { text: 'Проблема с настройкой', nextStep: 'contactAdmin' }
            ]
        },
        checkWebhook: {
            content: 'Проверьте активность вебхука',
            options: [
                { text: 'Вебхук активен', nextStep: 'checkAPI' },
                { text: 'Вебхук неактивен', nextStep: 'updateWebhook' }
            ]
        },
        updateWebhook: {
            content: 'Обновите вебхук',
            options: [
                { text: 'Вебхук обновлен', nextStep: 'success' },
                { text: 'Не удается обновить вебхук', nextStep: 'contactAdmin' }
            ]
        },
        checkAPI: {
            content: 'Проверьте ключ API',
            options: [
                { text: 'API верный', nextStep: 'success' },
                { text: 'API неверный', nextStep: 'updateAPI' }
            ]
        },
        updateAPI: {
            content: 'Обновите ключ API',
            options: [
                { text: 'API обновлен', nextStep: 'success' },
                { text: 'Не удается обновить API', nextStep: 'contactAdmin' }
            ]
        },
        contactAdmin: {
            content: 'Обратитесь к системному администратору для решения проблемы',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        },
        success: {
            content: 'Проблема успешно решена! Заявки приходят корректно.',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        }
    },
    incompleteRequests: {
        start: {
            content: 'Проверьте логи входящего запроса (JSON)',
            options: [
                { text: 'Перейти к проверке структуры', nextStep: 'checkStructure' }
            ]
        },
        checkStructure: {
            content: 'Проверьте структуру данных',
            options: [
                { text: 'Структура верная', nextStep: 'checkParsing' },
                { text: 'Структура неверная', nextStep: 'configureFilter' }
            ]
        },
        configureFilter: {
            content: 'Настройте фильтрацию в боте',
            options: [
                { text: 'Фильтрация настроена', nextStep: 'success' },
                { text: 'Проблема с настройкой', nextStep: 'contactAdmin' }
            ]
        },
        checkParsing: {
            content: 'Проверьте парсинг данных в коде',
            options: [
                { text: 'Ошибка в коде найдена', nextStep: 'fixHandler' },
                { text: 'Ошибок нет', nextStep: 'success' }
            ]
        },
        fixHandler: {
            content: 'Исправьте ошибку в обработчике',
            options: [
                { text: 'Ошибка исправлена', nextStep: 'success' },
                { text: 'Нужна помощь', nextStep: 'contactAdmin' }
            ]
        },
        contactAdmin: {
            content: 'Обратитесь к системному администратору для решения проблемы',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        },
        success: {
            content: 'Проблема успешно решена! Заявки приходят полными.',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        }
    },
    duplicateRequests: {
        start: {
            content: 'Проверьте логи количества заявок с сайта',
            options: [
                { text: 'Перейти к проверке дубликатов', nextStep: 'checkDuplicates' }
            ]
        },
        checkDuplicates: {
            content: 'Проверьте, дублируются ли заявки со стороны сайта',
            options: [
                { text: 'Да, дублируются с сайта', nextStep: 'configureDelay' },
                { text: 'Нет, проблема в боте', nextStep: 'addUniquenessCheck' }
            ]
        },
        configureDelay: {
            content: 'Настройте задержку отправки на сайте',
            options: [
                { text: 'Задержка настроена', nextStep: 'success' },
                { text: 'Проблема с настройкой', nextStep: 'contactAdmin' }
            ]
        },
        addUniquenessCheck: {
            content: 'Добавьте проверку уникальности',
            options: [
                { text: 'Проверка добавлена', nextStep: 'checkForDuplicates' },
                { text: 'Нужна помощь', nextStep: 'contactAdmin' }
            ]
        },
        checkForDuplicates: {
            content: 'Проверьте наличие дубликатов',
            options: [
                { text: 'Дубликаты найдены', nextStep: 'removeDuplicates' },
                { text: 'Дубликатов нет', nextStep: 'success' }
            ]
        },
        removeDuplicates: {
            content: 'Удалите дубликаты',
            options: [
                { text: 'Дубликаты удалены', nextStep: 'success' },
                { text: 'Проблема с удалением', nextStep: 'contactAdmin' }
            ]
        },
        contactAdmin: {
            content: 'Обратитесь к системному администратору для решения проблемы',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        },
        success: {
            content: 'Проблема успешно решена! Дубликаты устранены.',
            options: [
                { text: 'Начать сначала', nextStep: 'start' }
            ]
        }
    }
};

let currentFlow = null;
let currentStep = null;

// Функция для открытия обычного диалогового окна
function openDialog(title, content) {
    const dialog = document.getElementById('dialog');
    const dialogTitle = document.getElementById('dialog-title');
    const dialogBody = document.getElementById('dialog-body');

    dialogTitle.textContent = title;
    dialogBody.textContent = content;
    dialog.classList.add('active');
}

// Функция для закрытия диалогового окна
function closeDialog() {
    const dialog = document.getElementById('dialog');
    dialog.classList.remove('active');
    currentFlow = null;
    currentStep = null;
}

// Функция для запуска процесса диагностики
function startTroubleshooting(flowType) {
    currentFlow = flowType;
    showTroubleshootingStep('start');
}

// Функция для отображения шага диагностики
function showTroubleshootingStep(step) {
    currentStep = step;
    const flow = troubleshootingFlows[currentFlow];
    const stepData = flow[step];

    const dialogBody = document.getElementById('dialog-body');
    const dialogTitle = document.getElementById('dialog-title');
    
    // Установка заголовка в зависимости от типа потока
    const titles = {
        noResponse: 'Бот не отвечает/не реагирует',
        noRequests: 'Заявки не приходят в бота',
        incompleteRequests: 'Бот получает неполные заявки',
        duplicateRequests: 'Бот дублирует заявки'
    };
    
    dialogTitle.textContent = titles[currentFlow];

    // Создание содержимого диалога
    let content = '';
    
    // Добавляем кнопку "Назад" если это не начальный шаг
    if (step !== 'start') {
        content += '<button onclick="startTroubleshooting(\'' + currentFlow + '\')" class="back-button">← Вернуться к началу</button>';
    }

    content += '<div class="troubleshooting-content">';
    content += '<p class="mb-4">' + stepData.content + '</p>';
    content += '<div class="troubleshooting-options">';
    
    stepData.options.forEach(option => {
        content += '<button onclick="showTroubleshootingStep(\'' + option.nextStep + '\')" class="troubleshooting-button">';
        content += option.text;
        content += '</button>';
    });
    
    content += '</div></div>';

    dialogBody.innerHTML = content;
    document.getElementById('dialog').classList.add('active');
}

// Закрытие диалога по клику вне его области
document.addEventListener('click', (e) => {
    const dialog = document.getElementById('dialog');
    if (e.target === dialog) {
        closeDialog();
    }
});

// Закрытие диалога по нажатию Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDialog();
    }
});