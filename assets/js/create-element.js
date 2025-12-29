/**
 * Параметры для создания DOM-элемента
 *
 * @typedef {Object} CreateElementOptions
 *
 * @property {string} [tag='div']
 * HTML-тег элемента
 *
 * @property {string | string[]} [className]
 * CSS-класс или массив CSS-классов
 *
 * @property {string} [text]
 * Текстовое содержимое элемента (textContent)
 *
 * @property {string} [html]
 * HTML-содержимое элемента (innerHTML)
 *
 * @property {Object<string, string>} [attrs]
 * HTML-атрибуты (id, type, src, alt и т.д.)
 *
 * @property {Object<string, string>} [attrs.dataset]
 * data-* атрибуты
 *
 * @property {Object<string, Function>} [on]
 * Обработчики событий (click, input, change и т.д.)
 *
 * @property {(Node | string)[]} [children]
 * Дочерние DOM-узлы или строки
 */
/**
 * Создаёт DOM-элемент с заданными параметрами
 *
 * @param {CreateElementOptions} [options={}]
 * Объект конфигурации элемента
 *
 * @returns {HTMLElement}
 * Созданный DOM-элемент
 *
 * @example
 * const button = createElement({
 *   tag: 'button',
 *   className: ['btn', 'primary'],
 *   text: 'Click me',
 *   attrs: { type: 'button' },
 *   on: {
 *     click: () => alert('Hello')
 *   }
 * });
 */
export function createElement({
  tag = 'div',
  className,
  text,
  html,
  attrs = {},
  on = {},
  children = []
} = {}) {
  const element = document.createElement(tag);

  if (className) {
    if (Array.isArray(className)) {
      element.className = className.join(' ');
    } else {
      element.className = className;
    }
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  if (html !== undefined) {
    element.innerHTML = html;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (attrs.dataset) {
    Object.entries(attrs.dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }

  Object.entries(on).forEach(([event, handler]) => {
    element.addEventListener(event, handler);
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.append(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.append(child);
    }
  });

  return element;
};
