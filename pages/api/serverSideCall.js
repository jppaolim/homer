export default async function serverSideCall(req, res) {
  const response = await fetch(
  "https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
// try also "https://api-inference.huggingface.co/models/jppaolim/v60_Large_2E",
// or replace with inference endpoint such as "https://XXXX.eu-west-1.aws.endpoints.huggingface.cloud",
    
    {
      headers: { 
        Authorization: "Bearer " + process.env.KEY ,
       'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(req.body),
    }
  );

  const result = await response.json();

  console.log("Result : ");
  console.log(result);

  res.status(response.status).json({
    data: result,
  });
}