var SysUser = {
    getList:D.API_PATH+"sysUser/list",
    init:function(){
        this.initHeader();
    },
    initHeader:function(){
        var header = $(".content-header");
        header.find("h1").html(localStorage.getItem("header_name"));
        header.find(".breadcrumb").html(function () {
            var name = localStorage.getItem("header_bread").split(",");
            var str = '';
            $(name).each(function (index, item) {
                if (name.length - 1 === index) {
                    str += '<li class="active">' + item + '</li>'
                } else {
                    if (index === 0) {
                        str += '<li><a href="javascript:void(0);"><i class="fa fa-dashboard"></i> ' + item + '</a></li>';
                    } else {
                        str += '<li><a href="javascript:void(0);">' + item + '</a></li>';
                    }
                }
            });
            return str;
        })
    }
}
$(function () {
    SysUser.init();
})