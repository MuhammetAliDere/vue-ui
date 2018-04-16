//prototypes
String.prototype.turkishToUpper = function(){
  var string = this;
  var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
  string = string.replace(/(([iışğüçö]))+/g, function(letter){ return letters[letter]; })
  return string.toUpperCase();
}
String.prototype.turkishToLower = function(){
  var string = this;
  var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function(letter){ return letters[letter]; })
  return string.toLowerCase();
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)

import App from './App'

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.config.productionTip = false

import Popoverr  from 'vue-js-popover'

Vue.use(VueSweetalert2)
Vue.use(Toaster, {timeout: 5000})

import _ from 'lodash'
window._ = _

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
