(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_client_modules_shop_MerchStore_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ProductList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ProductList.vue */ "./resources/js/client/modules/shop/components/ProductList.vue");
/* harmony import */ var _components_NavigationTabs_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/NavigationTabs.vue */ "./resources/js/client/modules/shop/components/NavigationTabs.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MerchStore',
  components: {
    NavigationTabs: _components_NavigationTabs_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ProductList: _components_ProductList_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");

var WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'FavoritesSidebar',
  computed: {
    eventBus: function eventBus() {
      return _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      items: [],
      quantity: 1
    };
  },
  emits: ['close', 'remove'],
  methods: {
    getFavoritesList: function getFavoritesList(data) {
      this.items = data;
    },
    getPrimaryImageUrl: function getPrimaryImageUrl(product) {
      var _product$images, _product$images$;
      if (!(product !== null && product !== void 0 && (_product$images = product.images) !== null && _product$images !== void 0 && _product$images.length)) return '';
      var primaryImageObj = product.images.find(function (img) {
        return img.primary === true;
      });
      return primaryImageObj ? primaryImageObj.image : (_product$images$ = product.images[0]) === null || _product$images$ === void 0 ? void 0 : _product$images$.image;
    },
    openProductModal: function openProductModal(product) {
      _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$emit('open-product-modal', product);
    }
  },
  mounted: function mounted() {
    _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$on('update-favorites-products', this.getFavoritesList);
    var wishList = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
    this.items = wishList ? JSON.parse(wishList) : [];
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FavoritesSidebar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FavoritesSidebar.vue */ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue");
/* harmony import */ var _OrderSidebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderSidebar.vue */ "./resources/js/client/modules/shop/components/OrderSidebar.vue");
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");
/* harmony import */ var _ProductCard_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductCard.vue */ "./resources/js/client/modules/shop/components/ProductCard.vue");




var FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';
var MOCK_PRODUCTS_DB = [{
  id: 1,
  name: 'Синяя футболка "Путешествие"',
  category_slug: 'clothing',
  currentPrice: 1500,
  imageUrl: '/img/merch/test.png'
}, {
  id: 2,
  name: 'Красный рюкзак',
  category_slug: 'accessories',
  currentPrice: 3500,
  imageUrl: '/img/merch/test.png'
}, {
  id: 3,
  name: 'Треккинговые ботинки',
  category_slug: 'clothing',
  currentPrice: 12000,
  imageUrl: '/img/merch/test.png'
}, {
  id: 4,
  name: 'Термос "Поход"',
  category_slug: 'travelGoods',
  currentPrice: 2500,
  imageUrl: '/img/merch/test.png'
}, {
  id: 5,
  name: 'Брелок "Трек"',
  category_slug: 'accessories',
  currentPrice: 400,
  imageUrl: '/img/merch/test.png'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'NavigationTabs',
  components: {
    ProductCard: _ProductCard_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    OrderSidebar: _OrderSidebar_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    FavoritesSidebar: _FavoritesSidebar_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      tabs: [{
        id: 'clothing',
        name: 'Одежда'
      }, {
        id: 'accessories',
        name: 'Аксессуары'
      }, {
        id: 'travelGoods',
        name: 'Для путешествий'
      }],
      activeTab: 'clothing',
      sortOptions: [{
        value: 'default',
        text: 'Сортировать: по умолчанию'
      }, {
        value: 'price_asc',
        text: 'Цена: по возрастанию'
      }, {
        value: 'price_desc',
        text: 'Цена: по убыванию'
      }, {
        value: 'name_a_z',
        text: 'Название: А - Я'
      }, {
        value: 'name_z_a',
        text: 'Название: Я - А'
      }],
      currentSortValue: 'default',
      isFavoritesOpen: false,
      isOrderOpen: false,
      isActiveSearch: false,
      searchQuery: '',
      searchResults: [],
      wishlistIds: []
    };
  },
  computed: {
    currentSortOption: function currentSortOption() {
      var _this = this;
      return this.sortOptions.find(function (opt) {
        return opt.value === _this.currentSortValue;
      }) || this.sortOptions[0];
    },
    countSearch: function countSearch() {
      return this.searchResults.length;
    },
    displaySortText: function displaySortText() {
      var text = this.currentSortOption.text;
      var parts = text.split(':');
      return {
        prefix: parts[0].trim(),
        value: parts[1] ? parts[1].trim() : parts[0].trim()
      };
    }
  },
  watch: {
    activeTab: function activeTab(newTab, oldTab) {
      if (newTab !== oldTab) {
        this.currentSortValue = 'default';
        this.saveFiltersAndSort();
      }
    },
    currentSortValue: function currentSortValue() {
      this.saveFiltersAndSort();
    },
    isFavoritesOpen: function isFavoritesOpen() {
      this.updateBodyScroll();
    },
    isOrderOpen: function isOrderOpen() {
      this.updateBodyScroll();
    },
    isActiveSearch: function isActiveSearch(newValue) {
      if (!newValue) {
        this.searchQuery = '';
        this.searchResults = [];
        document.body.classList.remove('no-scroll');
      } else {
        if (this.searchQuery.trim().length === 0) {
          document.body.classList.remove('no-scroll');
        }
      }
    },
    searchQuery: function searchQuery() {
      this.handleSearchInput();
    }
  },
  methods: {
    loadFiltersAndSort: function loadFiltersAndSort() {
      var stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);
      if (stored) {
        if (stored.tag && this.tabs.some(function (t) {
          return t.id === stored.tag;
        })) {
          this.activeTab = stored.tag;
        }
        if (stored.sort && this.sortOptions.some(function (opt) {
          return opt.value === stored.sort;
        })) {
          this.currentSortValue = stored.sort;
        }
      }
      _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$emit('tab-sort-changed');
    },
    saveFiltersAndSort: function saveFiltersAndSort() {
      try {
        var dataToSave = {
          tag: this.activeTab,
          sort: this.currentSortValue
        };
        localStorage.setItem(FILTERS_SORT_STORAGE_KEY, JSON.stringify(dataToSave));
        _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$emit('tab-sort-changed');
      } catch (e) {
        console.error("Не удалось сохранить фильтры/сортировку в localStorage:", e);
      }
    },
    loadFromStorage: function loadFromStorage(key) {
      try {
        var stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 localStorage (".concat(key, "):"), e);
        return null;
      }
    },
    setActiveTab: function setActiveTab(id) {
      this.activeTab = id;
    },
    selectSortOption: function selectSortOption(option) {
      this.currentSortValue = option.value;
    },
    toggleSearchOverlay: function toggleSearchOverlay() {
      this.isActiveSearch = !this.isActiveSearch;
    },
    closeSearchOverlay: function closeSearchOverlay() {
      this.isActiveSearch = false;
    },
    handleSearchInput: function handleSearchInput() {
      // TODO: сделать поиск (запрос к бд или локально)

      var query = this.searchQuery.toLowerCase().trim();
      var body = document.body;
      if (query.length > 0) {
        body.classList.add('no-scroll');
        this.searchResults = MOCK_PRODUCTS_DB.filter(function (p) {
          return p.name.toLowerCase().includes(query);
        });
      } else {
        body.classList.remove('no-scroll');
        this.searchResults = [];
      }
    },
    toggleFavorites: function toggleFavorites() {
      this.isFavoritesOpen = !this.isFavoritesOpen;
      this.isActiveSearch = false;
    },
    toggleOrder: function toggleOrder() {
      this.isOrderOpen = !this.isOrderOpen;
      this.isActiveSearch = false;
    },
    closeFavorites: function closeFavorites() {
      this.isFavoritesOpen = false;
    },
    closeOrder: function closeOrder() {
      this.isOrderOpen = false;
    },
    updateBodyScroll: function updateBodyScroll() {
      var shouldBlock = this.isFavoritesOpen || this.isOrderOpen || this.isActiveSearch;
      document.body.classList.toggle('no-scroll', shouldBlock);
    },
    isInWishlist: function isInWishlist(productId) {
      return this.wishlistIds.includes(productId);
    },
    handleWishlist: function handleWishlist(product) {
      var productId = product.id;
      var index = this.wishlistIds.indexOf(productId);
      if (index === -1) {
        this.wishlistIds.push(productId);
      } else {
        this.wishlistIds.splice(index, 1);
      }
      _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$emit('toggle-wishlist', product);
    },
    openModalFromCard: function openModalFromCard(product) {
      _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$emit('open-product-modal', product);
    },
    openSidebarOrder: function openSidebarOrder() {
      this.isOrderOpen = true;
    }
  },
  created: function created() {
    var _this2 = this;
    _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$on('update-favorites-products', function (fullData) {
      _this2.wishlistIds = fullData.map(function (p) {
        return p.id;
      });
    });
    _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$on('cart-updated', this.openSidebarOrder);
  },
  mounted: function mounted() {
    this.loadFiltersAndSort();
    this.updateBodyScroll();
  },
  beforeUnmount: function beforeUnmount() {
    _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$off('update-favorites-products');
    _event_bus__WEBPACK_IMPORTED_MODULE_2__["default"].$off('cart-updated', this.openSidebarOrder);
    document.body.classList.remove('no-scroll');
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DataProcessingModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      "default": false
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'OrderModal',
  components: {},
  data: function data() {
    return {
      currentStep: 1,
      order: {
        quantity: 1,
        pricePerUnit: 3650,
        delivery: 803.15
      }
    };
  },
  computed: {
    orderTotal: function orderTotal() {
      return this.order.quantity * this.order.pricePerUnit;
    }
  },
  mounted: function mounted() {
    document.addEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'auto';
  },
  methods: {
    goToStep: function goToStep(step) {
      this.currentStep = step;
    },
    goBack: function goBack() {
      if (this.currentStep === 2) {
        this.currentStep = 1;
      }
    },
    submitOrder: function submitOrder() {
      alert('Заказ оформлен!');
      this.closeModal();
    },
    closeModal: function closeModal() {
      this.$emit('close');
    },
    handleKeydown: function handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");

var CART_STORAGE_KEY = 'shoppingCart';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'OrderSidebar',
  computed: {
    eventBus: function eventBus() {
      return _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      items: [],
      quantity: 1,
      totalPrice: 0
    };
  },
  methods: {
    getPrimaryImageUrl: function getPrimaryImageUrl(product) {
      var _product$images, _product$images$;
      if (!(product !== null && product !== void 0 && (_product$images = product.images) !== null && _product$images !== void 0 && _product$images.length)) return '';
      var primaryImageObj = product.images.find(function (img) {
        return img.primary === true;
      });
      return primaryImageObj ? primaryImageObj.image : (_product$images$ = product.images[0]) === null || _product$images$ === void 0 ? void 0 : _product$images$.image;
    },
    getCartFromStorage: function getCartFromStorage() {
      var cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    },
    saveCartToStorage: function saveCartToStorage(cart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    },
    loadCart: function loadCart() {
      this.items = this.getCartFromStorage();
      this.calculateSummary();
    },
    calculateSummary: function calculateSummary() {
      this.totalPrice = this.items.reduce(function (sum, item) {
        return sum + item.current_sku.price * item.quantity;
      }, 0);
    },
    removeItem: function removeItem(itemToRemove) {
      var updatedCart = this.items.filter(function (item) {
        return item.productId !== itemToRemove.productId || item.sku !== itemToRemove.sku;
      });
      this.items = updatedCart;
      this.saveCartToStorage(updatedCart);
      this.calculateSummary();
      _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$emit('cart-updated');
    },
    updateQuantity: function updateQuantity(item, change) {
      var newQuantity = item.quantity + change;
      var availableStock = this.getAvailableStockForSKU(item.productId, item.sku);
      if (newQuantity <= 0) {
        this.removeItem(item);
        return;
      }
      if (newQuantity > availableStock) {
        //TODO: ГЛЯНУТЬ ЧТО ПО ЛИМИТАМ
        alert('Извините, достигнут лимит. Это максимально возможное количество товаров в наличии');
        return;
      }
      var index = this.items.findIndex(function (i) {
        return i.sku === item.sku && i.productId === item.productId;
      });
      if (index !== -1) {
        this.items[index].quantity = newQuantity;
        this.saveCartToStorage(this.items);
        this.calculateSummary();
        _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$emit('cart-updated');
      }
    },
    getAvailableStockForSKU: function getAvailableStockForSKU(productId, sku) {
      var product = this.items ? this.items.find(function (p) {
        return p.productId === productId;
      }) : null;
      if (!product) {
        return 0;
      }
      if (product.current_sku.stock_qty) return product.current_sku.stock_qty;
      return 0;
    },
    proceedToCheckout: function proceedToCheckout() {
      if (this.items.length === 0) {
        console.log("Корзина пуста, оформление невозможно.");
        return;
      }
      console.log("Открыть оформление");

      //TODO: ОТКРЫТЬ МОДАЛЬНОЕ ОКНО С ОФОРМЛЕНИЕМ ЗАКАЗА, А ЭТО ЗАКРЫТЬ
    }
  },
  emits: ['close', 'remove', 'update:quantity'],
  mounted: function mounted() {
    this.loadCart();
    _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$on('cart-updated', this.loadCart);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");

var WISHLIST_STORAGE_KEY = 'merchWishlistIds';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle-wishlist'],
  data: function data() {
    return {
      isInWishlist: false
    };
  },
  computed: {
    primaryImageUrl: function primaryImageUrl() {
      if (!this.product || !this.product.images || this.product.images.length === 0) {
        return '';
      }
      var primaryImageObj = this.product.images.find(function (img) {
        return img.primary === true;
      });
      return primaryImageObj ? primaryImageObj.image : this.product.images[0].image;
    }
  },
  methods: {
    checkInWishlist: function checkInWishlist() {
      var stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      this.wishlistIds = stored ? JSON.parse(stored) : null;
      this.isInWishlist = this.wishlistIds.includes(this.product.id);
    }
  },
  mounted: function mounted() {
    _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$on('update-favorites', this.checkInWishlist);
    this.checkInWishlist();
  },
  beforeUnmount: function beforeUnmount() {
    _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$off('update-favorites');
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductCard_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCard.vue */ "./resources/js/client/modules/shop/components/ProductCard.vue");
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");
/* harmony import */ var _modules_shop_components_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/shop/components/NotificationModal.vue */ "./resources/js/client/modules/shop/components/NotificationModal.vue");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



var MOCK_PRODUCTS_DB = [{
  id: 2,
  name: "Чемодан",
  description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
  oldPrice: 5500,
  currentPrice: 3650,
  isHit: true,
  category_slug: "clothing",
  images: [{
    primary: true,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }],
  attributes: [{
    name: "Размер",
    sku_key: "size",
    options: ["Маленький", "Средний", "Большой"]
  }, {
    name: "Цвет",
    sku_key: "color",
    options: ["Синий", "Зеленый", "Красный"]
  }],
  available_skus: [{
    "sku": "102-S-BLU",
    "size": "Маленький",
    "color": "Синий",
    "price": 100,
    stock_qty: 2
  }, {
    "sku": "102-S-GRN",
    "size": "Маленький",
    "color": "Зеленый",
    "price": 100,
    stock_qty: 3
  }, {
    "sku": "102-M-GRN",
    "size": "Средний",
    "color": "Зеленый",
    "price": 120,
    stock_qty: 0
  }, {
    "sku": "102-L-BLU",
    "size": "Большой",
    "color": "Синий",
    "price": 150,
    stock_qty: 0
  }]
}, {
  id: 3,
  name: "Чемодан 3",
  description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
  oldPrice: 10500,
  currentPrice: 7650,
  isHit: true,
  category_slug: "clothing",
  images: [{
    primary: true,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }],
  attributes: [{
    name: "Размер",
    sku_key: "size",
    options: ["Маленький", "Средний", "Большой"]
  }, {
    name: "Цвет",
    sku_key: "color",
    options: ["Синий", "Зеленый", "Красный"]
  }],
  available_skus: []
}, {
  id: 4,
  name: "Чемодан 4",
  description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
  oldPrice: 8500,
  currentPrice: 4450,
  isHit: true,
  category_slug: "clothing",
  images: [{
    primary: true,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }],
  attributes: [{
    name: "Размер",
    sku_key: "size",
    options: ["Маленький", "Средний", "Большой"]
  }],
  available_skus: [{
    "sku": "104-S",
    "size": "Маленький",
    "price": 100,
    stock_qty: 2
  }, {
    "sku": "104-M",
    "size": "Средний",
    "price": 120,
    stock_qty: 0
  }]
}, {
  id: 5,
  name: "Чемодан 5",
  description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
  oldPrice: 4500,
  currentPrice: 3350,
  isHit: true,
  category_slug: "clothing",
  images: [{
    primary: true,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }, {
    primary: false,
    image: "/img/merch/test.png"
  }],
  attributes: [{
    name: "Размер",
    sku_key: "size",
    options: ["Маленький", "Средний", "Большой"]
  }, {
    name: "Цвет",
    sku_key: "color",
    options: ["Синий", "Зеленый", "Красный"]
  }, {
    name: "Материал",
    sku_key: "material",
    options: ["Металл", "Пластик"]
  }],
  available_skus: [{
    sku: "104-S-BLUE-PLASTIC",
    size: "Маленький",
    color: "Синий",
    material: "Пластик",
    price: 1000,
    stock_qty: 2
  }, {
    sku: "104-S-BLUE-METAL",
    size: "Маленький",
    color: "Синий",
    material: "Металл",
    price: 2000,
    stock_qty: 0
  }, {
    sku: "104-S-RED-PLASTIC",
    size: "Маленький",
    color: "Красный",
    material: "Пластик",
    price: 2000,
    stock_qty: 0
  }]
}];
var WISHLIST_STORAGE_KEY = 'merchWishlistIds';
var SHOPPING_CART_KEY = 'shoppingCart';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ProductDetailModal",
  components: {
    NotificationModal: _modules_shop_components_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    ProductCard: _ProductCard_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      "default": null
    }
  },
  emits: ['close', 'toggle-wishlist', 'change-detail-product'],
  data: function data() {
    return {
      vSwiperRef: null,
      vSwiperIndex: 0,
      carouselResponsive: [{
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
      }],
      otherProducts: MOCK_PRODUCTS_DB,
      isInWishlist: false,
      isNotificationVisible: false,
      selectedAttributes: {},
      currentSKU: null,
      activeAttributeOptions: {}
    };
  },
  computed: {
    swiperOptions: function swiperOptions() {
      return {
        direction: 'vertical',
        slidesPerView: 4,
        mousewheel: true,
        spaceBetween: 12,
        loop: false
      };
    },
    isInStock: function isInStock() {
      var _this$product;
      if (!((_this$product = this.product) !== null && _this$product !== void 0 && (_this$product = _this$product.available_skus) !== null && _this$product !== void 0 && _this$product.length)) {
        return false;
      }
      return !!this.currentSKU && this.currentSKU.stock_qty > 0;
    },
    finalPrice: function finalPrice() {
      var _this$product2;
      return this.currentSKU ? this.currentSKU.price.toLocaleString() : (_this$product2 = this.product) !== null && _this$product2 !== void 0 && _this$product2.currentPrice ? this.product.currentPrice.toLocaleString() : 'Цену уточняйте';
    },
    isVariantSelectionPossible: function isVariantSelectionPossible() {
      return this.product && this.product.attributes && this.product.attributes.length > 0;
    },
    primaryImageUrl: function primaryImageUrl() {
      var _this$product3;
      if (!((_this$product3 = this.product) !== null && _this$product3 !== void 0 && (_this$product3 = _this$product3.images) !== null && _this$product3 !== void 0 && _this$product3.length)) return '';
      var images = this.product.images;
      var primaryImageObj = images.find(function (img) {
        return img.primary === true;
      });
      var secondaryImages = images.filter(function (img) {
        return img.primary !== true;
      });
      var sortedImages = [];
      if (primaryImageObj) {
        sortedImages.push(primaryImageObj);
      }
      sortedImages.push.apply(sortedImages, _toConsumableArray(secondaryImages));
      return sortedImages;
    }
  },
  methods: {
    onSwiperReady: function onSwiperReady(swiper) {
      this.vSwiperRef = swiper;
      this.vSwiperIndex = swiper.activeIndex;
    },
    goToSpecificSlide: function goToSpecificSlide(targetIndex) {
      if (this.vSwiperRef) {
        this.vSwiperRef.slideTo(targetIndex);
        this.vSwiperIndex = targetIndex;
      }
    },
    closeModal: function closeModal() {
      this.$emit('close');
    },
    checkInWishlist: function checkInWishlist() {
      var _this$product4;
      if (!((_this$product4 = this.product) !== null && _this$product4 !== void 0 && _this$product4.id)) {
        this.isInWishlist = false;
        return;
      }
      var stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      var wishlistIds = stored ? JSON.parse(stored) : [];
      this.isInWishlist = wishlistIds.includes(this.product.id);
    },
    initializeVariantSelection: function initializeVariantSelection(product) {
      var _this = this;
      if (!this.isVariantSelectionPossible) {
        var hasStock = product.available_skus.some(function (sku) {
          return sku.stock_qty > 0;
        });
        this.currentSKU = {
          price: product.currentPrice,
          stock_qty: hasStock ? 1 : 0,
          sku: product.available_skus.length > 0 ? product.available_skus[0].sku : null
        };
        this.selectedAttributes = {};
        this.activeAttributeOptions = {};
        return;
      }
      var initialSelection = {};
      var availableSkus = product.available_skus;
      var leadingAttribute = product.attributes[0];
      if (leadingAttribute && leadingAttribute.options.length > 0) {
        this.$set(initialSelection, leadingAttribute.name, leadingAttribute.options[0]);
      }
      product.attributes.forEach(function (attr) {
        if (attr.name !== leadingAttribute.name) {
          _this.$set(initialSelection, attr.name, null);
        }
      });
      this.selectedAttributes = initialSelection;
      this.recalculateActiveOptions(product, availableSkus);
      this.autoSelectFirstAvailable(product, availableSkus);
      this.findAndUpdateSKU(product, availableSkus);
    },
    handleAttributeChange: function handleAttributeChange(changedAttrName, newValue) {
      var product = this.product;
      var availableSkus = product.available_skus;
      this.$set(this.selectedAttributes, changedAttrName, newValue);
      this.recalculateActiveOptions(product, availableSkus);
      this.findAndUpdateSKU(product, availableSkus);
    },
    recalculateActiveOptions: function recalculateActiveOptions(product, availableSkus) {
      var newActiveOptions = {};
      var currentSelections = this.selectedAttributes;
      var attributes = product.attributes;
      attributes.forEach(function (attr) {
        var currentAttrOptions = new Set();
        var currentAttrKey = attr.sku_key;
        var matchingSkus = availableSkus.filter(function (sku) {
          var matches = true;
          attributes.forEach(function (checkAttr) {
            var checkAttrName = checkAttr.name;
            var selectedValue = currentSelections[checkAttrName];
            var checkSkuKey = checkAttr.sku_key;
            if (selectedValue !== null && sku[checkSkuKey] !== selectedValue) {
              matches = false;
            }
          });
          return matches;
        });
        matchingSkus.forEach(function (sku) {
          if (sku[currentAttrKey]) {
            currentAttrOptions.add(sku[currentAttrKey]);
          }
        });
        newActiveOptions[attr.name] = Array.from(currentAttrOptions).sort();
      });
      this.activeAttributeOptions = newActiveOptions;
    },
    autoSelectFirstAvailable: function autoSelectFirstAvailable(product, availableSkus) {
      var _this2 = this;
      var selectionChanged = false;
      var attributes = product.attributes;
      attributes.forEach(function (attr) {
        var attrName = attr.name;
        var currentSelection = _this2.selectedAttributes[attrName];
        var availableOptions = _this2.activeAttributeOptions[attrName] || [];
        var isAvailableInNextStep = availableOptions.length > 0;
        var isSelectionInvalid = currentSelection && !availableOptions.includes(currentSelection);
        if (isSelectionInvalid) {
          if (isAvailableInNextStep) {
            var firstValidOption = availableOptions[0];
            if (_this2.selectedAttributes[attrName] !== firstValidOption) {
              _this2.$set(_this2.selectedAttributes, attrName, firstValidOption);
              selectionChanged = true;
            }
          } else {
            var _attributes$;
            var leadingAttributeName = (_attributes$ = attributes[0]) === null || _attributes$ === void 0 ? void 0 : _attributes$.name;
            if (attrName !== leadingAttributeName) {
              if (_this2.selectedAttributes[attrName] !== null) {
                _this2.$set(_this2.selectedAttributes, attrName, null);
                selectionChanged = true;
              }
            }
          }
        } else if (currentSelection === null && isAvailableInNextStep) {
          var _firstValidOption = availableOptions[0];
          if (_this2.selectedAttributes[attrName] !== _firstValidOption) {
            _this2.$set(_this2.selectedAttributes, attrName, _firstValidOption);
            selectionChanged = true;
          }
        }
      });
      if (selectionChanged) {
        this.recalculateActiveOptions(product, availableSkus);
      }
    },
    findAndUpdateSKU: function findAndUpdateSKU(product, availableSkus) {
      var _this3 = this;
      if (!this.isVariantSelectionPossible) {
        var _foundSKU = availableSkus.find(function (sku) {
          return sku.stock_qty > 0;
        }) || availableSkus[0];
        this.currentSKU = _foundSKU || {
          price: product.currentPrice,
          stock_qty: 0,
          sku: null
        };
        return;
      }
      var requiredAttrsCount = product.attributes.length;
      var selectedAttrsCount = Object.values(this.selectedAttributes).filter(function (v) {
        return v !== null;
      }).length;
      if (selectedAttrsCount < requiredAttrsCount) {
        this.currentSKU = null;
        return;
      }
      var foundSKU = availableSkus.find(function (sku) {
        return product.attributes.every(function (attr) {
          var skuKey = attr.sku_key;
          return sku[skuKey] === _this3.selectedAttributes[attr.name];
        });
      });
      this.currentSKU = foundSKU || null;
    },
    getCartFromStorage: function getCartFromStorage() {
      var cartData = localStorage.getItem(SHOPPING_CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    },
    saveCartToStorage: function saveCartToStorage(cart) {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    },
    addToCart: function addToCart() {
      if (!this.currentSKU || this.currentSKU.stock_qty <= 0) {
        this.isNotificationVisible = true;
        return;
      }
      var cart = this.getCartFromStorage();
      var productId = this.product.id;
      var currentSKUData = this.currentSKU;
      var sku = currentSKUData.sku;
      var requestedQuantity = this.quantity || 1;
      var availableStock = currentSKUData.stock_qty;
      var existingItemIndex = cart.findIndex(function (item) {
        return item.productId === productId && item.sku === sku;
      });
      var finalQuantity = requestedQuantity;
      var quantityAddedLog = "\u0417\u0430\u043F\u0440\u043E\u0448\u0435\u043D\u043E: ".concat(requestedQuantity);
      if (existingItemIndex !== -1) {
        var currentCartQuantity = cart[existingItemIndex].quantity;
        var potentialTotal = currentCartQuantity + requestedQuantity;
        if (potentialTotal > availableStock) {
          finalQuantity = availableStock - currentCartQuantity;
          quantityAddedLog = "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0432\u0441\u0435\u0433\u043E ".concat(availableStock, ". \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ").concat(finalQuantity, " \u0448\u0442. (\u0432\u043C\u0435\u0441\u0442\u043E \u0437\u0430\u043F\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0445 ").concat(requestedQuantity, ")");
          if (finalQuantity <= 0) {
            //TODO: Если в корзине уже ровно столько, сколько есть на складе
            alert('Извините, достигнут лимит. Это максимально возможное количество товаров в наличии');
            return;
          }
          cart[existingItemIndex].quantity = availableStock;
        } else {
          cart[existingItemIndex].quantity = potentialTotal;
        }
      } else {
        if (requestedQuantity > availableStock) {
          finalQuantity = availableStock;
          quantityAddedLog = "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E ".concat(availableStock, " \u0448\u0442. (\u0438\u0437 \u0437\u0430\u043F\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0445 ").concat(requestedQuantity, ")");
        }
        var cartItem = {
          productId: productId,
          sku: sku,
          name: this.product.name,
          image: this.primaryImageUrl,
          current_sku: this.currentSKU,
          quantity: finalQuantity,
          attributes: this.product.attributes
        };
        cart.push(cartItem);
      }
      this.saveCartToStorage(cart);
      _event_bus__WEBPACK_IMPORTED_MODULE_1__["default"].$emit('cart-updated');
      this.isNotificationVisible = false;
    }
  },
  watch: {
    product: {
      immediate: true,
      handler: function handler(newProduct) {
        if (newProduct) {
          this.initializeVariantSelection(newProduct);
          this.checkInWishlist();
        } else {
          this.currentSKU = null;
          this.selectedAttributes = {};
          this.activeAttributeOptions = {};
        }
      }
    }
  },
  mounted: function mounted() {
    _event_bus__WEBPACK_IMPORTED_MODULE_1__["default"].$on('update-favorites', this.checkInWishlist);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductCard_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCard.vue */ "./resources/js/client/modules/shop/components/ProductCard.vue");
/* harmony import */ var _PromoBlock_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PromoBlock.vue */ "./resources/js/client/modules/shop/components/PromoBlock.vue");
/* harmony import */ var _ProductDetailModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductDetailModal.vue */ "./resources/js/client/modules/shop/components/ProductDetailModal.vue");
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../event-bus */ "./resources/js/event-bus.js");
/* harmony import */ var _OrderForm_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrderForm.vue */ "./resources/js/client/modules/shop/components/OrderForm.vue");
/* harmony import */ var _data_platform_data_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/platform_data.json */ "./resources/js/client/modules/shop/data/platform_data.json");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }






