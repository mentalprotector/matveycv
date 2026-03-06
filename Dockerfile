FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY index.html ./index.html
COPY public/ ./public/
COPY css/ ./css/
COPY js/ ./js/
RUN chmod -R 755 ./
RUN sed -i 's/listen       80;/listen       3002;/' /etc/nginx/conf.d/default.conf
EXPOSE 3002
