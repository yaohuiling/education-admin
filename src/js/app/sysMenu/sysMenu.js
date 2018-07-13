var SysMenu = {
    id: "menuTable",
    table: null,
    seItem: null,		//选中的条目
    winId: "menuWin",
    menuList: D.API_PATH + "sysMenu/list",//获取菜单列表
    removeSysMenu: D.API_PATH + "sysMenu/remove",//根据id删除菜单
    init: function () {
        this.initHeader();
        this.search();
        this.remove();
        this.add();
        this.modify();
        this.initMenuTable();
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
            {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '17%'},
            {title: '菜单编号', field: 'code', align: 'center', valign: 'middle', sortable: true, width: '12%'},
            {title: '菜单父编号', field: 'pcode', align: 'center', valign: 'middle', sortable: true},
            {title: '请求地址', field: 'url', align: 'center', valign: 'middle', sortable: true, width: '15%'},
            {title: '排序', field: 'num', align: 'center', valign: 'middle', sortable: true},
            {title: '层级', field: 'levels', align: 'center', valign: 'middle', sortable: true},
            {title: '是否是菜单', field: 'isMenuName', align: 'center', valign: 'middle', sortable: true,formatter(value){
                if(value==1){
                    return"否"
                }else{
                    return "是"
                }
                }},
            {title: '状态', field: 'statusName', align: 'center', valign: 'middle', sortable: true,formatter(value){
                    if(value==1){
                        return"禁用"
                    }else{
                        return "启用"
                    }
                }}]
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
            SysMenu.seItem = selected[0];
            return true;
        }
    },
    search: function () {
        $("#search").click(function () {
            var queryData = {};
            queryData['name'] = $("#menu_name").val();
            SysMenu.table.refresh({query: queryData});
        })
        $("#btn_reset").click(function () {
            $("#menu_name").val("");
            var queryData = {};
            queryData['name'] = $("#menu_name").val();
            SysMenu.table.refresh({query: queryData});

        })
    },
    remove: function () {
        var me = this;
        $("#btn_delete").click(function () {
            if (me.check()) {
                modals.confirm("确认删除吗？", function () {
                    D.ajax(me.removeSysMenu, D.RESTFUL_POST, {"id": SysMenu.seItem.id}, function (res) {
                        if (D.SUCCESS_CODE == res.code) {
                            modals.correct(res.msg);
                            SysMenu.seItem = null;
                            SysMenu.table.refresh();
                        } else {
                            modals.error(res.msg);
                        }
                    })
                })

            }
        })
    },
    add: function () {
        var me = this;
        $("#btn_add").click(function () {
            modals.openWin({
                winId: me.winId,
                title: '新增菜单',
                width: '900px',
                backdrop: 'static',
                keyboard: false,
                url: D.HTML_PATH + "sysMenu/sysMenuAdd.html"
            });
        });
    },
    modify: function () {
        var me = this;
        $("#btn_edit").click(function () {
            if (me.check()) {
                window.roleId = me.seItem.id
                modals.openWin({
                    winId: me.winId,
                    title: '修改菜单',
                    width: '900px',
                    backdrop: 'static',
                    keyboard: false,
                    url: D.HTML_PATH + "sysMenu/sysMenuEdit.html"
                });
            }
        });
    },
    initMenuTable:function(){
        var defaultColunms = this.initColumn();
        var table = new BSTreeTable(this.id,this.menuList, defaultColunms);
        table.setExpandColumn(2);
        table.setIdField("id");
        table.setCodeField("id");
        table.setParentCodeField("pid");
        table.setExpandAll(true);
        table.init();
        SysMenu.table = table;
    }
}
$(function () {
    SysMenu.init();
    D.topBar();
})