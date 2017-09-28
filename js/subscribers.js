/**
 * Created by cate on 7/10/17.
 */

var vm = new Vue({
  el: "#subscribe",
  data: {
    subscribe: {
      email: '',
    },
  },
  methods:{
    postSubscribers: function () {
      axios.post('http://localhost:8086/api/frontend/subscribe',this.subscribe)
        .then(function (response) {
          store.commit('UPDATE_SUBSCRIBER_LIST',response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})






