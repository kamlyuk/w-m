$(document).ready(function () {

    // настройки select
    jcf.setOptions('Select', {
        'wrapNative': false, // системное меню
        'maxVisibleItems': 7 // количество элементов  мен
    });

    // настройки range
    jcf.setOptions('Range', {
        'range': 'min', // отображение индикатора около полунка
        'snapRadius': 10 // расстояние прилипания к делителям
    });

    // кастомные select, checkbox и range
    jcf.replaceAll();

    // чтобы кастомный select открывался при нажатии на .label
    $('label.select .jcf-select').each(function () {
        $(this).append($(this).closest('label').find('.label'));
    });

    // Фокус на текстовых полях и select
    $('input[type=text], select, textarea').focus(function () {
        var label = $(this).closest('label');
        label.addClass('active');
        label.addClass('focus');

        // Для select, убирает focus при выборе варианта или исчезновении меню
        if ($(this).prop('tagName') === 'SELECT')
        {
            var that = $(this);

            $('.jcf-select-drop .jcf-option').click(function () {
                that.blur();
            });

            if ($('.jcf-select-drop').length === 0)
            {
                that.blur();
            }
        }
    });

    // Потеря фокуса на текстовых полях и select
    $('input[type=text], select, textarea').on('change blur', function () {
        var label = $(this).closest('label');
        if ($(this).val().length === 0)
            label.removeClass('active');
        else
            label.addClass('active');
        label.removeClass('focus');
    });

    // Не отправлять форму при нажатии на enter
    $('input[type=text]').keydown(function (e) {
        if (e.which === 13) {
            return false;
        }
    });

    /* Слайдер START */
    var sliderWrapper = $('.slides-wrapper');
    var slider = sliderWrapper.find('.slides');
    var sliderNav = $('.slide-move');

    function sliderHeight(slideIndex) {
        sliderWrapper.height(slider.find('.slide:eq(' + slideIndex + ')').outerHeight());
    }

    function moveSlideTo(slideIndex) {
        slider.css('transform', 'translateX(-' + slideIndex + '00%)');

        sliderHeight(slideIndex);

        slider.find('.slide.active').removeClass('active');
        slider.find('.slide:eq(' + slideIndex + ')').addClass('active');

        sliderNav.filter('.active').removeClass('active');
        sliderNav.eq(slideIndex).addClass('active');

        $(':focus').blur();
    }

    $('.slide-next').click(function () {
        moveSlideTo(slider.find('.slide.active').index() + 1);
    });

    sliderNav.click(function () {
        moveSlideTo($(this).attr('data-slide'));
    });

    slider.swipe({
        swipe: function (event, direction) {
            var slideActive = slider.find('.slide.active').index();

            if (direction === 'left' && slideActive + 1 < slider.find('.slide').length)
                moveSlideTo(slideActive + 1);
            else if (direction === 'right' && slideActive > 0)
                moveSlideTo(slideActive - 1);
        },
        excludedElements: $.fn.swipe.defaults.excludedElements + ", input, textarea, .jcf-range, label"
    });
    /* Слайдер END */

    /* Смена ориентации range для мобильной версии START */
    var version = 'desktop';
    if ($(window).outerWidth() <= 817)
        changeRangeOrientation()

    function changeRangeOrientation()
    {
        if (version === 'mobile' && $(window).outerWidth() > 817)
        {
            var rangeInputs = $('input[type=range]');
            rangeInputs.each(function () {
                $(this).attr('jcf', '{"orientation": "horizontal"}');
                jcf.destroy($(this));
                jcf.replace($(this));
                sliderHeight(slider.find('.slide.active').index());
                version = 'desktop';
            });
        } else if (version === 'desktop' && $(window).outerWidth() <= 817)
        {
            var rangeInputs = $('input[type=range]');
            rangeInputs.each(function () {
                $(this).attr('jcf', '{"orientation": "vertical"}');
                jcf.destroy($(this));
                jcf.replace($(this));
                sliderHeight(slider.find('.slide.active').index());
                version = 'mobile';
            });
        }
    }

    $(window).resize(function () {
        changeRangeOrientation();
    });
    /* Смена ориентации range для мобильной версии END */

    /* Навигация для мобильной версии START */

    var nav = $('header nav');

    $('.menu-button').click(function () {
        if (nav.hasClass('active'))
            nav.removeClass('active');
        else
            nav.addClass('active');
    });

    sliderNav.click(function () {
        nav.removeClass('active');
    });

    /* Навигация для мобильной версии END */

    // Инициализация событий после загрузки
    moveSlideTo(0);
    $('input[type=text],select').focus();
    $('input[type=text],select').blur();
    $('input:eq(0)').focus();

    // Отобразить страницу после инициализации всех скриптов
    $('body').addClass('active');
});