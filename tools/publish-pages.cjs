const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const repo='https://github.com/deryaelgit/Rumeysa-Proje-Lise.git';
function run(args,cwd=root){const r=spawnSync('git',args,{cwd,encoding:'utf8',env:{...process.env,GCM_INTERACTIVE:'Never',GIT_TERMINAL_PROMPT:'0'}});if(r.status!==0)throw Error(r.stderr||'Git işlemi başarısız');return r.stdout;}
async function api(method,route,body){
 const r=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GCM_INTERACTIVE:'Never',GIT_TERMINAL_PROMPT:'0'}});
 if(r.status!==0)throw Error('GitHub oturumuna erişilemiyor.');
 const fields=Object.fromEntries(r.stdout.trim().split('\n').map(s=>{const i=s.indexOf('=');return[s.slice(0,i),s.slice(i+1)];}));
 if(!fields.password)throw Error('GitHub kimliği bulunamadı');
 const response=await fetch(`https://api.github.com/repos/deryaelgit/Rumeysa-Proje-Lise${route}`,{method,headers:{Authorization:`Bearer ${fields.password}`,Accept:'application/vnd.github+json','User-Agent':'edebiyat-atlasi','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 const text=await response.text();let data;try{data=JSON.parse(text);}catch{data={};}
 if(!response.ok)throw Error(`GitHub ${response.status}: ${data.message||'İşlem başarısız'}`);
 return data;
}
(async()=>{
 if(process.argv.includes('--status')){const pages=await api('GET','/pages');let build;try{build=await api('GET','/pages/builds/latest');}catch{}console.log(JSON.stringify({url:pages.html_url,status:pages.status,build:build?.status,error:build?.error?.message}));return;}
 process.env.STATIC_HOSTING='1';
 const build=spawnSync(process.execPath,[path.join(__dirname,'build.cjs')],{cwd:root,encoding:'utf8',env:process.env});
 if(build.status!==0)throw Error(build.stderr);
 const dir=path.join(root,'.publish');fs.mkdirSync(dir,{recursive:true});
 if(!fs.existsSync(path.join(dir,'.git'))){run(['init','-b','gh-pages'],dir);run(['remote','add','origin',repo],dir);}
 fs.cpSync(path.join(root,'dist'),dir,{recursive:true});
 run(['add','--all'],dir);
 if(run(['status','--porcelain'],dir).trim())run(['commit','-m','Publish Istanbul literature atlas'],dir);
 console.log(run(['push','-u','origin','gh-pages'],dir));
 let pages;try{pages=await api('GET','/pages');}catch(error){if(!error.message.includes('404'))throw error;}
 if(!pages)pages=await api('POST','/pages',{source:{branch:'gh-pages',path:'/'},build_type:'legacy'});
 else if(pages.source?.branch!=='gh-pages')pages=await api('PUT','/pages',{source:{branch:'gh-pages',path:'/'},build_type:'legacy'});
 console.log(JSON.stringify({url:pages.html_url,status:pages.status,source:pages.source}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
