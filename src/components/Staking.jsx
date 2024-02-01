import React, { useEffect, useState, useRef } from "react";
import { Stack, Typography, Button } from "@mui/material";
import SelectItem from "./SelectItem";
import { ethers, Contract } from "ethers";
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";

const Staking = ( { activeButton } ) =>
{
  const [ network, setNetwork ] = useState( "Unsupported Network 'Use Sepolia Network'" );
  const approvedTokenRef = useRef();

  const [ data, setData ] = useState( {
    inputCurrency: "",
    inputAmount: "",
    outputCurrency: "",
    totalAmount: "",
    staking: {
      token: "SemiFuel",
      stakeDuration: "",
      stakeAmount: "",
    },
  } );
  const [ signer, setSigner ] = useState( null );
  const [ provider, setProvider ] = useState( null );
  const [ stakingContract, setStakingContract ] = useState( null );
  const [ stakeTokenContract, setStakeTokenContract ] = useState( null );
  const [ chainId, setChainId ] = useState( null );
  const [ selectedAccount, setSelectedAccount ] = useState( null );
  const [ stakedAmount, setStakedAmount ] = useState( "" );
  const [ rewardRate, setRewardRate ] = useState( "" );
  const [ rewardVal, setRewardVal ] = useState( "" );
  const stakeAmountRef = useRef();
  const withdrawStakeAmountRef = useRef();
  const approveToken = async ( e ) =>
  {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    // console.log(amount)
    if ( isNaN( amount ) || amount <= 0 )
    {
      console.error( "Please enter a valid positive number" );
      return;
    }
    const amountToSend = ethers.utils.parseUnits( amount, 18 );
    // console.log( "amountTosend: ", ethers.utils.formatUnits( amountToSend.toString(), 18 ) );
    try
    {
      // console.log( "stakeTokenContract", stakeTokenContract );
      // console.log( "stakeContract.target", selectedAccount );
      const transaction = await stakeTokenContract.approve( selectedAccount, amountToSend );
      // console.log("transaction",transaction)
      // await toast.promise( transaction.wait(),
      //   {
      //     loading: "Transaction is pending...",
      //     success: 'Transaction successful 👌',
      //     error: 'Transaction failed 🤯'
      //   } );
      if ( transaction )
      {
        alert( "success" );
      }
      approvedTokenRef.current.value = "";
      // const receipt = await transaction.wait();
      // if (receipt.status === 1) {
      //     toast.success("Transaction is successful")
      //     approvedTokenRef.current.value = "";
      //   } else {
      //       toast.error("Transaction failed. Please try again.")
      //   }
    } catch ( error )
    {
      // toast.error( "Token Approval Failed" );
      console.error( error.message );
    }
  };
  const stakeToken = async ( e ) =>
  {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    // console.log( amount );
    if ( isNaN( amount ) || amount <= 0 )
    {
      toast.error( "Please enter a valid positive number." );
      return;
    }
    const amountToStake = ethers.utils.parseUnits( amount, 18 );
    try
    {
      // console.log( "staking ", stakingContract );
      const transaction = await stakingContract.stake( amountToStake );
      // await toast.promise( transaction.wait(),
      //   {
      //     loading: "Transaction is pending...",
      //     success: 'Transaction successful 👌',
      //     error: 'Transaction failed 🤯'
      //   } );
      if ( transaction )
      {
        alert( "success" );
      }
      stakeAmountRef.current.value = "";
      // setIsReload(!isReload);
      // if (receipt.status === 1) {
      //     setIsReload(!isReload);
      //     stakeAmountRef.current.value = "";
      //   } else {
      //       toast.error("Transaction failed. Please try again.")
      //   }
    } catch ( error )
    {
      toast.error( "Staking Failed" );
      console.error( error.message );
    }
  };


  const withdrawStakeToken = async ( e ) =>
  {
    e.preventDefault();
    const amount = withdrawStakeAmountRef.current.value.trim();
    // console.log( amount );
    if ( isNaN( amount ) || amount <= 0 )
    {
      console.error( "Please enter a valid positive number" );
      return;
    }
    const amountToWithdraw = ethers.utils.parseUnits( amount, 18 );
    // console.log( amountToWithdraw );
    try
    {
      const transaction = await stakingContract.withdrawStakedTokens( amountToWithdraw );
      // await toast.promise( transaction.wait(),
      //   {
      //     loading: "Transaction is pending...",
      //     success: 'Transaction successful 👌',
      //     error: 'Transaction failed 🤯'
      //   } );
      if ( transaction )
      {
        alert( "success" );
      }
      withdrawStakeAmountRef.current.value = "";
      setIsReload( !isReload );
      // const receipt = await transaction.wait();
      // if (receipt.status === 1) {
      //     setIsReload(!isReload);
      //     withdrawStakeAmountRef.current.value = "";
      //   } else {
      //       toast.error("Transaction failed. Please try again.")
      //   }
    } catch ( error )
    {
      toast.error( "Staking Failed" );
      console.error( error.message );
    }
  };
  const claimReward = async () =>
  {
    try
    {
      const transaction = await stakingContract.getReward();
      // await toast.promise( transaction.wait(),
      //   {
      //     loading: "Transaction is pending...",
      //     success: 'Transaction successful 👌',
      //     error: 'Transaction failed 🤯'
      //   } );
      if ( transaction )
      {
        alert( "success" );
      }
      // if(receipt.status === 1){
      //     setTransactionStatus("Transaction Is Successful")
      //     setTimeout(()=>{
      //       setTransactionStatus("")
      //     },5000) 
      //   } else{
      //     setTransactionStatus("Transaction failed. Please try again.");
      //   }
    } catch ( error )
    {
      console.error( "Claim Reward Failed", error.message );
    }
  };
  useEffect( () =>
  {
    const fetchStakedBalance = async () =>
    {
      try
      {
        const amountStakedWei = await stakingContract.stakedBalance( selectedAccount );
        const amountStakedEth = ethers.utils.formatUnits( amountStakedWei.toString(), 18 );
        // console.log( "Amounts: ", amountStakedEth );
        setStakedAmount( amountStakedEth );
      } catch ( error )
      {

        console.error( error.message );
      }
    };
    stakingContract && fetchStakedBalance();
    const fetchRewardRate = async () =>
    {
      try
      {
        const rewardRateWei = await stakingContract.REWARD_RATE();
        const rewardRateEth = ethers.utils.formatUnits( rewardRateWei.toString(), 18 );
        setRewardRate( rewardRateEth );
      } catch ( error )
      {
        toast.error( "Error fetching reward rate" );
        console.error( error.message );
      }
    };
    stakingContract && fetchRewardRate();
    const fetchStakeRewardInfo = async () =>
    {
      try
      {
        //fetching earned amount of a user
        const rewardValueWei = await stakingContract.earned( selectedAccount );
        const rewardValueEth = ethers.utils.formatUnits( rewardValueWei.toString(), 18 );
        const roundedReward = parseFloat( rewardValueEth ).toFixed( 2 );
        setRewardVal( roundedReward );
      } catch ( error )
      {
        toast.error( "Error fetching the reward:" );
        console.error( error.message );
      }
    };
    const interval = setInterval( () =>
    {
      stakingContract && fetchStakeRewardInfo();
    }, 20000 );
    return () => clearInterval( interval );
  }, [ stakingContract, selectedAccount ] );
  useEffect( () =>
  {


    if ( activeButton === "staking" )
    {
      const onLoad = async () =>
      {
        try
        {

          if ( window.ethereum === null )
          {
            throw new Error( "Metamsk is not installed" );
          }
          const accounts = await window.ethereum.request( {
            method: 'eth_requestAccounts'
          } );

          let chainIdHex = await window.ethereum.request( {
            method: 'eth_chainId'
          } );
          let chainId = parseInt( chainIdHex, 16 );
          setChainId( chainId );
          let selectedAccount = accounts[ 0 ];
          if ( !selectedAccount )
          {
            throw new Error( "No ethereum accounts available" );
          }
          setSelectedAccount( selectedAccount );
          let provider = await new ethers.providers.Web3Provider( window.ethereum );
          // console.log
          let signer = await provider.getSigner();
          // console.log("signer  :",signer._address)
          setSigner( signer );
          const stakingContractAddress = import.meta.env.VITE_REACT_STAKING_CONTRACT_ADDRESS;
          const stakeTokenContractAddress = import.meta.env.VITE_REACT_STAKE_TOKEN_CONTRACT_ADDRESS;

          let stakingContract = new Contract( stakingContractAddress, stakingAbi, signer );
          let stakeTokenContract = new Contract( stakeTokenContractAddress, stakeTokenAbi, signer );
          setStakingContract( stakingContract ); 
          setStakeTokenContract( stakeTokenContract );
          // console.log( "Provider COntract", provider, selectedAccount, stakeTokenContract, stakingContract, "\nChaiId", chainId );
          if ( chainId === 11155111 )
          {
            setNetwork( "Sepolia Network" );
          }
        } catch ( error )
        {
          console.error( error );
          throw error;
        }
      };
      onLoad();
    }
  }, [] );


  return (
    <>
      <Stack
        gap={ 2 }
        mt={ 2 }
        sx={ { background: "#fff", py: 4, px: 2, borderRadius: 2 } }
      >
        { network !== "Unsupported Network 'Use Sepolia Network'" ? <>
          <Typography variant="h3" color="secondary">
            Staking
          </Typography>
          <Typography variant="h4" color="primary">
            { network }
          </Typography>

          <Typography variant="h6" color="secondary">
            Stake Amount: { stakedAmount }
          </Typography>
          <Typography variant="h6" color="secondary">
            Reward Rate: { rewardRate } token per second
          </Typography>
          <Typography variant="h6" color="secondary">
            Earned Reward: { rewardVal }
          </Typography>
          <div >
            <form onSubmit={ approveToken } className="token-amount-form">
              <label className="token-input-label">Token Approval:</label>
              <input type="text" ref={ approvedTokenRef } />
              <Button className="button" sx={ { fontSize: 8, width: 90, padding: 0.2, marginLeft: 1, color: "white" } }
                variant="contained"
                color="primary" onClick={ () => approveToken() } type="submit" >Token Approval</Button>
            </form>
          </div>
          <SelectItem
            value={ data.staking.token }
            label={ "Select Token" }
            menus={ [
              [ "Sepolia", "Stake Token" ],

            ] }
            handleChange={ ( e ) =>
              setData( ( prev ) => ( {
                ...prev,
                staking: { ...prev.staking, token: e.target.value },
              } ) )
            }
          />
          <form style={ { display: 'flex', alignItems: 'center', } } onSubmit={ stakeToken } className="stake-amount-form">
            <label className="stake-input-label">Enter Staked Amount:</label>
            <input type="text" ref={ stakeAmountRef } />
            <Button
              className="button"
              type="submit" label="Stake Token"
              sx={ { fontSize: 8, width: 90, padding: 0.2, marginLeft: 1, color: "white", alignSelf: 'flex-end' } }
              variant="contained"
              color="primary"
              onClick={ stakeToken }
            >
              Stake
            </Button>
          </form>

          <form className="withdraw-form" onSubmit={ withdrawStakeToken }>
            <label>Withdraw Token:</label>
            <input type="text" ref={ withdrawStakeAmountRef } />
            <Button className="button" sx={ { fontSize: 8, width: 90, padding: 0.2, marginLeft: 1, color: "white" } }
              variant="contained"
              color="primary" onClick={ withdrawStakeToken } type="submit" >Amount To WithDraw</Button>
          </form>
          <div style={ { display: 'flex', flex: 1, justifyContent: 'flex-end' } }>
            <Button type="button" label="Claim Reward" onClick={ claimReward } sx={ { fontSize: 10, width: 90, padding: 1, marginLeft: 1, color: "white", alignSelf: 'flex-end' } } variant="contained"
              color="primary"  >Claim Reward</Button>
          </div>
          <div id="thank-you-message" style={ { display: 'none', color: 'white', marginTop: '10px', textAlign: 'right' } }>
            Thank you for staking!
          </div></> : <div>
          <Typography variant="h4" color="primary">
            { network }
          </Typography>
        </div> }

      </Stack>
    </>
  );
};

export default Staking;