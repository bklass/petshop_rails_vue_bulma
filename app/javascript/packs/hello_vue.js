import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'
 
Vue.use(VueResource)
Vue.use(TurbolinksAdapter)
 
document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
 
  var element = document.getElementById("produto-app")
 
  if (element != null) {
    var produtos = JSON.parse(element.dataset.produtos)
    // var produto = { };
    
    var app = new Vue({
      el: element,
      data: {
        formMode: false,
        produtos: produtos,
        produto: {
          id: null,
          nome: '',
          descricao: '',
          preco: null,
          categoria: '',
          marca: '',
          tipoPet: ''
        },
        index: null
      },
      methods: {
        saveProduct: function(produto) {
          this.product = Object.assign({}, this.produto);
          
          if(this.product.id){
            this.$http.put(`/produtos/${this.product.id}`, this.product).then(response => {
              this.product = response.body;
              app.$set(this.produtos, this.index, this.product);
              this.product = {};
              this.produto = {};
              this.index = null;
              this.formMode = false;
            }, response => {
              console.log(response)
            })
          } else {
            this.$http.post('/produtos', this.product).then(response => {
              this.product = response.body;
              this.produtos.push(this.product);
              this.produto = {};
              this.product = {};
              this.formMode = false;    
            }, response => {
              console.log(response)
            })
          }
        },
        cancelProduct() {
          this.produto = {};
          this.product = {};
          this.formMode = false;
        },
        removeProduct: function(p,i) {
          var choice = confirm("Você deseja remover este produto?");
          
          if (choice){
            this.$http.delete(`/produtos/${p}`).then(response => {
              this.produtos.splice(i,1);
            }, response => {
              console.log(response)
            })
          }
        },
        editProduct: function(p,i){
          this.produto = p;
          this.index = i;
          this.formMode = true;
        }
      }
    });
  }
});