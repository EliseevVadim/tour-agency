"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_client_Contacts_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Contacts",
  data: function data() {
    return {
      contacts: []
    };
  },
  methods: {
    fetchContacts: function fetchContacts() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/api/contacts').then(function (response) {
        _this.contacts = response.data;
      })["catch"](function (error) {
        console.error('Ошибка при получении контактов:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
      });
    }
  },
  mounted: function mounted() {
    this.fetchContacts();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts"
  }, [_c("app-header"), _vm._v(" "), _c("div", {
    staticClass: "contacts-container"
  }, [_c("div", {
    staticClass: "gradient-wrapper"
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "contacts-wrapper"
  }, [_c("div", {
    staticClass: "contact-options"
  }, [_c("a", {
    staticClass: "contact-item text-decoration-none text-white telegram",
    attrs: {
      href: _vm.contacts.telegram,
      target: "_blank"
    }
  }, [_vm._m(1), _vm._v(" "), _c("span", [_vm._v("Telegram")])]), _vm._v(" "), _c("a", {
    staticClass: "contact-item text-decoration-none text-white whatsapp",
    attrs: {
      href: _vm.contacts.whatsapp,
      target: "_blank"
    }
  }, [_vm._m(2), _vm._v(" "), _c("span", [_vm._v("WhatsApp")])]), _vm._v(" "), _c("a", {
    staticClass: "contact-item text-decoration-none text-white max",
    attrs: {
      href: _vm.contacts.max,
      target: "_blank"
    }
  }, [_vm._m(3), _vm._v(" "), _c("span", [_vm._v("Max")])]), _vm._v(" "), _c("a", {
    staticClass: "contact-item text-decoration-none text-white vkontakte",
    attrs: {
      href: _vm.contacts.vk,
      target: "_blank"
    }
  }, [_vm._m(4), _vm._v(" "), _c("span", [_vm._v("Vkontakte")])]), _vm._v(" "), _c("a", {
    staticClass: "contact-item text-decoration-none text-white viber",
    attrs: {
      href: _vm.contacts.viber,
      target: "_blank"
    }
  }, [_vm._m(5), _vm._v(" "), _c("span", [_vm._v("Viber")])])]), _vm._v(" "), _vm._m(6)]), _vm._v(" "), _vm._m(7)]), _vm._v(" "), _c("app-footer")], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-header"
  }, [_c("h1", {
    staticClass: "text-center text-uppercase text-white fw-800"
  }, [_vm._v("Контакты")]), _vm._v(" "), _c("h3", {
    staticClass: "text-center text-white"
  }, [_vm._v("выберите удобный формат связи")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-wrapper-icon"
  }, [_c("img", {
    attrs: {
      src: "/img/icons/telegram.svg",
      alt: "Telegram"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-wrapper-icon"
  }, [_c("img", {
    attrs: {
      src: "/img/icons/whatsapp.png",
      alt: "Whatsapp"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-wrapper-icon"
  }, [_c("img", {
    attrs: {
      src: "/img/icons/max.png",
      alt: "Max"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-wrapper-icon"
  }, [_c("img", {
    attrs: {
      src: "/img/icons/vk.png",
      alt: "Vkontakte"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "contacts-wrapper-icon"
  }, [_c("img", {
    attrs: {
      src: "/img/icons/viber.png",
      alt: "Viber"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "call-to-action"
  }, [_c("p", [_vm._v("Вы хотели с нами связаться.")]), _vm._v(" "), _c("p", [_vm._v("Просто нажми на кнопку, мы готовы!")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "question-prompt-container"
  }, [_c("div", {
    staticClass: "background-image"
  }), _vm._v(" "), _c("div", {
    staticClass: "content-wrapper"
  }, [_c("div", {
    staticClass: "prompt-card"
  }, [_c("h4", {
    staticClass: "fw-800"
  }, [_vm._v("ОСТАЛИСЬ ВОПРОСЫ?")]), _vm._v(" "), _c("div", {
    staticClass: "d-flex justify-content-between text-area"
  }, [_c("div", {
    staticClass: "align-self-center d-flex icon-area"
  }, [_c("img", {
    staticClass: "phone-icon",
    attrs: {
      alt: "Call to action",
      src: "/img/call-to-action.png"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "align-self-center d-flex flex-column text-area__content"
  }, [_c("p", [_vm._v("Остались вопросы или нужна помощь?")]), _vm._v(" "), _c("p", {
    staticClass: "fw-bold"
  }, [_vm._v("Звони прямо сейчас, и мы с радостью поможем!")]), _vm._v(" "), _c("a", {
    staticClass: "phone-plate btn btn-cta py-2 align-content-center",
    attrs: {
      href: "tel:+74951299996"
    }
  }, [_vm._v("\n                                ПОЗВОНИТЬ\n                            ")])])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/client/Contacts.vue":
/*!******************************************!*\
  !*** ./resources/js/client/Contacts.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Contacts.vue?vue&type=template&id=c95522ae&scoped=true */ "./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true");
/* harmony import */ var _Contacts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contacts.vue?vue&type=script&lang=js */ "./resources/js/client/Contacts.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Contacts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "c95522ae",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/Contacts.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/Contacts.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./resources/js/client/Contacts.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contacts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Contacts.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contacts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true":
/*!************************************************************************************!*\
  !*** ./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Contacts_vue_vue_type_template_id_c95522ae_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Contacts.vue?vue&type=template&id=c95522ae&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/Contacts.vue?vue&type=template&id=c95522ae&scoped=true");


/***/ })

}]);