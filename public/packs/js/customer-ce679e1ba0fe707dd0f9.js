/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/customer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/customer.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/customer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).on('turbolinks:load', function () {
  $(".internet-type").hide();
  var url = window.location.pathname.split('/');
  var urlParam = url[url.length - 1];

  if (urlParam == 'new') {
    $(".profile_fields").addClass('d-none');
    $(".area_fields").addClass('d-none');
    $(".device_fields").addClass('d-none');
  }

  $('#customer_service_id').on('change', function () {
    var service = $("#customer_service_id option:selected").text();

    if (service === 'internet') {
      profileFields('remove', service);
      area_fields('remove', service);
      device_fields('remove', service);
    } else if (service === 'cable') {
      profileFields('remove', service);
      area_fields('remove', service);
    }
  });

  function profileFields() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var service = arguments.length > 1 ? arguments[1] : undefined;
    val === 'remove' ? $(".profile_fields").removeClass('d-none') : $(".profile_fields").addClass('d-none');
  }

  ;

  function area_fields() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var service = arguments.length > 1 ? arguments[1] : undefined;
    val === 'remove' ? $(".area_fields").removeClass('d-none') : $(".area_fields").addClass('d-none');
  }

  function device_fields() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var service = arguments.length > 1 ? arguments[1] : undefined;
    val === 'remove' ? $(".device_fields").removeClass('d-none') : $(".device_fields").addClass('d-none');
  }

  $(document).on("change", "#area-select", function () {
    var area_id = $(this).val();
    console.log(area_id);
    $.ajax({
      url: "/app/subareas/get_sub_areas?area_id=".concat(area_id),
      type: "get",
      success: function success(result) {
        console.log(result);

        if (result.data.length == 0) {
          $("#subarea-select").empty();
          var options = $("#subarea-select").get(0).options;
          options[options.length] = new Option("No Page Found");
        } else {
          $("#subarea-select").empty();
          var options = $("#subarea-select").get(0).options;
          options[options.length] = new Option("Select Sub Area", "");
          $.each(result.data, function (key, value) {
            options[options.length] = new Option(value.name, value.id);
          });
        }
      },
      error: function error(data) {}
    });
  });
  $("#customer_service_id").on('change', function () {
    var service = $("#customer_service_id option:selected").text();
    console.log(service);

    if (service === 'internet') {
      $(".internet-type").show();
    } else {
      $(".internet-type").hide();
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=customer-ce679e1ba0fe707dd0f9.js.map