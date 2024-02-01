import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import ERC20ABI from './abi.json';
const V3_SWAP_Router_ADRRESS = import.meta.env.VITE_REACT_V3_SWAP_ROUTER_ADDRESS;
const testnet_url = import.meta.env.VITE_REACT_TESTNET_URL;
const chainId =Number( import.meta.env.VITE_REACT_CHAIN_ID);
const Web3Provider = new ethers.providers.JsonRpcProvider( testnet_url );
const router = new AlphaRouter( { chainId: chainId, provider: Web3Provider } );
const name0 = 'Wrapped Ether';
const symbol0 = 'WETH';
const decimal0 = 18;
const address0 = import.meta.env.VITE_REACT_ADDRESS0;

const name1 = 'Uniswap Token';
const symbol1 = 'UNI';
const decimal1 = 18;
const address1 = import.meta.env.VITE_REACT_ADDRESS1;

const WETH = new Token( chainId, address0, decimal0, symbol0, name0 );
const UNI = new Token( chainId, address1, decimal1, symbol1, name1 );
// console.log( "sameem",ERC20ABI );
export const getWethContract = () => new ethers.Contract( address0, ERC20ABI, Web3Provider );

export const getUniContract = () => new ethers.Contract( address1, ERC20ABI, Web3Provider );

export const getPrice = async ( inputAmount, slippageAmount, deadline, walletAddress ) =>
{
    const percentSlippage = new Percent( slippageAmount, 100 )
    const wei = ethers.utils.parseUnits( inputAmount.toString(), decimal0 )
  const currencyAmount = CurrencyAmount.fromRawAmount( WETH, JSBI.BigInt( wei ) );
    
    
  const route = await router.route(
    currencyAmount,
    UNI,
    TradeType.EXACT_INPUT,
    {
      recipient: walletAddress,
      slippageTolerance: percentSlippage,
      deadline: deadline,
    }
  )

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_Router_ADRRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000)
  }

  const quoteAmountOut = route.quote.toFixed(6)
  const ratio = (inputAmount / quoteAmountOut).toFixed(3)

  return [
    transaction,
    quoteAmountOut,
    ratio
  ]
};
export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.utils.parseUnits('10', 18).toString()
  const contract0 = getWethContract()
  await contract0.connect(signer).approve(
    V3_SWAP_Router_ADRRESS,
    approvalAmount
  )

  signer.sendTransaction(transaction)
}