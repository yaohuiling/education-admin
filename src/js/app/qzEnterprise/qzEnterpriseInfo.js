/**
 * @name: qzEnterprise
 * @date:2018-07-10 21:47
 */
var EnterpriseInfo = {
    table: null,
    seItem: null,		//选中的条目
    winId: "enterpriseWin",
    add: D.API_PATH + "qzEnterprise/add",//增加企业信息
    getInfo: D.API_PATH + "qzEnterprise/info",//根据id查询企业
    modify: D.API_PATH + "qzEnterprise/modify",//修改企业信息
    validateFields: {
        enterpriseName: {
            validators: {
                notEmpty: {
                    message: '企业名称不能为空'
                }
            }
        }
    },
    init: function () {
        this.save();
    },
    save: function () {
        var me = this;
        $("#addBtn").click(function (event) {
            var obj={};
            event.stopPropagation();
            if (!me.validate()) {
                return;
            }
            var data =  $('#enterpriseForm').serializeObject();
           D.ajax(me.add,D.RESTFUL_POST,data,function (res) {
               if(res.code==D.SUCCESS_CODE){
                   modals.correct(res.msg);
                   window.parent.Enterprise.table.refresh();
               }else{
                   modals.error(res.msg);
               }
           })
        })

    },
    /**
     * 验证数据是否为空
     */
    validate: function () {
        $('#enterpriseForm').data("bootstrapValidator").resetForm();
        $('#enterpriseForm').bootstrapValidator('validate');
        return $('#enterpriseForm').data('bootstrapValidator').isValid();
    }

}
$(function () {
    D.initValidator("enterpriseForm",EnterpriseInfo.validateFields);
    $('#enterpriseForm').data("bootstrapValidator").addRequiredIdentifying();
    EnterpriseInfo.init();
})