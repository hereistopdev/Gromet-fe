<?php
header('HTTP/1.0 404 Not Found');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<head>
 
  
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo'>
  <style>
    


.page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
 
 background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
 }
 
 
 .four_zero_four_bg h1{
 font-size:80px;
 }

.four_zero_four_bg h3{
    font-size:80px;
}

.link_404{      
  color: #fff!important;
  padding: 10px 20px;
  /* background: #39ac31; */
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404{ margin-top:-50px;}

  .btn {
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 500;
  height: 28px;
  line-height: 1.5;
  padding: 0.375rem 1.25rem;
  transition: all 0.1s ease-in-out;
  width: 170px;

  align-items: center;
  text-align: center;
   display: flex; 
  justify-content: center;
  /*display: inline-block;*/
    margin: auto;
}
.btn-primary:hover {
  color: #fff;
  background-color: #3d464d;
  border-color: #3d464d;
}
.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  border-color: #00aeef;
  background: #00aeef;
  color: #fff;
  fill: #3d464d;
}


  </style>
</head>

<body>

  <section class="page_404">
  <div class="container">
    <div class="row"> 
    <div class="col-sm-12 ">
    <div class="col-sm-10 col-sm-offset-1  text-center">
    <div class="four_zero_four_bg">
      <h1 class="text-center ">404</h1>
    
    
    </div>
    
    <div class="contant_box_404">
    <h3 class="h2">
    - Stranica nije pronađena
    </h3>
    
    <p>Nažalost, tražena stranica ne postoji.</p>
    
    <a href="/pocetna" class="btn btn-primary">Nazad na početnu stranicu</a>
  </div>
    </div>
    </div>
    </div>
  </div>
</section>

</html>


