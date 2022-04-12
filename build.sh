npm install
npm run build
cat > default.conf << EOF
server {
    listen 80;

    add_header Cache-Control no-cache;
    add_header Access-Control-Allow-Origin *;

    location / {
        root    /usr/share/nginx/html;
        index   index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
    location /sub/bed1 {
        alias   /usr/share/nginx/html/sub/bed1;
        try_files $uri $uri/ /sub/bed1/index.html;
    }

    location /api/ {
        proxy_redirect      off;
        proxy_set_header    Host \$host;
        proxy_set_header    X-Real-IP   \$remote_addr;
        proxy_set_header    X-Forwarded-For \$remote_addr;
        proxy_pass          http://ace-gate;
    }
    error_page 500 502 503 504  /50x.html;
    location = /50x.html {
        root    /usr/share/nginx/html;
    }
}
EOF



