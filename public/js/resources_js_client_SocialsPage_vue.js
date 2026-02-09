"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_client_SocialsPage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
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
      socials: [{
        title: 'Youtube',
        link: 'https://www.youtube.com/@put_club',
        color: '#fe0000'
      }, {
        title: 'Vkontakte',
        link: 'https://vk.com/put_club',
        color: '#0077ff'
      }, {
        title: 'Telegram',
        link: 'https://t.me/put_club',
        color: '#35ade1'
      }, {
        title: 'Instagram',
        link: 'https://instagram.com/put_club',
        color: '#fc145c'
      }, {
        title: 'Dzen',
        link: 'https://dzen.ru/put_club',
        color: '#373737'
      }, {
        title: 'Rutube',
        link: 'https://rutube.ru/channel/37334628/',
        color: '#e31425'
      }, {
        title: 'Одноклассники',
        link: 'https://ok.ru/group/70000033103318',
        color: '#ff7800'
      }, {
        title: 'TikTok',
        link: 'https://www.tiktok.com/@put_club',
        color: '#00f1ea'
      }, {
        title: 'Yappi',
        link: 'https://yappy.media/n/put_club',
        color: '#32ffa1'
      }, {
        title: 'Max',
        link: 'https://t.me/put_club',
        color: '#35ade1'
      }]
    };
  },
  methods: {
    fetchSocials: function fetchSocials() {
      /* axios.get('/api/contacts')
           .then(response => {
               this.contacts = response.data;
           })
           .catch(error => {
               console.error('Ошибка при получении контактов:', error);
               if (error.response) {
                   console.error('Error response data:', error.response.data);
               }
           });*/
    }
  },
  mounted: function mounted() {
    this.fetchSocials();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "social-page-container"
  }, [_c("app-header", {
    staticClass: "hero-section_dark"
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("section", {
    staticClass: "social-section container position-relative"
  }, [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "g-3 g-lg-5 row row-cols-2"
  }, _vm._l(_vm.socials, function (item, idx) {
    return _c("div", {}, [_c("a", {
      staticClass: "social-card h-100",
      attrs: {
        href: item.link
      }
    }, [_c("img", {
      staticClass: "social-image w-100",
      attrs: {
        alt: "",
        src: "/img/socials/" + (idx + 1) + ".jpg"
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "social-link-button",
      style: "background-color:" + item.color
    }, [_vm._v("\n                        " + _vm._s(item.title) + "\n                        "), _c("span", {
      staticStyle: {
        "font-size": "1.5em"
      }
    }, [_vm._v("⟶")])])])]);
  }), 0)]), _vm._v(" "), _c("app-footer")], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("header", {
    staticClass: "container social-header text-center"
  }, [_c("h1", {
    staticClass: "fw-800 text-white"
  }, [_vm._v("ТУРИСТИЧЕСКАЯ "), _c("br"), _vm._v(' КОМПАНИЯ "В ПУТЬ"')]), _vm._v(" "), _c("p", {
    staticClass: "fw-medium text-white page-subtitle"
  }, [_vm._v("нажми на соцсеть в которой "), _c("br"), _vm._v(" хочешь следить за нами")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "social-icons-bg position-absolute"
  }, [_c("img", {
    staticClass: "social-icon tg-icon",
    attrs: {
      src: "/img/socials/tg-icon.png",
      alt: "icon telegram"
    }
  }), _vm._v(" "), _c("img", {
    staticClass: "social-icon youtube-icon",
    attrs: {
      src: "/img/socials/youtube-icon.png",
      alt: "icon youtube"
    }
  }), _vm._v(" "), _c("img", {
    staticClass: "social-icon insta-icon",
    attrs: {
      src: "/img/socials/instagram-icon.png",
      alt: "icon instagram"
    }
  }), _vm._v(" "), _c("img", {
    staticClass: "social-icon tiktok-icon",
    attrs: {
      src: "/img/socials/tiktok-icon.png",
      alt: "icon tiktok"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "person-wrapper position-relative"
  }, [_c("div", {
    staticClass: "w-100 position-absolute layer-controls"
  }, [_c("img", {
    staticClass: "square-bg-left",
    attrs: {
      src: "/img/socials/square-bg.png",
      alt: "square"
    }
  }), _vm._v(" "), _c("img", {
    staticClass: "polygon-bg-right",
    attrs: {
      src: "/img/socials/shape-bg.png",
      alt: "polygon"
    }
  })]), _vm._v(" "), _c("img", {
    staticClass: "person-image",
    attrs: {
      src: "/img/socials/social-persons.png",
      alt: "social persons"
    }
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/client/SocialsPage.vue":
/*!*********************************************!*\
  !*** ./resources/js/client/SocialsPage.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SocialsPage.vue?vue&type=template&id=bbc08722 */ "./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722");
/* harmony import */ var _SocialsPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SocialsPage.vue?vue&type=script&lang=js */ "./resources/js/client/SocialsPage.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SocialsPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__.render,
  _SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/SocialsPage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/SocialsPage.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/client/SocialsPage.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialsPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SocialsPage.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialsPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722":
/*!***************************************************************************!*\
  !*** ./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialsPage_vue_vue_type_template_id_bbc08722__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SocialsPage.vue?vue&type=template&id=bbc08722 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/SocialsPage.vue?vue&type=template&id=bbc08722");


/***/ })

}]);