var WISHLIST_STORAGE_KEY = 'merchWishlistIds';
var WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';
var FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';
var ITEMS_PER_PAGE = 12;
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ProductList',
  components: {
    OrderModal: _OrderForm_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ProductDetailModal: _ProductDetailModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    PromoBlock: _PromoBlock_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ProductCard: _ProductCard_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      allProducts: [{
        id: 1,
        name: "Чемодан \"В ПУТЬ\" (Общая Акция)",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 5500,
        currentPrice: 3650,
        isHit: true,
        category_slug: "clothing",
        images: [{
          primary: true,
          image: "/img/previews/Module_02/2.0.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.1.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.2.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.3.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.4.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.5.png"
        }],
        attributes: [{
          name: "Размер",
          sku_key: "size",
          options: ["Маленький", "Средний", "Большой"]
        }, {
          name: "Цвет",
          sku_key: "color",
          options: ["Синий", "Зеленый", "Красный"]
        }],
        available_skus: [{
          "sku": "101-M-BLU",
          "size": "Средний",
          "color": "Синий",
          "price": 120,
          stock_qty: 4
        }, {
          "sku": "101-M-GRN",
          "size": "Средний",
          "color": "Зеленый",
          "price": 120,
          stock_qty: 0
        }, {
          "sku": "101-L-BLU",
          "size": "Большой",
          "color": "Синий",
          "price": 150,
          stock_qty: 0
        }, {
          "sku": "101-L-RED",
          "size": "Большой",
          "color": "Красный",
          "price": 150,
          stock_qty: 2
        }]
      }, {
        id: 2,
        name: "Чемодан",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 5500,
        currentPrice: 3650,
        isHit: true,
        category_slug: "clothing",
        images: [{
          primary: true,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }],
        attributes: [{
          name: "Размер",
          sku_key: "size",
          options: ["Маленький", "Средний", "Большой"]
        }, {
          name: "Цвет",
          sku_key: "color",
          options: ["Синий", "Зеленый", "Красный"]
        }],
        available_skus: [{
          "sku": "102-S-BLU",
          "size": "Маленький",
          "color": "Синий",
          "price": 100,
          stock_qty: 2
        }, {
          "sku": "102-S-GRN",
          "size": "Маленький",
          "color": "Зеленый",
          "price": 100,
          stock_qty: 3
        }, {
          "sku": "102-M-GRN",
          "size": "Средний",
          "color": "Зеленый",
          "price": 120,
          stock_qty: 0
        }, {
          "sku": "102-L-BLU",
          "size": "Большой",
          "color": "Синий",
          "price": 150,
          stock_qty: 0
        }]
      }, {
        id: 3,
        name: "Чемодан 3",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 10500,
        currentPrice: 7650,
        isHit: true,
        category_slug: "clothing",
        images: [{
          primary: true,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }],
        attributes: [{
          name: "Размер",
          sku_key: "size",
          options: ["Маленький", "Средний", "Большой"]
        }, {
          name: "Цвет",
          sku_key: "color",
          options: ["Синий", "Зеленый", "Красный"]
        }],
        available_skus: []
      }, {
        id: 4,
        name: "Чемодан 4",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 8500,
        currentPrice: 4450,
        isHit: true,
        category_slug: "clothing",
        images: [{
          primary: true,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }, {
          primary: false,
          image: "/img/merch/test.png"
        }],
        attributes: [{
          name: "Размер",
          sku_key: "size",
          options: ["Маленький", "Средний", "Большой"]
        }],
        available_skus: [{
          "sku": "104-S",
          "size": "Маленький",
          "price": 100,
          stock_qty: 2
        }, {
          "sku": "104-M",
          "size": "Средний",
          "price": 120,
          stock_qty: 0
        }]
      }, {
        id: 5,
        name: "Чемодан 5",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 4500,
        currentPrice: 3350,
        isHit: true,
        category_slug: "clothing",
        images: [{
          primary: true,
          image: "/img/previews/Module_02/2.0.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.1.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.2.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.3.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.4.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.5.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.6.png"
        }, {
          primary: false,
          image: "/img/previews/Module_02/2.7.png"
        }],
        attributes: [{
          name: "Размер",
          sku_key: "size",
          options: ["Маленький", "Средний", "Большой"]
        }, {
          name: "Цвет",
          sku_key: "color",
          options: ["Синий", "Зеленый", "Красный"]
        }, {
          name: "Материал",
          sku_key: "material",
          options: ["Металл", "Пластик"]
        }],
        available_skus: [{
          sku: "104-S-BLUE-PLASTIC",
          size: "Маленький",
          color: "Синий",
          material: "Пластик",
          price: 1000,
          stock_qty: 2
        }, {
          sku: "104-S-BLUE-METAL",
          size: "Маленький",
          color: "Синий",
          material: "Металл",
          price: 2000,
          stock_qty: 0
        }, {
          sku: "104-S-RED-PLASTIC",
          size: "Маленький",
          color: "Красный",
          material: "Пластик",
          price: 2000,
          stock_qty: 0
        }]
      }, {
        id: 7,
        name: 'Аксессуар А',
        description: 'Наше авторское обучение для людей которые хотят работать в сфере туризма на ' + 'полную или частичную занятость, или путешествовать с огромными скидками.',
        oldPrice: 1500,
        currentPrice: 1200,
        images: [{
          primary: true,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }],
        parameters: [{
          name: 'Цвет',
          value: ['Белый', 'Серый', 'Красный']
        }],
        maxCount: 1,
        isHit: false,
        category_slug: 'accessories'
      }, {
        id: 11,
        name: 'Товар Т1',
        description: 'Наше авторское обучение для людей которые хотят работать в сфере туризма на ' + 'полную или частичную занятость, или путешествовать с огромными скидками.',
        oldPrice: 5500,
        currentPrice: 3650,
        images: [{
          primary: true,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }, {
          primary: false,
          image: '/img/merch/test.png'
        }],
        parameters: [{
          name: 'Размер',
          value: ['Маленький', 'Средний', 'Большой']
        }],
        maxCount: 1,
        isHit: false,
        category_slug: 'travelGoods'
      }],
      wishlistIds: [],
      wishlistFullData: [],
      displayedCount: ITEMS_PER_PAGE,
      promoBlocks: [],
      shuffledPromoBlocks: [],
      currentFilterTag: 'clothing',
      currentSort: 'default',
      isDetailVisible: false,
      modalProductData: null,
      isInWishList: false,
      platformData: []
    };
  },
  computed: {
    filteredProducts: function filteredProducts() {
      var _this = this;
      if (!this.currentFilterTag || this.currentFilterTag === 'all') {
        return this.allProducts;
      }
      return this.allProducts.filter(function (p) {
        return p.category_slug === _this.currentFilterTag;
      });
    },
    sortedAndFilteredProducts: function sortedAndFilteredProducts() {
      var list = _toConsumableArray(this.filteredProducts);
      var sortValue = this.currentSort;
      list.sort(function (a, b) {
        switch (sortValue) {
          case 'price_asc':
            return Number(a.currentPrice) - Number(b.currentPrice);
          case 'price_desc':
            return Number(b.currentPrice) - Number(a.currentPrice);
          case 'name_a_z':
            return a.name.localeCompare(b.name);
          case 'name_z_a':
            return b.name.localeCompare(a.name);
          case 'default':
          default:
            return a.id - b.id;
        }
      });
      return list;
    },
    displayedGroups: function displayedGroups() {
      var groups = [];
      var productsToShow = this.sortedAndFilteredProducts.slice(0, this.displayedCount);
      var productsPerGroup = 6;
      for (var i = 0; i < productsToShow.length; i += productsPerGroup) {
        var groupProducts = productsToShow.slice(i, i + productsPerGroup);
        var shouldInsertPromo = i + productsPerGroup < productsToShow.length || groupProducts.length > 0;
        if (shouldInsertPromo) {
          var promoIndex = Math.floor(i / productsPerGroup) % this.shuffledPromoBlocks.length;
          groups.push({
            products: groupProducts,
            promo: this.shuffledPromoBlocks[promoIndex]
          });
        } else {
          groups.push({
            products: groupProducts,
            promo: null
          });
        }
      }
      return groups;
    },
    canLoadMore: function canLoadMore() {
      return this.displayedCount < this.sortedAndFilteredProducts.length;
    }
  },
  watch: {
    currentSort: function currentSort() {
      this.saveFiltersAndSort();
    },
    currentFilterTag: function currentFilterTag() {
      this.saveFiltersAndSort();
    },
    wishlistIds: function wishlistIds(newIds) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newIds));
      _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$emit('update-favorites', this.wishlistFullData);
    },
    wishlistFullData: function wishlistFullData(newData) {
      localStorage.setItem(WISHLIST_FULL_DATA_KEY, JSON.stringify(newData));
      _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$emit('update-favorites', newData.length);
      _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$emit('update-favorites-products', newData);
    }
  },
  methods: {
    initializePromo: function initializePromo() {
      this.shuffledPromoBlocks = _toConsumableArray(this.promoBlocks);
      shuffleArray(this.shuffledPromoBlocks);
    },
    getProductInWishlist: function getProductInWishlist(productId) {
      return this.wishlistIds.includes(productId);
    },
    openModalFromCard: function openModalFromCard(product) {
      this.modalProductData = product;
      this.isDetailVisible = true;
      this.isInWishList = this.getProductInWishlist(product.id);
      this.updateBrowserUrl(product.id);
      document.body.classList.add('no-scroll');
    },
    closeModal: function closeModal() {
      this.isDetailVisible = false;
      this.modalProductData = null;
      this.updateBrowserUrl(null);
      document.body.classList.remove('no-scroll');
    },
    updateBrowserUrl: function updateBrowserUrl(productId) {
      var baseUrl = window.location.pathname.split('?')[0];
      var newUrl = productId ? "".concat(baseUrl, "?product=").concat(productId) : baseUrl;
      window.history.replaceState({}, '', newUrl);
    },
    loadMore: function loadMore() {
      this.displayedCount += ITEMS_PER_PAGE;
    },
    loadFromStorage: function loadFromStorage(key) {
      try {
        var stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 localStorage (".concat(key, "):"), e);
        return null;
      }
    },
    loadWishlist: function loadWishlist() {
      this.wishlistIds = this.loadFromStorage(WISHLIST_STORAGE_KEY) || [];
      this.wishlistFullData = this.loadFromStorage(WISHLIST_FULL_DATA_KEY) || [];
    },
    handleWishlist: function handleWishlist(product) {
      var productId = product.id;
      var index = this.wishlistIds.indexOf(productId);
      if (index === -1) {
        this.wishlistIds.push(productId);
        if (!this.wishlistFullData.some(function (p) {
          return p.id === productId;
        })) {
          this.wishlistFullData.push(product);
        }
      } else {
        this.wishlistIds.splice(index, 1);
        this.wishlistFullData = this.wishlistFullData.filter(function (p) {
          return p.id !== productId;
        });
      }
      _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$emit('update-favorites');
    },
    changeDetailProduct: function changeDetailProduct(product) {
      this.modalProductData = product;
      this.updateBrowserUrl(product.id);
    },
    loadFiltersAndSortFromStorage: function loadFiltersAndSortFromStorage() {
      var stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);
      if (stored) {
        if (stored.tag) this.currentFilterTag = stored.tag;
        if (stored.sort) this.currentSort = stored.sort;
      }
    },
    saveFiltersAndSort: function saveFiltersAndSort() {
      try {
        var dataToSave = {
          tag: this.currentFilterTag,
          sort: this.currentSort
        };
        localStorage.setItem(FILTERS_SORT_STORAGE_KEY, JSON.stringify(dataToSave));
        _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$emit('tab-sort-changed');
      } catch (e) {
        console.error("Не удалось сохранить фильтры/сортировку в localStorage:", e);
      }
    },
    getPlatformData: function getPlatformData() {
      var TEMPLATES = _data_platform_data_json__WEBPACK_IMPORTED_MODULE_5__.TEMPLATES;
      var PLATFORM_DATA_RAW = _data_platform_data_json__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_DATA;
      if (PLATFORM_DATA_RAW) {
        this.platformData = PLATFORM_DATA_RAW.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            template: TEMPLATES[item.template]
          });
        });
      }
      this.promoBlocks = this.generatePromoBlocks();
    },
    generatePromoBlocks: function generatePromoBlocks() {
      return this.platformData.map(function (platform) {
        return {
          id: "promo".concat(platform.idSuffix),
          title: platform.template.title,
          description: "\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0443 \u043D\u0430\u0441 \u0432 ".concat(platform.platformName),
          imageUrl: platform.imageUrl,
          type: 'promo',
          url: platform.url
        };
      });
    },
    closeDetailModal: function closeDetailModal() {
      this.isDetailVisible = false;
    }
  },
  mounted: function mounted() {
    this.getPlatformData();
    this.loadWishlist();
    this.loadFiltersAndSortFromStorage();
    this.initializePromo();
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$on('tab-sort-changed', this.loadFiltersAndSortFromStorage);
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$on('open-product-modal', this.openModalFromCard);
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$on('toggle-product-wishlist', this.handleWishlist);
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$on('cart-updated', this.closeDetailModal);
    var urlParams = new URLSearchParams(window.location.search);
    var productIdFromUrl = urlParams.get('product');
    if (productIdFromUrl) {
      var productToOpen = this.allProducts.find(function (p) {
        return String(p.id) === productIdFromUrl;
      });
      if (productToOpen) {
        this.openModalFromCard(productToOpen);
      } else {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  },
  beforeUnmount: function beforeUnmount() {
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$off('tab-sort-changed', this.loadFiltersAndSortFromStorage);
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$off('open-product-modal', this.openModalFromCard);
    _event_bus__WEBPACK_IMPORTED_MODULE_3__["default"].$off('toggle-product-wishlist', this.handleWishlist);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PromoBlock',
  props: {
    promoData: {
      type: Object,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "tour-store"
  }, [_c("app-header", {
    staticClass: "hero-section-absolute hero-section_dark"
  }), _vm._v(" "), _c("main", {
    staticClass: "content-wrapper container-xl"
  }, [_c("section", {
    staticClass: "category-filters"
  }, [_c("NavigationTabs")], 1), _vm._v(" "), _c("ProductList")], 1), _vm._v(" "), _c("app-footer")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "sidebar-favorites sidebar-overlay",
    "class": {
      active: _vm.isActive
    }
  }, [_vm.isActive ? _c("div", {
    staticClass: "overlay-backdrop",
    on: {
      click: function click($event) {
        return _vm.$emit("close");
      }
    }
  }) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "sidebar-content",
    "class": {
      active: _vm.isActive
    }
  }, [_c("header", {
    staticClass: "sidebar-header"
  }, [_c("h2", {
    staticClass: "fw-bolder"
  }, [_vm._v("Избранное")]), _vm._v(" "), _c("button", {
    staticClass: "close-button",
    on: {
      click: function click($event) {
        return _vm.$emit("close");
      }
    }
  }, [_vm._v("\n                ×\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "sidebar-body"
  }, [_vm.items.length === 0 ? _c("div", {
    staticClass: "empty-message"
  }, [_vm._v("\n                Список избранного пуст.\n            ")]) : _vm._e(), _vm._v(" "), _vm._l(_vm.items, function (item) {
    return _c("div", {
      key: item.id,
      staticClass: "sidebar-item align-items-start cursor-pointer",
      on: {
        click: function click($event) {
          return _vm.openProductModal(item);
        }
      }
    }, [_c("div", {
      staticClass: "sidebar-item-content"
    }, [_c("div", {
      staticClass: "image-wrapper"
    }, [_c("button", {
      staticClass: "close-button position-absolute color-white mt-2",
      on: {
        click: function click($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return _vm.eventBus.$emit("toggle-product-wishlist", item);
        }
      }
    }, [_vm._v("\n                            ×\n                        ")]), _vm._v(" "), _c("img", {
      staticClass: "item-image",
      attrs: {
        src: _vm.getPrimaryImageUrl(item),
        alt: "Product Image"
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "detail-info-section"
    }, [_c("h3", {
      staticClass: "product-title"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c("div", {
      staticClass: "item-details"
    }, _vm._l(item.attributes, function (attribute) {
      return _c("div", {
        staticClass: "info-parameter pb-3"
      }, [_c("p", {
        staticClass: "item-name"
      }, [_vm._v(_vm._s(attribute.name) + ":")]), _vm._v(" "), _c("p", {
        staticClass: "item-value"
      }, [_vm._v("\n                                    " + _vm._s(attribute.options.join(", ")) + "\n                                ")])]);
    }), 0), _vm._v(" "), item.currentPrice ? _c("p", {
      staticClass: "product-price fw-bold fs-3"
    }, [_vm._v("\n                            " + _vm._s(item.currentPrice) + " р.\n                        ")]) : _vm._e()])])]);
  })], 2)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "header-controls-container"
  }, [_vm.isActiveSearch ? _c("div", {
    staticClass: "sidebar-search-top sidebar-overlay",
    "class": {
      active: _vm.isActiveSearch
    },
    on: {
      click: function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        return _vm.closeSearchOverlay.apply(null, arguments);
      }
    }
  }, [_c("header", {
    staticClass: "sidebar-header"
  }, [_c("div", {
    staticClass: "container search-modal-wrap-search"
  }, [_c("div", {
    staticClass: "search-modal-inside"
  }, [_c("div", {
    staticClass: "search-modal-inside-input"
  }, [_c("svg", {
    attrs: {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "M20.2654 21L13.7684 14.503C13.2496 14.945 12.653 15.287 11.9786 15.5291C11.3042 15.7712 10.6264 15.8922 9.94507 15.8922C8.28363 15.8922 6.87743 15.3171 5.72646 14.1668C4.57549 13.0158 4 11.61 4 9.94922C4 8.28848 4.57479 6.88192 5.72438 5.72957C6.87466 4.57652 8.28018 4 9.94092 4C11.6024 4 13.0093 4.57549 14.1616 5.72646C15.314 6.87743 15.8901 8.28398 15.8901 9.94611C15.8901 10.6669 15.7625 11.3644 15.5073 12.0388C15.2514 12.7132 14.9159 13.2901 14.5009 13.7694L20.9979 20.2654L20.2654 21ZM9.94507 14.8536C11.3215 14.8536 12.4839 14.3798 13.4322 13.4322C14.3798 12.4846 14.8536 11.3222 14.8536 9.94507C14.8536 8.56861 14.3798 7.40657 13.4322 6.45896C12.4846 5.51134 11.3226 5.03753 9.94611 5.03753C8.56965 5.03753 7.40726 5.51134 6.45896 6.45896C5.51134 7.40657 5.03753 8.56861 5.03753 9.94507C5.03753 11.3215 5.51134 12.4836 6.45896 13.4312C7.40657 14.3788 8.56861 14.8536 9.94507 14.8536Z",
      fill: "#222222"
    }
  })]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.searchQuery,
      expression: "searchQuery"
    }],
    attrs: {
      type: "text",
      placeholder: "Поиск...",
      value: ""
    },
    domProps: {
      value: _vm.searchQuery
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        _vm.isActiveSearch = false;
      },
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.searchQuery = $event.target.value;
      }
    }
  })]), _vm._v(" "), _vm.isActiveSearch ? _c("div", {
    staticClass: "search-modal-inside-find",
    on: {
      click: _vm.closeSearchOverlay
    }
  }, [_c("svg", {
    attrs: {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "M8.53336 24.4107L7.58936 23.4667L15.056 16L7.58936 8.53336L8.53336 7.58936L16 15.056L23.4667 7.58936L24.4107 8.53336L16.944 16L24.4107 23.4667L23.4667 24.4107L16 16.944L8.53336 24.4107Z",
      fill: "#222222"
    }
  })])]) : _vm._e()])])]), _vm._v(" "), _vm.searchQuery.trim().length > 0 ? _c("div", {
    staticClass: "sidebar-body"
  }, [_c("div", {
    staticClass: "container search-modal-wrap-result",
    "class": {
      active: _vm.searchQuery.trim().length > 0
    }
  }, [_c("div", {
    staticClass: "search-modal-result"
  }, [_c("h3", [_vm._v(_vm._s(_vm.countSearch) + " результатов по запросу: " + _vm._s(_vm.searchQuery))]), _vm._v(" "), _c("div", {
    staticClass: "search-modal-result-items"
  }, _vm._l(_vm.searchResults, function (product) {
    return _c("ProductCard", {
      key: product.id,
      attrs: {
        product: product
      },
      on: {
        click: function click($event) {
          return _vm.openModalFromCard(product);
        }
      }
    });
  }), 1)])])]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "align-items-center d-flex flex-wrap gap-2 justify-content-end justify-content-sm-between navigation-tabs"
  }, [_c("div", {
    staticClass: "d-flex align-items-center gap-2 flex-wrap"
  }, [_c("h2", {
    staticClass: "fw-bolder pe-3"
  }, [_vm._v("Наш мерч:")]), _vm._v(" "), _vm._l(_vm.tabs, function (tab) {
    return _c("button", {
      key: tab.id,
      "class": ["tab-button", {
        active: _vm.activeTab === tab.id
      }],
      attrs: {
        disabled: _vm.activeTab === tab.id
      },
      on: {
        click: function click($event) {
          return _vm.setActiveTab(tab.id);
        }
      }
    }, [_vm._v("\n                " + _vm._s(tab.name) + "\n            ")]);
  })], 2), _vm._v(" "), _c("div", {
    staticClass: "controls-bar action-icons d-flex align-items-center gap-3"
  }, [_c("button", {
    staticClass: "icon-button search",
    attrs: {
      title: "Поиск"
    },
    on: {
      click: _vm.toggleSearchOverlay
    }
  }, [_c("img", {
    attrs: {
      src: "/img/merch/loupe-icon.png",
      alt: "Поиск"
    }
  })]), _vm._v(" "), _c("button", {
    staticClass: "icon-button favorites",
    attrs: {
      title: "Избранное"
    },
    on: {
      click: _vm.toggleFavorites
    }
  }, [_c("img", {
    attrs: {
      src: "/img/merch/like-icon.png",
      alt: "Избранное"
    }
  })]), _vm._v(" "), _c("button", {
    staticClass: "icon-button cart",
    attrs: {
      title: "Корзина"
    },
    on: {
      click: _vm.toggleOrder
    }
  }, [_c("img", {
    attrs: {
      src: "/img/merch/shopping-bag-icon.png",
      alt: "Корзина"
    }
  })])])]), _vm._v(" "), _c("div", {
    staticClass: "sort-control-wrapper text-end"
  }, [_c("div", {
    staticClass: "dropdown sort-control"
  }, [_c("button", {
    staticClass: "btn btn-light dropdown-toggle",
    attrs: {
      type: "button",
      id: "sortButton",
      "data-bs-toggle": "dropdown",
      "aria-expanded": "false"
    }
  }, [_vm._v("\n\n                " + _vm._s(_vm.displaySortText.prefix) + ":\n                "), _c("b", [_vm._v(_vm._s(_vm.displaySortText.value))]), _vm._v(" "), _c("svg", {
    staticClass: "bi bi-chevron-down custom-chevron",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      fill: "#eb2d26",
      viewBox: "0 0 16 16"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    }
  })])]), _vm._v(" "), _c("ul", {
    staticClass: "dropdown-menu",
    attrs: {
      "aria-labelledby": "sortButton"
    }
  }, _vm._l(_vm.sortOptions, function (option) {
    return _c("li", {
      key: option.value
    }, [_c("a", {
      staticClass: "dropdown-item",
      attrs: {
        href: "#"
      },
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.selectSortOption(option);
        }
      }
    }, [_vm._v("\n                        " + _vm._s(option.text) + "\n                    ")])]);
  }), 0)])]), _vm._v(" "), _c("FavoritesSidebar", {
    attrs: {
      isActive: _vm.isFavoritesOpen
    },
    on: {
      close: _vm.closeFavorites
    }
  }), _vm._v(" "), _c("OrderSidebar", {
    attrs: {
      "is-active": _vm.isOrderOpen
    },
    on: {
      close: _vm.closeOrder
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.isVisible ? _c("div", {
    staticClass: "modal-overlay",
    on: {
      click: function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        return _vm.$emit("close");
      }
    }
  }, [_c("div", {
    staticClass: "notification-card"
  }, [_c("div", {
    staticClass: "notification-header d-flex justify-content-end"
  }, [_c("button", {
    staticClass: "close-button",
    on: {
      click: function click($event) {
        return _vm.$emit("close");
      }
    }
  }, [_vm._v("\n                ×\n            ")])]), _vm._v(" "), _vm._m(0)])]) : _vm._e();
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "notification-body w-100"
  }, [_c("h3", {
    staticClass: "fw-bold mb-2"
  }, [_vm._v("Сообщить о поступлении товара")]), _vm._v(" "), _c("p", {
    staticClass: "body-text support-text text-black text-center"
  }, [_vm._v("\n                Выберите удобный способ для оповещения о повторном наличии данного товара\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "notification-inputs d-flex flex-column align-items-center"
  }, [_c("div", {
    staticClass: "notification-inside-input"
  }, [_c("input", {
    staticClass: "notification-input",
    attrs: {
      type: "text",
      placeholder: "Ваш номер телефона"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "notification-inside-input"
  }, [_c("input", {
    staticClass: "notification-input",
    attrs: {
      type: "text",
      placeholder: "Ваш email"
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "notification-button-wrapper text-center"
  }, [_c("button", {
    staticClass: "btn btn-cta notification-btn-close"
  }, [_vm._v("Получить уведомление")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-overlay",
    on: {
      click: function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        return _vm.closeModal.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "modal modal-content modal-content-order"
  }, [_c("div", {
    staticClass: "container-xl order-page-container"
  }, [_c("div", {
    staticClass: "left-column"
  }, [_c("header", {
    staticClass: "nav-header"
  }, [_vm.currentStep === 2 ? _c("button", {
    staticClass: "back-link",
    on: {
      click: _vm.goBack
    }
  }, [_c("svg", {
    staticClass: "icon-arrow",
    attrs: {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
    }
  })]), _vm._v("\n                        Назад\n                    ")]) : _vm._e()]), _vm._v(" "), _c("h2", {
    staticClass: "main-title"
  }, [_vm._v(_vm._s(_vm.currentStep === 1 ? "Доставка" : "Доставка"))]), _vm._v(" "), _vm.currentStep === 1 ? _c("div", {
    staticClass: "form-section"
  }, [_vm._m(0), _vm._v(" "), _c("button", {
    staticClass: "btn-continue",
    on: {
      click: function click($event) {
        return _vm.goToStep(2);
      }
    }
  }, [_vm._v("Продолжить")])]) : _vm._e(), _vm._v(" "), _vm.currentStep === 2 ? _c("div", {
    staticClass: "form-section"
  }, [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _vm._m(6), _vm._v(" "), _c("button", {
    staticClass: "btn-submit",
    on: {
      click: _vm.submitOrder
    }
  }, [_vm._v("Оформить")])]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "right-column"
  }, [_c("h2", {
    staticClass: "order-summary-title"
  }, [_vm._v("Ваш заказ:")]), _vm._v(" "), _vm._m(7), _vm._v(" "), _c("div", {
    staticClass: "price-summary"
  }, [_c("p", {
    staticClass: "total-price"
  }, [_vm._v("К оплате: "), _c("strong", [_vm._v(_vm._s(_vm.order.total))])]), _vm._v(" "), _c("p", {
    staticClass: "delivery-cost"
  }, [_vm._v("\n                        СДЭК (оплачивается при получении): " + _vm._s(803.15) + "\n                        "), _c("br"), _c("small", [_vm._v("Мосальск")])]), _vm._v(" "), _c("div", {
    staticClass: "final-sum"
  }, [_vm._v("\n                        Итоговая сумма: " + _vm._s(_vm.order.total) + "\n                    ")])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "form-group"
  }, [_c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "city",
      placeholder: "Выберите Ваш город"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "fio"
    }
  }, [_vm._v("Ваше ФИО")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "fio"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "phone"
    }
  }, [_vm._v("Ваш номер")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "tel",
      id: "phone"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "email"
    }
  }, [_vm._v("Ваш Email")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "email",
      id: "email"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "address-row"
  }, [_c("div", {
    staticClass: "form-group address-part"
  }, [_c("label", {
    attrs: {
      "for": "street"
    }
  }, [_vm._v("Улица")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "street"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group address-part"
  }, [_c("label", {
    attrs: {
      "for": "home"
    }
  }, [_vm._v("Дом")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "home"
    }
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "address-row"
  }, [_c("div", {
    staticClass: "form-group address-part"
  }, [_c("label", {
    attrs: {
      "for": "entrance"
    }
  }, [_vm._v("Подъезд")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "entrance"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group address-part"
  }, [_c("label", {
    attrs: {
      "for": "apartment"
    }
  }, [_vm._v("Квартира/офис")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "apartment"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group address-part small-gap"
  }, [_c("label", {
    attrs: {
      "for": "floor"
    }
  }, [_vm._v("Этаж")]), _vm._v(" "), _c("input", {
    staticClass: "form-input",
    attrs: {
      type: "text",
      id: "floor"
    }
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "agreement-checkbox"
  }, [_c("input", {
    attrs: {
      type: "checkbox",
      id: "agreement"
    }
  }), _vm._v(" "), _c("label", {
    attrs: {
      "for": "agreement"
    }
  }, [_vm._v("Я согласен/а с политикой конфиденциальности")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "product-card"
  }, [_c("img", {
    staticClass: "product-image",
    attrs: {
      src: "",
      alt: "Чемодан"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "product-details"
  }, [_c("h3", {
    staticClass: "product-name"
  }, [_vm._v('Чемодан "В ПУТЬ"')]), _vm._v(" "), _c("p", [_vm._v("Размер: Средний")]), _vm._v(" "), _c("p", [_vm._v("Цвет: Красный")]), _vm._v(" "), _c("div", {
    staticClass: "quantity-control"
  }, [_c("span", [_vm._v("Количество:")])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "sidebar-overlay",
    "class": {
      active: _vm.isActive
    }
  }, [_vm.isActive ? _c("div", {
    staticClass: "overlay-backdrop",
    on: {
      click: function click($event) {
        return _vm.$emit("close");
      }
    }
  }) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "sidebar-content",
    "class": {
      active: _vm.isActive
    }
  }, [_c("header", {
    staticClass: "sidebar-header"
  }, [_c("h2", {
    staticClass: "fw-bolder"
  }, [_vm._v("Ваш заказ:")]), _vm._v(" "), _c("button", {
    staticClass: "close-button",
    on: {
      click: function click($event) {
        return _vm.$emit("close");
      }
    }
  }, [_vm._v("\n                ×\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "sidebar-body"
  }, [_vm.items.length === 0 ? _c("div", {
    staticClass: "empty-message"
  }, [_vm._v("\n                Корзина пуста. Добавьте в корзину хотя бы один товар\n            ")]) : _vm._e(), _vm._v(" "), _vm._l(_vm.items, function (item) {
    return _c("div", {
      key: item.id,
      staticClass: "sidebar-item align-items-start"
    }, [_c("div", {
      staticClass: "sidebar-item-content"
    }, [_c("div", {
      staticClass: "image-wrapper"
    }, [_c("button", {
      staticClass: "close-button position-absolute color-white mt-2",
      on: {
        click: function click($event) {
          return _vm.removeItem(item);
        }
      }
    }, [_vm._v("\n                            ×\n                        ")]), _vm._v(" "), _c("img", {
      staticClass: "item-image",
      attrs: {
        src: item.image,
        alt: "Product Image"
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "detail-info-section"
    }, [_c("h3", {
      staticClass: "product-title"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c("div", {
      staticClass: "item-details"
    }, _vm._l(item.attributes, function (attribute) {
      return _c("div", {
        staticClass: "info-parameter pb-1"
      }, [_c("p", {
        staticClass: "item-name"
      }, [_vm._v(_vm._s(attribute.name) + ":")]), _vm._v(" "), _c("p", {
        staticClass: "item-value"
      }, [_vm._v("\n                                    " + _vm._s(item.current_sku[attribute.sku_key]) + "\n                                ")])]);
    }), 0), _vm._v(" "), _c("div", {
      staticClass: "quantity-control item-details"
    }, [_c("span", {
      staticClass: "item-name"
    }, [_vm._v("Количество:")]), _vm._v(" "), _c("div", {
      staticClass: "align-items-center d-flex quantity-counter"
    }, [_c("button", {
      staticClass: "quantity-button plus",
      on: {
        click: function click($event) {
          return _vm.updateQuantity(item, 1);
        }
      }
    }, [_vm._v("+")]), _vm._v(" "), _c("span", {
      staticClass: "quantity-value"
    }, [_vm._v(_vm._s(item.quantity))]), _vm._v(" "), _c("button", {
      staticClass: "quantity-button minus",
      on: {
        click: function click($event) {
          return _vm.updateQuantity(item, -1);
        }
      }
    }, [_vm._v("-")])])])])])]);
  }), _vm._v(" "), _vm.items.length !== 0 ? _c("div", {
    staticClass: "order-summary d-flex gap-3"
  }, [_c("div", {
    staticClass: "order-sum"
  }, [_c("p", {
    staticClass: "item-name"
  }, [_vm._v("К оплате:")]), _vm._v(" "), _c("p", {
    staticClass: "item-value"
  }, [_vm._v(_vm._s(_vm.totalPrice) + " р.")])]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-cta py-2",
    on: {
      click: _vm.proceedToCheckout
    }
  }, [_c("span", {
    staticClass: "flare"
  }), _vm._v("\n                    Оформить заказ\n                ")])]) : _vm._e()], 2)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "product-card position-relative",
    on: {
      click: function click($event) {
        return _vm.$emit("click", _vm.product);
      }
    }
  }, [_c("div", {
    staticClass: "product-image-container"
  }, [_c("img", {
    staticClass: "product-img",
    attrs: {
      src: _vm.primaryImageUrl,
      alt: _vm.product.name
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "product-right-info"
  }, [_c("div", {
    staticClass: "product-block-favorites-wrapp wishlist-icon"
  }, [_c("input", {
    staticClass: "product-block-favorites__checkbox",
    attrs: {
      type: "checkbox",
      id: "favorites-heart-prod-" + _vm.product.id,
      name: "favorites-heart-prod-" + _vm.product.id
    },
    domProps: {
      checked: _vm.isInWishlist
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "product-block-favorites__label",
    attrs: {
      "for": "favorites-heart-prod-" + _vm.product.id
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.$emit("toggle-wishlist", _vm.product);
      }
    }
  }, [_c("svg", {
    attrs: {
      width: "30",
      height: "25",
      viewBox: "0 0 20 17",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("defs", [_c("linearGradient", {
    attrs: {
      id: "favoriteGradient",
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%"
    }
  }, [_c("stop", {
    staticStyle: {
      "stop-color": "#dd0024",
      "stop-opacity": "1"
    },
    attrs: {
      offset: "0%"
    }
  }), _vm._v(" "), _c("stop", {
    staticStyle: {
      "stop-color": "#fb6228",
      "stop-opacity": "1"
    },
    attrs: {
      offset: "100%"
    }
  })], 1)], 1), _vm._v(" "), _c("path", {
    attrs: {
      fill: "none",
      d: "M16.019 1.519C13.832 0.483 11.911 2.068 10.698 3.475 10.2 4.054 9.229 3.99 8.774 3.376 7.629 1.835 5.627 0.117 3.163 1.519 -0.385 3.538 1.163 7.519 2.663 9.519 4.398 11.833 7.65 14.466 9.024 15.532 9.395 15.821 9.914 15.8 10.274 15.498 11.806 14.215 14.425 12.104 16.163 10.019 18.955 6.668 19.519 3.176 16.019 1.519Z",
      stroke: "white",
      "stroke-width": "2"
    }
  })])])]), _vm._v(" "), _vm.product.isHit ? _c("div", {
    staticClass: "badge hit-sale"
  }, [_vm._v("ХИТ ПРОДАЖ")]) : _vm._e()])]), _vm._v(" "), _c("div", {
    staticClass: "product-info position-absolute"
  }, [_c("h3", {
    staticClass: "product-name"
  }, [_vm._v(_vm._s(_vm.product.name))]), _vm._v(" "), _c("div", {
    staticClass: "price-info"
  }, [_c("span", {
    staticClass: "old-price"
  }, [_vm._v(_vm._s(_vm.product.oldPrice) + " руб.")]), _vm._v(" "), _c("span", {
    staticClass: "current-price"
  }, [_vm._v(_vm._s(_vm.product.currentPrice) + " руб.")])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$product$images$_v;
  var _vm = this,
    _c = _vm._self._c;
  return _vm.isVisible ? _c("div", {
    staticClass: "modal-backdrop"
  }, [_c("notification-modal", {
    attrs: {
      "is-visible": _vm.isNotificationVisible
    },
    on: {
      close: function close($event) {
        _vm.isNotificationVisible = false;
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "product-header container"
  }, [_c("h2", {
    staticClass: "fw-bold cursor-pointer",
    on: {
      click: _vm.closeModal
    }
  }, [_vm._v("Назад")])]), _vm._v(" "), _vm.product ? _c("div", {
    staticClass: "product-card container"
  }, [_c("div", {
    staticClass: "product-content"
  }, [_c("div", {
    staticClass: "d-flex flex-column gallery-wrapper justify-content-between"
  }, [_c("div", {
    staticClass: "gallery"
  }, [_c("div", {
    staticClass: "image-list"
  }, [_c("swiper", {
    staticClass: "vertical-swiper",
    attrs: {
      options: _vm.swiperOptions
    },
    on: {
      ready: _vm.onSwiperReady
    }
  }, _vm._l(_vm.primaryImageUrl, function (image, idx) {
    return _c("swiper-slide", {
      key: "thumbnail-" + idx
    }, [_c("div", {
      staticClass: "slide image-wrapper position-relative",
      on: {
        click: function click($event) {
          return _vm.goToSpecificSlide(idx);
        }
      }
    }, [_c("img", {
      attrs: {
        src: image.image,
        alt: "Вид-" + idx
      }
    })])]);
  }), 1)], 1), _vm._v(" "),  false ? 0 : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "main-image position-relative"
  }, [_c("div", {
    staticClass: "img-wrapper h-100"
  }, [_c("img", {
    attrs: {
      src: (_vm$product$images$_v = _vm.product.images[_vm.vSwiperIndex]) === null || _vm$product$images$_v === void 0 ? void 0 : _vm$product$images$_v.image,
      alt: "Основное изображение"
    }
  })])])]), _vm._v(" "),  false ? 0 : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "product-details"
  }, [_c("h2", [_vm._v(_vm._s(_vm.product.name))]), _vm._v(" "), _c("p", {
    staticClass: "description"
  }, [_vm._v("\n                        " + _vm._s(_vm.product.description) + "\n                    ")]), _vm._v(" "), _vm.product.available_skus.length > 0 ? _c("div", {
    staticClass: "options"
  }, _vm._l(_vm.product.attributes, function (attr, index) {
    return _c("div", {
      key: attr.name,
      staticClass: "form-group"
    }, [_c("label", {
      attrs: {
        "for": "select-" + attr.name
      }
    }, [_vm._v(_vm._s(attr.name) + ":")]), _vm._v(" "), _c("div", {
      staticClass: "select-wrapper position-relative"
    }, [_c("select", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedAttributes[attr.name],
        expression: "selectedAttributes[attr.name]"
      }],
      staticClass: "custom-select",
      attrs: {
        id: "select-" + attr.name,
        disabled: !_vm.isVariantSelectionPossible
      },
      on: {
        change: [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.$set(_vm.selectedAttributes, attr.name, $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          return _vm.handleAttributeChange(attr.name, _vm.selectedAttributes[attr.name]);
        }]
      }
    }, _vm._l(attr.options, function (option) {
      return _c("option", {
        key: option,
        domProps: {
          value: option
        }
      }, [_vm._v("\n                                        " + _vm._s(option) + "\n                                    ")]);
    }), 0), _vm._v(" "), _c("div", {
      staticClass: "select-icon position-absolute"
    })])]);
  }), 0) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "price-actions"
  }, [_vm.currentSKU ? _c("h2", {
    staticClass: "mb-2"
  }, [_vm._v(_vm._s(_vm.finalPrice) + " руб.")]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "btn-actions d-flex gap-4 align-items-center"
  }, [_c("button", {
    staticClass: "btn btn-cta",
    "class": {
      "out-of-stock": !_vm.isInStock
    },
    on: {
      click: _vm.addToCart
    }
  }, [_vm._v("\n                                " + _vm._s(_vm.isInStock ? "в корзину" : "сообщить о наличии") + "\n                            ")]), _vm._v(" "), _c("div", {
    staticClass: "product-block-favorites-wrapp wishlist-icon"
  }, [_c("input", {
    staticClass: "product-block-favorites__checkbox",
    attrs: {
      type: "checkbox",
      id: "heart-prod-" + _vm.product.id,
      name: "heart-prod-" + _vm.product.id
    },
    domProps: {
      checked: _vm.isInWishlist
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "product-block-favorites__label",
    attrs: {
      "for": "heart-prod-" + _vm.product.id
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.$emit("toggle-wishlist", _vm.product);
      }
    }
  }, [_c("svg", {
    attrs: {
      width: "30",
      height: "25",
      viewBox: "0 0 20 17",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("defs", [_c("linearGradient", {
    attrs: {
      id: "favoriteGradient",
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%"
    }
  }, [_c("stop", {
    staticStyle: {
      "stop-color": "#dd0024",
      "stop-opacity": "1"
    },
    attrs: {
      offset: "0%"
    }
  }), _vm._v(" "), _c("stop", {
    staticStyle: {
      "stop-color": "#fb6228",
      "stop-opacity": "1"
    },
    attrs: {
      offset: "100%"
    }
  })], 1)], 1), _vm._v(" "), _c("path", {
    attrs: {
      fill: "none",
      d: "M16.019 1.519C13.832 0.483 11.911 2.068 10.698 3.475 10.2 4.054 9.229 3.99 8.774 3.376 7.629 1.835 5.627 0.117 3.163 1.519 -0.385 3.538 1.163 7.519 2.663 9.519 4.398 11.833 7.65 14.466 9.024 15.532 9.395 15.821 9.914 15.8 10.274 15.498 11.806 14.215 14.425 12.104 16.163 10.019 18.955 6.668 19.519 3.176 16.019 1.519Z",
      stroke: "black",
      "stroke-width": "2"
    }
  })])])])])])])])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "another-products container"
  }, [_c("h2", {
    staticClass: "fw-bold"
  }, [_vm._v("Другие предложения")]), _vm._v(" "), _c("div", {
    staticClass: "another-products-slider"
  }, [_c("ssr-carousel", {
    attrs: {
      "slides-per-page": 1,
      "paginate-by-slide": "",
      "show-arrows": "",
      responsive: _vm.carouselResponsive
    },
    scopedSlots: _vm._u([{
      key: "back-arrow",
      fn: function fn(_ref) {
        var disabled = _ref.disabled;
        return [_c("span", {
          staticClass: "carousel-left-icon reviews-carousel-left-icon",
          "class": {
            disabled: disabled
          }
        })];
      }
    }, {
      key: "next-arrow",
      fn: function fn(_ref2) {
        var disabled = _ref2.disabled;
        return [_c("div", {
          staticClass: "next-button-container"
        }, [_c("span", {
          staticClass: "carousel-right-icon reviews-carousel-right-icon",
          "class": {
            disabled: disabled
          }
        })])];
      }
    }], null, false, 1606006649)
  }, [_vm._v(" "), _vm._v(" "), _vm._l(_vm.otherProducts, function (otherProduct) {
    return _c("ProductCard", {
      key: otherProduct.id,
      attrs: {
        product: otherProduct
      },
      on: {
        click: function click($event) {
          return _vm.$emit("change-detail-product", otherProduct);
        }
      }
    });
  })], 2)], 1)])])], 1) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "product-list-container"
  }, [ false ? 0 : _vm._e(), _vm._v(" "), _vm.modalProductData ? _c("ProductDetailModal", {
    attrs: {
      "is-visible": _vm.isDetailVisible,
      product: _vm.modalProductData
    },
    on: {
      close: _vm.closeModal,
      "toggle-wishlist": _vm.handleWishlist,
      "change-detail-product": _vm.changeDetailProduct
    }
  }) : _vm._e(), _vm._v(" "), _vm._l(_vm.displayedGroups, function (group, groupIndex) {
    return _c("div", {
      key: "group-".concat(groupIndex)
    }, [_c("div", {
      staticClass: "product-grid"
    }, _vm._l(group.products, function (product) {
      return _c("ProductCard", {
        key: product.id,
        attrs: {
          product: product
        },
        on: {
          "toggle-wishlist": _vm.handleWishlist,
          click: function click($event) {
            return _vm.openModalFromCard(product);
          }
        }
      });
    }), 1), _vm._v(" "), group.promo ? _c("div", {
      staticClass: "promo-block"
    }, [_c("PromoBlock", {
      attrs: {
        "promo-data": group.promo
      }
    })], 1) : _vm._e()]);
  }), _vm._v(" "), _vm.canLoadMore ? _c("div", {
    staticClass: "load-more-container"
  }, [_c("button", {
    staticClass: "load-more-button",
    on: {
      click: _vm.loadMore
    }
  }, [_vm._v("\n            Загрузить еще\n        ")])]) : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "promo-content"
  }, [_c("div", {
    staticClass: "promo-text-block"
  }, [_c("h2", [_vm._v(_vm._s(_vm.promoData.title))]), _vm._v(" "), _c("h3", {
    staticClass: "pb-2"
  }, [_vm._v(_vm._s(_vm.promoData.description))]), _vm._v(" "), _c("a", {
    staticClass: "btn-cta btn-open",
    attrs: {
      href: _vm.promoData.url,
      target: "_blank"
    }
  }, [_c("span", {
    staticClass: "flare"
  }), _vm._v("\n            посмотреть\n        ")])]), _vm._v(" "), _c("img", {
    staticClass: "promo-image",
    attrs: {
      src: _vm.promoData.imageUrl,
      alt: _vm.promoData.title
    }
  })]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body.no-scroll {\n  overflow: hidden !important;\n}\n@keyframes fadeTop {\n0% {\n    opacity: 0;\n    transform: translateY(-100px);\n    background: transparent;\n}\n100% {\n    opacity: 1;\n    transform: translateY(0);\n    background: white;\n}\n}\n@keyframes fadeBottom {\n0% {\n    opacity: 0;\n    transform: translateY(100px);\n}\n100% {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.header-controls-container .sidebar-search-top {\n  overflow: hidden;\n  z-index: 99;\n}\n.header-controls-container .sidebar-search-top .sidebar-header {\n  padding-top: 28px;\n  padding-bottom: 28px;\n}\n.header-controls-container .sidebar-search-top.active .sidebar-header {\n  animation-duration: var(--animate-duration, 0.3s);\n  animation-fill-mode: both;\n  animation-name: fadeTop;\n}\n.header-controls-container .sidebar-search-top.active .sidebar-body {\n  background: white;\n  animation-duration: var(--animate-duration, 0.3s);\n  animation-fill-mode: both;\n  animation-name: fadeBottom;\n}\n.header-controls-container .sidebar-search-top.active .sidebar-body .search-modal-wrap-result {\n  padding-top: 15px;\n}\n.header-controls-container .sidebar-search-top .sidebar-body {\n  padding-bottom: 0;\n  height: 100%;\n}\n.header-controls-container .sidebar-search-top .search-modal-result-items {\n  display: grid;\n  justify-content: center;\n  padding-top: 30px;\n}\n@media (max-width: 767.98px) {\n.header-controls-container .sidebar-search-top .search-modal-result-items {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n}\n.header-controls-container .sidebar-search-top .search-modal-result-items .product-card {\n    height: 330px;\n    border-radius: 15px;\n}\n}\n@media (min-width: 768px) {\n.header-controls-container .sidebar-search-top .search-modal-result-items {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 30px;\n}\n}\n.header-controls-container .search-modal-inside,\n.header-controls-container .search-modal-wrap-search {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.header-controls-container .search-modal-inside {\n  gap: 40px;\n  padding: 0 20px;\n  width: 100%;\n  margin: 0 auto;\n}\n.header-controls-container .search-modal-inside-input {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  max-width: 671px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #222;\n}\n.header-controls-container .search-modal-inside-input input {\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  font-weight: 100;\n  line-height: 16px;\n  letter-spacing: -0.04em;\n  color: #222;\n  border: none;\n  outline: none;\n}\n.header-controls-container .search-modal-inside-find svg {\n  width: 56px;\n  height: 56px;\n}\n.header-controls-container .search-modal-inside-find {\n  cursor: pointer;\n}\n@media (max-width: 997.98px) {\n.header-controls-container .controls-bar {\n    padding-top: 15px;\n}\n.header-controls-container .sort-control button {\n    font-size: 16px !important;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-overlay[data-v-5f071dd4] {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.notification-card[data-v-5f071dd4] {\n  background-color: white;\n  border-radius: 40px;\n  max-width: 500px;\n  padding: 20px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);\n}\n.notification-card .body-text[data-v-5f071dd4] {\n  line-height: 1.2;\n  font-size: 1.3rem;\n  font-weight: 500;\n  margin-bottom: 55px;\n}\n.notification-card .notification-body[data-v-5f071dd4] {\n  text-align: start;\n}\n.notification-card .notification-body h3[data-v-5f071dd4] {\n  font-size: 1.47rem;\n}\n.notification-card .notification-inputs[data-v-5f071dd4] {\n  margin-bottom: 70px;\n  gap: 25px;\n}\n.notification-card .notification-inside-input[data-v-5f071dd4] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #222;\n  max-width: 300px;\n}\n.notification-card .notification-input[data-v-5f071dd4] {\n  width: 100%;\n  height: 100%;\n  font-size: 1.15rem;\n  font-weight: 100;\n  line-height: 16px;\n  letter-spacing: -0.04em;\n  color: #222;\n  border: none;\n  outline: none;\n}\n.notification-card .notification-input[data-v-5f071dd4]::-moz-placeholder {\n  text-align: center;\n  font-weight: 500;\n}\n.notification-card .notification-input[data-v-5f071dd4]::placeholder {\n  text-align: center;\n  font-weight: 500;\n}\n.notification-card .notification-btn-close[data-v-5f071dd4] {\n  width: 300px;\n  margin-bottom: 30px;\n}\n@media (max-width: 767.98px) {\n.notification-card[data-v-5f071dd4] {\n    width: 90%;\n}\n}\n.modal-overlay[data-v-5f071dd4] {\n  position: fixed;\n  z-index: 9;\n  width: 100%;\n  height: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".product-card[data-v-125c2a1e] {\n  position: relative;\n  height: 443px;\n  background: white;\n  border-radius: 28px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  cursor: pointer;\n  transition: transform 0.3s;\n}\n.product-card[data-v-125c2a1e]:after {\n  content: \"\";\n  width: 100%;\n  height: 5px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background-color: #eb2d26;\n}\n.product-card[data-v-125c2a1e]:hover {\n  transform: translateY(-5px);\n}\n.product-card .product-image-container[data-v-125c2a1e] {\n  position: relative;\n  height: 100%;\n}\n.product-card .product-img[data-v-125c2a1e] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.product-card .product-right-info[data-v-125c2a1e] {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n.product-card .product-right-info .product-block-favorites-wrapp[data-v-125c2a1e] {\n  padding-right: 18px;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  text-align: end;\n}\n.product-card .badge[data-v-125c2a1e] {\n  background-image: linear-gradient(to right, #dd0024, #fb6228);\n  color: white;\n  padding: 10px 20px;\n  border-radius: 20px 0 0 20px;\n  font-size: 1rem;\n  font-weight: 800;\n}\n.product-card .product-info[data-v-125c2a1e] {\n  padding: 15px;\n  padding-top: 30px;\n  bottom: 0;\n  width: 100%;\n  color: white;\n  background: linear-gradient(to bottom, transparent, rgb(17, 17, 17) 49%);\n}\n.product-card .product-info .price-info span[data-v-125c2a1e] {\n  color: white;\n}\n.product-card .product-name[data-v-125c2a1e] {\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n.product-card .old-price[data-v-125c2a1e] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  text-decoration: line-through;\n  margin-right: 10px;\n}\n.product-card .current-price[data-v-125c2a1e] {\n  font-size: 1.1rem;\n  font-weight: bold;\n}\n@media (max-width: 767.98px) {\n.product-card .hit-sale[data-v-125c2a1e] {\n    font-size: 12px;\n}\n.product-card .old-price[data-v-125c2a1e] {\n    font-size: 10px;\n}\n.product-card .product-name[data-v-125c2a1e], .product-card .current-price[data-v-125c2a1e] {\n    font-size: 16px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-backdrop[data-v-30c0c80b] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1000;\n  overflow-y: auto;\n}\n.modal-content[data-v-30c0c80b] {\n  background: white;\n  height: auto;\n  min-height: 100vh;\n  overflow: auto;\n}\n.product-header[data-v-30c0c80b] {\n  margin-top: 50px;\n  margin-bottom: 65px;\n}\n.product-card[data-v-30c0c80b] {\n  margin: 0 auto;\n}\n.product-content[data-v-30c0c80b] {\n  display: flex;\n  gap: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);\n  background-color: #ffffff;\n  padding: 30px 30px 45px 15px;\n}\n.gallery[data-v-30c0c80b] {\n  display: flex;\n  gap: 20px;\n  flex-basis: 60%;\n  max-height: 530px;\n}\n.image-list[data-v-30c0c80b] {\n  /* display: flex;\n   flex-direction: column;\n   gap: 10px;*/\n  width: 165px;\n}\n.image-wrapper[data-v-30c0c80b] {\n  -o-object-fit: cover;\n     object-fit: cover;\n  position: relative;\n}\n.image-wrapper img[data-v-30c0c80b] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.image-wrapper[data-v-30c0c80b]::after {\n  content: \"\";\n  height: 4px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: #eb2d26;\n}\n@media (min-width: 768px) {\n.image-wrapper[data-v-30c0c80b] {\n    height: 125px;\n}\n}\n.main-image[data-v-30c0c80b] {\n  flex: 1;\n  overflow: hidden;\n  width: 100%;\n}\n.main-image img[data-v-30c0c80b] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.main-image .img-wrapper[data-v-30c0c80b]::after {\n  content: \"\";\n  height: 4px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: #eb2d26;\n}\n.product-details[data-v-30c0c80b] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-basis: 40%;\n}\n.product-details .description[data-v-30c0c80b] {\n  font-size: 1.4rem;\n  line-height: 1;\n  margin-bottom: 20px;\n  margin-top: 20px;\n  font-weight: 500;\n}\n.form-group[data-v-30c0c80b] {\n  margin-bottom: 15px;\n}\n.form-group label[data-v-30c0c80b] {\n  font-size: 1.4rem;\n  font-weight: 500;\n  margin-bottom: 5px;\n}\n.select-wrapper .custom-select[data-v-30c0c80b] {\n  width: 263px;\n  max-width: 263px;\n  padding: 15px 25px 10px 20px;\n  font-size: 1.4rem;\n  font-weight: 600;\n  border: 3px solid #ff4040;\n  border-radius: 10px;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  cursor: pointer;\n  outline: none;\n}\n.select-wrapper .select-icon[data-v-30c0c80b] {\n  right: 10px;\n  top: 15%;\n  transform: translateY(50%);\n}\n.price-actions .btn-actions .btn-cta[data-v-30c0c80b] {\n  flex-grow: 1;\n  font-size: 1.5rem;\n}\n.price-actions .btn-actions .btn-cta.out-of-stock[data-v-30c0c80b] {\n  box-shadow: none;\n  background: #969696;\n  font-weight: 500;\n  cursor: pointer;\n}\n.wishlist-btn[data-v-30c0c80b] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 5px;\n  border-radius: 50%;\n  transition: background-color 0.2s;\n}\n.wishlist-btn .heart-icon[data-v-30c0c80b] {\n  stroke: #000000;\n}\n.size-chart-link a[data-v-30c0c80b] {\n  font-size: 1.4rem;\n  font-weight: 500;\n  color: black;\n  text-underline-offset: 4px;\n}\n.another-products[data-v-30c0c80b] {\n  padding-top: 115px;\n  margin-bottom: 50px;\n}\n.another-products h2[data-v-30c0c80b] {\n  padding-bottom: 35px;\n}\n@media (max-width: 767.98px) {\n.product-header[data-v-30c0c80b] {\n    margin-top: 20px;\n    margin-bottom: 20px;\n}\n.product-content[data-v-30c0c80b] {\n    flex-wrap: wrap;\n}\n.product-content .gallery[data-v-30c0c80b] {\n    flex-flow: column-reverse;\n}\n.product-content .gallery .image-list[data-v-30c0c80b] {\n    flex-direction: row;\n    width: 100%;\n}\n.size-chart-link[data-v-30c0c80b] {\n    margin-top: 15px;\n}\n.another-products[data-v-30c0c80b] {\n    padding-top: 50px;\n}\n.product-details[data-v-30c0c80b] {\n    flex-basis: auto;\n}\n.price-actions h2[data-v-30c0c80b] {\n    padding-top: 10px;\n    padding-bottom: 10px;\n}\n.price-actions .btn-actions .btn-cta.out-of-stock[data-v-30c0c80b] {\n    font-size: 16px;\n}\n}\n.select-wrapper .custom-select[data-v-30c0c80b] {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23eb2d26%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708%22%2F%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position-x: 96%;\n  background-position-y: 56%;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".gallery .image-list {\n  overflow: hidden;\n}\n.gallery .swiper-container {\n  height: 100%;\n}\n.gallery .swiper-slide {\n  max-height: 135px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".promo-content[data-v-72383ddc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  margin: 75px auto;\n  box-sizing: border-box;\n}\n.promo-text-block[data-v-72383ddc] {\n  width: 95%;\n  position: relative;\n  background: white;\n  box-shadow: 0 0 46.4px 7.6px rgba(0, 0, 0, 0.2);\n  border-radius: 41px;\n  padding: 61px 40px 19px 38px;\n  overflow: hidden;\n}\n.promo-text-block[data-v-72383ddc]:before {\n  content: \"\";\n  width: 100%;\n  height: 5px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background-color: #eb2d26;\n}\n.promo-image[data-v-72383ddc] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  max-width: 240px;\n  width: 25%;\n  height: auto;\n  margin: auto 0;\n  z-index: 1;\n  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.18));\n}\n@media (max-width: 768px) {\n.promo-content[data-v-72383ddc] {\n    flex-direction: column;\n    margin-top: 30px;\n    margin-bottom: 30px;\n    padding: 15px;\n}\n.promo-text-block[data-v-72383ddc] {\n    padding: 40px 20px 20px 30px;\n    width: 100%;\n    max-width: 100%;\n    margin-bottom: 20px;\n}\n.promo-image[data-v-72383ddc] {\n    position: absolute;\n    max-width: 180px;\n    top: 58%;\n    width: 20%;\n    margin: 0 auto;\n}\n}\n@media (max-width: 500px) {\n.promo-text-block[data-v-72383ddc] {\n    padding: 30px 15px 15px 15px;\n    border-radius: 20px;\n}\nh2[data-v-72383ddc] {\n    font-size: 1.5em;\n}\nh3[data-v-72383ddc] {\n    font-size: 1rem;\n}\n.btn-cta[data-v-72383ddc] {\n    padding: 8px 15px;\n    font-size: 0.9em;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.modal-overlay[data-v-68dc16f8] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1000;\n}\n.modal-content-order[data-v-68dc16f8] {\n    border: none;\n    height: 100%;\n}\n.order-page-container[data-v-68dc16f8] {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    padding: 40px;\n}\n.left-column[data-v-68dc16f8] {\n    flex: 1;\n    padding-right: 40px;\n}\n.right-column[data-v-68dc16f8] {\n    flex: 1;\n    padding-left: 40px;\n}\n.nav-header[data-v-68dc16f8] {\n    margin-bottom: 20px;\n    height: 24px;\n}\n.main-title[data-v-68dc16f8] {\n    margin-bottom: 50px;\n}\n.back-link[data-v-68dc16f8],\n.back-link[data-v-68dc16f8]:hover {\n    display: inline-flex;\n    align-items: center;\n    font-size: 16px;\n    color: #333;\n    text-decoration: none;\n    background: none;\n    border: none;\n    cursor: pointer;\n    padding: 0;\n}\n.icon-arrow[data-v-68dc16f8] {\n    width: 20px;\n    height: 20px;\n    margin-right: 8px;\n}\n.form-group[data-v-68dc16f8] {\n    margin-bottom: 25px;\n    position: relative;\n}\n.form-group label[data-v-68dc16f8] {\n    display: block;\n    font-size: 14px;\n    color: #888;\n    margin-bottom: 4px;\n}\n.form-input[data-v-68dc16f8] {\n    width: 100%;\n    padding: 8px 0;\n    font-size: 1.2rem;\n    border: none;\n    border-bottom: 1px solid #ccc;\n    outline: none;\n&[data-v-68dc16f8]::-moz-placeholder {\n        font-weight: 500;\n        color: #909090;\n        font-size: 1.2rem;\n}\n&[data-v-68dc16f8]::placeholder {\n        font-weight: 500;\n        color: #909090;\n        font-size: 1.2rem;\n}\n}\n.form-input[data-v-68dc16f8]:focus {\n    border-bottom-color: #007bff;\n}\n.address-row[data-v-68dc16f8] {\n    display: flex;\n    gap: 20px;\n    margin-bottom: 20px;\n}\n.address-part[data-v-68dc16f8] {\n    flex: 1;\n}\n.address-part.small-gap[data-v-68dc16f8] {\n    flex: 0.5;\n}\n.address-row .form-group[data-v-68dc16f8] {\n    margin-bottom: 0;\n}\n.agreement-checkbox[data-v-68dc16f8] {\n    display: flex;\n    align-items: center;\n    margin: 30px 0;\n}\n.agreement-checkbox input[type=\"checkbox\"][data-v-68dc16f8] {\n    margin-right: 10px;\n    width: 16px;\n    height: 16px;\n}\n.btn-continue[data-v-68dc16f8],\n.btn-submit[data-v-68dc16f8] {\n    width: 100%;\n    padding: 15px;\n    font-size: 22px;\n    font-weight: 600;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n}\n.btn-continue[data-v-68dc16f8] {\n    background-color: #aaaaaa;\n}\n.btn-continue[data-v-68dc16f8]:hover {\n    background-color: #888888;\n}\n.btn-submit[data-v-68dc16f8] {\n    background-color: #007bff;\n}\n.btn-submit[data-v-68dc16f8]:hover {\n    background-color: #0056b3;\n}\n.order-summary-title[data-v-68dc16f8] {\n    font-size: 20px;\n    font-weight: 600;\n    margin-top: 0;\n    margin-bottom: 25px;\n}\n.product-card[data-v-68dc16f8] {\n    display: flex;\n    margin-bottom: 30px;\n    padding-bottom: 20px;\n    border-bottom: 1px solid #eee;\n}\n.product-image[data-v-68dc16f8] {\n    width: 100px;\n    height: 120px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    margin-right: 15px;\n    border-radius: 4px;\n}\n.product-details[data-v-68dc16f8] {\n    flex-grow: 1;\n}\n.product-details p[data-v-68dc16f8] {\n    margin: 2px 0;\n    font-size: 14px;\n}\n.product-name[data-v-68dc16f8] {\n    font-size: 16px;\n    margin: 0 0 8px 0;\n}\n.quantity-control[data-v-68dc16f8] {\n    display: flex;\n    align-items: center;\n    margin-top: 10px;\n    font-size: 14px;\n}\n.quantity-control span[data-v-68dc16f8] {\n    margin-right: 10px;\n}\n.total-price[data-v-68dc16f8] {\n    font-size: 22px;\n    font-weight: 500;\n    margin: 20px 0;\n}\n.delivery-cost[data-v-68dc16f8] {\n    font-size: 14px;\n    color: #555;\n    margin-bottom: 15px;\n}\n.final-sum[data-v-68dc16f8] {\n    font-size: 16px;\n    font-weight: 600;\n    padding-top: 10px;\n    border-top: 1px dashed #ccc;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.product-grid[data-v-4784a97f] {\n    display: grid;\n    justify-content: center;\n}\n.load-more-container[data-v-4784a97f] {\n    text-align: center;\n    margin-top: 90px;\n}\n.load-more-button[data-v-4784a97f] {\n    background: none;\n    border: 1px solid #eb2d26;\n    border-radius: 20px;\n    padding: 15px 30px;\n    font-weight: bold;\n    cursor: pointer;\n    transition: background-color 0.2s;\n}\n.load-more-button[data-v-4784a97f]:hover {\n    background-color: #fff0f0;\n}\n@media (max-width: 767.98px) {\n.product-grid[data-v-4784a97f] {\n        grid-template-columns: repeat(2, 1fr);\n        gap: 20px;\n.product-card[data-v-4784a97f] {\n            height: 330px;\n            border-radius: 15px;\n}\n}\n}\n@media (min-width: 768px) {\n.product-grid[data-v-4784a97f] {\n        grid-template-columns: repeat(3, 1fr);\n        gap: 30px;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_style_index_0_id_d52ac860_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_style_index_0_id_d52ac860_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_style_index_0_id_d52ac860_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_style_index_0_id_5f071dd4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_style_index_0_id_5f071dd4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_style_index_0_id_5f071dd4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_style_index_0_id_125c2a1e_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_style_index_0_id_125c2a1e_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_style_index_0_id_125c2a1e_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_0_id_30c0c80b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_0_id_30c0c80b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_0_id_30c0c80b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_1_id_30c0c80b_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_1_id_30c0c80b_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_1_id_30c0c80b_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_style_index_0_id_72383ddc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_style_index_0_id_72383ddc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_style_index_0_id_72383ddc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_style_index_0_id_68dc16f8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_style_index_0_id_68dc16f8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_style_index_0_id_68dc16f8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_style_index_0_id_4784a97f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_style_index_0_id_4784a97f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_style_index_0_id_4784a97f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/tiny-emitter/index.js":
/*!********************************************!*\
  !*** ./node_modules/tiny-emitter/index.js ***!
  \********************************************/
/***/ ((module) => {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ }),

/***/ "./node_modules/tiny-emitter/instance.js":
/*!***********************************************!*\
  !*** ./node_modules/tiny-emitter/instance.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var E = __webpack_require__(/*! ./index.js */ "./node_modules/tiny-emitter/index.js");
module.exports = new E();


/***/ }),

/***/ "./resources/js/client/modules/shop/MerchStore.vue":
/*!*********************************************************!*\
  !*** ./resources/js/client/modules/shop/MerchStore.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MerchStore.vue?vue&type=template&id=4a36eeed */ "./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed");
/* harmony import */ var _MerchStore_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MerchStore.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MerchStore_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__.render,
  _MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/MerchStore.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MerchStore_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MerchStore.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MerchStore_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed":
/*!***************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MerchStore_vue_vue_type_template_id_4a36eeed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MerchStore.vue?vue&type=template&id=4a36eeed */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/MerchStore.vue?vue&type=template&id=4a36eeed");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/FavoritesSidebar.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FavoritesSidebar.vue?vue&type=template&id=e2923bba */ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba");
/* harmony import */ var _FavoritesSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FavoritesSidebar.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FavoritesSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__.render,
  _FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/FavoritesSidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FavoritesSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FavoritesSidebar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FavoritesSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba":
/*!********************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavoritesSidebar_vue_vue_type_template_id_e2923bba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FavoritesSidebar.vue?vue&type=template&id=e2923bba */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/FavoritesSidebar.vue?vue&type=template&id=e2923bba");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/NavigationTabs.vue":
/*!************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NavigationTabs.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigationTabs.vue?vue&type=template&id=d52ac860 */ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860");
/* harmony import */ var _NavigationTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavigationTabs.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js");
/* harmony import */ var _NavigationTabs_vue_vue_type_style_index_0_id_d52ac860_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss */ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NavigationTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__.render,
  _NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/NavigationTabs.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NavigationTabs.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_style_index_0_id_d52ac860_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=style&index=0&id=d52ac860&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860":
/*!******************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860 ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NavigationTabs_vue_vue_type_template_id_d52ac860__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NavigationTabs.vue?vue&type=template&id=d52ac860 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NavigationTabs.vue?vue&type=template&id=d52ac860");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/NotificationModal.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NotificationModal.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true */ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true");
/* harmony import */ var _NotificationModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationModal.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js");
/* harmony import */ var _NotificationModal_vue_vue_type_style_index_0_id_5f071dd4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss */ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NotificationModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5f071dd4",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/NotificationModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss":
/*!************************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_style_index_0_id_5f071dd4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=style&index=0&id=5f071dd4&scoped=true&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationModal_vue_vue_type_template_id_5f071dd4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/NotificationModal.vue?vue&type=template&id=5f071dd4&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderForm.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderForm.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true */ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true");
/* harmony import */ var _OrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderForm.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js");
/* harmony import */ var _OrderForm_vue_vue_type_style_index_0_id_68dc16f8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css */ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "68dc16f8",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/OrderForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderForm.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_style_index_0_id_68dc16f8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=style&index=0&id=68dc16f8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderForm_vue_vue_type_template_id_68dc16f8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderForm.vue?vue&type=template&id=68dc16f8&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderSidebar.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderSidebar.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderSidebar.vue?vue&type=template&id=78817068&scoped=true */ "./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true");
/* harmony import */ var _OrderSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderSidebar.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "78817068",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/OrderSidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderSidebar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSidebar_vue_vue_type_template_id_78817068_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderSidebar.vue?vue&type=template&id=78817068&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/OrderSidebar.vue?vue&type=template&id=78817068&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductCard.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductCard.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true */ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true");
/* harmony import */ var _ProductCard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductCard.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js");
/* harmony import */ var _ProductCard_vue_vue_type_style_index_0_id_125c2a1e_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss */ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProductCard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "125c2a1e",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/ProductCard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductCard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss":
/*!******************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_style_index_0_id_125c2a1e_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=style&index=0&id=125c2a1e&scoped=true&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductCard_vue_vue_type_template_id_125c2a1e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductCard.vue?vue&type=template&id=125c2a1e&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductDetailModal.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductDetailModal.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true */ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true");
/* harmony import */ var _ProductDetailModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductDetailModal.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js");
/* harmony import */ var _ProductDetailModal_vue_vue_type_style_index_0_id_30c0c80b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss */ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss");
/* harmony import */ var _ProductDetailModal_vue_vue_type_style_index_1_id_30c0c80b_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss */ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _ProductDetailModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "30c0c80b",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/ProductDetailModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_0_id_30c0c80b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=0&id=30c0c80b&scoped=true&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_style_index_1_id_30c0c80b_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=style&index=1&id=30c0c80b&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailModal_vue_vue_type_template_id_30c0c80b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductDetailModal.vue?vue&type=template&id=30c0c80b&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductList.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductList.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductList.vue?vue&type=template&id=4784a97f&scoped=true */ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true");
/* harmony import */ var _ProductList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductList.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js");
/* harmony import */ var _ProductList_vue_vue_type_style_index_0_id_4784a97f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css */ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProductList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4784a97f",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/ProductList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_style_index_0_id_4784a97f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=style&index=0&id=4784a97f&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductList_vue_vue_type_template_id_4784a97f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductList.vue?vue&type=template&id=4784a97f&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/ProductList.vue?vue&type=template&id=4784a97f&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/PromoBlock.vue":
/*!********************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/PromoBlock.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true */ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true");
/* harmony import */ var _PromoBlock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PromoBlock.vue?vue&type=script&lang=js */ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js");
/* harmony import */ var _PromoBlock_vue_vue_type_style_index_0_id_72383ddc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss */ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PromoBlock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "72383ddc",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/client/modules/shop/components/PromoBlock.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PromoBlock.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_style_index_0_id_72383ddc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=style&index=0&id=72383ddc&scoped=true&lang=scss");


/***/ }),

/***/ "./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PromoBlock_vue_vue_type_template_id_72383ddc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/client/modules/shop/components/PromoBlock.vue?vue&type=template&id=72383ddc&scoped=true");


/***/ }),

/***/ "./resources/js/client/modules/shop/data/platform_data.json":
/*!******************************************************************!*\
  !*** ./resources/js/client/modules/shop/data/platform_data.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"TEMPLATES":{"RELEASES":{"title":"Новые выпуски из путешествий"},"NEWS":{"title":"Последние новости"},"SALES":{"title":"Горящие туры, акции и скидки"}},"PLATFORM_DATA":[{"idSuffix":"1","platformName":"Rutube","imageUrl":"/img/socials/promo-rutube.png","url":"https://rutube.ru/channel/37334628/","template":"RELEASES"},{"idSuffix":"2","platformName":"Vkontakte","imageUrl":"/img/socials/promo-vk.png","url":"https://vk.com/put_club","template":"NEWS"},{"idSuffix":"3","platformName":"Telegram","imageUrl":"/img/socials/promo-tg.png","url":"https://t.me/put_club","template":"SALES"},{"idSuffix":"4","platformName":"Dzen","imageUrl":"/img/socials/promo-dzen.png","url":"https://dzen.ru/put_club","template":"RELEASES"},{"idSuffix":"5","platformName":"YouTube","imageUrl":"/img/socials/promo-youtube.png","url":"https://www.youtube.com/@put_club","template":"RELEASES"},{"idSuffix":"6","platformName":"TikTok","imageUrl":"/img/socials/promo-tiktok.png","url":"https://www.tiktok.com/@put_club","template":"SALES"},{"idSuffix":"7","platformName":"Yappi","imageUrl":"/img/socials/promo-yappi.png","url":"https://yappy.media/n/put_club","template":"SALES"},{"idSuffix":"8","platformName":"Одноклассники","imageUrl":"/img/socials/promo-ok.png","url":"https://ok.ru/group/70000033103318","template":"SALES"},{"idSuffix":"9","platformName":"Max","imageUrl":"/img/socials/promo-max.png","url":"https://t.me/put_club","template":"NEWS"},{"idSuffix":"10","platformName":"Instagram","imageUrl":"/img/socials/promo-instagram.png","url":"https://instagram.com/put_club","template":"SALES"}]}');

/***/ }),

/***/ "./resources/js/event-bus.js":
/*!***********************************!*\
  !*** ./resources/js/event-bus.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-emitter/instance */ "./node_modules/tiny-emitter/instance.js");
/* harmony import */ var tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0__);
// eventBus.js

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  $on: function $on() {
    return tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default().on.apply((tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default()), arguments);
  },
  $once: function $once() {
    return tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default().once.apply((tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default()), arguments);
  },
  $off: function $off() {
    return tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default().off.apply((tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default()), arguments);
  },
  $emit: function $emit() {
    return tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default().emit.apply((tiny_emitter_instance__WEBPACK_IMPORTED_MODULE_0___default()), arguments);
  }
});

/***/ })

}]);