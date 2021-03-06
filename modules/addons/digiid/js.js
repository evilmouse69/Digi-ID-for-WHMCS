$(function() {
    
    if ($("#DigiIDLogin").length ) {
        var digiAction = "login";   
    } else if ($("#DigiIDRegister").length ) {
        var digiAction = "register";
    }
    
    if(typeof digiAction !== 'undefined') {
        $("#digiidlink img").attr("src", DigiQR.text($("#digiidlink").attr("href"),250,2));
        var digiidInt;
        digiidInt = setInterval(function () {
            $.get( "modules/addons/digiid/ajax.php?act="+digiAction, function( data ) {
                if(data.status==1) { // Login (No account linked)
                    $("#digiidStatus").removeClass("hidden").html(data.html);
                } else if(data.status==2) { // Login + Register
                    $("#digiidStatus").removeClass("hidden alert-danger").addClass("alert-success").html(data.html);
                    $(".logincontainer .row" ).first().slideUp();
                    $(".logincontainer .header-lined" ).first().slideUp();
                    $("#inputEmail").val("a@a.com");
                    $("#inputPassword").val($("#digiidlink").attr("href").slice(-32));
                    $(".login-form").slideUp().submit();
                } else if(data.status==3) { // Login + Register (Nonce changed)
                    $("#digiidlink").attr("href", data.nonce);
                    $("#digiidlink img").attr("src", DigiQR.text(data.nonce,250,2));
                } else if(data.status==4) { // Register (Digi-ID Linked)
                    var bgCol = $(".digiSetup").css("backgroundColor");
                    $(".digiSetup").show().removeClass("hidden").css("backgroundColor", $(".digiSetup").css("border-left-color")).animate({backgroundColor: bgCol}, "slow");
                    $(".digiUnSet").slideUp();
                    $(".digiSetup .alert-msg i").html(data.wallet);
                }
            }, "json" );   
        }, 2000);

        $("#digiDeregister").click(function() {
            $.get( "modules/addons/digiid/ajax.php?act=deregister", function( data ) {
                if(data.status==5) { // Login (No account linked)
                    var bgCol = $(".digiUnSet").css("backgroundColor");
                    $(".digiUnSet").show().removeClass("hidden").css("backgroundColor", $(".digiUnSet").css("border-left-color")).animate({backgroundColor: bgCol}, "slow");
                    $(".digiSetup").slideUp();
                }
            }, "json" ); 
        });
    }
    
    if ($("#DigiDonate img").length ) {
        $("#DigiDonate img").attr("src", DigiQR.address("DQBko1VmMbvDSRhbviAJ5QakybvcGCULJa",200,2,0.5));
    }
        
});



