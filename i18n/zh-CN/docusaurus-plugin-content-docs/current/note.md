# 说明

## 安装 BT

yum 安装-y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

- 关闭通知 rm -f /www/server/panel/data/bind.pl
- 安装chromeing。

wget https://dl.google.com/linux/direct/googlechrome-stable_current_amd64.deb sudo dpkg -i ./google-chrome*.deb sudo apt-get install-f

- webdriver [https://chromedriver.chromium.org/downloads],copying. cd /usr/bin/store wget https://chromedriver.storage.googleapis.com/92.0.4515.107/chromedriver_linux64.zip unzip chromedriver_linux64.zip


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
    