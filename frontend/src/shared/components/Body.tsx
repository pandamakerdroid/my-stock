import { Routes, Route } from 'react-router-dom';
import FAQ from '@views/FAQ';
import MyStocks from '@views/MyStocks';
import Container from '@mui/material/Container';
import MyCryptos from '@views/MyCryptos';

function Body(props:any) {
    return (
      <Container sx={{mt:5, gap:1}}>
        <Routes>
          <Route path="/" element={<MyStocks/>}></Route>
          <Route path="/stocks" element={<MyStocks/>}></Route>
          <Route path="/faq" element={<FAQ/>}></Route>
          <Route path="/cryptos" element={<MyCryptos/>}></Route>
          <Route path="/contact" element={<MyCryptos/>}></Route>

        </Routes>
      </Container>
    );
}
export default Body;