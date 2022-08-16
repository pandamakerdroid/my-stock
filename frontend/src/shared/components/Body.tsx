import { Routes, Route, Navigate, useLocation,useNavigate } from 'react-router-dom';
import FAQ from '@views/FAQ';
import MyStocks from '@views/MyStocks';
import Container from '@mui/material/Container';

function Body(props:any) {
    return (
      <Container sx={{pt:5, mt:5, gap:2}}>
        <Routes>
          <Route path="/" element={<MyStocks/>}></Route>
          <Route path="/stocks" element={<MyStocks/>}></Route>
          <Route path="/faq" element={<FAQ/>}></Route>

        </Routes>
      </Container>
    );
}
export default Body;