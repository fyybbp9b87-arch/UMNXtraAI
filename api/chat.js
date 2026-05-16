export default async function handler(req,res){

const {messages}=req.body;

const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+process.env.GROQ_API_KEY
},
body:JSON.stringify({
model:"llama-3.1-8b-instant",
messages:[
{role:"system",content:"You are UMNXtraAI assistant."},
...messages
]
})
});

const d=await r.json();

res.json({reply:d.choices?.[0]?.message?.content || "No response"});

}
