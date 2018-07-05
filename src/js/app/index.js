var Index = {
    /*获取当前登录用户的菜单*/
    menuUrl: D.API_PATH + "sys/index",

    init: function () {
        this.getMenu();
        this.clickUrl();
    },
    getMenu: function () {
        var that = this;
        D.syncAjax(this.menuUrl, "GET", null, function (res) {
            if (res.code == D.SUCCESS_CODE) {
                var str = "";
                var result = res.result;
                if (result) {
                    $(result).each(function (index, item) {
                        str += '<li class="treeview">' +
                            '<a href="javascript:void(0);">' +
                            '<i class="' + item.icon + '"></i> <span>' + item.name + '</span>';
                        if (item.children && item.children.length > 0) {
                            str += '<span class="pull-right-container">' +
                                '<i class="fa fa-angle-left pull-right"></i>' +
                                '</span>';
                        }
                        str += '</a>';
                        if (item.children && item.children.length > 0) {
                            str += that.initHtml(item.name, "", item.children);
                        }
                        str += '</li>'

                    })
                }
                $("#sidebar-menu").html(str);
            } else {
                modals.info(res.msg);
            }
        })
    },
    clickUrl:function(){
        $(".sidebar-menu").on("click", "a[data-url]", function () {
            var url = $(this).data("url");
            D.addCookie("this_content_url", url)
            var codes = $(this).data("actions");
            $("#mainDiv").load(D.HTML_PATH+url);
            localStorage.windowCodes = codes;
            //$("ul.treeview-menu li").removeClass("active");
            //$(this).parent().addClass("active");
            var header_name = $(this).find("span").text();
            var header_bread = $(this).data("name");
            localStorage.removeItem("header_name");
            localStorage.removeItem("header_bread");
            localStorage.setItem("header_name",header_name);
            localStorage.setItem("header_bread",header_bread);
        });
    },
    initHtml: function (names, name, arr) {
        var str = '<ul class="treeview-menu">';
        $(arr).each(function (index, item) {
            var val = names + "," + item.name;
            str += '<li class="treeview"><a href="javascript:void(0);" ' +
                (item.children ? '' : 'data-url="' + item.url + '"');
            str += ' data-name="' + val + '">';
            str += '<i class="' + item.icon + '"></i> <span>' + item.name + '</span>';
            if (item.children && item.children.length > 0) {
                str += '<span class="pull-right-container">' +
                    '<i class="fa fa-angle-left pull-right"></i>' +
                    '</span>';
            }
            str += '</a>';
            if (item.children && item.children.length > 0) {
                str += initHtml(val, item.name, item.children);
            }
            str += '</li>'
        });
        str += "</ul>";
        return str;
    }
}
$(function () {
    Index.init();
})
