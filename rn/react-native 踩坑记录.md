## 配置环境记录
跟着官网讲得走，不容易踩坑。

注意点：
1. 就是配置环境变量时，我用的终端是 zsh 不是 bash，用的哪个得分别在 ~/.zshrc 和 ~/.bash_profile 中配置，我是一起配了。
2. 手动下载不同版本 xcode :[传送门](https://developer.apple.com/download/more/)

## 调试
#### React Native Debugger 官方工具
如果根据文档 指令 下载不了的话，去 github release [下载](https://github.com/jhen0409/react-native-debugger/releases)
下载时根据 RN 版本下载对应版本的 RN Debugger，一般来说如果 RN 是最新版的，那么 RN Debugger 也下最新版的。
#### 下载 React-devtools
当使用 `sudo npm install -g react-devtools` 时无法成功，报个 permission denied 的错。

这个问题可以见 facebook react-devtools [issues](https://github.com/facebook/react-devtools/issues/741)讨论

因为 npm 处于安全考虑不支持以 root 用户运行，即使用 root 身份运行了， npm 会自动转成一个叫 nobody 的用户来运行，这个用户几乎没有权限，假如遇到一些 npm install 时需要权限操作，就会报错，就算你用 sudo 也只是对 nobody 这个用户作用。

所以解决方法就是：加个 `--unsafe-perm` 参数，让 npm 运行时不切换为 nobody 用户上，即使是 root。

`sudo npm install -g react-devtools --unsafe-perm` 

#### V2RayX 终端设置代理
任何代理工具默认只代理 HTTP,不代理终端。若想代理终端，在 V2RayX 设置中点击 `Copy Http Proxy Shell export line`，赋值的内容就是 `export http_proxy="http://127.0.0.1:8001"; export HTTP_PROXY="http://127.0.0.1:8001"; export https_proxy="http://127.0.0.1:8001"; export HTTPS_PROXY="http://127.0.0.1:8001"`。
然后配置终端的环境变量， `iTerm` -> `~/.zshrc`,  `bash` -> `~/.bash_profile`
可以用 `curl www.google.com` 验证。