"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_client_modules_course_CoursePage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PreviewGallerySection",
  data: function data() {
    return {
      slides: [],
      loading: true,
      responsive: [{
        minWidth: 270,
        slidesPerPage: 1,
        center: true,
        peek: 0,
        gutter: 20,
        showDots: false
      }, {
        minWidth: 768,
        slidesPerPage: 2
      }, {
        minWidth: 1024,
        slidesPerPage: 3
      }, {
        minWidth: 1366,
        slidesPerPage: 3
      }]
    };
  },
  methods: {
    fetchPreviews: function fetchPreviews() {
      var _this = this;
      this.loading = true;
      axios.get('/api/modules-preview').then(function (response) {
        _this.slides = response.data;
      })["catch"](function (error) {
        console.error('Ошибка при получении превью:', error);
        _this.slides = [];
      })["finally"](function () {
        _this.loading = false;
      });
    },
    handleScrollAnimation: function handleScrollAnimation() {
      document.querySelectorAll('.preview-card').forEach(function (el, idx) {
        var rect = el.getBoundingClientRect();
        var isVisible = rect.top < window.innerHeight * (1 - 0.1) && rect.bottom > window.innerHeight * 0.1;
        if (!isVisible) return;
        if (el.classList.contains('animate__animated')) return;
        el.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
        if (idx === 1) el.classList.add('animate__delay-0-5s');
        if (idx === 2) el.classList.add('animate__delay-1s');
        if (idx === 3) el.classList.add('animate__delay-1-5s');
      });
    },
    handleCardClick: function handleCardClick(slideId) {
      this.$emit('open-pricing-package', 'opti');
    }
  },
  created: function created() {
    this.debouncedScroll = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.debounce)(this.handleScrollAnimation, 50);
  },
  mounted: function mounted() {
    this.fetchPreviews();
    window.addEventListener('scroll', this.debouncedScroll);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.debouncedScroll);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PreOrderModal",
  data: function data() {
    return {
      isDisabled: true,
      currentPackageId: null,
      currentPackageName: null,
      currentPackagePrice: null,
      originalPrice: 0,
      currentPackageBg: null,
      formData: {
        fullName: '',
        email: '',
        phone: '',
        agreesToPolitics: false
      },
      promoStatus: null,
      promoMessage: '',
      discountDetails: null,
      promoCodeId: null,
      promoCodeType: null,
      promoCodeValue: null,
      refId: null
    };
  },
  methods: {
    checkFormValidity: function checkFormValidity() {
      var _this$formData = this.formData,
        fullName = _this$formData.fullName,
        email = _this$formData.email,
        phone = _this$formData.phone;
      var checkPolicy = document.getElementById('checkPolicy');
      var isPhoneValid = phone && phone.replace(/\D/g, '').length >= 10;
      var isBaseValid = fullName.trim().length > 0 && email.includes('@') && isPhoneValid && checkPolicy.checked;
      this.isDisabled = !isBaseValid;
    },
    getBackgroundStyle: function getBackgroundStyle() {
      if (this.currentPackageBg) {
        return {
          background: this.currentPackageBg
        };
      }
      return {};
    },
    paymentClick: function paymentClick() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$formData2, fullName, email, phone, agreesToPolitics, isPromoAllowed, presentationData, response, paymentData, urlParams, refCode, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _this.checkFormValidity();
              if (!_this.isDisabled) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _this.isDisabled = true;
              _this$formData2 = _this.formData, fullName = _this$formData2.fullName, email = _this$formData2.email, phone = _this$formData2.phone, agreesToPolitics = _this$formData2.agreesToPolitics;
              isPromoAllowed = _this.promoStatus === 'allowed' && _this.discountDetails;
              if (!(_this.currentPackageId === 'maxi')) {
                _context.n = 7;
                break;
              }
              presentationData = {
                full_name: fullName,
                phone_number: phone,
                email: email,
                agrees_to_marketing: agreesToPolitics,
                "package": _this.currentPackageId
              };
              _context.p = 2;
              _context.n = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/api/request-presentation', presentationData);
            case 3:
              response = _context.v;
              if (response.data && response.data.success && response.data.redirect) {
                localStorage.setItem('notification', JSON.stringify(response.data.notification));
                window.location.href = response.data.redirect;
              } else {
                console.error('API Presentation Error:', response.data);
                alert('Ошибка при запросе презентации. Проверьте консоль.');
              }
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error('API Presentation Request Failed:', _t);
              alert('Произошла ошибка при запросе презентации.');
            case 5:
              _context.p = 5;
              _this.isDisabled = false;
              return _context.f(5);
            case 6:
              _context.n = 9;
              break;
            case 7:
              paymentData = {
                package_id: _this.currentPackageId,
                course_name: _this.currentPackageName,
                phone_number: phone,
                email: email,
                full_name: fullName,
                agrees_to_marketing: agreesToPolitics,
                amount: _this.currentPackagePrice,
                promo_code_id: _this.promoCodeId,
                discount_value: _this.promoCodeValue,
                discount_type: _this.promoCodeType,
                ref_id: _this.refId
              };
              _this.isLoading = false;
              urlParams = new URLSearchParams(window.location.search);
              refCode = urlParams.get('ref');
              if (!(refCode && !_this.isLoading)) {
                _context.n = 8;
                break;
              }
              _context.n = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/get-referral/".concat(_this.refId)).then(function (response) {
                if (response.status === 200 && response.data.success && response.data.referral) {
                  var referral = response.data.referral;
                  paymentData.ref_code = referral.ref_code;
                  paymentData.full_name_ref = referral.full_name;
                  paymentData.tg_username = referral.tg_username;
                }
              });
            case 8:
              if (paymentData.package_id === 'opti') {
                window.location.href = 'https://putclub.getcourse.ru/pay_opti';
              } else if (paymentData.package_id === 'mini') {
                window.location.href = 'https://putclub.getcourse.ru/pay_mini';
              }

              // МЕТОД ПО СОЗДАНИЮ ПЛАТЕЖКИ В ЮКАССЕ
              /*try {
                  const response = await axios.post('/payments/create', paymentData);
                    if (response.status === 200) {
                      window.location.href = response.data;
                  } else {
                      alert('Ошибка при создании платежа.');
                  }
              } catch (error) {
                  console.error('Payment API Error:', error);
                    if (error.response && error.response.status === 400) {
                      alert(error.response.data.message || 'Промокод стал невалидным или данные некорректны.');
                  } else {
                      alert('Произошла ошибка при запросе к серверу.');
                  }
              } finally {
                  this.isDisabled = false;
              }*/
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4, 5, 6]]);
      }))();
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    var orderModal = document.getElementById('orderModal');
    if (orderModal) {
      orderModal.addEventListener('show.bs.modal', function (event) {
        _this2.formData.fullName = '';
        _this2.formData.email = '';
        _this2.formData.phone = '';
        _this2.formData.agreesToPolitics = false;
        _this2.promoStatus = null;
        _this2.discountDetails = null;
        _this2.isDisabled = true;
        var button = event.relatedTarget;
        var id = button.getAttribute('data-bs-id');
        var name = button.getAttribute('data-bs-name');
        var priceStr = button.getAttribute('data-bs-price');
        var bgUrl = button.getAttribute('data-bs-bg');
        _this2.refId = button.getAttribute('data-bs-ref-url');
        _this2.promoStatus = button.getAttribute('data-bs-promo-status');
        _this2.promoMessage = button.getAttribute('data-bs-promo-message') || '';
        if (_this2.promoStatus === 'allowed') {
          _this2.promoCodeId = button.getAttribute('data-bs-promo-id');
          _this2.promoCodeType = button.getAttribute('data-bs-promo-type');
          _this2.promoCodeValue = button.getAttribute('data-bs-promo-value');
          _this2.discountDetails = {
            code: button.getAttribute('data-bs-promo-code'),
            type: button.getAttribute('data-bs-promo-type'),
            value: parseFloat(button.getAttribute('data-bs-promo-value'))
          };
        }
        _this2.currentPackageId = id;
        _this2.currentPackageName = name;
        _this2.currentPackagePrice = priceStr;
        _this2.originalPrice = parseFloat(button.getAttribute('data-bs-original-price')) || 0;
        _this2.currentPackageBg = bgUrl ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(\"".concat(bgUrl, "\") no-repeat center center / cover") : '';
        _this2.checkFormValidity();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modals/NotificationModal.vue */ "./resources/js/client/modals/NotificationModal.vue");
/* harmony import */ var _components_Fragments_PreviewGallerySection_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Fragments/PreviewGallerySection.vue */ "./resources/js/client/components/Fragments/PreviewGallerySection.vue");
/* harmony import */ var _components_PricingSelector_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PricingSelector.vue */ "./resources/js/client/modules/course/components/PricingSelector.vue");
/* harmony import */ var _components_CourseModulesSummary_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/CourseModulesSummary.vue */ "./resources/js/client/modules/course/components/CourseModulesSummary.vue");
/* harmony import */ var _components_CourseHero_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/CourseHero.vue */ "./resources/js/client/modules/course/components/CourseHero.vue");
/* harmony import */ var _components_TargetAudienceList_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/TargetAudienceList.vue */ "./resources/js/client/modules/course/components/TargetAudienceList.vue");
/* harmony import */ var _components_FaqOrContact_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/FaqOrContact.vue */ "./resources/js/client/modules/course/components/FaqOrContact.vue");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    FaqOrContact: _components_FaqOrContact_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    TargetAudienceSection: _components_TargetAudienceList_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    CourseHero: _components_CourseHero_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    CourseModulesSummary: _components_CourseModulesSummary_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    PricingSelector: _components_PricingSelector_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    PreviewGallerySection: _components_Fragments_PreviewGallerySection_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    NotificationModal: _modals_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      loading: true,
      notificationData: null,
      isNotificationVisible: false
    };
  },
  props: {
    initialSuccessData: {
      type: Object,
      "default": function _default() {
        return null;
      }
    },
    initialFailData: {
      type: Object,
      "default": function _default() {
        return null;
      }
    }
  },
  methods: {
    handleOpenPricing: function handleOpenPricing(packageId) {
      if (this.$refs.pricingSelector) {
        this.$refs.pricingSelector.togglePackageFromGallery(packageId);
      }
    },
    initializeNotifications: function initializeNotifications() {
      if (this.initialSuccessData && Object.keys(this.initialSuccessData).length > 0) {
        this.notificationData = this.initialSuccessData;
        this.isNotificationVisible = true;
      } else if (this.initialFailData && Object.keys(this.initialFailData).length > 0) {
        this.notificationData = this.initialFailData;
        this.isNotificationVisible = true;
      } else if (localStorage.getItem('notification')) {
        this.notificationData = JSON.parse(localStorage.getItem('notification'));
        this.isNotificationVisible = true;
        localStorage.removeItem('notification');
      }
      if (this.isNotificationVisible) {
        this.loading = false;
      }
    }
  },
  created: function created() {
    this.initializeNotifications();
  },
  mounted: function mounted() {
    var _this = this;
    if (!this.isNotificationVisible) {
      setTimeout(function () {
        _this.loading = false;
      }, 1000);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'CourseHero',
  setup: function setup(__props) {
    return {
      __sfc: true
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CourseModulesSummary",
  data: function data() {
    return {
      modules: [{
        num: 1,
        title: 'Понимание туристической индустрии',
        description: 'Ты погрузишься в историю туризма, изучишь важнейшие понятия и термины, а также ' + 'разберешь виды туров, классификацию номеров и питания. Этот модуль даст тебе прочную ' + 'основу для понимания всей структуры и механизма работы туристической отрасли.'
      }, {
        num: 2,
        title: 'Туристическое законодательство',
        description: 'Совместно с приглашённым экспертом, профессиональным туристическим юристом, ' + 'ты подробно разберешь все правовые основы работы в туризме. Мы изучим права и обязанности ' + 'турагента, правила договорных отношений, вопросы авторских прав и многие другие аспекты, ' + 'которые важны для легальной и эффективной работы в сфере.'
      }, {
        num: 3,
        title: 'Туристическая бухгалтерия',
        description: 'С помощью эксперта в области бухгалтерии ты освоишь все нюансы туристического ' + 'документооборота. Мы подробно поговорим о найме персонала, расчётах, налогах и рисках, ' + 'связанных с работой в индустрии туризма. Этот модуль поможет тебе уверенно разобраться ' + 'в финансовых аспектах бизнеса.'
      }, {
        num: 4,
        title: 'Развитие навыков продаж',
        description: 'Мы подробно разберем основы успешных продаж, клиентоориентированности и ' + 'методы увеличения комиссий. В этом модуле ты узнаешь, как действовать в экстренных ' + 'ситуациях, а также получишь советы от психолога, как управлять эмоциями клиентов и ' + 'наладить успешные отношения.'
      }, {
        num: 5,
        title: 'Маркетинг и формирование контента',
        description: 'Без маркетинга невозможно представить успешную продажу. Мы научим тебя ' + 'использовать все инструменты для продвижения туров через интернет и социальные сети. ' + 'Под руководством наших специалистов ты освоишь азы оффлайн и цифрового маркетинга, ' + 'научишься создавать видеоролики, разберешься в нейросетях и современных технологиях ' + 'продвижения себя, как эксперта в мире туризма.'
      }, {
        num: 6,
        title: 'Работа с туроператорами',
        description: 'Ты получишь знания о работе более чем с 20 туроператорами. И кроме этого мы подробно ' + 'разберем все нюансы бронирования ЖД билетов, авиабилетов, оформление виз, страховок и многое другое.'
      }, {
        num: 7,
        title: 'Страноведение',
        description: 'В этом модуле ты ознакомишься с 33 странами, которые наиболее популярны среди ' + 'русскоговорящих туристов. Мы разберем правила въезда, лучшие и худшие отели, популярные ' + 'локации для отдыха, советы по выбору мест для путешествий и другие важные аспекты для ' + 'планирования туров.'
      }, {
        num: 8,
        title: 'Развитие личностных навыков',
        description: 'Ты освоишь искусство общения с клиентами и партнерами. Мы будем работать с тренером ' + 'по речи, который поможет тебе настроить голос и речь — главные инструменты для работы ' + 'в туризме. Также мы изучим стрессоустойчивость и психологию продаж с профессиональным ' + 'психологом нашего курса. '
      }, {
        num: 9,
        title: 'Продолжение развития и дополнительные ресурсы',
        description: 'Ты получишь список рекомендованной литературы и полезных ресурсов для дальнейшего ' + 'развития. Мы предоставим чек-листы, которые будут необходимы для работы в сфере туризма, ' + 'а также расскажем о возможностях франшизы, которые откроются перед тобой после завершения курса.'
      }],
      modulesPerSlide: 3,
      activeSlide: null,
      carouselHeight: 'auto'
    };
  },
  computed: {
    groupedModules: function groupedModules() {
      if (window.innerWidth <= 767) {
        this.modulesPerSlide = 1;
      }
      var groups = [];
      for (var i = 0; i < this.modules.length; i += this.modulesPerSlide) {
        groups.push(this.modules.slice(i, i + this.modulesPerSlide));
      }
      return groups;
    }
  },
  watch: {
    activeSlide: {
      handler: function handler() {
        var _this = this;
        if (window.innerWidth > 767) {
          return;
        }
        setTimeout(function () {
          _this.changeSlide();
        });
      },
      immediate: true
    }
  },
  methods: {
    changeSlide: function changeSlide(slide) {
      var _this2 = this;
      this.$nextTick(function () {
        var items = document.querySelectorAll('.module-card');
        if (!items || items.length === 0) {
          return;
        }
        var itemModule = items[_this2.activeSlide === null ? 0 : _this2.activeSlide];
        var moduleSize = itemModule.getBoundingClientRect();
        _this2.carouselHeight = moduleSize.height + 10 + 'px';
      });
    }
  },
  mounted: function mounted() {
    document.addEventListener('scroll', animateBlock);
    function animateBlock() {
      var modulesContainer = document.querySelector('.course-modules-cards');
      if (!modulesContainer) return;
      var rect = modulesContainer.getBoundingClientRect();
      var isVisible = rect.top < window.innerHeight * (1 - 0.3) && rect.bottom > window.innerHeight * 0.3;
      if (!isVisible) return;
      document.querySelectorAll('.course-card').forEach(function (el, idx) {
        el.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
        if (idx === 1) el.classList.add('animate__delay-0-5s');
        if (idx === 2) el.classList.add('animate__delay-1s');
        if (idx === 3) el.classList.add('animate__delay-1-5s');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FaqOrContact"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_PreOrderModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../modals/PreOrderModal.vue */ "./resources/js/client/modals/PreOrderModal.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    PreOrderModal: _modals_PreOrderModal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      expandedPackage: 'opti',
      packageData: [{
        id: 'mini',
        name: 'МИНИ',
        description: 'это идеальный вариант для тех, кто хочет освоить базовые навыки работы в туризме, но без дополнительных привилегий.',
        imagePlaceholder: '/img/packets/packet-2-bg.png',
        imageThumbnail: '/img/packets/packet-1-bg-small.jpg',
        details: {
          intro: 'Он включает в себя все девять модулей нашего курса, давая тебе полное понимание туристической индустрии и необходимых практических знаний.',
          restriction: 'Однако в пакете "Мини" не предусмотрены доступ к закрытому клубу, наставникам и кураторам, а также сертификация по завершении курса.',
          suitsFor: [{
            icon: '/img/packets/icons/1.png',
            title: 'Освоить азы работы турагента.'
          }, {
            icon: '/img/packets/icons/2.png',
            title: 'Научиться бронировать путешествия для себя и своих близких.'
          }, {
            icon: '/img/packets/icons/3.png',
            title: 'Получать выгодные цены на туры и путешествия, не прибегая к услугам агентств.'
          }],
          summary: '<b>С пакетом "Мини"</b> ты получишь все ключевые знания и инструменты для организации путешествий с максимальной выгодой для себя, открывая мир путешествий на совершенно новом уровне.',
          priceOld: 9000,
          priceNew: 7000,
          buttonText: 'ПОЛУЧИТЬ ДОСТУП'
        }
      }, {
        id: 'opti',
        name: 'ОПТИ',
        description: 'это твой полный путь к успеху в мире туризма!',
        imagePlaceholder: '/img/packets/packet-1-bg.png',
        imageThumbnail: '/img/packets/packet-2-bg-small.jpg',
        details: {
          intro: 'Этот пакет включает в себя все ключевые элементы для твоего профессионального роста и предоставляет уникальные возможности:',
          restriction: null,
          suitsFor: [{
            icon: '/img/packets/icons/4.png',
            title: 'Все девять модулей курса',
            description: 'Ты получаешь доступ к модулям, которые охватывают все аспекты туристической индустрии, от основ до практических навыков, которые помогут стать настоящим экспертом.'
          }, {
            icon: '/img/packets/icons/5.png',
            title: 'Закрытый клуб',
            description: 'Становишься частью закрытого клуба, где сможешь общаться с коллегами, обмениваться опытом и получать дополнительные советы от опытных профессионалов отрасли.'
          }, {
            icon: '/img/packets/icons/6.png',
            title: 'Общение с кураторами',
            description: 'Наши кураторы всегда будут рядом, готовые поддержать и помочь на протяжении всего курса, отвечая на твои вопросы и направляя в нужном направлении.'
          }, {
            icon: '/img/packets/icons/7.png',
            title: 'Общение с наставниками',
            description: 'Ты будешь работать с наставниками, которые помогут тебе раскрыть твой потенциал, делиться практическими знаниями и обеспечат поддержку на всех этапах развития.'
          }],
          bonuses: [{
            icon: '/img/packets/icons/8.png',
            title: 'Доступ к онлайн-вебинарам от партнеров',
            description: 'Пакет также включает доступ к эксклюзивным онлайн вебинарам от наших партнеров — лидеров индустрии, что расширяет твои горизонты и открывает новые возможности.'
          }, {
            icon: '/img/packets/icons/9.png',
            title: 'Сертификат о прохождении курса',
            description: 'По завершении курса ты получишь официальный сертификат, который станет подтверждением твоих знаний и навыков в сфере туризма.'
          }, {
            icon: '/img/packets/icons/10.png',
            title: 'Возможность работы менеджером в туристической компании "В ПУТЬ"',
            description: 'После успешного завершения курса ты получишь шанс работать менеджером в нашей туристической компании, что станет отличным стартом для твоей карьеры в туризме.'
          }, {
            icon: '/img/packets/icons/12.png',
            title: 'Доступ 365 дней',
            description: 'Наш курс рассчитан на 30 дней, но мы предоставляем доступ к материалам на целый год для закрепления знаний.'
          }],
          summary: '<b>Пакет "Опти"</b> – это не просто курс, это комплексная информация, которая необходима для работы в мир туризма!',
          priceOld: 18000,
          priceNew: 14000,
          buttonText: 'ПОЛУЧИТЬ ДОСТУП'
        }
      }, {
        id: 'maxi',
        name: 'МАКСИ',
        description: 'это полный и уникальный набор возможностей для твоего профессионального роста и сфере туризма!',
        imagePlaceholder: '/img/packets/packet-3-bg.png',
        imageThumbnail: '/img/packets/packet-3-bg-small.jpg',
        details: {
          intro: 'Это готовый бизнес под ключ, который включает в себя наш авторский курс и, что самое важное, нашу франшизу.',
          restriction: null,
          suitsFor: [{
            icon: '/img/packets/icons/8.png',
            title: 'Полный курс',
            description: "Ты получаешь доступ к пакету \"Опти\", который включает все " + "необходимые знания и навыки для успешной работы в мире туризма!"
          }, {
            icon: '/img/packets/icons/11.png',
            title: 'Возможность открытия бренд-офиса по франшизе',
            description: "И, наконец, ты получаешь уникальную возможность открыть собственный бренд-офис по франшизе туристической компании «В ПУТЬ» в своем городе. Мы предоставим тебе все необходимые инструменты и поддержку для старта успешного бизнеса."
          }],
          summary: '<b>Пакет "Макси"</b> – это полное погружение в мир туризма с возможностью стать частью нашей крупнейшей сети и начать собственный бизнес с поддержкой.',
          priceOld: 45000,
          priceNew: 37000,
          buttonText: 'ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ'
        }
      }],
      isLoading: true,
      refId: null,
      promoCode: null,
      promoCodeId: null,
      promoStatus: null,
      // 'loading', 'allowed', 'denied', 'error'
      promoMessage: null,
      discountDetails: null,
      // { type: 'percent' | 'fixed', value: number }
      INITIAL_TIME_SECONDS: 129600,
      time: 0,
      interval: null,
      isRunning: false
    };
  },
  computed: {
    formattedTime: function formattedTime() {
      var totalSeconds = this.time;
      if (totalSeconds <= 0) {
        return "00:00:00:00";
      }
      var secondsInDay = 24 * 60 * 60;
      var days = Math.floor(totalSeconds / secondsInDay);
      var remainingSecondsAfterDays = totalSeconds % secondsInDay;
      var hours = Math.floor(remainingSecondsAfterDays / 3600);
      var minutes = Math.floor(remainingSecondsAfterDays % 3600 / 60);
      var seconds = Math.floor(remainingSecondsAfterDays % 60);
      return "".concat(String(days).padStart(2, '0'), ":").concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
    },
    currentPackage: function currentPackage() {
      var _this = this;
      return this.packageData.find(function (pkg) {
        return pkg.id === _this.expandedPackage;
      }) || this.packageData[1];
    },
    priceNewUnformatted: function priceNewUnformatted() {
      return this.currentPackage.details.priceNew;
    },
    finalPrice: function finalPrice() {
      if (this.promoStatus === 'allowed' && this.discountDetails) {
        var _this$discountDetails = this.discountDetails,
          type = _this$discountDetails.type,
          value = _this$discountDetails.value;
        var original = this.priceNewUnformatted;
        var finalPrice = original;
        if (type === 'percent') {
          finalPrice = original * (1 - value / 100);
        } else if (type === 'fixed') {
          finalPrice = original - value;
        }
        return Math.round(finalPrice * 100) / 100;
      }
      return this.priceNewUnformatted;
    }
  },
  methods: {
    saveTime: function saveTime() {
      localStorage.setItem('countdownTimeLeft', this.time);
    },
    startCountdown: function startCountdown() {
      var _this2 = this;
      if (this.isRunning || this.time <= 0) return;
      this.isRunning = true;
      this.interval = setInterval(function () {
        if (_this2.time > 0) {
          _this2.time--;
          _this2.saveTime();
        } else {
          _this2.stopCountdown();
        }
      }, 1000);
    },
    stopCountdown: function stopCountdown() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.isRunning = false;
      }
      localStorage.removeItem('countdownTimeLeft');
    },
    togglePackage: function togglePackage(packageId) {
      var _this3 = this;
      var isCurrentlyExpanded = this.expandedPackage === packageId;
      this.expandedPackage = isCurrentlyExpanded ? null : packageId;
      this.$nextTick(function () {
        var refKey = "package_".concat(packageId);
        var pkgRefs = _this3.$refs[refKey];
        if (pkgRefs && pkgRefs.length > 0 && pkgRefs[0] instanceof Element) {
          pkgRefs[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        if (!isCurrentlyExpanded && _this3.promoCode) {
          _this3.checkPromoCode();
        }
      });
    },
    togglePackageFromGallery: function togglePackageFromGallery(packageId) {
      var _this4 = this;
      var wasExpanded = this.expandedPackage === packageId;
      if (!wasExpanded) {
        this.expandedPackage = packageId;
      }
      this.$nextTick(function () {
        var refKey = "package_".concat(packageId);
        var pkgRefs = _this4.$refs[refKey];
        if (pkgRefs && pkgRefs.length > 0 && pkgRefs[0] instanceof Element) {
          pkgRefs[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    },
    getCourses: function getCourses() {
      var _this5 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/courses").then(function (response) {
        var packagesObject = response.data.packages;
        if (_typeof(packagesObject) !== 'object' || packagesObject === null) {
          console.error("API вернул невалидные данные пакетов.");
          return;
        }
        var expectedOrder = ['mini', 'opti', 'maxi'];
        expectedOrder.forEach(function (key, index) {
          var _packagesObject$key;
          var pkgData = (_packagesObject$key = packagesObject[key]) !== null && _packagesObject$key !== void 0 ? _packagesObject$key : null;
          if (pkgData) {
            _this5.packageData[index].id = pkgData.id;
            _this5.packageData[index].name = pkgData.name;
            _this5.packageData[index].details.priceOld = pkgData.priceOld;
            _this5.packageData[index].details.priceNew = pkgData.priceNew;
            _this5.packageData[index].details.buttonText = pkgData.buttonText || 'ПОЛУЧИТЬ ДОСТУП';
          }
        });
        if (_this5.promoCode) {
          _this5.checkPromoCode();
        }
      })["finally"](function () {
        _this5.isLoading = false;
      });
    },
    getPromocodeFromUrl: function getPromocodeFromUrl() {
      var urlParams = new URLSearchParams(window.location.search);
      this.promoCode = urlParams.get('promo');
      if (this.promoCode && !this.isLoading) {
        this.checkPromoCode();
      }
    },
    checkPromoCode: function checkPromoCode() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var currentId, response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (_this6.promoCode) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _this6.discountDetails = null;
              _this6.promoCodeId = null;
              _this6.promoStatus = 'loading';
              _this6.promoMessage = 'Проверка промокода...';
              currentId = _this6.currentPackage.id;
              _context.p = 2;
              _context.n = 3;
              return axios__WEBPACK_IMPORTED_MODULE_1___default().post('/api/check-promo-code', {
                code: _this6.promoCode,
                package_id: currentId
              });
            case 3:
              response = _context.v;
              _this6.promoStatus = response.data.status;
              if (_this6.promoStatus === 'allowed') {
                _this6.discountDetails = response.data.discount_info;
                _this6.promoCodeId = response.data.promo_id;
                _this6.promoMessage = response.data.message || 'Промокод успешно применен!';
              }
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              _this6.promoStatus = 'error';
              _this6.promoMessage = 'Не удалось проверить промокод.';
              _this6.discountDetails = null;
              _this6.promoCodeId = null;
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4]]);
      }))();
    },
    getRefFromUrl: function getRefFromUrl() {
      this.isLoading = false;
      var urlParams = new URLSearchParams(window.location.search);
      var refCode = urlParams.get('ref');
      if (refCode && !this.isLoading) {
        this.applyReferralCode(refCode);
      }
    },
    applyReferralCode: function applyReferralCode(refCode) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var response, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _this7.isLoading = true;
              _context2.p = 1;
              _context2.n = 2;
              return axios__WEBPACK_IMPORTED_MODULE_1___default().post('/api/apply-referral', {
                ref_code: refCode
              });
            case 2:
              response = _context2.v;
              _this7.refId = response.data.ref_id;
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error('Ошибка применения реферального кода:', _t2.response ? _t2.response.data.message : 'Ошибка сети');
            case 4:
              _context2.p = 4;
              _this7.isLoading = false;
              return _context2.f(4);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3, 4, 5]]);
      }))();
    }
  },
  mounted: function mounted() {
    var _this8 = this;
    this.getCourses();
    this.getPromocodeFromUrl();
    this.getRefFromUrl();
    var orderModal = document.getElementById('orderModal');
    if (orderModal) {
      orderModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var id = button.getAttribute('data-bs-id');
        var name = button.getAttribute('data-bs-name');
        var finalPrice = button.getAttribute('data-bs-price');
        var originalPrice = button.getAttribute('data-bs-original-price');
        var bgUrl = button.getAttribute('data-bs-bg');
        var urlForRef = button.getAttribute('data-bs-ref-url');
        var promoStatus = button.getAttribute('data-bs-promo-status');
        var promoMessage = button.getAttribute('data-bs-promo-message');
        var promoType = button.getAttribute('data-bs-promo-type');
        var promoValue = button.getAttribute('data-bs-promo-value');
        var promoId = button.getAttribute('data-bs-promo-id');
        var modalIdInput = orderModal.querySelector('.idCourse');
        var modalTitleSpan = orderModal.querySelector('.package-title .fw-bolder');
        var modalPriceP = orderModal.querySelector('.package-price .price');
        if (modalIdInput) modalIdInput.value = id;
        if (modalTitleSpan) modalTitleSpan.textContent = " \"".concat(name, "\"");
        if (modalPriceP) modalPriceP.textContent = "".concat(finalPrice, " \u0440");
        _this8.currentPackageId = id;
        _this8.currentPackageName = name;
        _this8.currentPackagePrice = finalPrice;
        _this8.originalPrice = parseFloat(originalPrice) || 0;
        _this8.currentPackageBg = bgUrl ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(\"".concat(bgUrl, "\") no-repeat center center / cover") : '';
        _this8.promoCodeId = promoId;
        _this8.promoStatus = promoStatus;
        _this8.promoMessage = promoMessage;
        _this8.refId = urlForRef;
        if (promoStatus === 'allowed' && promoType && promoValue) {
          _this8.discountDetails = {
            type: promoType,
            value: parseFloat(promoValue)
          };
        } else {
          _this8.discountDetails = null;
        }
      });
    }
    var savedTime = localStorage.getItem('countdownTimeLeft');
    if (savedTime !== null) {
      var parsedTime = parseInt(savedTime, 10);
      if (parsedTime > 0 && parsedTime <= this.INITIAL_TIME_SECONDS) {
        this.time = parsedTime;
      } else {
        this.time = this.INITIAL_TIME_SECONDS;
      }
    } else {
      this.time = this.INITIAL_TIME_SECONDS;
    }
    this.startCountdown();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TargetAudienceSection',
  data: function data() {
    return {
      sectionTitle: 'ТЕБЕ К НАМ, ЕСЛИ:',
      audienceSegments: [{
        id: 1,
        number: '01',
        title: 'Ты мечтаешь о свободе, хочешь работать в динамичной, яркой и вдохновляющей сфере?',
        description: 'Мы покажем тебе тонкости работы в туристической индустрии: от подбора туров до общения с клиентами и построения своей клиентской базы.'
      }, {
        id: 2,
        number: '02',
        title: 'Ты хочешь начать с частичного дохода.',
        description: 'Не обязательно сразу погружаться в туризм с головой. Благодаря гибкому графику и возможности работать из любой точки мира, ты можешь совмещать туризм с основной работой.'
      }, {
        id: 3,
        number: '03',
        title: 'Ты хочешь путешествовать с большими скидками.',
        description: 'Наш мир полон красивых мест и доступных путешествий. Мы расскажем, как экономить на турах — для себя, семьи или друзей.'
      }, {
        id: 4,
        number: '04',
        title: 'Ты уже действующий турагент.',
        description: 'Если ты уже работаешь в сфере туризма, мы поделимся опытом и расскажем о современных методах работы в мире туризма.'
      }]
    };
  },
  mounted: function mounted() {
    function animateBlock() {
      var targetContainer = document.querySelector('.target-audience-list');
      if (!targetContainer) {
        return;
      }
      var audienceElements = document.querySelectorAll('.audience-wrapper');
      if (audienceElements.length === 0) {
        return;
      }
      audienceElements.forEach(function (el, idx) {
        el.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
        if (idx === 0) el.classList.add('animate__delay-1s');
        if (idx === 1) el.classList.add('animate__delay-1-5s');
        if (idx === 2) el.classList.add('animate__delay-2s');
        if (idx === 3) el.classList.add('animate__delay-2-5s');
      });
    }
    setTimeout(animateBlock, 50);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return !_vm.loading ? _c("section", {
    staticClass: "travel-directions-section preview-gallery-section"
  }, [_c("div", {
    staticClass: "line-gradient-background"
  }), _vm._v(" "), _c("div", {
    staticClass: "container-fluid overflow-hidden"
  }, [_c("h2", {
    staticClass: "travel-directions-title text-center text-uppercase fw-800"
  }, [_vm._v("Методология курса:")]), _vm._v(" "), _vm.slides.length > 0 ? _c("ssr-carousel", {
    attrs: {
      "show-arrows": "",
      slidesPerPage: 3,
      "overflow-visible": "",
      "paginate-by-slide": "",
      "peek-right": "3%",
      "peek-left": "3%",
      gutter: "30",
      responsive: _vm.responsive
    },
    scopedSlots: _vm._u([{
      key: "back-arrow",
      fn: function fn(_ref) {
        var disabled = _ref.disabled;
        return [!disabled ? _c("span", {
          staticClass: "carousel-left-icon",
          "class": {
            disabled: disabled
          }
        }) : _vm._e()];
      }
    }, {
      key: "next-arrow",
      fn: function fn(_ref2) {
        var disabled = _ref2.disabled;
        return [!disabled ? _c("span", {
          staticClass: "carousel-right-icon",
          "class": {
            disabled: disabled
          }
        }) : _vm._e()];
      }
    }], null, false, 2485468414)
  }, [_vm._v(" "), _vm._v(" "), _vm._l(_vm.slides, function (slide) {
    return _c("div", {
      key: slide.id,
      staticClass: "travel-card slide preview-card"
    }, [_c("a", {
      staticClass: "travel-card-link",
      attrs: {
        href: "javascript:void(0)"
      },
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.handleCardClick(slide.id);
        }
      }
    }, [_c("div", {
      staticClass: "travel-card__image-container"
    }, [_c("div", {
      staticClass: "center-play-btn"
    }, [_c("img", {
      attrs: {
        src: "/img/icons/play.svg",
        alt: "play Video"
      }
    })]), _vm._v(" "), _c("img", {
      staticClass: "travel-card__background-image",
      attrs: {
        src: slide.image,
        alt: slide.title || "Preview Image",
        loading: "lazy"
      }
    })])])]);
  })], 2) : _vm._e()], 1)]) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f ***!
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
    staticClass: "modal",
    attrs: {
      id: "orderModal",
      tabindex: "-1",
      "aria-labelledby": "orderModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-dialog-centered"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("h2", {
    staticClass: "order-title text-center mb-4"
  }, [_vm._v("Ваш заказ")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.paymentClick.apply(null, arguments);
      }
    }
  }, [_c("input", {
    staticClass: "idCourse",
    attrs: {
      id: "idCourse",
      type: "text",
      hidden: ""
    },
    domProps: {
      value: _vm.currentPackageId
    }
  }), _vm._v(" "), _c("input", {
    attrs: {
      id: "originalPrice",
      type: "text",
      hidden: ""
    },
    domProps: {
      value: _vm.currentPackagePrice
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "mb-3"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      "for": "fullName"
    }
  }, [_vm._v("Фамилия Имя:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.formData.fullName,
      expression: "formData.fullName"
    }],
    staticClass: "form-control ta-input",
    attrs: {
      type: "text",
      id: "fullName",
      placeholder: "Как к Вам обращаться?"
    },
    domProps: {
      value: _vm.formData.fullName
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.formData, "fullName", $event.target.value);
      }, _vm.checkFormValidity]
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "mb-3"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      "for": "email"
    }
  }, [_vm._v("На почту придет вся актуальная информация:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.formData.email,
      expression: "formData.email"
    }],
    staticClass: "form-control ta-input",
    attrs: {
      type: "email",
      id: "email",
      placeholder: "Email",
      autocomplete: "email"
    },
    domProps: {
      value: _vm.formData.email
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.formData, "email", $event.target.value);
      }, _vm.checkFormValidity]
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "mb-3"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      "for": "phone"
    }
  }, [_vm._v("Введите Ваш номер телефона:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "mask",
      rawName: "v-mask",
      value: "+7 (###) ###-##-##",
      expression: "'+7 (###) ###-##-##'"
    }, {
      name: "model",
      rawName: "v-model",
      value: _vm.formData.phone,
      expression: "formData.phone"
    }],
    staticClass: "form-control ta-input",
    attrs: {
      type: "tel",
      id: "phone",
      autocomplete: "tel",
      placeholder: "Чтобы мы точно смогли с Вами связаться"
    },
    domProps: {
      value: _vm.formData.phone
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.formData, "phone", $event.target.value);
      }, _vm.checkFormValidity]
    }
  })]), _vm._v(" "), _vm.currentPackageId !== "maxi" ? _c("div", {
    staticClass: "mb-3"
  }, [_vm.promoStatus === "allowed" ? _c("div", {
    staticClass: "alert alert-success mt-2 p-2"
  }, [_vm._v("\n                            ✅ Промокод принят! Скидка " + _vm._s(_vm.discountDetails ? _vm.discountDetails.value + (_vm.discountDetails.type === "percent" ? "%" : "р") : "...") + " применена.\n                        ")]) : _vm.promoStatus === "used" ? _c("div", {
    staticClass: "alert alert-warning mt-2 p-2"
  }, [_vm._v("\n                            ⚠️ " + _vm._s(_vm.promoMessage) + "\n                        ")]) : _vm.promoStatus === "expired" ? _c("div", {
    staticClass: "alert alert-danger mt-2 p-2"
  }, [_vm._v("\n                            ❌ " + _vm._s(_vm.promoMessage) + "\n                        ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "package-info d-flex justify-content-center gap-3 mb-5"
  }, [_c("div", {
    staticClass: "package-badge position-relative",
    style: _vm.getBackgroundStyle()
  }, [_c("p", {
    staticClass: "package-title"
  }, [_vm._v("\n                                ПАКЕТ "), _c("span", {
    staticClass: "fw-bolder"
  }, [_vm._v(_vm._s(_vm.currentPackageName || "..."))])])]), _vm._v(" "), _c("div", {
    staticClass: "package-price",
    "class": {
      "d-none": _vm.currentPackageId === "maxi"
    }
  }, [_c("p", {
    staticClass: "line-1"
  }, [_vm._v("Стоимость:")]), _vm._v(" "), _c("p", {
    staticClass: "price fw-bold line-1",
    "class": {
      "text-danger": _vm.originalPrice > _vm.currentPackagePrice
    }
  }, [_vm._v("\n                                " + _vm._s(_vm.currentPackagePrice) + " р\n                            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "politics"
  }, [_c("div", {
    staticClass: "form-check d-flex align-items-center mb-2"
  }, [_c("input", {
    staticClass: "form-check-input",
    attrs: {
      type: "checkbox",
      id: "checkPolicy"
    },
    on: {
      change: _vm.checkFormValidity
    }
  }), _vm._v(" "), _vm._m(2)]), _vm._v(" "), _c("div", {
    staticClass: "form-check mb-3 d-flex align-items-center"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.formData.agreesToPolitics,
      expression: "formData.agreesToPolitics"
    }],
    staticClass: "form-check-input",
    attrs: {
      type: "checkbox",
      id: "checkPolitics"
    },
    domProps: {
      checked: Array.isArray(_vm.formData.agreesToPolitics) ? _vm._i(_vm.formData.agreesToPolitics, null) > -1 : _vm.formData.agreesToPolitics
    },
    on: {
      change: [function ($event) {
        var $$a = _vm.formData.agreesToPolitics,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.formData, "agreesToPolitics", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.formData, "agreesToPolitics", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.formData, "agreesToPolitics", $$c);
        }
      }, _vm.checkFormValidity]
    }
  }), _vm._v(" "), _vm._m(3)]), _vm._v(" "), _vm._m(4)]), _vm._v(" "), _c("div", {
    staticClass: "text-center"
  }, [_c("button", {
    staticClass: "btn btn-continue btn-cta",
    attrs: {
      disabled: _vm.isDisabled,
      "data-bs-dismiss": "modal",
      type: "submit"
    }
  }, [_c("span", {
    staticClass: "flare"
  }), _vm._v("\n                            " + _vm._s(_vm.currentPackageId === "maxi" ? "Получить презентацию" : "Продолжить") + "\n                        ")])])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header text-end"
  }, [_c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("p", {
    staticClass: "order-subtitle text-center"
  }, [_vm._v("Заполните "), _c("br"), _vm._v(" поля ниже")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "form-check-label",
    attrs: {
      "for": "checkPolicy"
    }
  }, [_vm._v("\n                                Даю "), _c("a", {
    attrs: {
      href: "/documents/privacy-consent.pdf"
    }
  }, [_vm._v("согласие")]), _vm._v(" на обработку моих\n                                персональных данных в соответствии с\n                                "), _c("a", {
    attrs: {
      href: "/documents/privacy-policy.pdf"
    }
  }, [_vm._v("политикой")]), _vm._v(" обработки персональных данных\n                            ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "form-check-label",
    attrs: {
      "for": "checkPolitics"
    }
  }, [_vm._v("\n                                Даю "), _c("a", {
    attrs: {
      href: "/documents/subscription.pdf"
    }
  }, [_vm._v("согласие")]), _vm._v(" на получение рекламных\n                                рассылок\n                            ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("p", {
    staticClass: "form-check-label mb-3"
  }, [_vm._v('Нажимая "продолжить", вы соглашаетесь с условиями '), _c("a", {
    attrs: {
      href: "/documents/public-offer.pdf"
    }
  }, [_vm._v("Оферты")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "course-page"
  }, [_vm.loading ? _c("div", {
    staticClass: "loader"
  }, [_c("div", {
    staticClass: "loader__dot"
  }), _vm._v(" "), _c("div", {
    staticClass: "loader__dot"
  }), _vm._v(" "), _c("div", {
    staticClass: "loader__dot"
  })]) : _vm._e(), _vm._v(" "), _vm.isNotificationVisible ? _c("notification-modal", {
    attrs: {
      data: _vm.notificationData,
      "is-success": !!_vm.notificationData && !!_vm.notificationData.title.includes("Добро пожаловать")
    },
    on: {
      close: function close($event) {
        _vm.isNotificationVisible = false;
      }
    }
  }) : _vm._e(), _vm._v(" "), _c("app-header", {
    staticClass: "hero-section_dark"
  }), _vm._v(" "), _c("course-hero"), _vm._v(" "), _c("target-audience-section"), _vm._v(" "), _c("course-modules-summary"), _vm._v(" "), _c("pricing-selector", {
    ref: "pricingSelector"
  }), _vm._v(" "), _c("preview-gallery-section", {
    on: {
      "open-pricing-package": _vm.handleOpenPricing
    }
  }), _vm._v(" "), _c("faq-or-contact"), _vm._v(" "), _c("app-footer", {
    attrs: {
      "is-page-courses": true
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("section", {
    staticClass: "course-hero container-fluid container-xl"
  }, [_c("div", {
    staticClass: "hero-content-wrapper"
  }, [_c("div", {
    staticClass: "hero-background-video"
  }, [_c("video", {
    staticClass: "h-100 w-100",
    attrs: {
      autoplay: "",
      muted: "",
      loop: "",
      playsinline: ""
    },
    domProps: {
      muted: true
    }
  }, [_c("source", {
    attrs: {
      src: "/videos/movie.mp4",
      type: "video/mp4"
    }
  })])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "scroll-indicator"
  }, [_c("div", {
    staticClass: "scroll-arrow-container"
  }, [_c("svg", {
    staticClass: "scroll-arrow",
    attrs: {
      viewBox: "0 0 24 24"
    }
  }, [_c("path", {
    attrs: {
      fill: "currentColor",
      d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
    }
  })])])])]), _vm._v(" "), _vm._m(1)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "hero-main-text"
  }, [_c("h2", {
    staticClass: "hero-main-title"
  }, [_vm._v("Авторский курс")]), _vm._v(" "), _c("h1", {
    staticClass: "hero-highlight-title"
  }, [_vm._v("«ПУТЬ В ТУРИЗМ»")]), _vm._v(" "), _c("p", {
    staticClass: "hero-subtitle"
  }, [_vm._v('от медийной туристической компании "В ПУТЬ"')])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "hero-lower-content"
  }, [_c("p", {
    staticClass: "lower-description"
  }, [_vm._v("\n            это не просто курс, мы расскажем "), _c("b", [_vm._v("как начать карьеру,")]), _vm._v(" которая может позволить тебе работать из любой\n            точки нашей планеты — будь то пляжи Мальдив, горы Швейцарии или уютные уголки Европы.\n        ")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "course-modules-section"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "course-modules-list text-center"
  }, [_vm.modules.length > 0 ? _c("ssr-carousel", {
    style: {
      height: this.carouselHeight
    },
    attrs: {
      "show-dots": "",
      slidesPerPage: 1
    },
    model: {
      value: _vm.activeSlide,
      callback: function callback($$v) {
        _vm.activeSlide = $$v;
      },
      expression: "activeSlide"
    }
  }, _vm._l(_vm.groupedModules, function (group, groupIndex) {
    return _c("div", {
      key: groupIndex,
      staticClass: "module-group-slide"
    }, _vm._l(group, function (subModule, subIdx) {
      return _c("div", {
        key: subIdx,
        staticClass: "module-card"
      }, [(_vm.modulesPerSlide === 3 ? subIdx % 2 === 0 : groupIndex % 2 === 0) ? _c("div", {
        staticClass: "skewed-bg"
      }) : _vm._e(), _vm._v(" "), _c("div", {
        staticClass: "container container-xl module-card-container"
      }, [_c("h2", {
        staticClass: "module-card-title"
      }, [_vm._v("МОДУЛЬ " + _vm._s(subModule.num))]), _vm._v(" "), _c("h2", {
        staticClass: "module-card-subtitle"
      }, [_vm._v(_vm._s(subModule.title))]), _vm._v(" "), _c("p", {
        staticClass: "module-card-description"
      }, [_vm._v(_vm._s(subModule.description))])])]);
    }), 0);
  }), 0) : _vm._e()], 1)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "course-modules-container container container-xl"
  }, [_c("div", {
    staticClass: "course-modules-left"
  }, [_c("h2", {
    staticClass: "course-modules-header title-course"
  }, [_vm._v("О КУРСЕ:")]), _vm._v(" "), _c("p", {
    staticClass: "course-description"
  }, [_vm._v("\n                Наш курс рассчитан на 30 дней и включает в себя "), _c("span", {
    staticClass: "fw-800"
  }, [_vm._v("9 уникальных модулей,")]), _vm._v("\n                каждый из которых покажет тебе основные нюансы связанные с работой туристического агента.\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "course-modules-right"
  }, [_c("div", {
    staticClass: "gradient-circle"
  }, [_c("div", {
    staticClass: "course-modules-cards"
  }, [_c("div", {
    staticClass: "course-card course-card-1"
  }, [_c("div", {
    staticClass: "card-line-bg"
  }, [_c("h2", {
    staticClass: "card-title text-white"
  }, [_vm._v("МОДУЛЬ 1")]), _vm._v(" "), _c("p", {
    staticClass: "card-subtitle text-white"
  }, [_vm._v("Понимание туристической индустрии")])])]), _vm._v(" "), _c("div", {
    staticClass: "course-card course-card-2"
  }, [_c("div", {
    staticClass: "card-line-bg"
  }, [_c("h2", {
    staticClass: "card-title text-white"
  }, [_vm._v("МОДУЛЬ 2")]), _vm._v(" "), _c("p", {
    staticClass: "card-subtitle text-white"
  }, [_vm._v("Туристическое законодательство")])])]), _vm._v(" "), _c("div", {
    staticClass: "course-card course-card-3"
  }, [_c("div", {
    staticClass: "card-line-bg"
  }, [_c("h2", {
    staticClass: "card-title text-white"
  }, [_vm._v("МОДУЛЬ 3")]), _vm._v(" "), _c("p", {
    staticClass: "card-subtitle text-white"
  }, [_vm._v("Туристическая бухгалтерия")])])])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm._m(0);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "faq-chat-section container container-xl"
  }, [_c("h2", {
    staticClass: "section-title title-course text-center"
  }, [_vm._v("ОСТАЛИСЬ ВОПРОСЫ?")]), _vm._v(" "), _c("div", {
    staticClass: "chat-content-wrapper"
  }, [_c("div", {
    staticClass: "chat-icon-container"
  }, [_c("img", {
    staticClass: "chat-icon-image",
    attrs: {
      alt: "ask Course",
      src: "/img/ask-course.png"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "chat-right-content"
  }, [_c("div", {
    staticClass: "chat-text-content"
  }, [_c("p", {
    staticClass: "chat-description"
  }, [_vm._v("Остались вопросы или нужна помощь?"), _c("br"), _c("span", {
    staticClass: "fw-bold"
  }, [_vm._v("Просто напиши в чате, и мы с радостью\n                поможем!")])])]), _vm._v(" "), _c("a", {
    staticClass: "chat-button btn-cta text-uppercase align-content-center",
    attrs: {
      href: "https://t.me/putclub_info"
    }
  }, [_c("span", {
    staticClass: "flare"
  }), _vm._v("\n                открыть чат")])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "pricing-selector container container-xl"
  }, [_c("pre-order-modal", {
    staticClass: "pre-order-modal"
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), !_vm.isLoading && _vm.packageData.length > 0 ? _c("div", {
    staticClass: "select-course-section position-relative"
  }, [_c("div", {
    staticClass: "person-wrapper"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "timer-course"
  }, [_c("h2", {
    staticClass: "title-course text-center"
  }, [_vm._v("До старта осталось:")]), _vm._v(" "), _c("div", {
    staticClass: "timer text-center mb-4"
  }, [_c("p", [_vm._v(_vm._s(_vm.formattedTime))])]), _vm._v(" "), _c("h2", {
    staticClass: "title-course text-center"
  }, [_vm._v("ВЫБЕРИ СВОЙ ПАКЕТ:")])])]), _vm._v(" "), _vm._l(_vm.packageData, function (pkg) {
    return _c("div", {
      key: pkg.id,
      ref: "package_".concat(pkg.id),
      refInFor: true,
      staticClass: "package-container position-relative",
      "class": {
        expanded: _vm.expandedPackage === pkg.id
      },
      attrs: {
        id: pkg.id + "-section",
        "aria-hidden": _vm.expandedPackage !== pkg.id ? "true" : null
      }
    }, [_c("div", {
      staticClass: "package-card mb-4",
      "class": {
        expanded: _vm.expandedPackage === pkg.id
      }
    }, [_c("div", {
      staticClass: "d-flex align-items-center",
      on: {
        click: function click($event) {
          return _vm.togglePackage(pkg.id);
        }
      }
    }, [_c("div", {
      staticClass: "col-md-5 package-image",
      style: {
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(".concat(pkg.imagePlaceholder, ")")
      }
    }, [_c("h2", {
      staticClass: "package-title"
    }, [_vm._v("ПАКЕТ "), _c("span", {
      staticClass: "fw-bolder"
    }, [_vm._v('"' + _vm._s(pkg.name) + '"')])])]), _vm._v(" "), _c("div", {
      staticClass: "package-info-content w-100"
    }, [_c("p", {
      staticClass: "package-description"
    }, [_vm._v("\n                            " + _vm._s(pkg.description) + "\n                        ")]), _vm._v(" "), _c("div", {
      "class": {
        "animate-down": _vm.expandedPackage !== pkg.id
      }
    }, [_vm.expandedPackage !== pkg.id ? _c("div", {
      staticClass: "d-flex flex-column"
    }, [_c("span", {
      staticClass: "arrow-css unu"
    }), _vm._v(" "), _c("span", {
      staticClass: "arrow-css doi"
    }), _vm._v(" "), _c("span", {
      staticClass: "arrow-css trei"
    })]) : _vm._e(), _vm._v(" "), _vm.expandedPackage === pkg.id ? _c("svg", {
      staticClass: "scroll-arrow arrow-up",
      attrs: {
        viewBox: "0 0 24 24"
      }
    }, [_c("path", {
      attrs: {
        fill: "currentColor",
        d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
      }
    })]) : _vm._e()])])]), _vm._v(" "), _vm.expandedPackage === pkg.id ? _c("div", {
      staticClass: "package-details-container position-relative cursor-auto"
    }, [_c("div", {
      staticClass: "details-content"
    }, [_c("p", {
      staticClass: "mb-4"
    }, [_vm._v(_vm._s(pkg.details.intro))]), _vm._v(" "), pkg.details.restriction && pkg.id !== "mini" ? _c("p", {
      staticClass: "restriction-text"
    }, [_vm._v("\n                            " + _vm._s(pkg.details.restriction))]) : _vm._e(), _vm._v(" "), pkg.id === "mini" ? _c("h4", {
      staticClass: "details-subtitle fw-bold"
    }, [_vm._v("\n                            Этот пакет отлично подходит для тех, кто хочет:\n                        ")]) : _vm._e(), _vm._v(" "), _c("ul", {
      staticClass: "list-unstyled benefits-list"
    }, [_vm._l(pkg.details.suitsFor, function (benefit, index) {
      return _c("li", {
        key: index,
        staticClass: "benefits-item d-flex align-items-center"
      }, [_c("img", {
        staticClass: "benefit-icon",
        attrs: {
          src: benefit.icon,
          alt: "icon-benefit-" + index
        }
      }), _vm._v(" "), _c("div", {
        staticClass: "benefit-text"
      }, [benefit.description ? _c("h3", {
        staticClass: "fw-bold"
      }, [_vm._v(_vm._s(benefit.title))]) : _vm._e(), _vm._v(" "), _c("p", {
        staticClass: "benefit-description"
      }, [_vm._v("\n                                        " + _vm._s(!benefit.description ? benefit.title : benefit.description) + "\n                                    ")])])]);
    }), _vm._v(" "), pkg.details.bonuses ? [_vm._m(2, true), _vm._v(" "), _vm._m(3, true), _vm._v(" "), _vm._l(pkg.details.bonuses, function (bonus, index) {
      return _c("li", {
        key: "bonus-" + index,
        staticClass: "benefits-item d-flex align-items-center"
      }, [_c("img", {
        staticClass: "benefit-icon",
        attrs: {
          src: bonus.icon,
          alt: "icon-benefit-" + index
        }
      }), _vm._v(" "), _c("div", {
        staticClass: "benefit-text"
      }, [bonus.description ? _c("h3", {
        staticClass: "fw-bold"
      }, [_vm._v(_vm._s(bonus.title))]) : _vm._e(), _vm._v(" "), _c("p", {
        staticClass: "benefit-description"
      }, [_vm._v("\n                                            " + _vm._s(!bonus.description ? bonus.title : bonus.description) + "\n                                        ")])])]);
    })] : _vm._e()], 2), _vm._v(" "), pkg.details.restriction && pkg.id === "mini" ? _c("p", {
      staticClass: "restriction-text mb-5"
    }, [_vm._v("\n                            " + _vm._s(pkg.details.restriction))]) : _vm._e(), _vm._v(" "), pkg.details.summary ? _c("p", {
      staticClass: "summary-text",
      domProps: {
        innerHTML: _vm._s(pkg.details.summary)
      }
    }) : _vm._e()])]) : _vm._e()]), _vm._v(" "), _vm.expandedPackage === pkg.id ? _c("div", {
      staticClass: "btn-container d-flex flex-column justify-content-center text-center"
    }, [_c("button", {
      staticClass: "btn btn-cta btn-price",
      attrs: {
        "data-bs-toggle": "modal",
        "data-bs-target": "#orderModal",
        "data-bs-id": pkg.id,
        "data-bs-name": pkg.name,
        "data-bs-price": _vm.finalPrice,
        "data-bs-original-price": pkg.details.priceNew,
        "data-bs-bg": pkg.imageThumbnail,
        "data-bs-promo-id": _vm.promoCodeId,
        "data-bs-promo-code": _vm.promoCode,
        "data-bs-promo-status": _vm.promoStatus,
        "data-bs-ref-url": _vm.refId,
        "data-bs-promo-message": _vm.promoMessage,
        "data-bs-promo-type": _vm.discountDetails ? _vm.discountDetails.type : null,
        "data-bs-promo-value": _vm.discountDetails ? _vm.discountDetails.value : null
      }
    }, [_c("span", {
      staticClass: "flare"
    }), _vm._v("\n                    " + _vm._s(pkg.id != "maxi" ? pkg.details.buttonText : "ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ") + "\n                ")]), _vm._v(" "), pkg.id != "maxi" ? _c("div", {
      staticClass: "mark-price"
    }, [_c("span", {
      staticClass: "price-old text-decoration-line-through fw-medium"
    }, [_vm._v(_vm._s(pkg.details.priceOld) + " р")]), _vm._v(" "), _c("span", {
      staticClass: "price-new"
    }, [_vm._v(_vm._s(_vm.promoStatus === "allowed" ? _vm.finalPrice : pkg.details.priceNew) + " р")])]) : _vm._e()]) : _vm._e()]);
  })], 2) : _vm._e()], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "pricing-section"
  }, [_c("div", {
    staticClass: "pricing-left"
  }, [_c("p", {
    staticClass: "course-description"
  }, [_vm._v("\n                Каждый модуль — это продуманный шаг к твоему профессиональному росту и успешной карьере в мире\n                туризма.\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "d-flex d-sm-none pricing-right"
  }, [_c("div", {
    staticClass: "pricing-certificate"
  }, [_c("div", {
    staticClass: "pricing-certificate-container"
  }, [_c("img", {
    staticClass: "logo",
    attrs: {
      src: "/img/logo-red.png",
      alt: "logo"
    }
  }), _vm._v(" "), _c("p", {
    staticClass: "certificate-title"
  }, [_vm._v("СЕРТИФИКАТ")])])])]), _vm._v(" "), _c("p", {
    staticClass: "course-description"
  }, [_vm._v("\n                Кроме того, выпускники курса получат "), _c("span", {
    staticClass: "fw-bold"
  }, [_vm._v("сертификат.")]), _vm._v(" Пройди наш курс и\n                открой для себя мир безграничных возможностей!\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "d-none d-sm-block pricing-right"
  }, [_c("div", {
    staticClass: "pricing-certificate"
  }, [_c("div", {
    staticClass: "pricing-certificate-container"
  }, [_c("img", {
    staticClass: "logo",
    attrs: {
      src: "/img/logo-red.png",
      alt: "logo"
    }
  }), _vm._v(" "), _c("p", {
    staticClass: "certificate-title"
  }, [_vm._v("СЕРТИФИКАТ")])])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "course-persons"
  }, [_c("img", {
    attrs: {
      src: "/img/packets/course-persons.png",
      alt: "course persons"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("li", {
    staticClass: "mb-0"
  }, [_c("div", {
    staticClass: "gradient-divider"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("li", {
    staticClass: "mb-4 text-center"
  }, [_c("h2", [_vm._v("Бонусы")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "target-audience-section container container-xl"
  }, [_c("h2", {
    staticClass: "section-header text-center title-course"
  }, [_vm._v(_vm._s(_vm.sectionTitle))]), _vm._v(" "), _c("div", {
    staticClass: "target-audience-list"
  }, _vm._l(_vm.audienceSegments, function (segment) {
    return _c("div", {
      key: segment.id,
      staticClass: "audience-wrapper"
    }, [_c("span", {
      staticClass: "card-number"
    }, [_vm._v(_vm._s(segment.number))]), _vm._v(" "), _c("div", {
      staticClass: "audience-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("h3", {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(segment.title))])]), _vm._v(" "), _c("p", {
      staticClass: "card-description"
    }, [_vm._v(_vm._s(segment.description))])])]);
  }), 0)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.course-card {\n    opacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.gradient-divider[data-v-0955b7d2] {\r\n    height: 2px;\r\n    width: 100%;\r\n    display: block;\r\n    background: linear-gradient(to right, #dd0024, #fb6228);\r\n    margin-bottom: 25px;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.audience-wrapper[data-v-b059f814] {\n    opacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_style_index_0_id_262ba846_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_style_index_0_id_262ba846_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_style_index_0_id_262ba846_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_style_index_0_id_0955b7d2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_style_index_0_id_0955b7d2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_style_index_0_id_0955b7d2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_style_index_0_id_b059f814_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_style_index_0_id_b059f814_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_style_index_0_id_b059f814_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/client/components/Fragments/PreviewGallerySection.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/client/components/Fragments/PreviewGallerySection.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreviewGallerySection.vue?vue&type=template&id=5f54c62c */ "./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c");
/* harmony import */ var _PreviewGallerySection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreviewGallerySection.vue?vue&type=script&lang=js */ "./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PreviewGallerySection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__.render,
  _PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/components/Fragments/PreviewGallerySection.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreviewGallerySection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreviewGallerySection.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreviewGallerySection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreviewGallerySection_vue_vue_type_template_id_5f54c62c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreviewGallerySection.vue?vue&type=template&id=5f54c62c */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/components/Fragments/PreviewGallerySection.vue?vue&type=template&id=5f54c62c");


/***/ }),

/***/ "./resources/js/client/modals/PreOrderModal.vue":
/*!******************************************************!*\
  !*** ./resources/js/client/modals/PreOrderModal.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreOrderModal.vue?vue&type=template&id=02ce222f */ "./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f");
/* harmony import */ var _PreOrderModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreOrderModal.vue?vue&type=script&lang=js */ "./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PreOrderModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__.render,
  _PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modals/PreOrderModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreOrderModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreOrderModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreOrderModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f":
/*!************************************************************************************!*\
  !*** ./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreOrderModal_vue_vue_type_template_id_02ce222f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreOrderModal.vue?vue&type=template&id=02ce222f */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modals/PreOrderModal.vue?vue&type=template&id=02ce222f");


/***/ }),

/***/ "./resources/js/client/modules/course/CoursePage.vue":
/*!***********************************************************!*\
  !*** ./resources/js/client/modules/course/CoursePage.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoursePage.vue?vue&type=template&id=419b3590 */ "./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590");
/* harmony import */ var _CoursePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CoursePage.vue?vue&type=script&lang=js */ "./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CoursePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__.render,
  _CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/CoursePage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CoursePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CoursePage.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CoursePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590":
/*!*****************************************************************************************!*\
  !*** ./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590 ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CoursePage_vue_vue_type_template_id_419b3590__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CoursePage.vue?vue&type=template&id=419b3590 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/CoursePage.vue?vue&type=template&id=419b3590");


/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseHero.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseHero.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CourseHero.vue?vue&type=template&id=64d8abb8 */ "./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8");
/* harmony import */ var _CourseHero_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CourseHero.vue?vue&type=script&setup=true&lang=js */ "./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CourseHero_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__.render,
  _CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/components/CourseHero.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseHero_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseHero.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=script&setup=true&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseHero_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8":
/*!****************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8 ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseHero_vue_vue_type_template_id_64d8abb8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseHero.vue?vue&type=template&id=64d8abb8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseHero.vue?vue&type=template&id=64d8abb8");


/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseModulesSummary.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseModulesSummary.vue ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CourseModulesSummary.vue?vue&type=template&id=262ba846 */ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846");
/* harmony import */ var _CourseModulesSummary_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CourseModulesSummary.vue?vue&type=script&lang=js */ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js");
/* harmony import */ var _CourseModulesSummary_vue_vue_type_style_index_0_id_262ba846_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css */ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CourseModulesSummary_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__.render,
  _CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/components/CourseModulesSummary.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js":
/*!********************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseModulesSummary.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_style_index_0_id_262ba846_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=style&index=0&id=262ba846&lang=css");


/***/ }),

/***/ "./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846 ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CourseModulesSummary_vue_vue_type_template_id_262ba846__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CourseModulesSummary.vue?vue&type=template&id=262ba846 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/CourseModulesSummary.vue?vue&type=template&id=262ba846");


/***/ }),

/***/ "./resources/js/client/modules/course/components/FaqOrContact.vue":
/*!************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/FaqOrContact.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FaqOrContact.vue?vue&type=template&id=0d97eb8a */ "./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a");
/* harmony import */ var _FaqOrContact_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FaqOrContact.vue?vue&type=script&lang=js */ "./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FaqOrContact_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__.render,
  _FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/components/FaqOrContact.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqOrContact_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqOrContact.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqOrContact_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a":
/*!******************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqOrContact_vue_vue_type_template_id_0d97eb8a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqOrContact.vue?vue&type=template&id=0d97eb8a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/FaqOrContact.vue?vue&type=template&id=0d97eb8a");


/***/ }),

/***/ "./resources/js/client/modules/course/components/PricingSelector.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/PricingSelector.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true */ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true");
/* harmony import */ var _PricingSelector_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PricingSelector.vue?vue&type=script&lang=js */ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js");
/* harmony import */ var _PricingSelector_vue_vue_type_style_index_0_id_0955b7d2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css */ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PricingSelector_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0955b7d2",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/components/PricingSelector.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PricingSelector.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_style_index_0_id_0955b7d2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=style&index=0&id=0955b7d2&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PricingSelector_vue_vue_type_template_id_0955b7d2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/PricingSelector.vue?vue&type=template&id=0955b7d2&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/course/components/TargetAudienceList.vue":
/*!******************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/TargetAudienceList.vue ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true */ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true");
/* harmony import */ var _TargetAudienceList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TargetAudienceList.vue?vue&type=script&lang=js */ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js");
/* harmony import */ var _TargetAudienceList_vue_vue_type_style_index_0_id_b059f814_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css */ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TargetAudienceList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "b059f814",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/course/components/TargetAudienceList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js":
/*!******************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TargetAudienceList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css":
/*!**************************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_style_index_0_id_b059f814_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=style&index=0&id=b059f814&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true":
/*!************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TargetAudienceList_vue_vue_type_template_id_b059f814_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/course/components/TargetAudienceList.vue?vue&type=template&id=b059f814&scoped=true");


/***/ })

}]);