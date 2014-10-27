var l = console;
var cajita = $('.box-little');
$('#loader').hide();
cajita.scroll(function(){
    //l.log("scrolleando cajita")
    var nivelScroll = (cajita.scrollTop())
    var altoContenedor = (cajita.height())
    var altoContenido = ($('.box-little > .wrap').height())
    var cond = (($('.box-little > .wrap').height() - cajita.height()) === cajita.scrollTop());
    l.log(cond)
})

    //$('#loader').hide();
$(window).scroll(function()
{
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {
        $('#loader').show();
        l.log("scroll")
        var jqxhr = $.ajax('/users/description')
        .done(function(html){
            //l.log(html)
            if(html){
                //l.log(html)
                var item = document.createElement('div')
                item.setAttribute('class','item')
                item.innerHTML = html
                $("#post").append(item);
                $('#loader').hide();
            }else{
                $('#loader').html('<center>No more posts to show.</center>');
            }
        })
        .fail(function(err){
            l.log("falla en peticion")
        })
        .always(function(){
            $('#loader').hide();
            l.log("always")
        })
    }

});