(function($,undefined) {
	
//Modified QRCode Generator   Copyright (c) 2009 Kazuhiko Arase
var qrcode=function(){function y(e,l){if("undefined"==typeof e.length)throw e.length+"/"+l;var c=function(){for(var b=0;b<e.length&&0==e[b];)b+=1;for(var a=Array(e.length-b+l),f=0;f<e.length-b;f+=1)a[f]=e[f+b];return a}(),a={getAt:function(b){return c[b]},getLength:function(){return c.length},multiply:function(b){for(var c=Array(a.getLength()+b.getLength()-1),f=0;f<a.getLength();f+=1)for(var h=0;h<b.getLength();h+=1)c[f+h]^=r.gexp(r.glog(a.getAt(f))+r.glog(b.getAt(h)));return y(c,0)},mod:function(b){if(0>
a.getLength()-b.getLength())return a;for(var c=r.glog(a.getAt(0))-r.glog(b.getAt(0)),f=Array(a.getLength()),h=0;h<a.getLength();h+=1)f[h]=a.getAt(h);for(h=0;h<b.getLength();h+=1)f[h]^=r.gexp(r.glog(b.getAt(h))+c);return y(f,0).mod(b)}};return a}var A=function(e,l){var c=e,a=z[l],b=null,q=0,f=null,h=[],t={},x=function(e,l){for(var g=q=4*c+17,d=Array(g),k=0;k<g;k+=1){d[k]=Array(g);for(var n=0;n<g;n+=1)d[k][n]=null}b=d;B(0,0);B(q-7,0);B(0,q-7);g=w.getPatternPosition(c);for(d=0;d<g.length;d+=1)for(k=
0;k<g.length;k+=1){var n=g[d],t=g[k];if(null==b[n][t])for(var u=-2;2>=u;u+=1)for(var m=-2;2>=m;m+=1)b[n+u][t+m]=-2==u||2==u||-2==m||2==m||0==u&&0==m?!0:!1}for(g=8;g<q-8;g+=1)null==b[g][6]&&(b[g][6]=0==g%2);for(g=8;g<q-8;g+=1)null==b[6][g]&&(b[6][g]=0==g%2);g=w.getBCHTypeInfo(a<<3|l);for(d=0;15>d;d+=1)k=!e&&1==(g>>d&1),6>d?b[d][8]=k:8>d?b[d+1][8]=k:b[q-15+d][8]=k;for(d=0;15>d;d+=1)k=!e&&1==(g>>d&1),8>d?b[8][q-d-1]=k:9>d?b[8][15-d-1+1]=k:b[8][15-d-1]=k;b[q-8][8]=!e;if(7<=c){g=w.getBCHTypeNumber(c);
for(d=0;18>d;d+=1)k=!e&&1==(g>>d&1),b[Math.floor(d/3)][d%3+q-8-3]=k;for(d=0;18>d;d+=1)k=!e&&1==(g>>d&1),b[d%3+q-8-3][Math.floor(d/3)]=k}if(null==f){n=c;g=C.getRSBlocks(n,a);d=D();for(k=0;k<h.length;k+=1)t=h[k],d.put(t.getMode(),4),d.put(t.getLength(),w.getLengthInBits(t.getMode(),n)),t.write(d);for(k=n=0;k<g.length;k+=1)n+=g[k].dataCount;if(d.getLengthInBits()>8*n)throw"code length overflow. ("+d.getLengthInBits()+">"+8*n+")";for(d.getLengthInBits()+4<=8*n&&d.put(0,4);0!=d.getLengthInBits()%8;)d.putBit(!1);
for(;!(d.getLengthInBits()>=8*n);){d.put(236,8);if(d.getLengthInBits()>=8*n)break;d.put(17,8)}for(var v=0,n=k=0,t=Array(g.length),u=Array(g.length),m=0;m<g.length;m+=1){var x=g[m].dataCount,r=g[m].totalCount-x,k=Math.max(k,x),n=Math.max(n,r);t[m]=Array(x);for(var p=0;p<t[m].length;p+=1)t[m][p]=255&d.getBuffer()[p+v];v+=x;p=w.getErrorCorrectPolynomial(r);x=y(t[m],p.getLength()-1).mod(p);u[m]=Array(p.getLength()-1);for(p=0;p<u[m].length;p+=1)r=p+x.getLength()-u[m].length,u[m][p]=0<=r?x.getAt(r):0}for(p=
d=0;p<g.length;p+=1)d+=g[p].totalCount;d=Array(d);for(p=v=0;p<k;p+=1)for(m=0;m<g.length;m+=1)p<t[m].length&&(d[v]=t[m][p],v+=1);for(p=0;p<n;p+=1)for(m=0;m<g.length;m+=1)p<u[m].length&&(d[v]=u[m][p],v+=1);f=d}g=f;d=-1;k=q-1;n=7;t=0;u=w.getMaskFunction(l);for(m=q-1;0<m;m-=2)for(6==m&&--m;;){for(p=0;2>p;p+=1)null==b[k][m-p]&&(v=!1,t<g.length&&(v=1==(g[t]>>>n&1)),u(k,m-p)&&(v=!v),b[k][m-p]=v,--n,-1==n&&(t+=1,n=7));k+=d;if(0>k||q<=k){k-=d;d=-d;break}}},B=function(a,c){for(var g=-1;7>=g;g+=1)if(!(-1>=a+
g||q<=a+g))for(var d=-1;7>=d;d+=1)-1>=c+d||q<=c+d||(b[a+g][c+d]=0<=g&&6>=g&&(0==d||6==d)||0<=d&&6>=d&&(0==g||6==g)||2<=g&&4>=g&&2<=d&&4>=d?!0:!1)};t.addData=function(b,a){a=a||"Byte";var c;switch(a){case "Alphanumeric":c=E(b);break;case "Byte":c=F(b);break;default:throw"mode:"+a;}h.push(c);f=null};t.isDark=function(a,c){if(0>a||q<=a||0>c||q<=c)throw a+","+c;return b[a][c]};t.getModuleCount=function(){return q};t.make=function(){if(1>c){for(var b=1;40>b;b++){for(var f=C.getRSBlocks(b,a),g=D(),d=0;d<
h.length;d++){var q=h[d];g.put(q.getMode(),4);g.put(q.getLength(),w.getLengthInBits(q.getMode(),b));q.write(g)}for(d=q=0;d<f.length;d++)q+=f[d].dataCount;if(g.getLengthInBits()<=8*q)break}c=b}for(g=f=b=0;8>g;g+=1)if(x(!0,g),d=w.getLostPoint(t),0==g||b>d)b=d,f=g;x(!1,f)};return t};A.stringToBytesFuncs={"default":function(e){for(var l=[],c=0;c<e.length;c+=1){var a=e.charCodeAt(c);l.push(a&255)}return l}};A.stringToBytes=A.stringToBytesFuncs["default"];var z={L:1,M:0,Q:3,H:2},w=function(){var e=[[],
[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,
154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],l={},c=function(a){for(var b=0;0!=a;)b+=1,a>>>=1;return b};l.getBCHTypeInfo=function(a){for(var b=a<<10;0<=c(b)-c(1335);)b^=1335<<c(b)-c(1335);return(a<<10|b)^21522};l.getBCHTypeNumber=function(a){for(var b=a<<12;0<=c(b)-c(7973);)b^=7973<<c(b)-c(7973);return a<<12|b};l.getPatternPosition=function(a){return e[a-1]};l.getMaskFunction=function(a){switch(a){case 0:return function(b,a){return 0==(b+
a)%2};case 1:return function(b,a){return 0==b%2};case 2:return function(b,a){return 0==a%3};case 3:return function(b,a){return 0==(b+a)%3};case 4:return function(b,a){return 0==(Math.floor(b/2)+Math.floor(a/3))%2};case 5:return function(b,a){return 0==b*a%2+b*a%3};case 6:return function(b,a){return 0==(b*a%2+b*a%3)%2};case 7:return function(a,c){return 0==(a*c%3+(a+c)%2)%2};default:throw"bad maskPattern:"+a;}};l.getErrorCorrectPolynomial=function(a){for(var b=y([1],0),c=0;c<a;c+=1)b=b.multiply(y([1,
r.gexp(c)],0));return b};l.getLengthInBits=function(a,b){if(1<=b&&10>b)switch(a){case 1:return 10;case 2:return 9;case 4:return 8;case 8:return 8;default:throw"mode:"+a;}else if(27>b)switch(a){case 1:return 12;case 2:return 11;case 4:return 16;case 8:return 10;default:throw"mode:"+a;}else if(41>b)switch(a){case 1:return 14;case 2:return 13;case 4:return 16;case 8:return 12;default:throw"mode:"+a;}else throw"type:"+b;};l.getLostPoint=function(a){for(var b=a.getModuleCount(),c=0,f=0;f<b;f+=1)for(var h=
0;h<b;h+=1){for(var e=0,l=a.isDark(f,h),r=-1;1>=r;r+=1)if(!(0>f+r||b<=f+r))for(var n=-1;1>=n;n+=1)0>h+n||b<=h+n||0==r&&0==n||l!=a.isDark(f+r,h+n)||(e+=1);5<e&&(c+=3+e-5)}for(f=0;f<b-1;f+=1)for(h=0;h<b-1;h+=1)if(e=0,a.isDark(f,h)&&(e+=1),a.isDark(f+1,h)&&(e+=1),a.isDark(f,h+1)&&(e+=1),a.isDark(f+1,h+1)&&(e+=1),0==e||4==e)c+=3;for(f=0;f<b;f+=1)for(h=0;h<b-6;h+=1)a.isDark(f,h)&&!a.isDark(f,h+1)&&a.isDark(f,h+2)&&a.isDark(f,h+3)&&a.isDark(f,h+4)&&!a.isDark(f,h+5)&&a.isDark(f,h+6)&&(c+=40);for(h=0;h<b;h+=
1)for(f=0;f<b-6;f+=1)a.isDark(f,h)&&!a.isDark(f+1,h)&&a.isDark(f+2,h)&&a.isDark(f+3,h)&&a.isDark(f+4,h)&&!a.isDark(f+5,h)&&a.isDark(f+6,h)&&(c+=40);for(h=e=0;h<b;h+=1)for(f=0;f<b;f+=1)a.isDark(f,h)&&(e+=1);return c+Math.abs(100*e/b/b-50)/5*10};return l}(),r=function(){for(var e=Array(256),l=Array(256),c=0;8>c;c+=1)e[c]=1<<c;for(c=8;256>c;c+=1)e[c]=e[c-4]^e[c-5]^e[c-6]^e[c-8];for(c=0;255>c;c+=1)l[e[c]]=c;return{glog:function(a){if(1>a)throw"glog("+a+")";return l[a]},gexp:function(a){for(;0>a;)a+=255;
for(;256<=a;)a-=255;return e[a]}}}(),C=function(){var e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],
[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,
16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,
24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,
15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,
121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],l=function(a,c){var b={};b.totalCount=a;b.dataCount=c;return b},c={},a=function(a,c){switch(c){case z.L:return e[4*
(a-1)+0];case z.M:return e[4*(a-1)+1];case z.Q:return e[4*(a-1)+2];case z.H:return e[4*(a-1)+3]}};c.getRSBlocks=function(b,c){var f=a(b,c);if("undefined"==typeof f)throw"bad rs block @ typeNumber:"+b+"/errorCorrectionLevel:"+c;for(var e=f.length/3,q=[],r=0;r<e;r+=1)for(var w=f[3*r+0],n=f[3*r+1],u=f[3*r+2],g=0;g<w;g+=1)q.push(l(n,u));return q};return c}(),D=function(){var e=[],l=0,c={getBuffer:function(){return e},getAt:function(a){return 1==(e[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,b){for(var e=
0;e<b;e+=1)c.putBit(1==(a>>>b-e-1&1))},getLengthInBits:function(){return l},putBit:function(a){var b=Math.floor(l/8);e.length<=b&&e.push(0);a&&(e[b]|=128>>>l%8);l+=1}};return c},E=function(e){var l=function(c){if("0"<=c&&"9">=c)return c.charCodeAt(0)-48;if("A"<=c&&"Z">=c)return c.charCodeAt(0)-65+10;switch(c){case " ":return 36;case "$":return 37;case "%":return 38;case "*":return 39;case "+":return 40;case "-":return 41;case ".":return 42;case "/":return 43;case ":":return 44;default:throw"illegal char :"+
c;}};return{getMode:function(){return 2},getLength:function(c){return e.length},write:function(c){for(var a=0;a+1<e.length;)c.put(45*l(e.charAt(a))+l(e.charAt(a+1)),11),a+=2;a<e.length&&c.put(l(e.charAt(a)),6)}}},F=function(e){var l=A.stringToBytes(e);return{getMode:function(){return 4},getLength:function(c){return l.length},write:function(c){for(var a=0;a<l.length;a+=1)c.put(l[a],8)}}};return A}();

//DigiQR - Copyright (c) 2018 Matthew Cornelisse
function t(a,d,g){var c=.5*a,m=c*d;d=c-m;for(var h=c+m,l=[],b=0;16>b;b++){var n=function(a,b,c,d,f,g,k,h,n,w,r,l,y,z,A,B){e.beginPath();e.moveTo(a,b);e.lineTo(c,d);e.lineTo(f,g);e.lineTo(k,h);e.arc(n,w,m,r*Math.PI,l*Math.PI);e.lineTo(y,z);e.lineTo(A,B);e.lineTo(a,b);e.closePath();e.fill()},f=function(a,b,c,d,f,g,k,h,n,l,r,x){e.beginPath();e.moveTo(a,b);e.lineTo(c,d);e.lineTo(f,g);e.arc(k,h,m,n*Math.PI,l*Math.PI);e.lineTo(r,x);e.lineTo(a,b);e.closePath();e.fill()},k=document.createElement("canvas");
k.height=k.width=a;var e=k.getContext("2d");e.fillStyle=g;1!=b&&9!=b||f(a,a,c,a,c,h,h,h,1,1.5,a,c);8!=b&&9!=b||f(0,0,c,0,c,d,d,d,0,.5,0,c);4!=b&&6!=b||f(a,0,a,c,h,c,h,d,.5,1,c,0);2!=b&&6!=b||f(0,a,0,c,d,c,d,h,1.5,0,c,a);3==b&&e.fillRect(0,c,a,c);12==b&&e.fillRect(0,0,a,c);10==b&&e.fillRect(0,0,c,a);5==b&&e.fillRect(c,0,c,a);15==b&&e.fillRect(0,0,a,a);7==b&&n(a,a,a,0,c,0,c,d,d,d,0,.5,0,c,0,a);11==b&&n(0,a,a,a,a,c,h,c,h,d,.5,1,c,0,0,0);13==b&&n(a,0,0,0,0,c,d,c,d,h,1.5,0,c,a,a,a);14==b&&n(0,0,0,a,c,
a,c,h,h,h,1,1.5,a,c,a,0);l[b]=k}return l}function u(a){a.beginPath();a.fillStyle="#0066cc";a.arc(0,0,.891,0,2*Math.PI);a.closePath();a.fill();a.beginPath();a.fillStyle="#002352";a.arc(0,0,.709,0,2*Math.PI);a.closePath();a.fill()}
function v(a){a.beginPath();a.moveTo(.245,-.361);a.lineTo(.27,-.428);a.bezierCurveTo(.273,-.435,.268,-.442,.261,-.442);a.lineTo(.166,-.442);a.lineTo(.136,-.363);a.lineTo(.094,-.363);a.lineTo(.118,-.428);a.bezierCurveTo(.121,-.435,.116,-.442,.109,-.442);a.lineTo(.014,-.442);a.lineTo(-.016,-.363);a.lineTo(-.313,-.363);a.bezierCurveTo(-.327,-.363,-.339,-.356,-.346,-.344);a.lineTo(-.42,-.214);a.lineTo(-.317,-.214);a.lineTo(.134,-.214);a.bezierCurveTo(.152,-.214,.17,-.211,.187,-.204);a.bezierCurveTo(.221,
-.19,.259,-.16,.249,-.091);a.bezierCurveTo(.233,.024,.116,.228,-.139,.231);a.lineTo(-.007,-.111);a.bezierCurveTo(-.002,-.125,-.012,-.14,-.028,-.14);a.lineTo(-.204,-.14);a.lineTo(-.417,.383);a.bezierCurveTo(-.417,.383,-.374,.388,-.307,.388);a.lineTo(-.329,.443);a.lineTo(-.231,.443);a.bezierCurveTo(-.223,.443,-.216,.439,-.213,.431);a.lineTo(-.195,.384);a.bezierCurveTo(-.18,.383,-.166,.381,-.151,.379);a.lineTo(-.175,.443);a.lineTo(-.078,.443);a.bezierCurveTo(-.07,.443,-.063,.439,-.061,.431);a.lineTo(-.033,
.359);a.bezierCurveTo(.127,.323,.298,.243,.4,.076);a.bezierCurveTo(.606,-.26,.392,-.346,.245,-.361);a.closePath()}
function C(a,d,g,c){function m(a){function d(a,b){if(0>a||a>=f||0>b||b>=f)return 1;if(3==g){var c=(f-1)/2,d=a-c,c=b-c;if(d*d+c*c<=h)return 1}return!n.isDark(a,b)}a=t(k,c,a);for(var h=e/k,h=h*h,l=-1;l<=f;l++)for(var m=-1;m<=f;m++){var p=8*d(m,l)+4*d(m+1,l)+2*d(m,l+1)+d(m+1,l+1);b.drawImage(a[p],(m+.5)*k,(l+.5)*k)}}var h="Byte";a==a.replace(/[^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ \$\%\*\+\-\.\/\:]/g,"")&&(h="Alphanumeric");d=d||200;g=g||!1;c=c||0;var l=document.createElement("canvas");l.height=l.width=
d;var b=l.getContext("2d"),n=qrcode(0,0<g?"H":"L");n.addData(a,h);n.make();var f=n.getModuleCount(),k=Math.floor(d/f);a=Math.floor((d-f*k)/2);b.save();b.translate(a,a);b.fillStyle="#000000";b.fillRect(0,0,f*k,f*k);a=k*f/2;var e=k,e=5>g?e*Math.min(Math.floor((Math.sqrt(.2*f*f)+1)/2)-.5,.5*(f-16)):7>g?.5*e*(f-1):e*Math.min(1.12*Math.sqrt(f*f*.5)-11.08,.56*f);m("#FFFFFF");b.save();b.transform(e,0,0,e,a,a);b.save();1==g&&(b.beginPath(),b.fillStyle="#FFFFFF",b.rect(-1,-1,2,2),b.closePath(),b.fill());2==
g&&(b.beginPath(),b.fillStyle="#FFFFFF",b.arc(0,0,1,0,2*Math.PI),b.closePath(),b.fill());0<g&&(u(b),b.fillStyle="#FFFFFF",v(b),b.fill());b.restore();b.restore();if(5==g||7==g){b.save();b.transform(k,0,0,k,k/2,k/2);b.save();for(var p=0;p<f;p++)for(var q=0;q<f;q++)a=function(a,c){b.fillStyle=c;b.beginPath();b.arc(q,p,a,0,2*Math.PI);b.closePath();b.fill()},5!=g||n.isDark(q,p)||a(.5,"rgba(255,255,255,0.5)"),7==g&&a(.2,n.isDark(q,p)?"#000000":"#FFFFFF");b.restore();b.restore()}6==g&&m("rgba(255,255,255,0.5)");
b.restore();return l.toDataURL("image/jpg")}$.DigiQR={request:function(a,d,g,c,m){return C("digibyte:"+a+"?amount="+d.toFixed(8),g,c,m)},address:D,explorer:function(a,d,g,c){return C("https://digiexplorer.info/address/"+a,d,g,c)},text:D};function D(a,d,g,c){return C(a,d,g,c)};

// **END**
})(window);