export default async function serverSideCall(req,res ) {
    

    //console.log(JSON.stringify(req.body));

    const response =  await fetch(
		"https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
		{
			headers: { Authorization: "Bearer "+ process.env.KEY },
			method: "POST",
			body: JSON.stringify(req.body),
		}
	);  
  //).then(response => response.json())
  //.then(data => console.log(data));
  
  //if (response.ok) {

   //  console.log(response)
   // console.log(JSON.stringify(data[0]['generated_text']))

   const result = await response.json();
   console.log("Result : ");
   console.log(result);

//  }
        

   res.status(200).json({
        data: result  ,
    });

  
}
