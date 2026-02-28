async function digest(alg: string, data: BufferSource) {
  const res = await crypto.subtle.digest(alg, data)
  return Array.from(new Uint8Array(res)).map(b => b.toString(16).padStart(2,'0')).join('')
}

export async function hashAll(text: string) {
  const enc = new TextEncoder().encode(text)
  const sha1 = await digest('SHA-1', enc)
  const sha256 = await digest('SHA-256', enc)
  const sha512 = await digest('SHA-512', enc)
  let md5 = 'unsupported'
  try {
    md5 = md5Hash(text)
  } catch (e) {
    md5 = 'error'
  }
  return { md5, 'sha-1': sha1, 'sha-256': sha256, 'sha-512': sha512 }
}

// Minimal MD5 implementation (small, not optimized)
function md5Hash(str: string) {
  function cmn(q:any,a:any,b:any,x:any,s:any,t:any){a=((a+q+(x>>>0)+t)>>>0);return (((a<<s)|(a>>> (32-s)))+b)>>>0}
  function ff(a:any,b:any,c:any,d:any,x:any,s:any,t:any){return cmn((b & c) | ((~b) & d),a,b,x,s,t)}
  function gg(a:any,b:any,c:any,d:any,x:any,s:any,t:any){return cmn((b & d) | (c & (~d)),a,b,x,s,t)}
  function hh(a:any,b:any,c:any,d:any,x:any,s:any,t:any){return cmn(b ^ c ^ d,a,b,x,s,t)}
  function ii(a:any,b:any,c:any,d:any,x:any,s:any,t:any){return cmn(c ^ (b | (~d)),a,b,x,s,t)}
  function md53(s:string){
    var n=s.length,bl=n*8,buf=new Array(Math.ceil((n+8)/64)*16);for(var i=0;i<buf.length;i++)buf[i]=0
    for(i=0;i<n;i++)buf[i>>2]|=(s.charCodeAt(i)&0xff)<<((i%4)*8)
    buf[n>>2]|=0x80<<((n%4)*8);buf[buf.length-2]=bl&0xffffffff;buf[buf.length-1]=(bl/0x100000000)|0
    var a=1732584193,b=4023233417,c=2562383102,d=271733878
    for(i=0;i<buf.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d
      a=ff(a,b,c,d,buf[i+0],7,3614090360);d=ff(d,a,b,c,buf[i+1],12,3905402710);c=ff(c,d,a,b,buf[i+2],17,606105819);b=ff(b,c,d,a,buf[i+3],22,3250441966)
      a=ff(a,b,c,d,buf[i+4],7,4118548399);d=ff(d,a,b,c,buf[i+5],12,1200080426);c=ff(c,d,a,b,buf[i+6],17,2821735955);b=ff(b,c,d,a,buf[i+7],22,4249261313)
      a=ff(a,b,c,d,buf[i+8],7,1770035416);d=ff(d,a,b,c,buf[i+9],12,2336552879);c=ff(c,d,a,b,buf[i+10],17,4294925233);b=ff(b,c,d,a,buf[i+11],22,2304563134)
      a=ff(a,b,c,d,buf[i+12],7,1804603682);d=ff(d,a,b,c,buf[i+13],12,4254626195);c=ff(c,d,a,b,buf[i+14],17,2792965006);b=ff(b,c,d,a,buf[i+15],22,1236535329)
      a=gg(a,b,c,d,buf[i+1],5,4129170786);d=gg(d,a,b,c,buf[i+6],9,3225465664);c=gg(c,d,a,b,buf[i+11],14,643717713);b=gg(b,c,d,a,buf[i+0],20,3921069994)
      a=gg(a,b,c,d,buf[i+5],5,3593408605);d=gg(d,a,b,c,buf[i+10],9,38016083);c=gg(c,d,a,b,buf[i+15],14,3634488961);b=gg(b,c,d,a,buf[i+4],20,3889429448)
      a=gg(a,b,c,d,buf[i+9],5,568446438);d=gg(d,a,b,c,buf[i+14],9,3275163606);c=gg(c,d,a,b,buf[i+3],14,4107603335);b=gg(b,c,d,a,buf[i+8],20,1163531501)
      a=gg(a,b,c,d,buf[i+13],5,2850285829);d=gg(d,a,b,c,buf[i+2],9,4243563512);c=gg(c,d,a,b,buf[i+7],14,1735328473);b=gg(b,c,d,a,buf[i+12],20,2368359562)
      a=hh(a,b,c,d,buf[i+5],4,4294588738);d=hh(d,a,b,c,buf[i+8],11,2272392833);c=hh(c,d,a,b,buf[i+11],16,1839030562);b=hh(b,c,d,a,buf[i+14],23,4259657740)
      a=hh(a,b,c,d,buf[i+1],4,2763975236);d=hh(d,a,b,c,buf[i+4],11,1272893353);c=hh(c,d,a,b,buf[i+7],16,4139469664);b=hh(b,c,d,a,buf[i+10],23,3200236656)
      a=hh(a,b,c,d,buf[i+13],4,681279174);d=hh(d,a,b,c,buf[i+0],11,3936430074);c=hh(c,d,a,b,buf[i+3],16,3572445317);b=hh(b,c,d,a,buf[i+6],23,76029189)
      a=hh(a,b,c,d,buf[i+9],4,3654602809);d=hh(d,a,b,c,buf[i+12],11,3873151461);c=hh(c,d,a,b,buf[i+15],16,530742520);b=hh(b,c,d,a,buf[i+2],23,3299628645)
      a=ii(a,b,c,d,buf[i+0],6,4096336452);d=ii(d,a,b,c,buf[i+7],10,1126891415);c=ii(c,d,a,b,buf[i+14],15,2878612391);b=ii(b,c,d,a,buf[i+5],21,4237533241)
      a=ii(a,b,c,d,buf[i+12],6,1700485571);d=ii(d,a,b,c,buf[i+3],10,2399980690);c=ii(c,d,a,b,buf[i+10],15,4293915773);b=ii(b,c,d,a,buf[i+1],21,2240044497)
      a=ii(a,b,c,d,buf[i+8],6,1873313359);d=ii(d,a,b,c,buf[i+15],10,4264355552);c=ii(c,d,a,b,buf[i+6],15,2734768916);b=ii(b,c,d,a,buf[i+13],21,1309151649)
      a=ii(a,b,c,d,buf[i+4],6,4149444226);d=ii(d,a,b,c,buf[i+11],10,3174756917);c=ii(c,d,a,b,buf[i+2],15,718787259);b=ii(b,c,d,a,buf[i+9],21,3951481745)
      a=(a+olda)>>>0;b=(b+oldb)>>>0;c=(c+oldc)>>>0;d=(d+oldd)>>>0
    }
    return [a,b,c,d].map(x=>('00000000'+(x>>>0).toString(16)).slice(-8)).join('')
  }
  return md53(str)
}
