/**
 * Created by cate on 7/5/17.
 */

var vm = new Vue({
    el: '#events',
    data: {
        name: [],
        description: [],
        isCartOpen: false,
        isCheckoutProcessing: false,
        isCheckingOut: false,
        checkoutPhone: '',
        merchandises: []

        // order: {tickets: [], merchandises: [], phone_no: '' }
    },
    methods: {
      formatMoney: function (amount) {
        return 'Kshs. '+amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      toggleCheckout: function () {
        this.isCheckingOut = !this.isCheckingOut;
      },
        checkout: function () {
            var self = this;

            var cart = JSON.stringify(store.state.cart);
            if (this.checkoutPhone.length === 0) {
                alert('Enter your phone number.');
                return;
            }
            self.isCheckoutProcessing = true;
            // axios.post('http://139.59.163.223/ticket-pay/api/public/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone})
             axios.post('http://localhost:8086/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone})
              // axios.post('http://test.nouveta.tech/ticketpay/ticket-pay-api/checkout', {cart: cart, phone: this.checkoutPhone})
                .then(function (response) {
                    self.isCheckoutProcessing = false;
                    self.isCartOpen = false;
                    self.checkoutPhone = '';
                    alert('Your order has been received. Thank you.');
                    store.commit('CLEAR_CART');
                    // console.log(response);
                    //self.generateTicket(response.data);
                })
                .catch(function (error) {
                    // console.log(error);
                });

        },
        generateTicket: function (sale) {
            var doc = new jsPDF();

            var y = 25;
            var tickets = 0;
            for (var i = 0; i < sale.ticket_sales.length; i++) {
                var ticket_sale = sale.ticket_sales[i];
                var ticket = ticket_sale.ticket;
                var event_ticket = ticket.event_ticket;
                var ticket_option = event_ticket.ticket_option;
                var event = event_ticket.event;

                var qr = new QRious();
                qr.set({
                    background: 'white',
                    backgroundAlpha: 1,
                    foreground: 'black',
                    foregroundAlpha: 1,
                    level: 'H',
                    padding: 25,
                    size: 500,
                    value: ticket.ticket_number
                });

                var imgData = qr.toDataURL('image/jpeg');
                doc.setFont('arial');
                doc.setFontSize(20);

                doc.setFontStyle('bold');
                doc.text(10, y - 10, event.name);
                doc.setFontStyle('regular');

                doc.setFontSize(14);

                doc.text(10, y + 5, 'Validity:');
                doc.setFontStyle('bold');
                doc.text(40, y + 5, '24th - 26th July');
                doc.setFontStyle('regular');

                doc.text(10, y + 15, 'Class: ');
                doc.setFontStyle('bold');

                doc.text(40, y + 15, ticket_option.name);
                doc.setFontStyle('regular');

                doc.text(10, y + 25, 'Amount:');
                doc.setFontStyle('bold');
                doc.text(40, y + 25, 'Kshs. ' + ticket_sale.amount);
                doc.setFontStyle('regular');

                doc.text(10, y + 35, 'Ticket No:');
                doc.setFontStyle('bold');
                doc.text(40, y + 35, ticket.ticket_number);

                doc.addImage(imgData, 'JPEG', 150, y - 5, 40, 40);
                doc.text(10, y + 45, '................................................................................................................................................')
                if (tickets === 3) {
                    tickets = 0;
                    y = 20;
                    doc.addPage();
                } else {
                    tickets++;
                    y += 70;
                }
            }
            doc.autoPrint();
            doc.save(sale.order_number + '.pdf');
        },
        removeTicketOption: function (event, option) {
            store.commit('REMOVE_CART_TICKET_OPTION', option)
            if(!this.hasTickets(event)) {
                this.removeCartEvent(event)
            }
        },
        removeCartEvent: function (event) {
            store.commit('REMOVE_CART_EVENT', event)
        },
        hasTickets: function (event) {
            for (let option of event.options){
                if(option.selected){
                    return true
                }
            }
            return false;
        },
        getEvents: function () {
            var self = this;
        //  axios.post('http://test.nouveta.tech/ticketpay/ticket-pay-api/checkout', {cart: cart, phone: this.checkoutPhone})
             //axios.get('http://139.59.163.223/ticket-pay/api/public/api/frontend/events')
             axios.get('http://localhost:8086/api/frontend/events')
                .then(function (response) {
                    store.commit('UPDATE_EVENT_LIST', response.data.data)
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        buyTicket: function (event) {
            store.commit('ADD_TICKET_TO_CART', event)
        },
        showBuyModal: function (event) {
            // document.getElementById(event.id).style.display = 'block'
        },
        hideBuyModal: function (event) {
            // document.getElementById(event.id).style.display = 'none'
        },
        optionChanged: function (option) {
            var eventTickets = option.event_tickets
            for (var eventTicket of eventTickets) {
                if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                    option.selected = true
                    option.unit_price = eventTicket.amount
                    return
                }
            }
            option.selected = false
            option.unit_price = 'No tickets.'
        },
        addToCart(option) {

        },
        quantityChanged: function (option) {
            if (option.ticket_option_id === 0) {
                return 0.00
            }
            var eventTickets = option.event_tickets
            for (var eventTicket of eventTickets) {
                if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                    option.selected = true
                    return
                }
            }
            return 'No tickets.'
        },
        getTicketTotal: function (option) {
            var eventTickets = option.event_tickets
            option.selected = true
            return
            if (option.selected) {
                for (var eventTicket of eventTickets) {
                    if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                        option.unit_price = eventTicket.amount
                        return unit_price * option.quantity
                    }
                }
            }
            return 'No tickets.'
        },
        addTicketsCart: function (event) {
            store.commit('ADD_TICKET_TO_CART', event)
            // document.getElementById(event.id).style.display = 'none'
        },
        getEventTotal: function (event) {
            var total = 0.00
            for (var eventTicket of event.options) {
                if (eventTicket.selected) {
                    total += (eventTicket.quantity * eventTicket.unit_price)
                }
            }
            return total
        },
        hasTicketOption: function (event, option_id, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            for (var eventTicket of event.options[index].event_tickets) {
                if (eventTicket.ticket_option_id === option_id) {
                    return true;
                }
            }
            return false;
        },
        ticketOptionPrice: function (event, option_id, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            for (var eventTicket of event.options[index].event_tickets) {
                if (eventTicket.ticket_option_id ===parseInt(option_id)) {
                    return eventTicket.amount;
                }
            }
            return 'No tickets';
        },
        selectTicket: function (event, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            event.options[index].selected = event.options[index].ticket_option_id !== 0;
            if(event.options[index].selected) {
                // alert(this.ticketOptionPrice(event, event.options[index].ticket_option_id, option));
                event.options[index].unit_price = this.ticketOptionPrice(event, event.options[index].ticket_option_id, option);
            }
        },
        ticketOptionTitle (option_id){
            option_id = parseInt(option_id);
            switch (option_id){
                case 1:
                    return 'Regular';
                case 2:
                    return 'VIP';
                default:
                    return 'VVIP';
            }
        },
        getTotal() {
          var tickets = this.cartItems;
          var total = 0;
          for (var i = 0; i < tickets.length; i++) {
            total+=this.getEventTotal(tickets[i]);
          }
          return total;
        }
    },
    mounted: function () {
        // alert(store.state.cart)
    },
    created: function () {
        this.getEvents()
        var cart = JSON.parse(window.localStorage.getItem('cart'))
        if (cart === null) {
            cart = {
                tickets: [],
                merchandises: []
            }
        }
        //cart = []
        store.commit('RESTORE_CART', cart)
    },
    computed: {
        events() {
            return store.state.events
        },
        cartItems() {
            return store.state.cart.tickets
        },
        cartCount() {
            return store.state.cart.length
        },
        itemTotal(cartItem) {
            return 0.00
        }

    }
})
