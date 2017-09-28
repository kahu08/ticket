<?php
 $sale_no = $_GET['no'];
 ?>
 <!DOCTYPE html>
 <head>
     <meta charset="utf-8">
     <meta name="viewport"
           content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
     <title>Ticket Pay</title>
     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700%7COpen+Sans" rel="stylesheet"
           type="text/css">
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
           integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
     <link rel="stylesheet" href="./css/main.css">
     <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
     <link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
     <link rel="stylesheet" href="css/style.css"> <!-- Resource style -->
     <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
     <link rel="stylesheet" href="css/style3.css">
     <link href="https://fonts.googleapis.com/css?family=Bree+Serif" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

 </head>
 <body>

 <!-- HEADER END -->
 <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="background-color: black">

   <div class="container-fluid">
     <!-- Brand and toggle get grouped for better mobile display -->
     <div class="navbar-header">
       <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
               <span class="sr-only">Toggle navigation</span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
             </button>
 <!-- <li><button href="#gsdk" class="btn btn-round btn-default">Sign in</button> -->

     </div>

     <!-- Collect the nav links, forms, and other content for toggling -->
     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form method="get" action="/search" id="search" style="margin: 0px;">
                 <input type="text" size="40" name="what" v-model="search.query" placeholder="Search Event..." />
             </form>


       <ul class="nav navbar-nav navbar-right">
          <img class="logo" src="img/losh.png" alt="logo" style="height: 40px; float: right;">

       </ul>

     </div>
     <!-- /.navbar-collapse -->
   </div>
   <!-- /.container-fluid -->
 </nav>
<section class="events text-center">
 <div class="container-fluid" id="print">

   Printing ticket no <?php echo $sale_no; ?>

   <br/>
   <br/>

 </div>
 </section>

 <!-- SUBSCRIBE -->
 <section class="subscribe text-center">
     <div class="subscribe__container container">
         <div class="subscribe__row row">
             <div class="col-md-12">
                 <h2>Subscribe to get the latest events</h2>
             </div>
         </div>
         <div class="subscribe__row row">
             <div class="subscribe__form col-md-6 col-md-offset-3">
                 <form action="#" class="input-group">
                     <input type="email" placeholder="Your email" class="form-controls">
                     <div class="input-group-btn">
                         <button type="submit" class="btn btn--primary">Subscribe</button>
                     </div>
                 </form>
             </div>
         </div>
     </div>
 </section>

 <!-- FOOTER -->
 <footer class="footer container-fluid">
     <div class="footer__container container">
         <div class="footer__row row">

             <!-- COPYRIGHT -->
             <div class="footer__copyright col-md-12 col-lg-4">
                 <span>&copy; 2017 Ticket Pay. All rights reserved</span>
             </div>
             <!-- COPYRIGHT END -->

             <!-- FOOTER NAVIGATION -->
             <div class="footer__navigation col-md-12 col-lg-8">
                 <ul class="list-inline list-unstyled text-right text-uppercase">
                     <li>
                     </li>
                     <li><a href="#">About us</a></li>
                     <li><a href="#">Privacy police</a></li>
                     <li><a href="#">Terms of service</a></li>
                     <li><a href="#">Help</a></li>
                  <li><a href="www.twitter.com/nouvltd" class="fa fa-twitter"></a></li>
                 <li><a href="#" class="fa fa-linkedin"></a></li>
                 <!-- <h2>Powered by NOUVETA</h2> -->
             </div>
             <!-- FOOTER NAVIGATION END -->


         </div>
     </div>
 </footer>
 <!-- FOOTER END -->


 <!-- SCRIPTS -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script
         src="https://code.jquery.com/jquery-3.2.1.min.js"
         integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
         crossorigin="anonymous"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <script src="https://unpkg.com/vue"></script>
 <script src="https://unpkg.com/vuex@2.0.0"></script>
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <script src="js/jspdf.min.js"></script>
 <script src="js/qr.js"></script>
 <script src="js/app.js"></script>
 <script src="js/store.js"></script>
 <script src="js/print.js"></script>

 <script src="https://use.fontawesome.com/97ec197995.js"></script>
 <!-- <script src="js/checkout.js"></script>
  <script src="js/search.js"></script>-->
 <script>
 $(function() {
   vm.getSale("<?php echo $sale_no; ?>");
  });
     if (!window.jQuery) document.write('<script src="js/jquery-3.0.0.min.js"><\/script>')
 </script> <!-- Resource jQuery -->

 </body>

 </html>
