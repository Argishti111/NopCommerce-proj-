var CheckoutReturnShipping = {
  form: false,
  selectedStateId: 0,

  init: function (form) {
    this.form = form;
  },

  editAddress: function(url, addressId, titleText) {
    CheckoutReturnShipping.resetShippingForm();

    var prefix = 'ReturnShippingNewAddress_';
    $.ajax({
      cache: false,
      type: "GET",
      url: url,
      data: {
        "addressId": addressId
      },
      success: function(data, textStatus, jqXHR) {
        $.each(data,
          function(id, value) {
            if (id.indexOf("CustomAddressAttributes") >= 0 && Array.isArray(value)) {
              $.each(value, function (i, customAttribute) {
                if (customAttribute.DefaultValue) {
                  $(`#${customAttribute.ControlId}`).val(
                    customAttribute.DefaultValue
                  );
                } else {
                  $.each(customAttribute.Values, function (j, attributeValue) {
                    if (attributeValue.IsPreSelected) {
                      $(`#${customAttribute.ControlId}`).val(attributeValue.Id);
                      $(
                        `#${customAttribute.ControlId}_${attributeValue.Id}`
                      ).prop("checked", attributeValue.Id);
                    }
                  });
                }
              });
  
              return;
            }

            if (value !== null) {
              var val = $(`#${prefix}${id}`).val(value);
              if (id.indexOf('CountryId') >= 0) {
                val.trigger('change');
              }
              if (id.indexOf('StateProvinceId') >= 0) {
                CheckoutBilling.setSelectedStateId(value);
              }
            }
          });
      },
      complete: function(jqXHR, textStatus) {
        $('#returnshipping-addresses-form').hide();
        $('#returnshippingaddress-next-button').hide();
        $('#returnshippingaddress-save-button').show();
        $('#returnshippingaddress-cancel-button').show();
        $('#returnshippingaddress-new-form .title-text').html(titleText);
      },
      error: function(err) {
        alert(err);
      }
    });
  },

  saveEditAddress: function (url) {
    $.ajax({
      cache: false,
      url: url,
      data: $(this.form).serialize(),
      type: "POST",
      success: function(response) {
        location.href = response.redirect;
        return true;
      },
      error: function (err) {
        alert(err);
      }
    });
  },

  deleteEditAddress: function(url, addressId) {
    $.ajax({
      cache: false,
      type: "GET",
      url: url,
      data: {
        "addressId": addressId
      },
      success: function(response) {
        location.href = response.redirect;
        return true;
      },
      error: function(err) {
        alert(err);
      }
    });
  },

  resetShippingForm: function() {
    $(':input', '#returnshippingaddress-new-form')
      .not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected')
      .not(':checkbox, :radio, select').val('');

    $('select option[value="0"]').prop('selected', true);
  },
}