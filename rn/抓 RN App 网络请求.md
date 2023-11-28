工具：Proxyman

在 PC 上安装 ProxyMan 证书
↓
设置 Proxyman 代理端口号
↓
保持 PC 与移动设备在同一局域网
↓
修改移动设备连接 wifi 信息为手动代理，代理地址为 PC IP、端口则是代理的端口号
↓
在移动设备 chrome 浏览器打开 `http://proxy.man/ssl` 下载 Proxyman CA 证书，为了抓取 https。（此步也可以在 PC 下载好然后 adb push 到某一路径如 sdcard，然后在移动设备上手动安装）
↓
新增 src/main/res/xml/network_security_config.xml 
↓
修改 src/debug/AndroidManifest.xml。

xml 文件修改内容如下截图:
![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/202311281634188.png)

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/202311281636700.png)

然后就可以代理移动设备的所有网络请求了。
PS：此工具还可以代理 PC 的所有网络请求。