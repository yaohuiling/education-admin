/**
 * @name: sysRoleInfo
 * @date:2018-07-09 15:00
 */
var SysMenuAdd = {
    addMenu: D.API_PATH + "sysMenu/add",//保存菜单
    menuTreeList: D.API_PATH + "sysMenu/selectMenuTreeList",//获取菜单树
    menuTree: null,
    validateFields: {
        name: {
            validators: {
                notEmpty: {
                    message: '菜单名称不能为空'
                }, stringLength: {//检测长度
                    min: 1,
                    max: 200,
                    message: '长度必须在1-200之间'
                }
            }
        },
        code: {
            validators: {
                notEmpty: {
                    message: '菜单编码不能为空'
                }, stringLength: {//检测长度
                    min: 1,
                    max: 200,
                    message: '长度必须在1-200之间'
                }
            }
        },
        url: {
            validators: {
                notEmpty: {
                    message: '菜单路径不能为空'
                }, stringLength: {//检测长度
                    min: 1,
                    max: 200,
                    message: '长度必须在1-200之间'
                }
            }
        }
    },
    init: function () {
        this.menuStatusBootstrapSwitch();
        this.ismenu_switchBootstrapSwitch();
        this.add();
        this.initMenuTree();
        this.clickMenuTree();
    },


    /**
     * 初始化switch 按钮
     */
    menuStatusBootstrapSwitch: function () {
        $("#menu_status_switch").bootstrapSwitch({
            onText: "启用",
            offText: "禁用"
        });
        $("#menu_status_switch").on("switchChange.bootstrapSwitch", function (event, state) {
            if (state) {
                $("#role_status").val(1);
            } else {
                $("#role_status").val(0);
            }
        });
    },
    /**
     * 初始化switch 按钮
     */
    ismenu_switchBootstrapSwitch: function () {
        $("#ismenu_switch").bootstrapSwitch({
            onText: "启用",
            offText: "禁用"
        });
        $("#ismenu_switch").on("switchChange.bootstrapSwitch", function (event, state) {
            if (state) {
                $("#role_status").val(1);
            } else {
                $("#role_status").val(0);
            }
        });
    },
    /**
     * 点击父级角色input框时
     *
     * @param e
     * @param treeId
     * @param treeNode
     * @returns
     */
    onClickPMenu: function (e, treeId, treeNode) {
        $("#pMenuName").attr("value", SysMenuAdd.menuTree.getSelectedVal());
        $("#pid").attr("value", treeNode.id);
        $("#pMenuContent").fadeOut(500);
    },
    initMenuTree: function () {
        var menuTree = new $ZTree("menuTree", this.menuTreeList);
        menuTree.bindOnClick(SysMenuAdd.onClickPMenu);
        menuTree.init();
        SysMenuAdd.menuTree = menuTree;
    },
    clickMenuTree() {
        $("#pMenuName").click(function () {
            $("#pMenuContent").fadeIn(500);
        })
    },
    add: function () {
        var me = this;
        $("#addSubmit").click(function (event) {
            if (!D.validate("addMenuForm")) {
                return;
            }
            var obj = $("#addMenuForm").serializeObject();
            D.ajax(me.addMenu, D.RESTFUL_POST, obj, function (res) {
                if (res.code == D.SUCCESS_CODE) {
                    modals.closeWin(SysMenu.winId);
                    modals.correct(res.msg);
                    window.parent.SysMenu.table.refresh();
                } else {
                    modals.error(res.msg);
                }
            })
        })
    }
}


$(function () {
    debugger
    D.initValidator("addMenuForm", SysMenuAdd.validateFields);
    $('#addMenuForm').data("bootstrapValidator").addRequiredIdentifying();
    SysMenuAdd.init();

})