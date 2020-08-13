$(function () {
    // 调用getUserInfo
    getUserInfo()
    var layer = layui.layer
    // 点击按钮实现退出功能
    
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            layer.close(index);
        })
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorzation: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // 调用renderAvatar
            renderAvatar()

        }
    })
}
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户图像
    if (user.user_pic !== null) {
        // 渲染图片图像
        $('.layui-nav-img')
            .attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本图像
        $('.layer-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}