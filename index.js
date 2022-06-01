const
    version = '1.0.0',
    developer = 'Harrison Manxe',
    git = 'https://github.com/HarrisonManxe/Reflect';

/* HTML5 Tags */
const tagNames = [
    'a', 'abbr', 'acronym', 'adress', 'applet', 'area',
    'article', 'aside', 'audio', 'b', 'basefont', 'bdi',
    'bdo', 'bgsound', 'blockquote', 'big', 'body', 'blink',
    'button', 'canvas', 'caption', 'center', 'cite', 'code',
    'col', 'colgroup', 'command', 'comment', 'datalist',
    'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt',
    'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font',
    'form', 'footer', 'iframe', 'frameset', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'header', 'hgroup', 'html', 'i', 'iframe',
    'img', 'input', 'ins', 'isindex', 'kdb', 'keygen', 'label',
    'legend', 'li', 'link', 'main', 'map', 'marquee', 'mark',
    'menu', 'meter', 'nav', 'nobr', 'noembed', 'noframes',
    'object', 'ol', 'optgroup', 'option', 'output', 'p',
    'param', 'plaintext', 'pre', 'progress', 'q', 'rp',
    'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
    'small', 'span', 'sources', 'strike', 'strong', 'sub',
    'summary', 'sup', 'table', 'tbody', 'td', 'textarea',
    'tfoot', 'th', 'thead', 'time', 'tr', 'tt', 'u', 'ul',
    'var', 'video', 'wbr', 'xmp'
];

/**
 * @param {string} selector 
 * @returns 
 */
function isClassisSelector(selector) {
    if (!selector || typeof selector != 'string') {
        return console.error(`[@selector] -> Not found or invalid value.`)
    }

    const selectorId = selector.split("")[0];
    const testSelector = selector.split("");

    if (selector == '.' || selector == '#' ) {
        return true;
    } else if (
        testSelector.includes('>') ||
        testSelector.includes('+') ||
        testSelector.includes('~') ||
        testSelector.includes(',')
    ) {
        return true;
    } else if (tagNames.includes(String(selector).toLowerCase())) {
        return true;
    } else if (selectorId == ':') {
        return false;
    }
}

/**
 * @param {string} selector 
 * @returns 
 */
function getNotClassicSelector(selector) {
    if (!selector || typeof selector != 'string') {
        return console.error(`[@selector] -> Not found or invalid value.`)
    }

    const selectorPrefix = selector.split("")[0];
    let _selector = selector.split("");
    
    if (selectorPrefix === ':') {
        _selector.splice(_selector.indexOf(":"), 1);
        let childIndex = _selector[_selector.length - 1];
        _selector.splice(_selector.length - 1, 1);
        _selector = _selector.join("");
        let _parentName = _selector;
        let _parentChildrens = document.querySelector(_parentName).children;

        if (!_parentChildrens[childIndex]) {
            return console.error(`Children not found!`)
        } else {
            let _childrenSelector = ``;
            if (_parentChildrens[childIndex].id && _parentChildrens[childIndex].id !== '') {
                _childrenSelector = `#${_parentChildrens[childIndex].id}`;
            } else if (_parentChildrens[childIndex].classList.length > 0) {
                _parentChildrens[childIndex].classList.forEach(item => {
                    _childrenSelector += `.${item} `
                });
                _childrenSelector.splice(_childrenSelector.length - 1, 1);
            }
            return document.querySelector(`${_parentName} > ${_childrenSelector}`);
        }
    } else {
        return console.error(`[@selectorPrefix] -> Not exist!`);
    }
}

/**
 * Reflect (web library)
 * 
 * made by HarrisonManxe
 * 
 * (c) 2022
 * 
 * @param {string} selector
 * 
 * ```js 
 * const root = Reflect('#root');
 * ```
 */
