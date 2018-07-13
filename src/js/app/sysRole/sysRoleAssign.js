var RoleAssign = {
    menuTree: D.API_PATH + "sysMenu/menuTreeListByRoleId/",
    setAuthority: D.API_PATH + "sysRole/setAuthority",
    init: function () {
        this.initTree();
        this.authority();
    },
    initTree: function () {
        var setting = {
            check: {
                enable: true,
                chkboxType: {"Y": "ps", "N": "ps"}
            },
            data: {
                simpleData: {
                    enable: true,
                    // dKey: "id",
                    // pIdKey: "pId",
                    // rootPId: 0
                }
            }
        };

        var ztree = new $ZTree("zTree", this.menuTree
            + window.roleId);
        ztree.setSettings(setting);
        ztree.init();
    },
    //设置权限
    authority: function () {
        var me = this;
        $("#authSubmit").click(function () {
            var ids = D.zTreeCheckedNodes("zTree");
            D.ajax(me.setAuthority, D.RESTFUL_POST, {"roleId": window.roleId, "ids": ids}, function (res) {
                if (res.code == D.SUCCESS_CODE) {
                    modals.closeWin(SysRole.winId);
                    modals.correct(res.msg);
                    window.parent.SysRole.table.refresh();
                    window.roleId=null;
                    $.fn.zTree.destroy();

                } else {
                    modals.error(res.msg);
                    window.roleId=null;
                }

            })
        })
    }
}
$(function () {
    RoleAssign.init();
})