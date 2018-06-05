var app = getApp()
Page({
  data: {
    slide: [],
    sysinfo: {},
    list: [],
    cats: [],
    copyright: '',
    blist: {},
    tcolor: '',
    horn: '',
    slide_close: '0',
    nav_close: '0',
    notice_close: '0',
    slide_height: '',
    adsense: {},
    nav_style: '0',
    title_style: '0',
    timer: 0,
    show_video: false,
    hide_time: '0'
  },
  onLoad: function (options) {
    var that = this
    var uniacid = app.siteInfo.uniacid;
    that.setTabBar()
    app.util.request({
      url: 'entry/wxapp/index',
      data: {
        m: 'yyf_company',
        uniacid: uniacid
      },
      cachetime: 0,
      success: function (res) {
        if (!res.data.errno) {
          that.setData({
            slide: res.data.data.slide,
            sysinfo: res.data.data.sysinfo,
            list: res.data.data.list,
            cats: res.data.data.cats,
            horn: res.data.data.horn,
            notice_close: res.data.data.notice_close,
            slide_close: res.data.data.slide_close,
            nav_close: res.data.data.nav_close,
            slide_height: res.data.data.slide_height,
            nav_style: res.data.data.nav_style,
            title_style: res.data.data.title_style,
            hide_time: res.data.data.hide_time
          })
          wx.setNavigationBarTitle({
            title: res.data.data.sysinfo.title,
          })
          app.globalData.copyright = res.data.data.sysinfo.copyright;

        }
      },
      fail: function (res) {
        failGo(res.message);
      }
    });

    app.util.request({
      url: 'entry/wxapp/Adsense',
      data: {
        m: 'yyf_company',
        uniacid: uniacid
      },
      cachetime: 0,
      success: function (res) {
        if (!res.data.errno) {
          that.setData({
            adsense: res.data.data,

          })
        }
      }
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.sysinfo.name,
      path: '/yyf_company/pages/index/index'
    }
  },

  setTabBar: function () {
    var blist = wx.getStorageSync('barlist');
    var that = this;
    var timer = this.data.timer + 1;
    this.setData({
      timer: timer
    })
    if (!blist && timer < 15) {
      setTimeout(function () {
        that.setTabBar()
      }, 200)
    }
    if (!blist) { return false; }
    this.setData({
      blist: blist,
      tcolor: blist.tcolor
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: blist.tcolor,
    })
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var url = currentPage.route
    var blist = this.data.blist;
    var pageArr = url.split('/');
    if (pageArr[pageArr.length - 1] == 'index') {
      blist['isCurrentPage'] = true;
    }
    var barArr = new Array(blist.m1_path, blist.m2_path, blist.m3_path, blist.m4_path);
    var currentNum = 0;
    for (var x in barArr) {
      if (barArr[x] == 'index') {
        currentNum = parseInt(x) + 1;
      }
    }
    blist['currentNum'] = currentNum;
    this.setData({
      blist: blist
    })


  },
  tel: function () {
    var phone = this.data.blist.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  driver: function () {
    wx.openLocation({
      latitude: Number(this.data.blist.jing),
      longitude: Number(this.data.blist.wei),
      address: this.data.blist.address
    })
  },
  navigateMini: function (event) {

    var sid = event.currentTarget.dataset.sid;
    var fid = event.currentTarget.dataset.fid;
    var appid = this.data.list[fid].list[sid].appid;
    var pageaddress = this.data.list[fid].list[sid].pageaddress;
    wx.navigateToMiniProgram({
      appId: appid,
      path: pageaddress,
      success(res) {
        console.log('11');
      }
    })
  },
  playVideo: function (event) {
    var fid = event.currentTarget.dataset.fidx;
    var sid = event.currentTarget.dataset.sidx;
    var list = this.data.list;
    list[fid]['list'][sid]['show_video'] = true;
    this.setData({
      list: list
    })
  },

  postTap: function (event) {
    debugger;
    var url = event.currentTarget.dataset.posturl;
    var id = event.currentTarget.dataset.postid;
    app.globalData.url = url;
    app.globalData.tid = id;
    app.globalData.fid = 0;
    wx.switchTab({
      url: url
    })
  },
})