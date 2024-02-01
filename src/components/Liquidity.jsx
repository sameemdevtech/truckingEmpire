import React, { useState, useEffect } from "react";
import { Stack, Typography, Button } from "@mui/material";
import SelectItem from "./SelectItem";
import { ethers } from 'ethers';
import ERC20ABI from '../pages/home/abi.json';


const Liquidity = (props) =>
{

  const [ data, setData ] = useState( {
    inputCurrency: "",
    inputAmount: "",
    outputCurrency: "",
    totalAmount: "",
    liquidity: {
      firstCrypto: "bitcoin",
      firstCryptoamount: "",
      secondCrypto: "ethereum",
      secondCryptoamount: "",
      lpToken: "SEMILP",
      totalAmountLiquidity: "",
    },
  } );
  const [ totalValue, setTotalValue ] = useState( "" );
  useEffect( () =>
  {
    let value = data.liquidity.firstCryptoamount * 382.421;
    // console.log(value)
    let fee = ( value / 100 ) * 0.30;
    value = value - fee;
    // console.log(value)
    setTotalValue(value)
    // console.log(data.liquidity)
  },[data.liquidity.secondCrypto]);
  const addLiquidity = async () =>
  {
    const provider = new ethers.providers.Web3Provider( window.ethereum );
    // Implement your logic for adding liquidity here
    // You can access the liquidity data using data.liquidity
    const name0 = 'Wrapped Ether';
    const symbol0 = 'WETH';
    const decimal0 = 18;
    const address0 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

    const name1 = 'Uniswap Token';
    const symbol1 = 'UNI';
    const decimal1 = 18;
    const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

    // Replace this with your Uniswap V3 Router contract address
    const uniswapRouterAddress = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

    // Connect to the Uniswap V3 Router contract
    const uniswapRouter = new ethers.Contract( uniswapRouterAddress, ERC20ABI, provider.getSigner() );

    // Approve spending of ERC20 tokens by the router
    const token0 = new ethers.Contract( address0, [ 'function approve(address spender, uint amount)' ], provider.getSigner() );
    const token1 = new ethers.Contract( address1, [ 'function approve(address spender, uint amount)' ], provider.getSigner() );

    const amount0Desired = ethers.utils.parseUnits( data.liquidity.firstCryptoamount, decimal0 );
    const amount1Desired = ethers.utils.parseUnits( '380.412', decimal1 );
    const amount0Min = 0;
    const amount1Min = 0;
    const deadline = Math.floor( Date.now() / 1000 ) + 60 * 10;

    await token0.approve( uniswapRouter.address, amount0Desired );
    await token1.approve( uniswapRouter.address, amount1Desired );

    // Add liquidity
    const tx = await uniswapRouter.addLiquidity(
      address0,
      address1,
      amount0Desired,
      amount1Desired,
      amount0Min,
      amount1Min,
      window.ethereum.selectedAddress,
      deadline
    );

    // Wait for the transaction to be mined
    await tx.wait();

    // console.log( 'Liquidity added successfully!' );
  };

  return (
    <>
      <Stack
        gap={ 2 }
        mt={ 2 }
        sx={ { background: "#fff", py: 4, px: 2, borderRadius: 2 } }
      >
        <Typography variant="h3" color="secondary">
          Liquidity
        </Typography>
        <SelectItem
          value={ data.liquidity.firstCrypto }
          label={ "Select Cryptocurrency 1" }
          menus={ [

            [ "ethereum", "WETH" ],
            ,
          ] }
          handleChange={ ( e ) =>
            setData( ( prev ) => ( {
              ...prev,
              liquidity: { ...prev.liquidity, firstCrypto: e.target.value },
            } ) )
          }
        />

        <div className="input-field">
          <label htmlFor="input-amount-1">Enter Amount 1:</label>
          <input
            type="text"
            id="input-amount-1"
            placeholder="Enter Amount"
            value={ data.liquidity.firstCryptoamount }
            onChange={ ( e ) =>
              setData( ( prev ) => ( {
                ...prev,
                liquidity: {
                  ...prev.liquidity,
                  firstCryptoamount: e.target.value,
                },
              } ) )
            }
          />
        </div>

        <SelectItem
          value={ data.liquidity.secondCrypto }
          label={ "Select Cryptocurrency 2" }
          menus={ [

            [ "uniSwap", "UNI" ],

          ] }
          handleChange={ ( e ) =>
            setData( ( prev ) => ( {
              ...prev,
              liquidity: { ...prev.liquidity, secondCrypto: e.target.value },
            } ) )
          }
        />

        <div className="input-field">
          <label htmlFor="input-amount-2">Fee :</label>
          <input
            type="text"
            id="input-amount-2"
            placeholder="0.30% fee"
            value={ data.liquidity.secondCryptoamount }
            readOnly
          />
        </div>


        <div className="input-field">
          <label htmlFor="total-amount">Uni : </label>
          <input
            type="text"
            id="total-amount"
            className="input-total"
            readOnly
            value={ totalValue }
          />
        </div>

        <Button
          className="button"
          sx={ { fontSize: 18, width: 200 } }
          variant="contained"
          color="primary"
          onClick={ ()=>addLiquidity() }
        >
          Add Liquidity
        </Button>
      </Stack>
    </>
  );
};

export default Liquidity;
