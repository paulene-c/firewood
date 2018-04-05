$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "It looks as though some information is missing");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){

    // contact details
    htmlTemplate = htmlTemplate.replace('name_replace', $("#name").val());
    htmlTemplate = htmlTemplate.replace('email_replace', $("#email").val());
    htmlTemplate = htmlTemplate.replace('address_replace', $("#address").val());
    htmlTemplate = htmlTemplate.replace('phone_replace', $("#phone").val());
    htmlTemplate = htmlTemplate.replace('deliveryinstructions_replace', $("#deliveryinstructions").val());

    // order details

    // checkboxes
    var hasSinglePine = $('#pine').is(":checked");
    var hasSingleMacrocarpa = $('#macrocarpa').is(":checked");
    var hasSingleManukaKanuka = $('#manukakanuka').is(":checked");
    var hasSingleGum = $('#gum').is(":checked");
    var hasMixedPineGum = $('#pinegum').is(":checked");
    var hasMixedPineMacrocarpa = $('#pinemacrocarpa').is(":checked");
    var hasMixedGumMacrocarpa = $('#gummacrocarpa').is(":checked");
    var hasKindling = $('#kindling').is(":checked");
    var hasPinecones = $('#pinecones').is(":checked");

    if (
        !hasSinglePine &&
        !hasSingleMacrocarpa &&
        !hasSingleManukaKanuka &&
        !hasSingleGum &&
        !hasMixedPineGum &&
        !hasMixedPineMacrocarpa &&
        !hasMixedGumMacrocarpa &&
        !hasKindling &&
        !hasPinecones
    ) {
        submitMSG(false, 'Please select an order');
        return formError();
    }
    if (hasSinglePine) {
        htmlTemplate = htmlTemplate.replace('pine_replace', $('#pine-qnty').val() + ' ' + $('#single-pine').val());
    } else {
        htmlTemplate = htmlTemplate.replace('pine_replace', '');
    }

    if (hasSingleMacrocarpa) {
        htmlTemplate = htmlTemplate.replace('macrocarpa_replace', $('#macrocarpa-qnty').val() + ' ' + $('#single-macrocarpa').val());
    } else {
        htmlTemplate = htmlTemplate.replace('macrocarpa_replace', '');
    }

    if (hasSingleManukaKanuka) {
        htmlTemplate = htmlTemplate.replace('manukakanuka_replace', $('#manukakanuka-qnty').val() + ' ' + $('#single-manukakanuka').val());
    } else {
        htmlTemplate = htmlTemplate.replace('manukakanuka_replace', ''); 
    }

    if (hasSingleGum) {
        htmlTemplate = htmlTemplate.replace('gum_replace', $('#gum-qnty').val() + ' ' + $('#single-gum').val());
    } else {
        htmlTemplate = htmlTemplate.replace('gum_replace', '');
    }

    if (hasMixedPineGum) {
        htmlTemplate = htmlTemplate.replace('pinegum_replace', $('#pinegum-qnty').val()+ ' m&sup3;');
    } else {
        htmlTemplate = htmlTemplate.replace('pinegum_replace', '');
    }

    if (hasMixedPineMacrocarpa) {
        htmlTemplate = htmlTemplate.replace('pinemacrocarpa_replace', $('#pinemacrocarpa-qnty').val()+ ' m&sup3;');
    } else {
        htmlTemplate = htmlTemplate.replace('pinemacrocarpa_replace', '');
    }

    if (hasMixedGumMacrocarpa) {
        htmlTemplate = htmlTemplate.replace('gummacrocarpa_replace', $('#gummacrocarpa-qnty').val()+ ' m&sup3;');
    } else {
        htmlTemplate = htmlTemplate.replace('gummacrocarpa_replace', '');
    }

    if (hasKindling) {
        htmlTemplate = htmlTemplate.replace('kindling_replace', $('#kindling-qnty').val()+ ' bags');
    } else {
        htmlTemplate = htmlTemplate.replace('kindling_replace', '');
    }

    if (hasPinecones) {
        htmlTemplate = htmlTemplate.replace('pinecones_replace', $('#pinecones-qnty').val()+ ' bags');
    }   else {
        htmlTemplate = htmlTemplate.replace('pinecones_replace', '');
    }

    $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbxGJGt5EkVzjbDvvZmZqEeEhcbBpy5JeZ_guvQX0x8kchEOfK4/exec",
        data: { "html" : htmlTemplate },
        success : function(response){
            if (response.result == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,response);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

var htmlTemplate = '\
<html>\
  <head>\
    <style type="text/css">\
      /* Housekeeping */\
      html{\
        font:0.75em/1.5 sans-serif;\
        color:#333;\
        background-color:#fff;\
        padding:1em;\
      }\
\
      /* Tables */\
      table{\
        width:100%;\
        margin-bottom:1em;\
        border-collapse: collapse;\
      }\
      th{\
        font-weight:bold;\
        background-color:#ddd;\
      }\
      th,\
      td{\
        padding:0.5em;\
        border:1px solid #ccc;\
      }\
    </style>\
  </head>\
  <table>\
    <tbody>\
      <tr>\
        <td colspan="2"><b>SJ FIREWOOD</b></td>\
      </tr>\
      <tr>\
        <td><b>NAME</b></td>\
        <td>name_replace</td>\
      </tr>\
      <tr>\
        <td><b>ADDRESS</b></td>\
        <td>address_replace</td>\
      </tr>\
      <tr>\
        <td><b>PHONE</b></td>\
        <td>phone_replace</td>\
      </tr>\
      <tr>\
        <td><b>EMAIL</b></td>\
        <td>email_replace</td>\
      </tr>\
      <tr>\
        <td><b>DATE REQUIRED</b></td>\
        <td>date_replace</td>\
      </tr>\
      <tr>\
        <td><b>TIME</b></td>\
        <td>time_replace</td>\
      </tr>\
      <tr>\
        <td><b>DELIVERY INSTRUCTIONS</b></td>\
        <td>deliveryinstructions_replace</td>\
      </tr>\
      <tr>\
        <td>Pine</td>\
        <td>pine_replace</td>\
      </tr>\
      <tr>\
        <td>Macrocarpa</td>\
        <td>macrocarpa_replace</td>\
      </tr>\
      <tr>\
        <td>Manuka/Kanuka</td>\
        <td>manukakanuka_replace</td>\
      </tr>\
      <tr>\
        <td>Gum</td>\
        <td>gum_replace</td>\
      </tr>\
      <tr>\
        <td>Mixed Pine/Gum</td>\
        <td>pinegum_replace</td>\
      </tr>\
      <tr>\
        <td>Mixed Pine/Macrocarpa</td>\
        <td>pinemacrocarpa_replace</td>\
      </tr>\
      <tr>\
        <td>Mixed Gum/Macrocarpa</td>\
        <td>gummacrocarpa_replace</td>\
      </tr>\
      <tr>\
        <td>Kindling</td>\
        <td>kindling_replace</td>\
      </tr>\
      <tr>\
        <td>Pinecones</td>\
        <td>pinecones_replace</td>\
      </tr>\
      <tr>\
        <td><b>TOTAL PAYABLE</b></td>\
        <td></td>\
      </tr>\
      <tr>\
        <td><b>Office use:</b><br><br>\
            INV #: _________________ <br><br>\
            Delivery time: _____________<br>\
        </td>\
        <td>Payment received: ________________ <br><br>\
        Payment loaded: Xero ___________ s/s ____________ <br><br>\
        Delivery driver: _________________<br></td>\
      </tr>\
      <tr>\
        <td colspan="2"><b>Payment Options:</b><br><br>\
        Cash or online banking - delivery will be made once payment shows in our bank account<br><br>\
        Bank account 06-0773-0254440-00. Please use your surname as reference.<br><br>\
        </td>\
      </tr>\
      <tr>\
        <td colspan="2"><br>\
            Paid: _________________  Signed: ______________  Date: __________________<br><br>\
            Thank you for choosing SJ Firewood, we look forward to dealing with you again.\
        </td>\
      </tr>\
    </tbody>\
  </table>\
</html>';