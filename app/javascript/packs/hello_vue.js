import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'
 
Vue.use(VueResource)
Vue.use(TurbolinksAdapter)
 
document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
 
  var element = document.getElementById("produto-form")
 
  if (element != null) {
    var produto = JSON.parse(element.dataset.produto)
 
    var app = new Vue({
      el: element,
      data: function() {
        return { produto: produto }
      },
      methods: {
        saveProduct() {
          produto: this.produto
          if(produto.id){
            this.$http.put(`/produtos/${produto.id}`, produto).then(response => {
              Turbolinks.visit(`/produtos/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          } else {
            this.$http.post('/produtos', produto).then(response => {
              Turbolinks.visit(`/produtos/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          }
        }
      }
    });
  }
});