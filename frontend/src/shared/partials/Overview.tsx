import { Typography, Grid, Item } from '@mui/material';
//import styles from '@partials/Overview.module.css';
import {
    selectSymbol
} from '@store/slices/stockDataSlice';
import { useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
export const Overview = (props:any) => {
    const {t} = useTranslation('translation')
    const symbol:string = useAppSelector(selectSymbol);
// #798F60 bid green
// #BB4E58 ask red

    return (
        
        <>

            <Grid container spacing={2} sx={{mt:5}}>
                <Grid item md={12} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {symbol.length>1?props.stock.name:''}
                    </Typography>
                    <Typography variant="subtitle1">
                        {symbol.length>1?props.stock.symbol:''}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {symbol.length>1?props.stock.averageAnalystRating:""}
                    </Typography>  
                </Grid>
            </Grid>    
            <Grid container spacing={2}>
                <Grid item md={3} xs={6}>
                    <Typography variant="h6" gutterBottom>
                    {t('overview.bid')}
                    </Typography>   
                    <Typography variant="h6" sx={{color:"#798F60"}} gutterBottom>
                    {symbol.length>1?props.stock.bid:0}
                    </Typography>                
                </Grid>
                <Grid item md={3} xs={6}>
                    <Typography variant="h6" gutterBottom>
                    {t('overview.ask')}
                    </Typography>   
                    <Typography variant="h6" sx={{color:"#BB4E58"}} gutterBottom>
                    {symbol.length>1?props.stock.ask:0}
                    </Typography>                
                </Grid>
                <Grid item md={3} xs={6}>
                    <Typography variant="h6" gutterBottom>
                    {t('overview.fiftyTwoWeekHigh')}
                    </Typography>   
                    <Typography variant="h6" gutterBottom>
                    {symbol.length>1?props.stock.fiftyTwoWeekHigh:0}
                    </Typography>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Typography variant="h6" gutterBottom>
                    {t('overview.fiftyTwoWeekLow')}
                    </Typography>  
                    <Typography variant="subtitle1" gutterBottom>
                    {symbol.length>1?props.stock.fiftyTwoWeekLow:0}
                    </Typography>
                </Grid>
                {(symbol.length>1 && props.stock.epsForward) &&
                    <>
                        <Grid item md={3} xs={6}>
                            <Typography variant="h6" gutterBottom>
                            {t('overview.epsCurrentYear')}
                            </Typography>   
                            <Typography variant="subtitle1" gutterBottom>
                            {symbol.length>1?props.stock.epsCurrentYear:0}
                            </Typography>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Typography variant="h6" gutterBottom>
                            {t('overview.epsForward')}
                            </Typography>  
                            <Typography variant="subtitle1" gutterBottom>
                            {symbol.length>1?props.stock.epsForward:0}
                            </Typography>
                        </Grid>
                    </>
                }
            </Grid>
        </>
    )
}