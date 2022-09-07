import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000").then((res) => setState(res.data));
  }, []);

  // let savedData = state.map((singleData) => {
  //   let base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(singleData.image.data.data))
  //   );
  //   return base64String;
  // });

  console.log(state);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {
        state.map((singleData)=>{
          const base64String = btoa(String.fromCharCode(...new Uint8Array(singleData.image.data.data))); 
          return(<>

            <img src={`data:image/png;base64,${base64String}`} alt=""/>
          </>
          )
      })
      }
      {/* <img src={`data:image/png;base64,${savedData}`} alt=""/> */}
    </div>
  );
}
