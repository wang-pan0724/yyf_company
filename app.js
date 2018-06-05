App({
  util: require('we7/resource/js/util.js'),
  globalData: {
    userInfo: null,
    code: '',
  },

  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        that.util.request({
          url: 'entry/wxapp/TabBar',
          data: {
            m: 'yyf_company'
          },
          cachetime: 0,
          success: function (res) {
              wx.setStorageSync('barlist', res.data.data)
          }
        });
      }
    });
  },

  tabBar: {
    "color": "#123",
    "selectedColor": "#1ba9ba",
    "borderStyle": "#1ba9ba",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "/we7/pages/index/index",
        "iconPath": "/we7/resource/icon/home.png",
        "selectedIconPath": "/we7/resource/icon/homeselect.png",
        "text": "首页"
      },
      {
        "pagePath": "/we7/pages/user/index/index",
        "iconPath": "/we7/resource/icon/user.png",
        "selectedIconPath": "/we7/resource/icon/userselect.png",
        "text": "联系"
      }
    ]
  },
  siteInfo: { "name": "\u7cbe\u7f8e\u4f01\u4e1a\u516c\u53f8\u5b98\u7f51\u5c0f\u7a0b\u5e8f", "uniacid": "4", "acid": "4", "multiid": "0", "version": "16.0", "siteroot": "https://we.kuaiyunma.com/app/index.php", "design_method": "7" }
});