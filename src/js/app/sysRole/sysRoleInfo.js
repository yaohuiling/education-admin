/**
 * @name: sysRoleInfo
 * @date:2018-07-09 15:00
 */
var SysRoleInfo = {
    getInfo: D.API_PATH + "sysRole/info",//根据id查询角色
    addSysRole: D.API_PATH + "sysRole/add",//保存角色
    modifySysRole: D.API_PATH + "sysRole/modify",//修改角色
    roleTreeList: D.API_PATH + "sysRole/tree",//获取角色树
    officeTreeList: D.API_PATH + "sysOffice/tree",//获取组织机构树
    officeTree: null,
    roleTree: null,
    validateFields: {
        name: {
            validators: {
                notEmpty: {
                    message: '角色名称不能为空'
                }, stringLength: {//检测长度
                    min: 1,
                    max: 20,
                    message: '长度必须在1-20之间'
                }
            }
        }
    },
    init: function () {
        this.roleStatusBootstrapSwitch();
        this.add();
        this.initOfficeTree();
        this.initRoleTree();
        this.clickRoleTree();
        this.clickOfficeTree();
    },

    /**
     * 点击机构input框时
     *
     * @param e
     * @param treeId
     * @param treeNode
     * @returns
     */
    onClickOffice: function (e, treeId, treeNode) {
        $("#officeName").attr("value", SysRoleInfo.officeTree.getSelectedVal());
        $("#officeId").attr("value", treeNode.id);
        $("#officeContent").fadeOut(500);
    },
    onDblClickOffice: function (e, treeId, treeNode) {
        $("#officeName").attr("value", SysRoleInfo.officeTree.getSelectedVal());
        $("#officeId").attr("value", treeNode.id);
        $("#officeContent").fadeOut(500);
    },

    /**
     * 点击父级角色input框时
     *
     * @param e
     * @param treeId
     * @param treeNode
     * @returns
     */
    onClickPRole: function (e, treeId, treeNode) {
        $("#pRoleName").attr("value", SysRoleInfo.roleTree.getSelectedVal());
        $("#pid").attr("value", treeNode.id);
        $("#pRoleContent").fadeOut(500);
    },
    /**
     * 初始化switch 按钮
     */
    roleStatusBootstrapSwitch: function () {
        $("#role_status_switch").bootstrapSwitch({
            onText: "启用",
            offText: "禁用"
        });
        $("#role_status_switch").on("switchChange.bootstrapSwitch", function (event, state) {
            if (state) {
                $("#role_status").val(1);
            } else {
                $("#role_status").val(0);
            }
        });
    },
    add: function () {
        var me = this;
        $("#addSubmit").click(function (event) {
            if (!D.validate("roleForm")) {
                return;
            }
            var obj = $("#roleForm").serializeObject();
            D.ajax(me.addSysRole, D.RESTFUL_POST, obj, function (res) {
                if (res.code == D.SUCCESS_CODE) {
                    modals.closeWin(SysRole.winId);
                    modals.correct(res.msg);
                    window.parent.SysRole.table.refresh();
                } else {
                    modals.error(res.msg);

                }
            })
        })
    },
    initOfficeTree: function () {
        var sysOfficeTree = new $ZTree("officeTree", this.officeTreeList);
        sysOfficeTree.bindOnClick(SysRoleInfo.onClickOffice);
        sysOfficeTree.bindOnDblClick(SysRoleInfo.onDblClickOffice);
        sysOfficeTree.init();
        SysRoleInfo.officeTree = sysOfficeTree;


    },
    initRoleTree: function () {
        var pRoleTree = new $ZTree("pRoleTree", this.roleTreeList);
        pRoleTree.bindOnClick(SysRoleInfo.onClickPRole);
        pRoleTree.init();
        SysRoleInfo.roleTree = pRoleTree;
    },
    clickRoleTree:function(){
        $("#pRoleName").click(function () {
            $("#pRoleContent").fadeIn(500);
        })
    },
    clickOfficeTree:function() {
        $("#officeName").click(function () {
            $("#officeContent").fadeIn(500);
        })

    }
}


$(function () {
    D.initValidator("roleForm", SysRoleInfo.validateFields);
    $('#roleForm').data("bootstrapValidator").addRequiredIdentifying();
    SysRoleInfo.init();

})