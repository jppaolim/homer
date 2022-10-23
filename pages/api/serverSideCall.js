export default async function serverSideCall(req,res ) {
    
    //const {
    //    query: { prompt },
    //  } = req;
    console.log(JSON.stringify(req.body));

    const response = await fetch(
		"https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
		{
			//headers: { Authorization: "Bearer "+process.env.KEY },
			method: "POST",
			body: req.body,
		}
	);

   const result = await response.json();
   //console.log(JSON.stringify(result));

   //return result;

//    res.status(200).json({
//        data:  response.data,
//    });

     return res.status(200).json({
      data:  result.data,
   });

}



//async function query(data) {
//  console.log(JSON.stringify(data));
//  const response = await fetch(
//      "https://api-inference.huggingface.co/models/jppaolim/homerGPT2",
//      {
//          //This is not a true token headers: { Authorization: "Bearer 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" },
 //         method: "POST",
 //         body: JSON.stringify(data),
 //     }
 // );
 // const result = await response.json();
 // return result;
//}