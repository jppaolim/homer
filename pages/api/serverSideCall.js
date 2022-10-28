export default async function serverSideCall(req, res) {
  const response = await fetch(
   "https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
// "https://api-inference.huggingface.co/models/jppaolim/v60_Large_2E",
    
    {
      headers: { Authorization: "Bearer " + process.env.KEY },
      method: "POST",
      body: JSON.stringify(req.body),
    }
  );

  const result = await response.json();

  //if (!response.ok) {
  //  const message = `An error has occured: ${response.status}`;
  //  console.log("Erreur : " + message);
    //throw new Error(message);
  //}

  console.log("Result : ");
  console.log(result);

  res.status(response.status).json({
    data: result,
  });
}
