export default async function serverSideCall(req,res ) {
    
    const response =  await fetch(
		"https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
		{
			headers: { Authorization: "Bearer "+ process.env.KEY },
			method: "POST",
			body: JSON.stringify(req.body),
		}
	);  

   const result = await response.json();
   console.log("Result : ");
   console.log(result);

   res.status(200).json({
        data: result  ,
    });
  
}
