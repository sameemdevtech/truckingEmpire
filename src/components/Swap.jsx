import { Stack, TextField, Typography, Button } from "@mui/material";
import SelectItem from "./SelectItem";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';

import { getWethContract, getUniContract, getPrice, runSwap } from '../pages/home/AlphaRouterService';
const Swap = ( { user, balance, unibal, activeButton } ) =>
{
  const [ data, setData ] = useState( {
    inputCurrency: "",
    inputAmount: undefined,
    outputAmount: 2,
    outputCurrency: "",
    totalAmount: "",
  } );
  const [ deadline, setDeadline ] = useState( 10 );
  const [ ratio, setRatio ] = useState( undefined );
  const [ transaction, setTransaction ] = useState( undefined );
  const [ signer, setSigner ] = useState( undefined );
  const [ bal, setBal ] = useState( undefined );
  const [ uniBal, setUniBal ] = useState( undefined );
  const [ error, setError ] = useState( null );
  const [ wethContract, setWethContract ] = useState( undefined );
  const [ uniContract, setUniContract ] = useState( undefined );
  useEffect( () =>
  {
    const wethContract = getWethContract();
    setWethContract( wethContract );
    // console.log("wethContract",wethContract.balanceOf('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'))
    // console.log( wethContract );
    const uniContract = getUniContract();
    setUniContract( uniContract );
    if ( activeButton !== null )
    {
      if ( user )
      {
        wethContract.balanceOf( user )
          .then( res =>
          {
            const wethBalance = Number( ethers.utils.formatEther( res ) );
            // console.log( "WETH Balance:", wethBalance );

            // Check if the WETH balance is zero
            if ( wethBalance === 0 )
            {
              // console.log( "Account has no WETH." );
              // Handle the case where the account has no WETH
            } else
            {
              setWethAmount( wethBalance );
            }
          } )
          .catch( error =>
          {
            setError( error );
            console.error( "Error fetching WETH balance:", error );
            // Handle the error
          } );
        uniContract.balanceOf( user ).then( res =>
        {
          setUniAmount( Number( ethers.utils.formatEther( res ) ) );
        } );
      }
    }
  }, [] );
  useEffect( () =>
  {
    const signerAddres = user;
    setSigner( user );
    setBal( balance );
    setUniBal( unibal );
    if ( signerAddres && data.inputAmount !== undefined )
    {
      const swap = getPrice(
        data.inputAmount,
        data.outputAmount,
        Math.floor( Date.now() / 1000 + ( deadline * 60 ) ),
        signerAddres
      ).then( data =>
      {
        setTransaction( data[ 0 ] );
        setOutputAmount( data[ 1 ] );
        setRatio( data[ 2 ] );
      } );
    }
  }, [ data.inputAmount ] );
  return (
    <>
      <Stack
        gap={ 2 }
        mt={ 2 }
        sx={ { background: "#fff", py: 4, px: 2, borderRadius: 2 } }
      >
        {
          error ?
            <Alert severity="error">
              No balance detected in Wallet
            </Alert> : ''
        }
        <Typography variant="h3" color="secondary">
          Swap
        </Typography>
        <SelectItem
          value={ data.inputCurrency }
          label={ "Select CryptoCurrency" }
          menus={ [
            [ "ethereum", "WETH" ],
          ] }
          handleChange={ ( e ) =>
            setData( ( prev ) => ( { ...prev, inputCurrency: e.target.value } ) )
          }
        />

        <TextField
          label={ "Amount" }
          value={ data.inputAmount }
          onChange={ ( e ) =>
            setData( ( prev ) => ( { ...prev, inputAmount: e.target.value } ) )
          }
        />

        <SelectItem
          value={ data.outputCurrency }
          label={ "Select Output CryptoCurrency" }
          menus={ [
            [ "uniswap", "UNI" ],
          ] }
          handleChange={ ( e ) =>
            setData( ( prev ) => ( { ...prev, outputCurrency: e.target.value } ) )
          }
        />
        <Stack
          flexDirection={ "row" }
          justifyContent={ "space-between" }
          alignItems={ "center" }
        >
          { ratio && (
            <Typography variant="h4" color="initial">

              { `1 UNI = ${ ratio } WETH` }

            </Typography>
          ) }
          <Button sx={ { fontSize: 18, width: 100 } } variant="contained" color="primary" onClick={ () => runSwap( transaction, signer ) }>
            swap
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Swap;
