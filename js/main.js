$(document).ready(function () {

    // настройки select
    jcf.setOptions('Select', {
        'wrapNative': false, // системное меню
        //'wrapNativeOnMobile': false, // системное меню на мобильных
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
                that.focusout();
            });

            if ($('.jcf-select-drop').length === 0)
            {
                that.focusout();
            }
        }
    });

    // Потеря фокуса на текстовых полях и select
    $('input[type=text], select, textarea').focusout(function () {
        var label = $(this).closest('label');
        if ($(this).val().length === 0)
            label.removeClass('active');
        label.removeClass('focus');
    });

    // Не отправлять форму при нажатии на enter
    $('input[type=text]').keydown(function (e) {
        if (e.which === 13) {
            return false;
        }
    });

    // Инициализация событий после загрузки
    $('input[type=text],select').trigger('focus');
    $('input[type=text],select').trigger('focusout');
    $('input:eq(0)').focus();

    // Отобразить страницу после инициализации всех скриптов
    $('body').addClass('active');
});