const Reflect = (selector) => {
    if (!selector || typeof selector !== 'string') {
        throw new ReferenceError('HTMLelement is missing or has invalid type.')
    } else {
        if (isClassisSelector(selector)) {
            if (!tagNames.includes(selector)) {
                throw new Error('HTML5 not supported this tag!');
            } else if (['head', 'meta', 'link', 'script', 'style'].includes(selector)) {
                throw new Error(`[WHAT?] -> Are you serious? Library can't interact with this HTMLElement!`);
            } else if (['head', 'meta', 'link', 'script', 'style'].includes(document.querySelector(selector).localName)) {
                throw new Error(`[WHAT?] -> Are you serious? Library can't interact with this HTMLElement!`);
            }

            this.rootElement = document.querySelector(selector);
        } else {
            this.rootElement = getNotClassicSelector(selector);
        }
    }

    /* Lib info */
    this.version = version;
    this.developer = developer
    this.git = git;

    /* Root can have childs. They creating by render(). */
    this.childs = [];

    this.getClasses = () => {
        let _classes = [];

        if (this.rootElement.classList.lenght > 0) {
            this.root.classList.forEach((item, index) => {
                _classes.push(item);
            });

            return _classes;
        } else {
            return this;
        }
    }

    this.getId = () => {
        if (this.rootElement.id.lenght > 0) {
            return this.rootElement.id;
        } else {
            return this;
        }
    }

    /**
     * @param {string} id HTMLElement ID
     */
    this.addId = (id) => {
        let ids = this.rootElement.id.split(" ");

        if (!ids.includes(id)) {
            this.rootElement.id += ` ${id}`;
        } else {
            return this;
        }

        return this;
    }

    /**
     * @param {string} classNames Any class. Do not write only numbers in name, its throw error!
     */
    this.addClass = (classNames) => {
        if (!classNames || typeof classNames != 'string' || typeof classNames != 'string') {
            console.log(`[@classNames] -> Nor found or invalid value.`);
            return this;
        }

        if (!Array.isArray(classNames)) {
            this.rootElement.classList.push(classNames);
        } else {
            classNames.forEach(item => this.rootElement.push(item));
        }

        return this;
    }

    /**
     * @param {string} classNames Any exist class
     */
    this.removeClass = (classNames) => {
        if (!Array.isArray(classNames)) {
            let index = this.rootElement.classList.indexOf(classNames);
            this.rootElement.classList.splice(index, 1);
        } else {
            classNames.forEach(item => {
                let _index = this.rootElement.classList.indexOf(item);
                this.rootElement.classList.splice(_index, 1);
            });
        }

        return this;
    }

    /**
     * @param {string} className any class
     */
    this.inspectClass = (className) => {
        if (!this.rootElement.classList.includes(className)) {
            this.rootElement.classList.push(className);
        } else {
            let index = this.rootElement.classList.indexOf(className);
            this.rootElement.classList.splice(index, 1);
        }

        return this;
    }

    /**
     * @param {object} cssStyles Any css styles
     */
    this.addStyles = (cssStyles) => {
        if (typeof cssStyles === 'object' && !Array.isArray(cssStyles)) {
            const _keys = Object.keys(cssStyles);

            _keys.forEach(item => {
                try {
                    this.rootElement.style[item] = cssStyles[item];
                } catch (error) {
                    console.error(error);
                }
            });

            return this;
        } else {
            console.error(`[@cssStyles] -> Not found or invalid value.`);
            return this;
        }
    }

    /**
     * @param {object} propertyNames 
     */
    this.removeStyles = (propertyNames) => {
        if (typeof propertyNames === 'object' && Array.isArray(propertyNames)) {

            propertyNames.forEach(item => {
                try {
                    delete this.rootElement.style[item]
                } catch (error) {
                    console.error(error);
                }
            });

            return this;
        } else {
            console.error(`[@propertyNames] -> Not found or invalid value.`);
        }
    }

    /**
     * Render any block to rootElement
     * @param {string} tagName
     * @param {object} props
     */
    this.render = (tagName, props) => {
        if (!tagName || typeof tagName != 'string') {
            return console.error(`tagName is missing or invalid`)
        } else {
            let outputHTML = ``;
            let _opened = `${tagName}`;
            let lastChildIndex = this.childs.length > 0 ? this.childs.length - 1 : 0;

            if (props && typeof props == 'object' && !Array.isArray(props)) {
                if (props.classes) {
                    _opened += ` class="`
                    props.classes.forEach((item, index) => {
                        _opened += `${item} `;
                    });

                    _opened = _opened.split("");
                    _opened[_opened.length - 1] = "\"";
                    _opened = _opened.join("");
                }

                if (props.styles) {
                    _opened += ` style="`

                    const _keys = Object.keys(props.styles);
                    const _values = Object.values(props.styles);

                    _keys.forEach((item, index) => {
                        _opened += `${item}: ${_values[index]}; `;
                    });

                    _opened = _opened.split("");
                    _opened[_opened.length - 1] = "\"";
                    _opened = _opened.join("");
                }
            }

            outputHTML = `<${_opened} id="x-created-by-reflect-${lastChildIndex}"></${tagName}>`
            try {
                this.rootElement.innerHTML += outputHTML;
                this.childs.push(`x-created-by-reflect-${lastChildIndex}`);
            } catch (error) {
                console.error(error);
            }

            return this;
        }
    }

    this.setText = (text, inTag, tagName) => {
        if (!tagName) {
            let _output;
            
            if (inTag) {
                _output = `<${inTag}>${text}</${inTag}>`
            } else {
                _output = text;
            }

            this.rootElement.innerHTML += _output;
        } else {
            if (typeof tagName != 'string') {
                console.error('tagName not a string');
            } else {
                document.querySelector(tagName).innerHTML += String(text);
            }
        }

        return this;
    }

    this.refresh = () => {
        window.location.reload();

        return this;
    }

    this.on = (event, callback) => {
        if (!event || typeof event != 'string' ) {
            console.log(`[@event] -> Not found or invalid value.`);
            return this;
        }

        if (!callback || typeof callback != 'function') {
            console.error(`[@callback] -> Not found or invalid value.`);
            return this;
        }

        this.rootElement.addEventListener(event, callback);

        return this;
    }

    this.child = (index) => {
        if (!index || typeof index != 'number' || typeof index != 'string') {
            console.error(`[@index] -> Not Found or invalid.`);
            return this;
        }

        return Reflect(`#x-created-by-reflect-${index}`);
    }

    this.removeChild = (index) => {
        document.querySelector(`#x-created-by-reflect-${index}`).remove();

        this.childs.splice(index, 1);
        return this;
    }

    this.getHTML = () => {
        return this.rootElement.innerHTML;
    }

    this.getText = () => {
        return this.rootElement.innerText;
    }

    return this;
}

/* Import to file */
((Reflect) => {
    if (!window || !document || typeof exports == 'object') {
        throw new Error(`Can't import Reflect to non-ES6 module.`)
    } else {
        Reflect.prototype.isClassisSelector = isClassisSelector;
        Reflect.prototype.getNotClassicSelector = getNotClassicSelector;
        window.Reflect = Reflect;
    }
});

console.log(`[INTRO] THANKS FOR USING REFLECT [@${version}]!\n\n[DOCS] - ${git}`);