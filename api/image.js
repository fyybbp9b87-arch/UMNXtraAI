export default async function handler(req,res){

const {prompt}=req.body;

const enhanced=`
ultra realistic 8k DSLR photography,
cinematic lighting, sharp focus,

${prompt}
`;

const r=await fetch(
"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
{
method:"POST",
headers:{
"Authorization":"Bearer "+process.env.HF_API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({inputs:enhanced})
}
);

const b=await r.arrayBuffer();

res.json({
image:`data:image/png;base64,${Buffer.from(b).toString("base64")}`
});

}
