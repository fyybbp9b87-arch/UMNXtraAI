export default async function handler(req,res){

const cat=req.query.category||"general";

const r=await fetch(
`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${process.env.NEWS_API_KEY}`
);

const d=await r.json();

res.json(d);

}
