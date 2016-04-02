$(document).ready(function() {
    $('a[href="#"]').click(function(e){
      e.preventDefault();
    });
    $('.form-consult .popup_thank_you').hide();
    var $tabItem = $('.tab-item');
    function triggerCurrent() {
        $('.triggers a').removeClass('current');
        $tabItem.hide();
    };

    $('#instagram-trigger').on('click', function(){
        if ( $(this).hasClass('current') ) {
            return false
        } {
            triggerCurrent();
            $(this).addClass('current');
            $('.tab-instagram').show();
            $select[0].selectize.setValue("Instagram");
        }
    });
    $('#vk-trigger').on('click', function(){
        if ( $(this).hasClass('current') ) {
            return false
        } {
            triggerCurrent();
            $(this).addClass('current');
            $('.tab-vk').show();
            $select[0].selectize.setValue("ВКонтакте");
        }
    });
    $('#youtube-trigger').on('click', function(){
        if ( $(this).hasClass('current') ) {
            return false
        } {
            triggerCurrent();
            $(this).addClass('current');
            $('.tab-youtube').show();
            $select[0].selectize.setValue("YouTube");
        }
    });
    $('#facebook-trigger').on('click', function(){
        if ( $(this).hasClass('current') ) {
            return false
        } {
            triggerCurrent();
            $(this).addClass('current');
            $('.tab-facebook').show();
            $select[0].selectize.setValue("Facebook");
        }
    });

    $('.triggers a').on('click', function(){
        $('html, body').animate({
            scrollTop: $(".tabs").offset().top - 40
        }, 300);
    });

    $('.modal').on('click', function(){
        var package = $(this).parent().parent().parent().find('.header h3').text();
        $('#package').text(package);
        $('#package-value').val(package);
    });
    $('.modal').magnificPopup({
        type: 'inline'
    });

    var eventHandler = function() {
        return function() {
            var something = selectizeControl.getItem(selectizeControl.getValue());
            console.log(something.text());
        };
    };

    var $select = $('.custom-select').selectize({
        create: true,
        sortField: 'text',
        onChange: eventHandler()
    });
    var selectizeControl = $select[0].selectize;



    // Маска для телефона
    $("[name=tel]").mask("+7(999) 999-99-99");
    //

    // Обработка форма на AJAX
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    },
                          "Введите полный номер.");
    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    },
                          "Это поле необходимо заполнить.");

    $(".form-consult form").each(function(){
        $(this).validate({
            rules: {
                name: {
                    required: true,
                },
                tel: {
                    requiredphone: true,
                    minlenghtphone: true

                }
            },
            submitHandler: function(form, event){
                event = event || window.event;
                $(form).ajaxSubmit({
                    //dataType: 'script',
                    error: function(){
                        alert("Ошибка!");
                    },
                    success: function(responseText, statusText, xhr){
                            // Отправка данных формы в Comagic
                            /*
                            Comagic.addOfflineRequest({
                                name: $(form).find('[name="name"]').val(),
                                phone: $(form).find('[name="tel"]').val(),
                            });
                            */
                            // Цель на отправку формы
                            /****  Поменять номер счетчика ****/
                            //yaCounter29402220.reachGoal('ORDER');

                            // Очистка форм после отправки
                            $('.form-input').val('');

                            // Появление "спасибо"
                            $('.lead-form .hide-on-send').hide();
                            $('.lead-form .popup_thank_you').show();

                            // Через 5 сек скрываем "спасибо"
                            setTimeout(function(){
                                $('.lead-form .popup_thank_you').hide();
                                $('.lead-form .hide-on-send').show();
                            }, 5 * 1000);
                }
            });
                return false;
        }
        });
    });
    //

    $(".form-modal form").each(function(){
        $(this).validate({
            rules: {
                name: {
                    required: true,
                },
                tel: {
                    requiredphone: true,
                    minlenghtphone: true

                }
            },
            submitHandler: function(form, event){
                event = event || window.event;
                $(form).ajaxSubmit({
                    //dataType: 'script',
                    error: function(){
                        alert("Ошибка!");
                    },
                    success: function(responseText, statusText, xhr){
                        $('.form-input').val('');
                        // Появление "спасибо"
                        $('#modal .main-modal').hide();
                        $('#modal .popup_thank_you').show();
                        $('.mfp-close, #modal').addClass('active');
                        // Через 5 сек скрываем "спасибо"
                        //setTimeout(function(){
                        //    $('#modal .main-modal').show();
                        //    $('#modal .popup_thank_you').hide();
                        //}, 5 * 1000);
                }
            });
            return false;
        }
        });
    });

    var eTop = $('.triggers').offset().top;
    $(window).scroll(function(){
          if ($(this).scrollTop() > eTop) {
              $('.triggers').addClass('fixed');
          } else {
              $('.triggers').removeClass('fixed');
          }
    });
});