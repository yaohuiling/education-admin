/**
 * @name: sysRoleInfo
 * @date:2018-07-09 15:00
 */
var SysRoleInfo = {
    init:function () {
        this.roleAddStatusBootstrapSwitch();
    },
    /**
     * 初始化switch 按钮
     */
    roleAddStatusBootstrapSwitch: function () {
        $("#add_role_status_switch").bootstrapSwitch({
            onText: "开启",
            offText: "关闭"
        });
        $("#add_role_status_switch").on("switchChange.bootstrapSwitch",function (event, state) {
            if (state) {
                $("#add_role_status").val(1);
            } else {
                $("#add_role_status").val(0);
            }
        });
    },
}
$(function () {
    SysRoleInfo.init();
})