/**
 * @name: sysLogList
 * @date:2018-07-13 21:27
 */
var sysLog = {
    id:"sysLogTable",
    sysLogList: D.API_PATH + "sysLog/list",//日志列表
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
            {title: '类型', field: 'type', align: 'center', valign: 'middle',formatter:function (value) {
                    if(value==3){
                        return "操作"
                    }else if(value==2){
                        return "操作"
                    }
                }},
            {title: '操作者', field: 'username', align: 'center', valign: 'middle'},
            {title: 'ip', field: 'ip', align: 'center', valign: 'middle'},
            {title: '操作结果', field: 'result', align: 'center', valign: 'middle',formatter:function (value) {
                    if(value==2){
                        return "操作成功"
                    }else{
                        return "操作异常"
                    }
                }},
            {title: '操作描述', field: 'remark', align: 'center', valign: 'middle'},
            {
                title: '操作时间', field: 'gmtCreate', align: 'center', valign: 'middle',
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
            queryData['username'] = $("#username").val();
            queryData['type'] = $("#type").val();
            sysLog.table.refresh({query: queryData});
        })
        $("#btn_reset").click(function () {
            $("form")[0].reset();
            sysLog.table.refresh();

        })
    },
    initLoginTable:function () {
        D.topBar();
        var defaultColunms = this.initColumn();
        var table = new BSTable(this.id, this.sysLogList, defaultColunms);
        this.table = table.init();
    }
}
$(function () {
    sysLog.init();
})