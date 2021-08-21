

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi),type (min, max)"
// e.x. data-da="item,767,last,max"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle
var DynamicAdapt = /*#__PURE__*/ (function () {
  // массив объектов
  function DynamicAdapt(type) {
    _classCallCheck(this, DynamicAdapt);

    _defineProperty(this, "elementsArray", []);

    _defineProperty(this, "daClassname", "_dynamic_adapt_");

    this.type = type;
  }

  _createClass(DynamicAdapt, [
    {
      key: "init",
      value: function init() {
        var _this = this;

        // массив DOM-элементов
        this.elements = _toConsumableArray(
          document.querySelectorAll("[data-da]")
        ); // наполнение elementsArray объктами

        this.elements.forEach(function (element) {
          var data = element.dataset.da.trim();

          if (data !== "") {
            var dataArray = data.split(",");
            var oElement = {};
            oElement.element = element;
            oElement.parent = element.parentNode;
            oElement.destination = document.querySelector(
              ".".concat(dataArray[0].trim())
            );
            oElement.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            oElement.place = dataArray[2] ? dataArray[2].trim() : "last";
            oElement.index = _this.indexInParent(
              oElement.parent,
              oElement.element
            );

            _this.elementsArray.push(oElement);
          }
        });
        this.arraySort(this.elementsArray); // массив уникальных медиа-запросов

        this.mediaArray = this.elementsArray
          .map(function (_ref) {
            var breakpoint = _ref.breakpoint;
            return "("
              .concat(_this.type, "-width: ")
              .concat(breakpoint, "px),")
              .concat(breakpoint);
          })
          .filter(function (item, index, self) {
            return self.indexOf(item) === index;
          }); // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске

        this.mediaArray.forEach(function (media) {
          var mediaSplit = media.split(",");
          var mediaQuerie = window.matchMedia(mediaSplit[0]);
          var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

          var elementsFilter = _this.elementsArray.filter(function (_ref2) {
            var breakpoint = _ref2.breakpoint;
            return breakpoint === mediaBreakpoint;
          });

          mediaQuerie.addEventListener("change", function () {
            _this.mediaHandler(mediaQuerie, elementsFilter);
          });

          _this.mediaHandler(mediaQuerie, elementsFilter);
        });
      } // Основная функция
    },
    {
      key: "mediaHandler",
      value: function mediaHandler(mediaQuerie, elementsFilter) {
        var _this2 = this;

        if (mediaQuerie.matches) {
          elementsFilter.forEach(function (oElement) {
            // получение индекса внутри родителя
            oElement.index = _this2.indexInParent(
              oElement.parent,
              oElement.element
            );

            _this2.moveTo(
              oElement.place,
              oElement.element,
              oElement.destination
            );
          });
        } else {
          elementsFilter.forEach(function (_ref3) {
            var parent = _ref3.parent,
              element = _ref3.element,
              index = _ref3.index;

            if (element.classList.contains(_this2.daClassname)) {
              _this2.moveBack(parent, element, index);
            }
          });
        }
      } // Функция перемещения
    },
    {
      key: "moveTo",
      value: function moveTo(place, element, destination) {
        element.classList.add(this.daClassname);

        if (place === "last" || place >= destination.children.length) {
          destination.append(element);
          return;
        }

        if (place === "first") {
          destination.prepend(element);
          return;
        }

        destination.children[place].before(element);
      } // Функция возврата
    },
    {
      key: "moveBack",
      value: function moveBack(parent, element, index) {
        element.classList.remove(this.daClassname);

        if (parent.children[index] !== undefined) {
          parent.children[index].before(element);
        } else {
          parent.append(element);
        }
      } // Функция получения индекса внутри родителя
    },
    {
      key: "indexInParent",
      value: function indexInParent(parent, element) {
        return _toConsumableArray(parent.children).indexOf(element);
      } // Функция сортировки массива по breakpoint и place
      // по возрастанию для this.type = min
      // по убыванию для this.type = max
    },
    {
      key: "arraySort",
      value: function arraySort(arr) {
        if (this.type === "min") {
          arr.sort(function (a, b) {
            if (a.breakpoint === b.breakpoint) {
              if (a.place === b.place) {
                return 0;
              }

              if (a.place === "first" || b.place === "last") {
                return -1;
              }

              if (a.place === "last" || b.place === "first") {
                return 1;
              }

              return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
          });
        } else {
          arr.sort(function (a, b) {
            if (a.breakpoint === b.breakpoint) {
              if (a.place === b.place) {
                return 0;
              }

              if (a.place === "first" || b.place === "last") {
                return 1;
              }

              if (a.place === "last" || b.place === "first") {
                return -1;
              }

              return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
          });
          return;
        }
      }
    }
  ]);

  return DynamicAdapt;
})();

var da = new DynamicAdapt("max");
da.init();
