import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'
 
Vue.use(VueResource)
Vue.use(TurbolinksAdapter)
 
document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
 
    var produtos = new Vue({
      el: '#produtos',
      data: {
        produtos: []
      },
      ready: function() {
        var that;
        that = this;
        $.ajax({
          url: '/produtos.json',
          success: function(res) {
            that.produtos = res;
          }
        });
      }
    });
});