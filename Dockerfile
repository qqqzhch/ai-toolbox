# AI Toolbox Docker 部署 - 直接使用已构建的静态文件
FROM nginx:alpine

# 复制构建产物到 nginx 目录
COPY dist /usr/share/nginx/html

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
