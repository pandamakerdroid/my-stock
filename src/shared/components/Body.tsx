import { Routes, Route, Navigate, useLocation,useNavigate } from 'react-router-dom';
import MyStocks from '../../views/MyStocks';

function Body(props:any) {
    return (
        <Routes>
          <Route path="/" element={<MyStocks/>}></Route>
          <Route path="/stocks" element={<MyStocks/>}></Route>

        </Routes>);
}
export default Body;