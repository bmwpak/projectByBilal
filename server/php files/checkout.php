<?php
 
// Include configuration file 
include_once 'config.php'; 
 


$title = "JazzCash Payment";


?>


<?php 
date_default_timezone_set('Asia/Karachi');
//60 seconds = 1 minutes
ini_set('max_execution_time', 60);

$product_id = 3;



$product_name = 'diamond bag';
$product_price = 2100;

//$form_post_url = "localhost/jazzcash_part_2/checkout.php";


//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//1.
//get formatted price. remove period(.) from the price
$temp_amount 	= $product_price*100;
$amount_array 	= explode('.', $temp_amount);
$pp_Amount 		= $amount_array[0];
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//2.
//get the current date and time
$DateTime 		= new DateTime();
$pp_TxnDateTime = $DateTime->format('YmdHis');
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//3.
//to make expiry date and time add one hour to current date and time
$ExpiryDateTime = $DateTime;
$ExpiryDateTime->modify('+' . 1 . ' hours');
$pp_TxnExpiryDateTime = $ExpiryDateTime->format('YmdHis');
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//4.
//make unique transaction id using current date
$pp_TxnRefNo = 'T'.$pp_TxnDateTime;
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


//--------------------------------------------------------------------------------
//$post_data
$post_data =  array(
	"pp_Version" 			=> JAZZCASH_API_VERSION_1,
	"pp_TxnType" 			=> "MWALLET",
	"pp_Language" 			=> JAZZCASH_LANGUAGE,
	"pp_MerchantID" 		=> JAZZCASH_MERCHANT_ID,
	"pp_SubMerchantID" 		=> "",
	"pp_Password" 			=> JAZZCASH_PASSWORD,
	"pp_BankID" 			=> "TBANK",
	"pp_ProductID" 			=> "RETL",
	"pp_TxnRefNo" 			=> $pp_TxnRefNo,
	"pp_Amount" 			=> $pp_Amount,
	"pp_TxnCurrency" 		=> JAZZCASH_CURRENCY_CODE,
	"pp_TxnDateTime" 		=> $pp_TxnDateTime,
	"pp_BillReference" 		=> "billRef",
	"pp_Description" 		=> "Description of transaction",
	"pp_TxnExpiryDateTime" 	=> $pp_TxnExpiryDateTime,
	"pp_ReturnURL" 			=> JAZZCASH_RETURN_URL,
	"pp_SecureHash" 		=> "",
	"ppmpf_1" 				=> "1",
	"ppmpf_2" 				=> "2",
	"ppmpf_3" 				=> "3",
	"ppmpf_4" 				=> "4",
	"ppmpf_5" 				=> "5",
);
//--------------------------------------------------------------------------------


//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//5.
//$sorted_string
//make an alphabetically ordered string using $post_data array above
//and skip the blank fields in $post_data array
$sorted_string  = JAZZCASH_INTEGERITY_SALT . '&';
$sorted_string .= $post_data['pp_Amount'] . '&';
$sorted_string .= $post_data['pp_BankID'] . '&';
$sorted_string .= $post_data['pp_BillReference'] . '&';
$sorted_string .= $post_data['pp_Description'] . '&';
$sorted_string .= $post_data['pp_Language'] . '&';
$sorted_string .= $post_data['pp_MerchantID'] . '&';
$sorted_string .= $post_data['pp_Password'] . '&';
$sorted_string .= $post_data['pp_ProductID'] . '&';
$sorted_string .= $post_data['pp_ReturnURL'] . '&';
$sorted_string .= $post_data['pp_TxnCurrency'] . '&';
$sorted_string .= $post_data['pp_TxnDateTime'] . '&';
$sorted_string .= $post_data['pp_TxnExpiryDateTime'] . '&';
$sorted_string .= $post_data['pp_TxnRefNo'] . '&';
$sorted_string .= $post_data['pp_TxnType'] . '&';
$sorted_string .= $post_data['pp_Version'] . '&';
$sorted_string .= $post_data['ppmpf_1'] . '&';
$sorted_string .= $post_data['ppmpf_2'] . '&';
$sorted_string .= $post_data['ppmpf_3'] . '&';
$sorted_string .= $post_data['ppmpf_4'] . '&';
$sorted_string .= $post_data['ppmpf_5'];

//sha256 hash encoding
$pp_SecureHash = hash_hmac('sha256', $sorted_string, JAZZCASH_INTEGERITY_SALT);
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

$post_data['pp_SecureHash'] =  $pp_SecureHash;


?>



