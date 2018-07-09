/**
 * @name: sysRole.js
 * @date:2018-07-06 14:30
 */
var SysRole = {
    id: "roleTable",
    table: null,
    seItem: null,		//选中的条目
    winId:"roleWin",
    roleList: D.API_PATH + "sysRole/list",//获取角色列表
    getInfo: D.API_PATH + "sysRole/info",//根据id查询角色
    addSysRole: D.API_PATH + "sysRole/add",//保存角色
    modifySysRole: D.API_PATH + "sysRole/modify",//修改角色
    removeSysRole: D.API_PATH + "sysRole/remove",//根据id删除角色
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
            {title: '名称', field: 'name', align: 'center', valign: 'middle'},
            {title: '上级角色', field: 'pName', align: 'center', valign: 'middle'},
            {title: '所在机构', field: 'officeName', align: 'center', valign: 'middle'},
            {title: '状态', field: 'status', align: 'center', valign: 'middle',
            formatter:function (value) {
                if(value==1){
                    return "启用"
                }else{
                    return "禁用"
                }
            }},
            {title: '描述', field: 'desc', align: 'center', valign: 'middle'},
            {
                title: '创建时间', field: 'creatTime', align: 'center', valign: 'middle',
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
            SysRole.seItem = selected[0];
            return true;
        }
    },
    search: function () {
        $("#search").click(function () {
            var queryData = {};
            queryData['name'] = $("#roleName").val();
            SysRole.table.refresh({query: queryData});
        })
        $("#btn_reset").click(function () {
            $("#roleName").val("");
            var queryData = {};
            queryData['name'] = $("#roleName").val();
            SysRole.table.refresh({query: queryData});

        })
    },
    remove: function () {
        var me = this;
        $("#btn_delete").click(function () {
            if (me.check()) {
                modals.confirm("确认删除吗？", function () {
                    D.ajax(me.removeSysRole, D.RESTFUL_POST, {"id": SysRole.seItem.id}, function (res) {
                        if(D.SUCCESS_CODE==res.code){
                            modals.correct(res.msg);
                            SysRole.table.refresh();
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
                title: '新增角色',
                width: '900px',
                backdrop: 'static',
                keyboard: false,
                url: D.HTML_PATH + "sysRole/sysRoleAdd.html"
            });
        });
    },


}
$(function () {
    var defaultColunms = SysRole.initColumn();
    var table = new BSTable(SysRole.id, SysRole.roleList, defaultColunms);
    SysRole.table = table.init();
    SysRole.init();
})