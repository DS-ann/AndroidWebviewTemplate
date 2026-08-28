export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET,POST,OPTIONS"};
    if (request.method === 'OPTIONS') return new Response(null,{headers:cors});

    if (url.pathname === '/ws') {
      if (request.headers.get('Upgrade') !== 'websocket') return new Response('WebSocket required',{status:426});
      const room = clean(url.searchParams.get('room'));
      const name = clean(url.searchParams.get('name'));
      if (!room || !name) return new Response('room and name required',{status:400});
      const id = env.ROOMS.idFromName(room);
      return env.ROOMS.get(id).fetch(new Request('https://room/ws?'+new URLSearchParams({room,name}),request));
    }

    if (url.pathname === '/api/messages' && request.method === 'GET') {
      const room = clean(url.searchParams.get('room'));
      if (!room) return json({error:'room required'},400,cors);
      const {results}=await env.DB.prepare('SELECT id,room,sender,text,created_at FROM messages WHERE room=? ORDER BY id DESC LIMIT 200').bind(room).all();
      return json(results.reverse(),200,cors);
    }

    if (url.pathname === '/api/messages' && request.method === 'POST') {
      let b; try{b=await request.json()}catch{return json({error:'invalid JSON'},400,cors)}
      const room=clean(b.room),sender=clean(b.name),text=String(b.text||'').slice(0,2000);
      if(!room||!sender||!text)return json({error:'room, name and text required'},400,cors);
      const now=Date.now();
      const r=await env.DB.prepare('INSERT INTO messages(room,sender,text,created_at) VALUES(?,?,?,?)').bind(room,sender,text,now).run();
      const message={id:r.meta.last_row_id,room,sender,text,created_at:now,type:'message'};
      const id=env.ROOMS.idFromName(room); await env.ROOMS.get(id).fetch('https://room/broadcast',{method:'POST',body:JSON.stringify(message)});
      return json(message,201,cors);
    }
    return new Response('TwoChat API',{headers:cors});
  }
};

function clean(v){return String(v||'').trim().slice(0,128)}
function json(data,status,headers={}){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json',...headers}})}

export class Room {
  constructor(state){this.state=state;this.clients=new Map()}
  async fetch(request){
    const url=new URL(request.url);
    if(url.pathname==='/broadcast'&&request.method==='POST'){
      const msg=await request.json(); for(const ws of this.clients.keys()) try{ws.send(JSON.stringify(msg))}catch{}
      return new Response('ok');
    }
    if(url.pathname==='/ws'){
      const pair=new WebSocketPair(); const [client,server]=Object.values(pair); const name=url.searchParams.get('name')||'Guest';
      server.accept(); this.clients.set(server,name);
      server.send(JSON.stringify({type:'peer',online:this.clients.size>1}));
      this.broadcast({type:'peer',online:this.clients.size>1},server);
      server.addEventListener('message',event=>{try{const x=JSON.parse(event.data); if(['offer','answer','candidate','hangup'].includes(x.type))this.broadcast({...x,from:name},server)}catch{}});
      server.addEventListener('close',()=>{this.clients.delete(server);this.broadcast({type:'peer',online:this.clients.size>1})});
      return new Response(null,{status:101,webSocket:client});
    }
    return new Response('not found',{status:404});
  }
  broadcast(obj,except){for(const ws of this.clients.keys()){if(ws===except)continue;try{ws.send(JSON.stringify(obj))}catch{}}}
}
