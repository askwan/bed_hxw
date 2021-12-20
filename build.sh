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
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_redirect      off;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP   $remote_addr;
        proxy_set_header    X-Forwarded-For $remote_addr;
        proxy_pass          http://127.0.0.1:30170;
    }

    location /sub/bed_hxw {
        alias   /usr/share/nginx/html/sub/bed_hxw;
        try_files $uri $uri/ /sub/bed_hxw/index.html;
    }

    location /sub/restconf {
        proxy_redirect      off;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP   $remote_addr;
        proxy_set_header    X-Forwarded-For $remote_addr;
        proxy_pass          https://172.16.50.10:8443/restconf/;
    }

    error_page 500 502 503 504  /50x.html;
    location = /50x.html {
        root    /usr/share/nginx/html;
    }
}
EOF



