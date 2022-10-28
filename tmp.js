try {
          
    const result = query(queryData)
      .then((response) => {

        debuglog("response", response.data)

        const resdata = response.data
        document.getElementById("storycontent").innerHTML = resdata[0]['generated_text'];

      })

  // if ever the model is not ready we will get an error, we try again after 60 seconds ... 
  } catch (error) {
    
    debuglog("erreur attrapé", error);

    if (error.code && error.code == 503)  {

      document.getElementById("storycontent").innerHTML = "Waiting for the model to load...Trying again in 60 seconds";
      setTimeout(() => {
        const result2 = query(queryData)
          .then((response) => {

            debuglog("trying again", response.data)
            const resdata = response.data
            document.getElementById("storycontent").innerHTML = resdata[0]['generated_text'];

          })
          .catch((error) => {
            console.error('Weird error, please reload and try again ' + error);
          }) 



      }, "60000")
    } else {
      document.getElementById("storycontent").innerHTML = "Weird error, please reload and try again";
      console.error("Weird error, please reload and try again" );
    }
  }




  function rejectDelay(reason) {
    console.log("startying to retry ")
    return new Promise(function (resolve, reject) {
      setTimeout(reject.bind(null, reason), 20000);
    });
  }

  var max = 2;
        var p = Promise.reject();


        for (var i = 0; i < max; i++) {
          console.log("try " +i );
          p = p.catch(query(queryData)).catch(rejectDelay("echec"));
        }
        console.log("finished trying " );
        debuglog("promise",p);

        p = p.then((response) => {

            debuglog("response", response.data)

            const resdata = response.data
            document.getElementById("storycontent").innerHTML = resdata[0]['generated_text'];

          })
          .catch((error) => {
            document.getElementById("storycontent").innerHTML = "Weird error, please reload and try again" ;
            console.error("Weird error, please reload and try again");
          });
