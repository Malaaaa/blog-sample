# 笔记

## 安装BT

yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

- 关闭通知 rm -f /www/server/panel/data/bind.pl
- 安装铬。

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb sudo dpkg -i ./google-chrome*.deb sudo apt-get install -f

- webdriver [https://chromedriver.chromium.org/downloads]，复制。 cd /usr/bin/store wget https://chromedriver.storage.googleapis.com/92.0.4515.107/chromedriver_linux64.zip 解压chromedriver_linux64。压缩


<!-- 
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('start-maximized')
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument('--disable-browser-side-navigation')
chrome_options.add_argument('enable-automation')
chrome_options.add_argument('--disable-infobars')
chrome_options.add_argument('enable-features=NetworkServiceInProcess') 
-->
    