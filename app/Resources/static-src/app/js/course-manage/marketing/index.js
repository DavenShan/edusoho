
import { TabChange } from '../help';

class Marketing {
  constructor() {
    this.init();
  }

  init() {
    $('.js-task-price-setting').perfectScrollbar();
    let $form = $('#course-marketing-form');
    $('.js-task-price-setting').perfectScrollbar();
    TabChange();
    let validator = $form.validate({
      onkeyup: false,
      rules: {
        originPrice: {
          currency: true
        },
        tryLookLength: {
          digits: true
        },
        tryLookLimit: {
          digits: true
        },
        buyExpiryTime: {
          required: function(){
            return $('input[name="enableBuyExpiryTime"]:checked').val() == 1;
          },
          date: true
        }
      },
      messages: {
        buyExpiryTime: '请选择有效的购买截止日期'
      }
    });
    $('.js-task-price-setting').on('click', 'li', function (event) {
      let $li = $(this).toggleClass('open');
      let $input = $li.find('input');
      $input.prop("checked", !$input.is(":checked"))
    });

    $('.js-task-price-setting').on('click', 'input', function (event) {
      event.stopPropagation();
      let $input = $(this);
      $input.closest('li').toggleClass('open');
    });

    $('input[name="isFree"]').on('change', function (event) {
      if ($('input[name="isFree"]:checked').val() == 0) {
        $('.js-is-free').removeClass('hidden');
      } else {
        $('.js-is-free').addClass('hidden');
      }
    });

    $('input[name="enableBuyExpiryTime"]').on('change', function (event) {
      if ($('input[name="enableBuyExpiryTime"]:checked').val() == 0) {
        $('#buyExpiryTime').addClass('hidden');
      } else {
        $('#buyExpiryTime').removeClass('hidden');
      }
    });

    $('input[name="buyExpiryTime"]').datetimepicker({
      format: 'yyyy-mm-dd',
      language: "zh",
      minView: 2, //month
      autoclose: true,
      endDate: new Date(Date.now() + 86400 * 365 * 100 * 1000)
    });
    $('input[name="buyExpiryTime"]').datetimepicker('setStartDate', new Date());

    $('input[name="tryLookable"]').on('change', function (event) {
      if ($('input[name="tryLookable"]:checked').val() == 1) {
        $('.js-enable-try-look').removeClass('hidden');
      } else {
        $('.js-enable-try-look').addClass('hidden');
      }
    });

    $('.js-service-item').click(function (event) {
      let $item = $(event.currentTarget);
      let $values = $('#course_services').val();
      if (!$values) {
        values = [];
      }
      $values = JSON.parse($values);
      if ($item.hasClass('label-primary')) {
        $item.removeClass('label-primary');
        $item.addClass('label-default');
        $values.splice($values.indexOf($item.text()), 1);
      } else {
        $item.removeClass('label-default');
        $item.addClass('label-primary');
        $values.push($item.text());
      }
      $('#course_services').val(JSON.stringify($values));
    });

    $('#course-submit').click(function (evt) {
      if (validator.form()) {
        $(evt.currentTarget).button('loading');
        $form.submit();
      }
    });
  }
}

new Marketing();