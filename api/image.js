export default async function handler(req, res) {

  const { prompt } = req.body;

  /* CREATE IMAGE */
  const response = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Authorization": "Token " + process.env.REPLICATE_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version:
          "39ed52f2a78e934bfaec84f9c2223af4d6c0d8bbed7c1816a9cdae361d556feb",

        input: {
          prompt: `
ultra realistic, cinematic lighting,
8k DSLR photography, sharp focus,
professional color grading,

${prompt}
`,
          width: 1024,
          height: 1024
        }
      })
    }
  );

  const prediction = await response.json();

  /* WAIT FOR IMAGE */
  let image = null;

  for (let i = 0; i < 20; i++) {

    await new Promise(r => setTimeout(r, 1500));

    const check = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      {
        headers: {
          "Authorization":
            "Token " + process.env.REPLICATE_API_KEY
        }
      }
    );

    const data = await check.json();

    if (data.status === "succeeded") {
      image = data.output[0];
      break;
    }

    if (data.status === "failed") {
      return res.status(500).json({
        error: "Image generation failed"
      });
    }
  }

  if (!image) {
    return res.status(500).json({
      error: "Timed out"
    });
  }

  res.json({ image });

}
