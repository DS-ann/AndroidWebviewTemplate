const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET,POST,OPTIONS"};
const MAX_ATTACHMENT_BYTES=1400000;
const HTML=`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Asus vs Redmi // Terminal</title><style>*{box-sizing:border-box}html,body{margin:0;height:100%;background:#050805;color:#c8ffc8;font-family:"Courier New",monospace}body{display:flex;justify-content:center}main{width:min(900px,100%);height:100%;display:flex;flex-direction:column;background:#020502;border:1px solid #183818;box-shadow:0 0 30px #001500}.top{padding:13px 16px;border-bottom:1px solid #174117;display:flex;justify-content:space-between;align-items:center;background:#071007}.brand{font-weight:bold;color:#65ff65}.brand:before{content:"root@asus-vs-redmi:~$ ";color:#3d9f3d}.status{font-size:12px;color:#75d875}.setup{margin:auto;width:min(620px,90%);display:grid;gap:12px;padding:25px;border:1px solid #205820;background:#050b05;box-shadow:0 0 20px #001800}.setup h2{margin:0;color:#7cff7c;font-size:18px}.setup p,.hint{color:#6f9f6f;font-size:13px}.setup p{margin:0}.setup input,.composer input{background:#020502;border:1px solid #276027;color:#bfffbf;outline:none;font:inherit}.setup input{padding:12px}.setup input:focus,.composer input:focus{border-color:#65ff65}.setup button{padding:12px;background:#123d12;border:1px solid #4eaf4e;color:#9fff9f;font:inherit;font-weight:bold;cursor:pointer}.chat{display:none;flex:1;min-height:0;flex-direction:column}.messages{flex:1;overflow:auto;padding:16px}.messages:before{content:"--- secure room session ---";display:block;color:#397039;margin-bottom:12px}.msg{display:table;margin:7px 0;max-width:75%;width:auto;overflow-wrap:anywhere;line-height:1.45;position:relative;padding:7px 8px 20px;white-space:pre-wrap;border:1px solid #397a39;border-radius:8px;background:transparent}
.msg-time{position:absolute;right:7px;bottom:4px;font-size:10px;color:#5d8b5d;white-space:nowrap}

.attachment .msg-time{color:#6f9f6f}.msg:before{content:"> ";color:#397039}.reply-preview{
  color:#6fa8dc;
  border-left:3px solid #4a90e2;
  padding:4px 7px;
  margin:2px 0 5px;
  opacity:.85;
  text-align:left;
  overflow:hidden;
}

.reply-who{
  display:block;
  font-weight:700;
  font-size:.85em;
}

.reply-text{
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  font-size:.82em;
}

.reply-highlight{
  outline:1px solid currentColor;
  transition:outline .2s ease;
}

.msg{
  transition:transform .15s ease;
}.mine{margin-left:auto;text-align:left;color:#8dff8d;border-color:#65ff65}.mine:before{content:"$";color:#559955}.who{display:inline;color:#559955;font-size:12px}.who:after{content:": ";color:#397039}.attachment{display:inline-block;position:relative;margin-top:4px;padding:7px 45px 24px 9px;border:1px solid #397a39;color:#9fff9f;text-decoration:none;background:#071007}.attachment:hover{border-color:#65ff65}.attachment small{display:block;color:#6f9f6f;margin-top:3px}.composer{display:flex;gap:8px;padding:10px;border-top:1px solid #174117}.composer input,.composer textarea{flex:1;padding:11px;resize:none;min-height:42px;max-height:120px}.composer button,.tools button{padding:10px 14px;background:#0c2d0c;border:1px solid #397a39;color:#9fff9f;font:inherit;font-weight:bold;cursor:pointer}.tools{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:8px 10px;border-top:1px solid #174117}.tools button{width:100%}.call{border-color:#55a955!important}.video{border-color:#5b8db8!important;color:#a9d5ff!important}.danger{border-color:#a95555!important;color:#ff9f9f!important}.attach{border-color:#7a9f55!important}.hidden{display:none!important}.callview{display:none;position:relative;flex:1;min-height:0;background:#000;overflow:hidden}.callview.active{display:block}.remote{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}.local{position:absolute;right:14px;bottom:14px;width:30%;max-width:190px;aspect-ratio:4/3;object-fit:cover;background:#010301;border:1px solid #65ff65;z-index:3}.callinfo{position:absolute;left:12px;top:10px;z-index:3;padding:5px 8px;background:#020502dd;border:1px solid #397a39;color:#9fff9f;font-size:12px}.callcontrols{position:absolute;left:0;right:0;bottom:0;z-index:3;display:flex;justify-content:center;padding:12px;background:linear-gradient(transparent,#020502dd)}.callcontrols button{padding:10px 18px;background:#0c2d0c;border:1px solid #a95555;color:#ff9f9f;font:inherit;font-weight:bold;cursor:pointer}.video-mode .messages,.video-mode .tools,.video-mode .composer{display:none}.video-mode .callview{display:block}.incoming{display:none;margin:10px;border:1px solid #5b8db8;background:#071007;padding:12px}.incoming .caller{color:#a9d5ff;margin-bottom:10px}.incoming button{padding:8px 12px;margin-right:8px;background:#0c2d0c;border:1px solid #397a39;color:#9fff9f;font:inherit;font-weight:bold}.incoming .reject{border-color:#a95555;color:#ff9f9f}</style></head><body><main><div class="top"><div class="brand">ASUS VS REDMI</div><div id="status" class="status">[ OFFLINE ]</div></div><section id="setup" class="setup"><h2>./join-room</h2><p>Enter your identity and private room code.</p><input id="name" maxlength="40" placeholder="username"><input id="room" maxlength="64" placeholder="room_code"><button id="join">[ EXECUTE JOIN ]</button><div class="hint">Use the same room code on both devices.</div></section><section id="chat" class="chat"><div class="messages" id="messages"></div><div id="incoming" class="incoming"><div id="caller" class="caller"></div><button id="accept">[accept]</button><button id="reject" class="reject">[reject]</button></div><div id="callview" class="callview"><div id="callinfo" class="callinfo"></div><video id="remote" class="remote" autoplay playsinline></video><video id="local" class="local" autoplay muted playsinline></video><div class="callcontrols"><button id="leave2" class="danger">[end a.v...]</button></div></div><div class="tools"><button id="voice" class="call">[start a...]</button><button id="video" class="video">[start v...]</button><button id="leave" class="danger">[end a.v...]</button></div><div class="composer"><textarea id="text" maxlength="2000" placeholder="type_message..." autocomplete="off"></textarea><button id="attach" class="attach">[attach]</button><input id="file" type="file" class="hidden"><button id="send">SEND</button></div></section></main><script>
let name='',room='',ws=null,pc=null,localStream=null,pendingCandidates=[],callKind='',callTimeout=null,incomingOffer=null,incomingCaller='',replyTo=null;
const $=id=>document.getElementById(id);const esc=s=>String(s).replace(/[&<>\\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\"':'&quot;',"'":'&#39;'}[c]));const RTC_CONFIG={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}],iceCandidatePoolSize:4};
function setStatus(x){
  $('status').textContent='[ '+x+' ]'
}

function fmtSize(n){
  return n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(2)+' MB'
}

function add(m){
  const d=document.createElement('div')
  d.className='msg '+(m.sender===name?'mine':'')
  d.dataset.messageId=m.id

  const time=m.created_at
    ?new Date(Number(m.created_at)).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})
    :'';

  let replyHtml=''

  if(m.reply_to&&m.reply_sender){
    const replyText=m.reply_text||'attachment'

    replyHtml=
      '<div class="reply-preview" data-reply-id="'+esc(m.reply_to)+'">'+
      '<span class="reply-who">'+esc(m.reply_sender)+'</span>'+
      '<span class="reply-text">'+esc(replyText.slice(0,120))+'</span>'+
      '</div>'
  }

  if(m.type==='attachment'){
    d.innerHTML=
      '<span class="who">'+esc(m.sender)+'</span>'+
      replyHtml+
      '<a class="attachment" target="_blank" rel="noopener" href="/api/attachments/'+
      encodeURIComponent(m.id)+
      '?room='+encodeURIComponent(room)+'">'+
      '<span>[ '+esc(m.filename)+' ]</span>'+
      '<small>'+esc(fmtSize(m.size))+' · expires in 2 days</small>'+
      '<span class="msg-time">'+esc(time)+'</span>'+
      '</a>'
  }else{
    d.innerHTML=
      '<span class="who">'+esc(m.sender)+'</span>'+
      replyHtml+
      '<span class="msg-text">'+esc(m.text)+'</span>'+
      '<span class="msg-time">'+esc(time)+'</span>'
  }

  let startX=0
  let startY=0
  let swiping=false

  d.addEventListener('touchstart',e=>{
    if(e.touches.length!==1)return

    startX=e.touches[0].clientX
    startY=e.touches[0].clientY
    swiping=false

    d.classList.remove('reply-ready')
  },{passive:true})

  d.addEventListener('touchmove',e=>{
    if(e.touches.length!==1)return

    const dx=e.touches[0].clientX-startX
    const dy=e.touches[0].clientY-startY

    if(Math.abs(dy)>Math.abs(dx))return

    if(dx>5){
      swiping=true

      const amount=Math.min(dx,80)

      d.style.transform='translateX('+amount+'px)'
      d.classList.toggle('reply-ready',dx>=55)
    }
  },{passive:true})

  d.addEventListener('touchend',()=>{
    if(swiping&&d.classList.contains('reply-ready')){
      replyTo=m

      const preview=(m.text||m.filename||'attachment')
        .replace(/\s+/g,' ')
        .slice(0,80)

      $('text').placeholder=
        'Replying to '+m.sender+': '+preview

      $('text').focus()
    }

    d.style.transform=''
    d.classList.remove('reply-ready')
    swiping=false
  })

  d.querySelector('.reply-preview')?.addEventListener('click',()=>{
    const targetId=
      d.querySelector('.reply-preview').dataset.replyId

    const target=
      document.querySelector(
        '.msg[data-message-id="'+CSS.escape(targetId)+'"]'
      )

    if(target){
      target.scrollIntoView({
        behavior:'smooth',
        block:'center'
      })

      target.classList.add('reply-highlight')

      setTimeout(()=>{
        target.classList.remove('reply-highlight')
      },1200)
    }
  })

  $('messages').appendChild(d)

  requestAnimationFrame(()=>{
    $('messages').scrollTop=$('messages').scrollHeight
  })
}

async function history(){
  const r=await fetch(
    '/api/messages?room='+encodeURIComponent(room)
  )

  if(r.ok){
    for(const m of await r.json()){
      add(m)
    }
  }
}

async function send(){
  const text=$('text').value.trim()

  if(!text)return

  $('text').value=''

  const replyId=
    replyTo&&replyTo.id
      ?replyTo.id
      :null

  const r=await fetch('/api/messages',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({
      room,
      name,
      text,
      replyTo:replyId
    })
  })

  if(!r.ok){
    alert('message: send failed')
    $('text').value=text
    return
  }

  replyTo=null
  $('text').placeholder='type_message...'
}

async function uploadFile(){
  const input=$('file')
  const f=input.files[0]

  if(!f)return

  const MAX=1400000

  async function compressImage(file){
    if(
      !file.type.startsWith('image/')||
      file.type==='image/gif'||
      file.type==='image/svg+xml'
    ){
      return file
    }

    if(file.size<=MAX)return file

    let bitmap

    try{
      bitmap=await createImageBitmap(file)
    }catch{
      return file
    }

    let w=bitmap.width
    let h=bitmap.height
    const maxDim=1920

    if(Math.max(w,h)>maxDim){
      const scale=maxDim/Math.max(w,h)

      w=Math.max(1,Math.round(w*scale))
      h=Math.max(1,Math.round(h*scale))
    }

    const canvas=document.createElement('canvas')
    canvas.width=w
    canvas.height=h

    const ctx=canvas.getContext('2d')

    if(!ctx){
      bitmap.close()
      return file
    }

    ctx.drawImage(bitmap,0,0,w,h)
    bitmap.close()

    for(const quality of [
      0.85,
      0.75,
      0.65,
      0.55,
      0.45,
      0.35,
      0.25
    ]){
      const blob=await new Promise(resolve=>
        canvas.toBlob(
          resolve,
          'image/jpeg',
          quality
        )
      )

      if(blob&&blob.size<=MAX){
        const base=(file.name||'image')
          .replace(/\.[^.]+$/,'')

        return new File(
          [blob],
          base+'.jpg',
          {
            type:'image/jpeg',
            lastModified:Date.now()
          }
        )
      }
    }

    return file
  }

  try{
    setStatus('COMPRESSING...')

    const upload=await compressImage(f)

    if(upload.size>MAX){
      alert(
        'attachment is too large even after compression. Maximum is 1.4 MB.'
      )

      input.value='' 
      setStatus('ONLINE')
      return
    }

    setStatus('UPLOADING...')

    const fd=new FormData()

    fd.append('room',room)
    fd.append('name',name)
    fd.append('file',upload,upload.name)

    const r=await fetch('/api/attachments',{
      method:'POST',
      body:fd
    })

    if(!r.ok){
      let e='upload failed'

      try{
        e=(await r.json()).error||e
      }catch{}

      throw new Error(e)
    }

    input.value=''
    setStatus('ONLINE')

  }catch(e){
    console.error(e)

    input.value=''
    setStatus('UPLOAD FAILED')

    alert(
      e.message||'attachment upload failed'
    )
  }
}

function sendSignal(x){
  if(
    ws&&
    ws.readyState===WebSocket.OPEN
  ){
    ws.send(JSON.stringify(x))
  }
}function hideIncoming(){incomingOffer=null;incomingCaller='';$('incoming').style.display='none'}
function startTimeout(){clearTimeout(callTimeout);callTimeout=setTimeout(()=>{if(pc&&pc.connectionState!=='connected'){setStatus('CALL TIMEOUT');updateCallButton('failed');hangup(false)}},30000)}function clearCallTimeout(){if(callTimeout){clearTimeout(callTimeout);callTimeout=null}}
function showVideoMode(){if(callKind==='video'){$('chat').classList.add('video-mode');$('callinfo').textContent='[ VIDEO CALL ]'}}function hideVideoMode(){$('chat').classList.remove('video-mode');$('remote').srcObject=null;$('local').srcObject=null}
function makePeer(video){
  pc=new RTCPeerConnection(RTC_CONFIG);
  pendingCandidates=[];

  pc.onicecandidate=e=>{
    if(e.candidate){
      sendSignal({
        type:'candidate',
        candidate:e.candidate
      });
    }
  };

  pc.ontrack=e=>{
    if(video){
      $('remote').srcObject=e.streams[0];
      $('remote').play().catch(()=>{});
      showVideoMode();
    }
    setStatus(video?'VIDEO CONNECTING...':'VOICE CONNECTING...');
  };

  pc.onconnectionstatechange=()=>{
    const s=pc?.connectionState;

    if(s==='connecting'){
      setStatus(video?'VIDEO CONNECTING...':'VOICE CONNECTING...');
      updateCallButton('connecting');

    }else if(s==='connected'){
      clearCallTimeout();
      setStatus(video?'VIDEO CONNECTED':'VOICE CONNECTED');
      updateCallButton('connected');

    }else if(s==='disconnected'){
      setStatus('CALL DISCONNECTED');
      updateCallButton('failed');

    }else if(s==='failed'){
      setStatus('CALL FAILED');
      updateCallButton('failed');

    }else if(s==='closed'){
      setStatus('ONLINE');
    }
  };

  pc.oniceconnectionstatechange=()=>{
    const s=pc?.iceConnectionState;

    if(s==='checking'){
      setStatus(video?'VIDEO CONNECTING...':'VOICE CONNECTING...');
      updateCallButton('connecting');

    }else if(s==='connected'||s==='completed'){
      clearCallTimeout();
      setStatus(video?'VIDEO CONNECTED':'VOICE CONNECTED');
      updateCallButton('connected');

    }else if(s==='failed'){
      setStatus('ICE FAILED');
      updateCallButton('failed');
    }
  };

  return pc;
}
async function addPending(){if(!pc||!pc.remoteDescription)return;for(const c of pendingCandidates){try{await pc.addIceCandidate(c)}catch(e){console.warn('ICE candidate failed',e)}}pendingCandidates=[]}
async function startCall(video){try{if(pc||localStream)return;callKind=video?'video':'voice';updateCallButton('connecting');setStatus(video?'VIDEO CONNECTING...':'VOICE CONNECTING...');startTimeout();localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:!!video});if(video){$('local').srcObject=localStream;$('local').play().catch(()=>{});showVideoMode()}makePeer(video);localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));const offer=await pc.createOffer({offerToReceiveAudio:true,offerToReceiveVideo:!!video});await pc.setLocalDescription(offer);sendSignal({type:'offer',sdp:pc.localDescription.sdp,video:!!video});setStatus(video?'VIDEO CALLING...':'VOICE CALLING...');updateCallButton('waiting')}catch(e){console.error(e);hangup(false);setStatus('CALL FAILED');alert((video?'Camera and microphone':'Microphone')+' permission is required for calling.')}}
async function acceptIncoming(){const x=incomingOffer;hideIncoming();if(!x)return;try{callKind=x.video?'video':'voice';updateCallButton('connecting');setStatus((x.video?'VIDEO':'VOICE')+' CONNECTING FROM '+(x.from||'UNKNOWN')+'...');startTimeout();localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:!!x.video});if(x.video){$('local').srcObject=localStream;$('local').play().catch(()=>{});showVideoMode()}makePeer(!!x.video);localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));await pc.setRemoteDescription({type:'offer',sdp:x.sdp});await addPending();const answer=await pc.createAnswer();await pc.setLocalDescription(answer);sendSignal({type:'answer',sdp:pc.localDescription.sdp});setStatus(x.video?'VIDEO CONNECTING...':'VOICE CONNECTING...')}catch(e){console.error(e);hangup(false);setStatus('CALL FAILED')}}
function rejectIncoming(){const x=incomingOffer;hideIncoming();if(x)sendSignal({type:'reject',from:x.from});setStatus('ONLINE')}
async function signal(x){
  try{
    if(x.type==='offer'){
      if(pc||localStream){
        sendSignal({type:'busy'});
        return;
      }
      showIncoming(x);

    }else if(x.type==='answer'&&pc){
      await pc.setRemoteDescription({
        type:'answer',
        sdp:x.sdp
      });
      await addPending();

    }else if(x.type==='candidate'){
      if(pc&&pc.remoteDescription){
        try{
          await pc.addIceCandidate(x.candidate);
        }catch(e){
          console.warn('ICE add failed',e);
        }
      }else{
        pendingCandidates.push(x.candidate);
      }

    }else if(x.type==='hangup'){
      hangup(false);
      setStatus('CALL ENDED');

    }else if(x.type==='reject'){
      clearCallTimeout();
      setStatus('CALL REJECTED BY '+(x.from||'PEER'));
      updateCallButton('failed');
      hangup(false);

    }else if(x.type==='busy'){
      clearCallTimeout();
      setStatus('PEER BUSY');
      updateCallButton('failed');
      hangup(false);
    }

  }catch(e){
    console.error('signaling error',e);
    clearCallTimeout();
    setStatus('CALL FAILED');
  }
}

function hangup(send=true){
  clearCallTimeout();

  // Tell the other peer to end the call.
  if(send){
    sendSignal({
      type:'hangup'
    });
  }

  // Stop WebRTC first.
  if(pc){
    pc.onicecandidate=null;
    pc.ontrack=null;
    pc.onconnectionstatechange=null;
    pc.oniceconnectionstatechange=null;

    try{
      pc.close();
    }catch(e){
      console.warn('PeerConnection close failed',e);
    }

    pc=null;
  }

  // Stop microphone/camera tracks.
  if(localStream){
    localStream.getTracks().forEach(track=>{
      try{
        track.stop();
      }catch(e){
        console.warn('Track stop failed',e);
      }
    });

    localStream=null;
  }

  // Clear queued ICE candidates.
  pendingCandidates=[];

  // Remove incoming-call UI.
  hideIncoming();

  // Save the previous call type before clearing it.
  const old=callKind;
  callKind='';

  // Clear video-call UI and media.
  hideVideoMode();

  const remote=$('remote');
  if(remote){
    remote.srcObject=null;
  }

  const local=$('local');
  if(local){
    local.srcObject=null;
  }

  // Restore normal chat UI.
  $('chat').classList.remove('video-mode');

  // Reset buttons.
  $('voice').textContent='[start a...]';
  $('video').textContent='[start v...]';

  // Return to normal online state.
  if(ws&&ws.readyState===WebSocket.OPEN){
    setStatus('ONLINE');
  }
}$('join').onclick=async()=>{name=$('name').value.trim();room=$('room').value.trim();if(!name||!room){alert('username and room_code required');return}sessionStorage.setItem('twochatName',name);sessionStorage.setItem('twochatRoom',room);$('setup').classList.add('hidden');$('chat').style.display='flex';setStatus('CONNECTING...');await history();const proto=location.protocol==='https:'?'wss':'ws';ws=new WebSocket(proto+'://'+location.host+'/ws?room='+encodeURIComponent(room)+'&name='+encodeURIComponent(name));ws.onopen=()=>setStatus('ONLINE');ws.onclose=()=>setStatus('DISCONNECTED');ws.onerror=()=>setStatus('CONNECTION ERROR');ws.onmessage=e=>{try{const x=JSON.parse(e.data);if(x.type==='message'||x.type==='attachment')add(x);else if(x.type==='peer')setStatus(x.online?'PEER ONLINE':'WAITING...');else if(['offer','answer','candidate','hangup','reject','busy'].includes(x.type))signal(x)}catch(err){console.error('WS message error',err)}}};$('send').onclick=send;$('attach').onclick=()=>$('file').click();$('file').onchange=uploadFile;$('voice').onclick=()=>startCall(false);$('video').onclick=()=>startCall(true);$('leave').onclick=()=>hangup();$('leave2').onclick=()=>hangup();$('accept').onclick=acceptIncoming;$('reject').onclick=rejectIncoming;const sn=sessionStorage.getItem('twochatName'),sr=sessionStorage.getItem('twochatRoom');if(sn)$('name').value=sn;if(sr)$('room').value=sr;
</script></body></html>`;
async function ensureAttachmentTable(env){await env.DB.prepare('CREATE TABLE IF NOT EXISTS attachments (id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT NOT NULL, sender TEXT NOT NULL, filename TEXT NOT NULL, mime_type TEXT NOT NULL, size INTEGER NOT NULL, data BLOB NOT NULL, created_at INTEGER NOT NULL)').run();await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_attachments_room_created ON attachments(room, created_at)').run()}async function ensureMessageReplyColumn(env){try{await env.DB.prepare('ALTER TABLE messages ADD COLUMN reply_to INTEGER').run()}catch{}}
export default{
  async fetch(request,env){
    const url=new URL(request.url)

    if(request.method==='OPTIONS'){
      return new Response(null,{headers:CORS})
    }

    if(url.pathname==='/'||url.pathname==='/index.html'){
      return new Response(HTML,{
        headers:{
          'content-type':'text/html;charset=UTF-8'
        }
      })
    }

    if(url.pathname==='/ws'){
      if(request.headers.get('Upgrade')!=='websocket'){
        return new Response(
          'WebSocket required',
          {status:426}
        )
      }

      const room=clean(url.searchParams.get('room'))
      const name=clean(url.searchParams.get('name'))

      if(!room||!name){
        return new Response(
          'room and name required',
          {
            status:400,
            headers:CORS
          }
        )
      }

      const id=env.ROOMS.idFromName(room)

      return env.ROOMS.get(id).fetch(
        new Request(
          'https://room/ws?'+
          new URLSearchParams({room,name}),
          request
        )
      )
    }

    if(
      url.pathname==='/api/messages'&&
      request.method==='GET'
    ){
      const room=clean(
        url.searchParams.get('room')
      )

      if(!room){
        return json(
          {error:'room required'},
          400
        )
      }

      await ensureAttachmentTable(env)
      await ensureMessageReplyColumn(env)

      const [mr,ar]=await Promise.all([

        env.DB.prepare(`
          SELECT
            m.id,
            m.room,
            m.sender,
            m.text,
            m.created_at,
            m.reply_to,
            r.sender AS reply_sender,
            r.text AS reply_text
          FROM messages m
          LEFT JOIN messages r
            ON r.id=m.reply_to
          WHERE m.room=?
          ORDER BY m.id DESC
          LIMIT 200
        `)
        .bind(room)
        .all(),

        env.DB.prepare(`
          SELECT
            id,
            room,
            sender,
            filename,
            mime_type,
            size,
            created_at
          FROM attachments
          WHERE room=?
            AND created_at>=?
          ORDER BY id DESC
          LIMIT 200
        `)
        .bind(
          room,
          Date.now()-172800000
        )
        .all()

      ])

      const results=[
        ...mr.results,

        ...ar.results.map(x=>({
          ...x,
          type:'attachment'
        }))
      ].sort(
        (a,b)=>a.created_at-b.created_at
      )

      return json(
        results.slice(-200),
        200
      )
    }

    if(
      url.pathname==='/api/messages'&&
      request.method==='POST'
    ){
      let b

      try{
        b=await request.json()
      }catch{
        return json(
          {error:'invalid JSON'},
          400
        )
      }

      await ensureMessageReplyColumn(env)

      const room=clean(b.room)
      const sender=clean(b.name)
      const text=String(
        b.text||''
      ).slice(0,2000)

      const replyTo=
        Number.isInteger(b.replyTo)
          ?b.replyTo
          :null

      if(!room||!sender||!text){
        return json(
          {
            error:
              'room, name and text required'
          },
          400
        )
      }

      let replySender=null
      let replyText=null

      if(replyTo){
        const replied=
          await env.DB.prepare(`
            SELECT
              sender,
              text
            FROM messages
            WHERE id=?
              AND room=?
            LIMIT 1
          `)
          .bind(
            replyTo,
            room
          )
          .first()

        if(replied){
          replySender=replied.sender
          replyText=replied.text
        }
      }

      const now=Date.now()

      const r=await env.DB.prepare(`
        INSERT INTO messages(
          room,
          sender,
          text,
          created_at,
          reply_to
        )
        VALUES(?,?,?,?,?)
      `)
      .bind(
        room,
        sender,
        text,
        now,
        replyTo
      )
      .run()

      const message={
        id:r.meta.last_row_id,
        room,
        sender,
        text,
        created_at:now,
        reply_to:replyTo,
        reply_sender:replySender,
        reply_text:replyText,
        type:'message'
      }

      const id=env.ROOMS.idFromName(room)

      await env.ROOMS.get(id).fetch(
        'https://room/broadcast',
        {
          method:'POST',
          body:JSON.stringify(message)
        }
      )

      return json(
        message,
        201
      )
    }

    if(
      url.pathname==='/api/attachments'&&
      request.method==='POST'
    ){
      try{
        await ensureAttachmentTable(env)

        const form=await request.formData()

        const room=clean(
          form.get('room')
        )

        const sender=clean(
          form.get('name')
        )

        const file=form.get('file')

        if(
          !room||
          !sender||
          !file||
          typeof file.arrayBuffer!=='function'
        ){
          return json(
            {
              error:
                'room, name and file required'
            },
            400
          )
        }

        if(file.size>MAX_ATTACHMENT_BYTES){
          return json(
            {
              error:
                'attachment too large; maximum is 1.4 MB'
            },
            413
          )
        }

        const filename=String(
          file.name||'attachment'
        ).slice(0,180)

        const mime=String(
          file.type||
          'application/octet-stream'
        ).slice(0,120)

        const data=await file.arrayBuffer()
        const now=Date.now()

        const r=await env.DB.prepare(`
          INSERT INTO attachments(
            room,
            sender,
            filename,
            mime_type,
            size,
            data,
            created_at
          )
          VALUES(?,?,?,?,?,?,?)
        `)
        .bind(
          room,
          sender,
          filename,
          mime,
          file.size,
          data,
          now
        )
        .run()

        const message={
          id:r.meta.last_row_id,
          room,
          sender,
          filename,
          mime_type:mime,
          size:file.size,
          created_at:now,
          type:'attachment'
        }

        const id=env.ROOMS.idFromName(room)

        await env.ROOMS.get(id).fetch(
          'https://room/broadcast',
          {
            method:'POST',
            body:JSON.stringify(message)
          }
        )

        return json(
          message,
          201
        )

      }catch(e){
        console.error(
          'attachment upload',
          e
        )

        return json(
          {
            error:
              'attachment upload failed'
          },
          500
        )
      }
    }

    if(
      url.pathname.startsWith('/api/attachments/')&&
      request.method==='GET'
    ){
      await ensureAttachmentTable(env)

      const id=Number(
        url.pathname.split('/').pop()
      )

      const room=clean(
        url.searchParams.get('room')
      )

      if(
        !Number.isInteger(id)||
        id<1||
        !room
      ){
        return new Response(
          'Not found',
          {
            status:404,
            headers:CORS
          }
        )
      }

      const row=await env.DB.prepare(`
        SELECT
          filename,
          mime_type,
          size,
          data,
          created_at
        FROM attachments
        WHERE id=?
          AND room=?
      `)
      .bind(
        id,
        room
      )
      .first()

      if(
        !row||
        Date.now()-Number(row.created_at)>=172800000
      ){
        return new Response(
          'Attachment expired',
          {
            status:410,
            headers:CORS
          }
        )
      }

      const bytes=new Uint8Array(
        row.data
      )

      return new Response(
        bytes,
        {
          headers:{
            ...CORS,
            'content-type':
              row.mime_type||
              'application/octet-stream',
            'content-length':
              String(row.size),
            'content-disposition':
              'inline; filename="'+
              String(row.filename)
                .replace(/["\\\r\n]/g,'_')+
              '"',
            'cache-control':
              'private, max-age=300'
          }
        }
      )
    }

    return json(
      {
        name:'Asus vs Redmi API',
        status:'ok',
        endpoints:[
          '/api/messages',
          '/api/attachments',
          '/ws'
        ]
      },
      200
    )
  },

  async scheduled(event,env,ctx){
    ctx.waitUntil(
      (async()=>{
        try{
          await ensureAttachmentTable(env)

          const now=Date.now()

          await env.DB.prepare(
            'DELETE FROM attachments WHERE created_at < ?'
          )
          .bind(
            now-172800000
          )
          .run()

          await env.DB.prepare(
            'DELETE FROM messages WHERE created_at < ?'
          )
          .bind(
            now-2592000000
          )
          .run()

        }catch(e){
          console.error(
            'retention cleanup',
            e
          )
        }
      })()
    )
  }
}
function clean(v){
  return String(v||'')
    .trim()
    .slice(0,128)
}

function json(data,status){
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers:{
        'content-type':
          'application/json',
        ...CORS
      }
    }
  )
}

export class Room{
  constructor(state){
    this.state=state
    this.clients=new Map()
  }

  async fetch(request){
    const url=new URL(request.url)

    if(
      url.pathname==='/broadcast'&&
      request.method==='POST'
    ){
      const msg=await request.json()

      for(
        const ws of this.clients.keys()
      ){
        try{
          ws.send(
            JSON.stringify(msg)
          )
        }catch{}
      }

      return new Response('ok')
    }

    if(url.pathname==='/ws'){
      const pair=new WebSocketPair()

      const [
        client,
        server
      ]=Object.values(pair)

      const name=
        url.searchParams.get('name')||
        'Guest'

      server.accept()

      this.clients.set(
        server,
        name
      )

      server.send(
        JSON.stringify({
          type:'peer',
          online:
            this.clients.size>1
        })
      )

      this.broadcast(
        {
          type:'peer',
          online:
            this.clients.size>1
        },
        server
      )

      server.addEventListener(
        'message',
        event=>{
          try{
            const x=
              JSON.parse(event.data)

            if([
              'offer',
              'answer',
              'candidate',
              'hangup',
              'reject',
              'busy'
            ].includes(x.type)){
              this.broadcast(
                {
                  ...x,
                  from:name
                },
                server
              )
            }
          }catch{}
        }
      )

      server.addEventListener(
        'close',
        ()=>{
          this.clients.delete(server)

          this.broadcast({
            type:'peer',
            online:
              this.clients.size>1
          })
        }
      )

      return new Response(
        null,
        {
          status:101,
          webSocket:client
        }
      )
    }

    return new Response(
      'not found',
      {status:404}
    )
  }

  broadcast(obj,except){
    for(
      const ws of this.clients.keys()
    ){
      if(ws===except)continue

      try{
        ws.send(
          JSON.stringify(obj)
        )
      }catch{}
    }
  }
          }
