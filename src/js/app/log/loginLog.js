/**
 * @name: loginLog
 * @date:2018-07-13 20:33
 */
var LoginLog = {
    id:"loginLogTable",
    loginLogList: D.API_PATH + "sysLoginLog/list",//日志列表
    init:function () {
        this.initHeader();
        this.initDateTimePicker();
        this.initLoginTable();
        this.search();
    },
    initHeader: function () {
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
    },
    initDateTimePicker: function () {
        // 开始时间
        $("#startTime").datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            minView: "month" //选择日期后，不会再跳转去选择时分秒
        })
        //结束时间
        $("#endTime").datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            minView: "month" //选择日期后，不会再跳转去选择时分秒
        })
    },
    initColumn: function () {
        var columns = [
            {
                title: '序号', width: 50, align: 'center', valign: 'middle',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {title: '日志名称', field: 'logname', align: 'center', valign: 'middle'},
            {title: 'ip', field: 'ip', align: 'center', valign: 'middle'},
            {title: '是否成功', field: 'succeed', align: 'center', valign: 'middle'},
            {title: '具体消息', field: 'message', align: 'center', valign: 'middle'},
            {
                title: '创建时间', field: 'creatTime', align: 'center', valign: 'middle',
                formatter: function (value) {
                    return moment(value).format("YYYY-MM-DD HH:MM:ss")

                }
            }
        ]
        return columns;
    },
    search: function () {
        $("#search").click(function () {
            var queryData = {};
            queryData['start_time'] = $("#startTime").val();
            queryData['end_time'] = $("#endTime").val();
            LoginLog.table.refresh({query: queryData});
        })
        $("#btn_reset").click(function () {
            var queryData = {};
            queryData['start_time'] = $("#startTime").val("");
            queryData['end_time'] = $("#endTime").val("");
            LoginLog.table.refresh();

        })
    },
    initLoginTable:function () {
        D.topBar();
        var defaultColunms = this.initColumn();
        var table = new BSTable(this.id, this.loginLogList, defaultColunms);
        this.table = table.init();
    }
}
$(function () {
    LoginLog.init();
})