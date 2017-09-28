/**
 * Created by cate on 7/5/17.
 */
var vm = new Vue({
  el: "#merchandise",
  data: {
    merchandises: [],
  },
  methods: {
    getMerchandise: function () {
      var self = this

      axios.get('http://localhost:8086/api/frontend/merchandises')
        .then(function (response) {
         self.merchandises = response.data.data;
      })
        .catch(function (error) {
          console.log(error);
        });

    }
  },
  created: function () {
    this.getMerchandise();
    // alert('Here');
  }
})
