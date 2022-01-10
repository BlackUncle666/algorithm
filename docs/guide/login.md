# 揭秘你在微信的每一分钱都是如何花掉的？
## 前言
本文主要针对微信公众平台的开发，讲述从授权到支付的过程，让你花的每一分钱都明明白白。

## 关于OAuth
首先理解一个概念：OAuth：

OAUTH协议为用户资源的授权提供了一个安全的、开放而又简易的标准。与以往的授权方式不同之处是OAUTH的授权不会使第三方触及到用户的帐号信息（如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，因此OAUTH是安全的。oAuth是Open Authorization的简写。

更多详细内容，可参考开发者官方文档 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html

## 配置准备
由于黑叔没有服务号，所以利用本公众号“程序员黑叔”申请了的一个测试号，申请步骤如下：

- 第一步：点击侧边栏的`开发者工具`，选择`公众平台测试账号`：
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0d75c69bb66443196f44b318d5fb010~tplv-k3u1fbpfcp-watermark.image)

- 第二步：微信会分配一个`appleID`和`appsecret`（由于接口信息需要后端提供，可暂时省略配置接口信息）
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/434efeeb945e4383865c0bc519c99a3e~tplv-k3u1fbpfcp-watermark.image)

- 第三步：找到`网页服务`下的`网页账号`（必须配置，否则授权后跳转会出错）：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9b9811f1f264181b96b3837e59c10ed~tplv-k3u1fbpfcp-watermark.image)

- 第四步：点击`修改`后弹窗填写域名（注意去掉协议部分）：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8cafdb640444989be0bd41dde49ad13~tplv-k3u1fbpfcp-watermark.image)

补充知识，来说说接口信息中的URL和token到底是干什么的？

简单地说就是需要通过请求一个URL来相应token验证，也就是说你在点击确定时向你指定的URL发送一个请求，在请求里面来验证你的token是否一致。完成此验证之后，微信才能进行调用这个外网服务器端口。（注意这个token让后端告诉你即可）

至此，配置就完成了。

## 授权

关于网页授权的两种scope的区别：

1、以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）

2、以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

3、用户管理类接口中的“获取用户基本信息接口”，是在用户和公众号产生消息交互或关注后事件推送后，才能根据用户OpenID来获取用户基本信息。这个接口，包括其他微信接口，都是需要该用户（即openid）关注了公众号后，才能调用成功的。

关于网页授权access_token和普通access_token的区别

1、微信网页授权是通过OAuth2.0机制实现的，在用户授权给公众号后，公众号可以获取到一个网页授权特有的接口调用凭证（网页授权access_token），通过网页授权access_token可以进行授权后接口调用，如获取用户基本信息；

2、其他微信接口，需要通过基础支持中的“获取access_token”接口来获取到的普通access_token调用。

关于特殊场景下的静默授权

1、上面已经提到，对于以snsapi_base为scope的网页授权，就静默授权的，用户无感知；

2、对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。

具体而言，网页授权流程分为四步：

1、引导用户进入授权页面同意授权，获取code

2、通过code换取网页授权access_token（与基础支持中的access_token不同）

3、如果需要，开发者可以刷新网页授权access_token，避免过期

4、通过网页授权access_token和openid获取用户基本信息（支持UnionID机制）

第一步：用户同意授权，获取code

在确保微信公众账号拥有授权作用域（scope参数）的权限的前提下（服务号获得高级接口后，默认拥有scope参数中的snsapi_base和snsapi_userinfo），引导关注者打开如下页面：
```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect 
```
注意：

- 若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。
- 跳转回调redirect_uri，应当使用https链接来确保授权code的安全性。

## 支付

