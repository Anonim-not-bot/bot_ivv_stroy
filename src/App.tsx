import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mt-4">
          {typeof content === 'string' ? (
            <p className="text-gray-600 whitespace-pre-line">{content}</p>
          ) : (
            content
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

interface TroubleshootingFlowProps {
  flowType: 'noResponse' | 'noRequests' | 'incompleteRequests' | 'duplicateRequests';
}

const TroubleshootingFlow: React.FC<TroubleshootingFlowProps> = ({ flowType }) => {
  const [step, setStep] = useState('start');

  const flows = {
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

  const currentFlow = flows[flowType];
  const currentStep = currentFlow[step];

  return (
    <div className="space-y-6">
      {step !== 'start' && (
        <button
          onClick={() => setStep('start')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Вернуться к началу
        </button>
      )}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg mb-4">{currentStep.content}</p>
        <div className="space-y-2">
          {currentStep.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setStep(option.nextStep)}
              className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Section {
  title: string;
  subsections: {
    title: string;
    content: string | React.ReactNode;
  }[];
}

function App() {
  const [selectedDialog, setSelectedDialog] = useState<{
    title: string;
    content: string | React.ReactNode;
  } | null>(null);

  const sections: Section[] = [
    {
      title: 'Регламентные работы',
      subsections: [
        {
          title: 'Проверка работы сервера',
          content: 'Информация о проверке работы сервера будет добавлена здесь.'
        },
        {
          title: 'Проверка состояния сервера',
          content: 'Информация о проверке состояния сервера будет добавлена здесь.'
        },
        {
          title: 'Мониторинг заявок, пришедших с сайта',
          content: 'Информация о мониторинге заявок будет добавлена здесь.'
        }
      ]
    },
    {
      title: 'Устранение неисправностей',
      subsections: [
        {
          title: 'Бот не отвечает/не реагирует',
          content: <TroubleshootingFlow flowType="noResponse" />
        },
        {
          title: 'Заявки не приходят в бота',
          content: <TroubleshootingFlow flowType="noRequests" />
        },
        {
          title: 'Бот получает неполные заявки',
          content: <TroubleshootingFlow flowType="incompleteRequests" />
        },
        {
          title: 'Бот дублирует заявки',
          content: <TroubleshootingFlow flowType="duplicateRequests" />
        }
      ]
    },
    {
      title: 'Справочная информация',
      subsections: [
        {
          title: 'Требования к работе с кодом',
          content: 'Информация о требованиях к работе с кодом будет добавлена здесь.'
        },
        {
          title: 'Политика конфиденциальности',
          content: 'Информация о политике конфиденциальности будет добавлена здесь.'
        },
        {
          title: 'Контактные данные начальника и его заместителей',
          content: 'Контактная информация руководства будет добавлена здесь.'
        },
        {
          title: 'Правила работы с сервером',
          content: 'Информация о правилах работы с сервером будет добавлена здесь.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Техническая документация</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.subsections.map((subsection, subIndex) => (
                  <li key={subIndex}>
                    <button
                      onClick={() => setSelectedDialog(subsection)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full"
                    >
                      {subsection.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Dialog
        isOpen={!!selectedDialog}
        onClose={() => setSelectedDialog(null)}
        title={selectedDialog?.title || ''}
        content={selectedDialog?.content || ''}
      />
    </div>
  );
}

export default App;