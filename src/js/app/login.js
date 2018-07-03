var Login = {
    /*登录验证*/
    loginUrl: D.API_PATH + "sys/login",
    /*验证码图片*/
    checkCodeUrl: D.API_PATH + "sys/getCode",
    init: function () {
        //显示隐藏验证码
        this.showOrHideCode();
        //提交校验
        this.checkSubmit();
        //回车提交
        this.enterSubmit();
        //更换验证码
        this.checkCode();
    },
    showOrHideCode: function () {
        //显示隐藏验证码
        $('#hide').click(function () {
            $('.code').fadeOut('slow');
        });
        $('#captcha').focus(function () {
            $('.code').fadeIn('fast');
        });
    },
    checkCode: function () {
        var that = this;
        $(".img_right").attr("src", this.checkCodeUrl + "?t=" + D.time());
        $(".img_right").click(function () {
           $(this).attr("src", that.checkCodeUrl + "?t=" + D.time());
        });
    },
    checkSubmit: function () {

        var self = this;
        $(".btn-submit").click(function () {

            var username = $('#username').val();
            var password = $('#password').val();
            var captcha = $('#code').val();
            if (username == "") {
               modals.info("请输入用户名");
                return true;
            }
            if (password == "") {
                modals.info("请输入密码");
                return true;
            }
            if (captcha == "") {
                modals.info("请输入验证码");
                return true;
            }
            var data = D.json_encode({
                "username": username,
                "password": password,
                "code": captcha
            });
            D.ajax(self.loginUrl, D.RESTFUL_POST, data, function (res) {
                if (D.SUCCESS_CODE == res.code) {
                    $.cookie("token",res.token);
                    $.cookie("sysUser",JSON.parse(res.sysUser));
                    self.loginSubmit();
                } else {
                    modals.info(res.msg);
                    $('#code').val("");
                    $(".img_right").trigger("click");
                }
            })

        })


    },
    loginSubmit: function () {
        $(".error").fadeOut("slow").html("");
        setTimeout(function () {
                D.goto("index.html");
            },
            300);
    },
    enterSubmit: function () {
        // 回车提交表单
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                $(".btn-submit").trigger("click");
            }
        });
    }
}
$(function () {
    Login.init();
})
