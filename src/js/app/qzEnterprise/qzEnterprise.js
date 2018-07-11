/**
 * @name: qzEnterprise
 * @date:2018-07-10 21:47
 */
var Enterprise = {
    id: "enterpriseTable",
    table: null,
    seItem: null,		//选中的条目
    winId:"enterpriseWin",
    list: D.API_PATH + "qzEnterprise/list",//获取企业列表
    getInfo: D.API_PATH + "qzEnterprise/info",//根据id查询企业
    removeSysRole: D.API_PATH + "qzEnterprise/remove",//根据id删除企业
    init: function () {
        this.initHeader();
        this.search();
        this.remove();
        this.add();
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
    initColumn: function () {
        var columns = [
            {field: 'selectItem', radio: true},
            {
                title: '序号', width: 50, align: 'center', valign: 'middle',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '企业名称', field: 'enterpriseName', align: 'center', valign: 'middle'},
            {title: '企业编码', field: 'sysCode', align: 'center', valign: 'middle'},
            {title: '联系人', field: 'linkName', align: 'center', valign: 'middle'},
            {title: '联系电话', field: 'linkPhone', align: 'center', valign: 'middle'},
            {title: '邮箱', field: 'linkEmail', align: 'center', valign: 'middle'},
            {title: '创建者', field: 'userName', align: 'center', valign: 'middle'},
            {title: '状态', field: 'state', align: 'center', valign: 'middle',
                formatter:function (value) {
                    if(value==1){
                        return "启用"
                    }else{
                        return "禁用"
                    }
                }},
            {
                title: '创建时间', field: 'createtime', align: 'center', valign: 'middle',
                formatter: function (value) {
                    return moment(value).format("YYYY-MM-DD HH:MM:ss")

                }
            }
        ]
        return columns;
    },
    /**
     * 检查是否选中
     */
    check: function () {
        var selected = $('#' + this.id).bootstrapTable('getSelections');
        if (selected.length == 0) {
            modals.info("请先选中表格中的某一记录！");
            return false;
        } else {
            Enterprise.seItem = selected[0];
            return true;
        }
    },
    search: function () {
        $("#search").click(function () {
            var queryData = {};
            queryData['enterprise_name'] = $("#enterprise_name").val();
            Enterprise.table.refresh({query: queryData});
        })
        $("#btn_reset").click(function () {
            $("#enterprise_name").val("");
            var queryData = {};
            queryData['enterprise_name'] = $("#enterprise_name").val();
            Enterprise.table.refresh({query: queryData});

        })
    },
    remove: function () {
        var me = this;
        $("#btn_delete").click(function () {
            if (me.check()) {
                modals.confirm("确认删除吗？", function () {
                    D.ajax(me.removeSysRole, D.RESTFUL_GET, {"id": Enterprise.seItem.id}, function (res) {
                        if(D.SUCCESS_CODE==res.code){
                            modals.correct(res.msg);
                            Enterprise.table.refresh();
                        }else{
                            modals.error(res.msg);
                        }
                    })
                })

            }
        })
    },
    add:function () {
        var me = this;
        $("#btn_add").click(function () {
            modals.openWin({
                winId: me.winId,
                title: '新增企业',
                width: '900px',
                backdrop: 'static',
                keyboard: false,
                url: D.HTML_PATH + "qzEnterprise/qzEnterpriseAdd.html"
            });
        });
    },
}
$(function () {
    var defaultColunms = Enterprise.initColumn();
    var table = new BSTable(Enterprise.id, Enterprise.list, defaultColunms);
    Enterprise.table = table.init();
    Enterprise.init();
})