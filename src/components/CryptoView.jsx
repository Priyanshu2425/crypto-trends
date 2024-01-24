import {useState, useEffect} from 'react'
import '../assets/crypto-view.css'
export default function CryptoView(){
    const [ data, setData ] = useState([]);    
    const [ circulating_supply, setCirculatingSupply] = useState();

    const dataRender = data.map((item) => {
        let bubble_size = null;
        try{
            let item_market_cap = null;
            if(item.quote.USD.market_cap < 95540947051.54237){
                item_market_cap = 95540947051.54237;
                bubble_size = Math.floor((item_market_cap) / 2555000000) * (Math.random() * 5);
            }else{
                item_market_cap = item.quote.USD.market_cap;
                
                bubble_size = Math.floor((item_market_cap) / 20000000000) * (Math.random() * 3);
            }
        }catch(error){
            bubble_size = 500;
        }
        
        return (
          <div key={item.id} style = {{width: `${bubble_size}px`,  height: `${bubble_size}px`}}>
            {item.symbol}
          </div>
        );
      });

    
    useEffect(()=>{
        let response = new Promise(async(resolve, reject)=>{
            try{
                let response_data = await fetch("http://localhost:3000/latest-listings", {
                    headers : {
                        'X-CMC_PRO_API_KEY': '050294f2-d8e8-41db-89ec-452b28007a61',
                    }
                })

                
                let json_data = await response_data.json();
                resolve(json_data);

            }catch(error){
                reject(error);
            }
        })

        response.then((response_data)=>{
            setData(response_data.data)

            let supply = 0;
            data.forEach((item)=>{
                console.log(item.circulating_supply)
                supply += item.circulating_supply ? Math.floor(item.circulating_supply) : 0;
            })  
            setCirculatingSupply(supply);

            console.log("Circulating Supply: " + circulating_supply);
            console.log("Data: " + data);

        }).catch((error)=>{
            console.log("error fetching data ==> " + error);
        })
    }, [])

    

    return (
        <>
            <div id="dashboard">
                <h1> CryptoCurrencies Market Capitalization </h1>
                <input type='radio' name='options'/>
                <label>Market Cap</label>
                <input type='radio' name='options'/>
                <label>Volume</label>
                <input type='radio' name='options'/>
                <label>Price</label>
                <input type='radio' name='options'/>
                <label>Circulating Supply</label>

                <div id="crypto-bubbles">
                    {dataRender.slice(0, 35).sort((item1, item2)=>{
                        return item1.market_cap - item2.market_cap;
                    })}
                </div>
            </div>
        </>
    )
}