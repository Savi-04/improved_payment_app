import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Payment } from "./pages/Payment";

function App() {

  return (
    <>
<div className="text-5xl text-center mt-3.5  text-white">Payment Application</div>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />   
      <Route path="/payment" element={<Payment />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