<!-- container --> 
  <section class="showcase">
    <div class="container">
      <div class="pb-2 mt-4 mb-2 border-bottom">
        <h1 style="text-align:center;font-size:40px;font-family: Georgia">Part <?php echo PART;?>: JazzCash Payment</h1>
      </div>      
      <span id="success-msg" class="payment-errors"></span>   
      
	  
	  <!-- JAZZCASH payment form -->
    <form
	 action="<?php echo JAZZCASH_HTTP_POST_URL;?>"
	  method="POST" id="myCCForm">
    <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6 pb-5">
    <div class="row"></div>
       
            <div class="card border-gray rounded-0">
                <div class="card-header p-0">
                    <div class="bg-gray text-left py-2">
                        <!-- <h5 class="pl-2"><strong>Product Name: </strong><?php echo $product_name;?></h5>  -->
                        <h6 class="pl-2"
						style="text-align:center;font-size:25px;color:blue;"
						><strong>Amount: </strong> <?php echo $product_price;?> PKR</h6>
                    </div>
                </div>

				<input type="hidden" name="amount" value="<?php echo $product_price;?>">
				<input type="hidden" name="product_name" value="<?php echo $product_name;?>">
				<input type="hidden" name="product_id" value="<?php echo $product_id;?>">

				<input type="hidden" name="pp_Version" value="<?php echo $post_data['pp_Version'];?>">
				<input type="hidden" name="pp_TxnType" value="<?php echo $post_data['pp_TxnType'];?>">
				<input type="hidden" name="pp_Language" value="<?php echo $post_data['pp_Language'];?>">
				<input type="hidden" name="pp_MerchantID" value="<?php echo $post_data['pp_MerchantID'];?>">
				<input type="hidden" name="pp_SubMerchantID" value="<?php echo $post_data['pp_SubMerchantID'];?>">
				<input type="hidden" name="pp_Password" value="<?php echo $post_data['pp_Password'];?>">
				<input type="hidden" name="pp_BankID" value="<?php echo $post_data['pp_BankID'];?>">
				<input type="hidden" name="pp_ProductID" value="<?php echo $post_data['pp_ProductID'];?>">
				
				<input type="hidden" name="pp_TxnRefNo" value="<?php echo $post_data['pp_TxnRefNo'];?>">
				<input type="hidden" name="pp_Amount" value="<?php echo $post_data['pp_Amount'];?>">
				<input type="hidden" name="pp_TxnCurrency" value="<?php echo $post_data['pp_TxnCurrency'];?>">
				<input type="hidden" name="pp_TxnDateTime" value="<?php echo $post_data['pp_TxnDateTime'];?>">
				<input type="hidden" name="pp_BillReference" value="<?php echo $post_data['pp_BillReference'];?>">
				<input type="hidden" name="pp_Description" value="<?php echo $post_data['pp_Description'];?>">
				<input type="hidden" name="pp_TxnExpiryDateTime" value="<?php echo $post_data['pp_TxnExpiryDateTime'];?>">
				<input type="hidden" name="pp_ReturnURL" value="<?php echo $post_data['pp_ReturnURL'];?>">
				<input type="hidden" name="pp_SecureHash" value="<?php echo $post_data['pp_SecureHash'];?>">
				<input type="hidden" name="ppmpf_1" value="<?php echo $post_data['ppmpf_1'];?>">
				<input type="hidden" name="ppmpf_2" value="<?php echo $post_data['ppmpf_2'];?>">
				<input type="hidden" name="ppmpf_3" value="<?php echo $post_data['ppmpf_3'];?>">
				<input type="hidden" name="ppmpf_4" value="<?php echo $post_data['ppmpf_4'];?>">
				<input type="hidden" name="ppmpf_5" value="<?php echo $post_data['ppmpf_5'];?>">


                <div class="card-body p-3" style="margin: auto;height:300px;width:300px;text-align:center;box-shadow: 5px 10px 8px #888888;">   
					<div class="input-group-text"><br/><span style="font-size:20px;font-weight:bold;">Pay With</span><br/> <br/>
					<img style="width:200px;" src="jazzcash.png"></div>
					                            
                    <br/><br/><br/>
                    <div class="text-right">
                        
						
                        <button type="buttom" style="padding:10px 10px;color:white;background-color:blue;" id="payBtn" class="btn btn-info py-2">Proceed to Pay</button>
                    </div>
                    
                </div>
                
            </div> 
              <div>                
                </div>
          </div>
        </div>    
    </form>
    </div>
  </section>



