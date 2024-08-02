import { createClient } from 'redis'

const client = createClient();


async function main (){
    await client.connect()
    while(1){
        // brPop-> stay Block until you get something
        const response = await client.brPop('submissions', 0);
        console.log(response);
    
        
        // run the user code docker exec
        await new Promise((resolve)=> setTimeout(resolve,1000));
        // send it to the pubsub
        console.log('Processed users submission');



    }
}
main();