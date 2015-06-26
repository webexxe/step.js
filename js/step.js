/*! step.js v1.0.1 | MIT License | github.com/webexxe */

$(function () {

    // AYARLAR
    var alertMessage ="Please fill out the required fields..."
    var inEffect = "fadeInUpBig";
    var outEffect = "fadeOutUpBig";
    var finalEffect = "fadeInDown";
    // Animasyonlar -->  https://daneden.github.io/animate.css/

    // BASLANGIC  
    // Navigator olusturma
    $(".stpCont[id]").each(function(){
        var id = $(this).attr("id");
        $(".stepNavigation").append("<li class='stpNav' data-step="+id+"></li>");
    });

    // Aktif stepin navigation deki karsiligi
    var active = $(".stpCont.active").attr("id");
    $(".stpNav[data-step='"+active+"']").addClass("a");

    // StepCont yükseklik hesaplama
    $(".stpCont").each(function(){
        var this_ = $(this);
        var height = $(this_).outerHeight();
        $(this_).css("margin-top","-" + (height / 2) + "px");
    });

    // Navigation yükseklik hesaplama
    $(".stepNavigation").css("margin-top", "-" + ($(".stepNavigation").outerHeight() / 2) + "px");    

    // Form nesnesindeki focus kontrolu
    $("input,select").click(function(){
        $(this).addClass("focus");
    });

    // YUZDE HESAPLAMA
    function stepBar(){
        var adet = 0;
        $(".stpNav").each(function(){adet = adet + 1;});
        var yuzde = 100 / adet;
        var gadet = 0;
        $(".stpNav.g").each(function(){gadet = gadet + 1;});
        var barValue = yuzde * gadet;
        $(".stpBvalue").css("width", barValue+"%");
    };

    // ILERI GITME
    function nexTo(item){
        var hedef = item.parent().attr("id");
        var nextHedef = $(".stpNav[data-step='"+hedef+"']").next().attr("data-step");
        $(".stpNav[data-step='"+hedef+"']").addClass("g");
        $(".stpNav[data-step='"+nextHedef+"']").addClass("a");

        $(".stpCont#"+hedef).addClass(outEffect);               
        $(".stpCont#"+nextHedef).addClass(inEffect + " active");

        stepBar();
        setTimeout(function(){
            $(".stpCont#"+hedef).removeClass("active");   
            $(".stpCont").removeClass(inEffect+" "+outEffect);
        }, 1000);

        if(item.hasClass("final")){
            setTimeout(function(){
                $(".stepNavigation").fadeOut(200);
                $(".stpCont.final").addClass("active " + finalEffect);
            }, 1010);
        }
    };

    $(".stpNext").click(function(){
        if($(this).hasClass("required")){
            if($(this).parent().find("input, select").val()){
                nexTo($(this));
                $(".stpCont.active .alert").remove();
            }else{   
                $(this).parent().find("input, select").click();
                $(this).parent().find("input, select").focus();
                $(".stpCont.active .alert").remove();
                $(".stpCont.active").append("<div class='alert'>"+alertMessage+"</div>");
            }
        }else{
            nexTo($(this));
        }
    });

    // GERI GITME
    $(document).delegate( ".stpNav.a.g", "click", function() {
        var hedef = $(this).attr("data-step");

        $(".stpNav[data-step='"+hedef+"']").removeClass("g");
        $(".stpNav[data-step='"+hedef+"']").addClass("a");
        $(".stpNav[data-step='"+hedef+"'] ~ .stpNav").removeClass("a g");


        var prevHedef = $(".stpCont.active").attr("id");
        $(".stpCont#"+prevHedef).addClass(outEffect);
        setTimeout(function(){
            $(".stpCont#"+prevHedef).removeClass("active");
        }, 1000);
        $(".stpCont#"+hedef).addClass(inEffect + " active");
        stepBar();
    });


    // ENTER
    $(document).keypress(function (e) {
        var key = e.which;
        if(key == 13)
        {
            $(".stpCont.active .stpNext").click();
        }
    });    


})   