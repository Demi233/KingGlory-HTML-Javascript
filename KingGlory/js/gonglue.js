// JavaScript Document
$(function(){
	$('.gonglueleftnav').children('a').each(function(index, element) {
        $(this).mouseover(function(){
			for(var j=0; j <$('.gonglueleftnav').children('a').length;j++)
				{
					$(this).siblings().removeClass('on');
				}
				var tid=$(this).attr('id');
				if(tid=="gonglue1")
				{
					$('#next1').css('display','block');
					$('#next1').siblings().css('display','none');
					$('#con1').css('display','block');
					$('#con1').siblings().css('display','none');
				}
				else if(tid=="gonglue2")
				{
					$('#next2').css('display','block');
					$('#next2').siblings().css('display','none');
					$('#con2').css('display','block');
					$('#con2').siblings().css('display','none');
				}
				else
				{
					$('#next3').css('display','block');
					$('#next3').siblings().css('display','none');
					$('#con3').css('display','block');
					$('#con3').siblings().css('display','none');
				}
			$(this).addClass('on');
		})
    });
	$('.nexttitle').children('a').each(function(index, element) {
        $(this).mouseover(function(){
			for(var j=0; j <$('.nexttitle').children('a').length;j++)
				{
					$(this).siblings().removeClass('titleon');
				}
			$(this).addClass('titleon');
		})
    });
})
