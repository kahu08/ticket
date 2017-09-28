/**
 * Created by cate on 7/5/17.
 */
var vm = new Vue({
  el: "#search",
  data: {
    search: {
      query: '',
      location: '',
      to: new Date(),
      from: new Date()
    },
  },
   methods:{
      searchEvents: function () {
        axios.post('http://localhost:8086/api/frontend/search',this.search)
          .then(function (response) {
            store.commit('UPDATE_EVENT_LIST',response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
   }
})


