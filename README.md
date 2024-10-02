## How this website works:

~~(Detailed information)~~
Project Creation: 2024/09/30

This website is created for easier connecting a Linux server through a web browser. 

Mainly because OpenSSH in Windows CMD cannot pass though any type of proxy.

And for users that **cannot access IP addresses through ports or cannot access data in TCP/UDP and HTTP** 

~~Specially TDSB WIFI, which basically does all of the above.~~

So, in this case, it is easier to connect through a web browser using HTTPS and use a proxy server (if you have one)

***Warm tips: if you want to use SSL/HTTPS, you will need to using reverse proxy and redirect it to a domain, you will also need to upgrade web socket (WS) to WSS because browsers do not allow a page using SSL while there is an element inside is using an unsecure protocol***

