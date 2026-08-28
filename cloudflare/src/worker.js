const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

const HTML = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>TwoChat</title><style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f7fb;color:#172033}main{max-width:720px;margin:auto;height:100vh;display:flex;flex-direction:column;background:white}.top{padding:18px 20px;border-bottom:1px solid #e5e9f0;display:flex;justify-content:space-between;align-items:center}.brand{font-size:22px;font-weight:750}.status{font-size:12px;color:#667085}.setup{padding:24px;display:grid;gap:12px}.setup h2{margin:0 0 4px}.setup p{color:#667085;margin:0 0 8px}input,button{font:inherit;border-radius:12px;padding:12px 14px}input{border:1px solid #d6dce5;outline:none}button{border:0;background:#1f6feb;color:white;font-weight:650;cursor:pointer}.chat{display:none;flex:1;min-height:0;flex-direction:column}.messages{flex:1;overflow:auto;padding:18px;display:flex;flex-direction:column;gap:8px}.msg{max-width:78%;padding:10px 13px;border-radius:16px;background:#edf1f7;align-self:flex-start;overflow-wrap:anywhere}.mine{align-self:flex-end;background:#1f6feb;color:white}.who{font-size:11px;opacity:.65;margin-bottom:3px}.composer{display:flex;gap:8px;padding:12px;border-top:1px solid #e5e9f0}.composer input{flex:1}.tools{display:flex;gap:8px;padding:10px 18px;border-top:1px solid #e5e9f0}.tools button{flex:1}.call{background:#16a34a}.danger{background:#dc2626}.hidden{display:none!important}.hint{font-size:12px;color:#667085}.roomline{font-size:13px;color:#667085}</style></head><body><main>
<div class="top"><div class="brand">TwoChat</div><div id="status" class="status">Not connected</div></div>
<section id="setup" class="setup"><h2>Start a private chat</h2><p>Choose a name and room code. Give the same room code to the other person.</p><input id="name" maxlength="40" placeholder="Your name"><input id="room" maxlength="64" placeholder="Room code"><button id="join">Join room</button><div class="hint">Use a unique room code for your conversation.</div></section>
<section id="chat" class="chat"><div class="messages" id="messages"></div><div class="tools"><button id="call" class="call">📞 Start call</button><button id="leave" class="danger">End call</button></div><div class="composer"><input id="text" maxlength="2000" placeholder="Type a message..."><button id="send">Send</button></div></section>
</main><script>
let name='',room='',ws=null,pc=null,localStream=null;
const $=id=>document.getElementById(id); const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
function setStatus(x){$('status').textContent=x}
function add(m){const d=document.createElement('div');d.className='msg '+(m.sender===name?'mine':'');d.innerHTML='<div class="who">'+esc(m.sender)+'</div>'+esc(m.text);$('messages').appendChild(d);$('messages').scrollTop=$('messages').scrollHeight}
async function history(){const r=await fetch('/api/messages?room='+encodeURIComponent(room));if(r.ok){for(const m of await r.json())add(m)}}
async function send(){const text=$('text').value.trim();if(!text)return; $('text').value='';const r=await fetch('/api/messages',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({room,name,text})});if(!r.ok){alert('Message could not be sent');$('text').value=text;return}}
function sendSignal(x){if(ws&&ws.readyState===1)ws.send(JSON.stringify(x))}
async function makeCall(){try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});pc=new RTCPeerConnection();localStream.getTracks().forEach(t=>pc.addTrack(t));pc.onicecandidate=e=>e.candidate&&sendSignal({type:'candidate',candidate:e.candidate});pc.ontrack=e=>{let a=document.getElementById('remote');if(!a){a=document.createElement('video');a.id='remote';a.autoplay=true;a.playsInline=true;a.style='width:100%;margin:10px 0;border-radius:12px';$('messages').before(a)}a.srcObject=e.streams[0]};const offer=await pc.createOffer();await pc.setLocalDescription(offer);sendSignal({type:'offer',sdp:offer.sdp})}catch(e){alert('Camera/microphone permission is required for calling.')}}
async function signal(x){if(x.type==='offer'){if(!pc){localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});pc=new RTCPeerConnection();localStream.getTracks().forEach(t=>pc.addTrack(t));pc.onicecandidate=e=>e.candidate&&sendSignal({type:'candidate',candidate:e.candidate});pc.ontrack=e=>{let a=document.getElementById('remote');if(!a){a=document.createElement('video');a.id='remote';a.autoplay=true;a.playsInline=true;a.style='width:100%;margin:10px 0;border-radius:12px';$('messages').before(a)}a.srcObject=e.streams[0]}}await pc.setRemoteDescription({type:'offer',sdp:x.sdp});const ans=await pc.createAnswer();await pc.setLocalDescription(ans);sendSignal({type:'answer',sdp:ans.sdp})}else if(x.type==='answer'&&pc){await pc.setRemoteDescription({type:'answer',sdp:x.sdp})}else if(x.type==='candidate'&&pc){try{await pc.addIceCandidate(x.candidate)}catch(e){}}else if(x.type==='hangup'){hangup(false)}}
function hangup(send=true){if(send)sendSignal({type:'hangup'});if(pc){pc.close();pc=null}if(localStream){localStream.getTracks().forEach(t=>t.stop());localStream=null}const a=document.getElementById('remote');if(a)a.remove()}
$('join').onclick=async()=>{name=$('name').value.trim();room=$('room').value.trim();if(!name||!room){alert('Enter your name and room code');return}sessionStorage.setItem('twochatName',name);sessionStorage.setItem('twochatRoom',room);$('setup').classList.add('hidden');$('chat').style.display='flex';setStatus('Connecting…');await history();const proto=location.protocol==='https:'?'wss':'ws';ws=new WebSocket(proto+'://'+location.host+'/ws?room='+encodeURIComponent(room)+'&name='+encodeURIComponent(name));ws.onopen=()=>setStatus('Online');ws.onclose=()=>setStatus('Disconnected');ws.onerror=()=>setStatus('Connection error');ws.onmessage=e=>{try{const x=JSON.parse(e.data);if(x.type==='message')add(x);else if(x.type==='peer')setStatus(x.online?'Other person online':'Waiting for other person');else if(['offer','answer','candidate','hangup'].includes(x.type))signal(x)}catch{}}};
$('send').onclick=send;$('text').onkeydown=e=>{if(e.key==='Enter')send()};$('call').onclick=makeCall;$('leave').onclick=()=>{hangup(true);setStatus(ws&&ws.readyState===1?'Online':'Disconnected')};
const sn=sessionStorage.getItem('twochatName'),sr=sessionStorage.getItem('twochatRoom');if(sn)$('name').value=sn;if(sr)$('room').value=sr;
</script></body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, {headers:CORS});

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML, {headers:{'content-type':'text/html;charset=UTF-8'}});
    }

    if (url.pathname === '/ws') {
      if (request.headers.get('Upgrade') !== 'websocket') return new Response('WebSocket required',{status:426});
      const room=clean(url.searchParams.get('room')), name=clean(url.searchParams.get('name'));
      if(!room||!name)return new Response('room and name required',{status:400,headers:CORS});
      const id=env.ROOMS.idFromName(room);
      return env.ROOMS.get(id).fetch(new Request('https://room/ws?'+new URLSearchParams({room,name}),request));
    }

    if(url.pathname==='/api/messages'&&request.method==='GET'){
      const room=clean(url.searchParams.get('room'));if(!room)return json({error:'room required'},400);
      const {results}=await env.DB.prepare('SELECT id,room,sender,text,created_at FROM messages WHERE room=? ORDER BY id DESC LIMIT 200').bind(room).all();
      return json(results.reverse(),200);
    }
    if(url.pathname==='/api/messages'&&request.method==='POST'){
      let b;try{b=await request.json()}catch{return json({error:'invalid JSON'},400)}
      const room=clean(b.room),sender=clean(b.name),text=String(b.text||'').slice(0,2000);if(!room||!sender||!text)return json({error:'room, name and text required'},400);
      const now=Date.now();const r=await env.DB.prepare('INSERT INTO messages(room,sender,text,created_at) VALUES(?,?,?,?)').bind(room,sender,text,now).run();
      const message={id:r.meta.last_row_id,room,sender,text,created_at:now,type:'message'};const id=env.ROOMS.idFromName(room);await env.ROOMS.get(id).fetch('https://room/broadcast',{method:'POST',body:JSON.stringify(message)});return json(message,201);
    }
    return json({name:'TwoChat API',status:'ok',endpoints:['/api/messages','/ws']},200);
  }
};
function clean(v){return String(v||'').trim().slice(0,128)}
function json(data,status){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json',...CORS}})}

export class Room {
  constructor(state){this.state=state;this.clients=new Map()}
  async fetch(request){const url=new URL(request.url);
    if(url.pathname==='/broadcast'&&request.method==='POST'){const msg=await request.json();for(const ws of this.clients.keys())try{ws.send(JSON.stringify(msg))}catch{}return new Response('ok')}
    if(url.pathname==='/ws'){const pair=new WebSocketPair();const [client,server]=Object.values(pair);const name=url.searchParams.get('name')||'Guest';server.accept();this.clients.set(server,name);server.send(JSON.stringify({type:'peer',online:this.clients.size>1}));this.broadcast({type:'peer',online:this.clients.size>1},server);server.addEventListener('message',event=>{try{const x=JSON.parse(event.data);if(['offer','answer','candidate','hangup'].includes(x.type))this.broadcast({...x,from:name},server)}catch{}});server.addEventListener('close',()=>{this.clients.delete(server);this.broadcast({type:'peer',online:this.clients.size>1})});return new Response(null,{status:101,webSocket:client})}
    return new Response('not found',{status:404});
  }
  broadcast(obj,except){for(const ws of this.clients.keys()){if(ws===except)continue;try{ws.send(JSON.stringify(obj))}catch{}}}
}
