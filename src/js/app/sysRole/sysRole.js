/**
 * @name: sysRole.js
 * @date:2018-07-06 14:30
 */
var SysRole = {
    id:"role_table",
    table:null,
    roleList: D.API_PATH + "sysRole/list",//获取角色列表
    getInfo: D.API_PATH + "sysRole/info",//根据id查询角色
    addSysRole: D.API_PATH + "sysRole/add",//保存角色
    modifySysRole: D.API_PATH + "sysRole/modify",//修改角色
    removeSysRole: D.API_PATH + "sysRole/remove",//根据id删除角色
    init: function () {
        this.initHeader();
        this.initRoleTable();
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
            {title: '名称', field: 'name', align: 'center', valign: 'middle', sortable: true},
            {title: '上级角色', field: 'pName', align: 'center', valign: 'middle', sortable: true},
            {title: '所在机构', field: 'officeName', align: 'center', valign: 'middle', sortable: true}]
        return columns;
    },

}
$(function(){
    var defaultColunms = SysRole.initColumn();
    var table = new BSTable(SysRole.id, SysRole.roleList, defaultColunms);
    SysRole.table = table.init();
})