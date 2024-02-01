import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { colorTokens, theme } from "../../theme";
import { useEffect, useState } from "react";
import Swap from "../../components/Swap";
import Liquidity from "../../components/Liquidity";
import Staking from "../../components/Staking";
import NFTMarket from "../../components/NFTMarket";
import '../../index.css';
import twitterLogo from '../../assets/icons8-twitter.svg';
import instaLogo from '../../assets/icons8-instagram.svg';
import { useWeb3Modal } from '@web3modal/wagmi1/vue';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi1/vue';
import { mainnet, arbitrum } from 'viem/chains';
import { getAccount } from '@wagmi/core';
import { ethers } from "ethers";
import logo from "../../assets/trucking-empire-logo.png"

const projectId = import.meta.env.VITE_REACT_PROJECTID;
// console.log("project_id", projectId );
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'http://web3modal.com',
  icons: [ 'http://avatars.githubusercontent.com/u/37784886' ] 
};

const chains = [ mainnet, arbitrum ];
const wagmiConfig = defaultWagmiConfig( { chains, projectId, metadata } );
createWeb3Modal( { wagmiConfig, projectId, chains } );

const colors = colorTokens();
const Home = () =>
{
  const [ provider, setProvider ] = useState( undefined );
  const { open, close } = useWeb3Modal();
  const [ activeButton, setActiveButton ] = useState( null );
  const [ userAccount, setAccount ] = useState( null );

  const [ wethAmount, setWethAmount ] = useState( undefined );
  const [ uniAmount, setUniAmount ] = useState( undefined );
  
  const connect = async () =>
  {
    open();
  };
  useEffect( () =>
  {


    const onLoad = async () =>
    {
      const provider = await new ethers.providers.Web3Provider( window.ethereum );
      setProvider( provider );
      provider.send( "eth_requestAccounts", [] );
      const signer = provider.getSigner();
      // console.log("myAccount", signer)
    };
    onLoad();

   

    const account = getAccount();
    // console.log( "\nAccount: " + account.address + "\n" );
    account !== undefined ? setAccount( account ) : setAccount( null );
    


  }, [ activeButton ] );
  return (
    <Stack py={ { xs: 3, sm: 5 } } px={ { xs: 3, sm: 10 } }>
      <Button
        sx={ { fontSize: 16, fontWeight: "bold" } }
        variant="contained"
        color="primary"
        onClick={ () =>
        {
          connect();
        } }
      >
        Connect Wallet
      </Button>
      { userAccount !== null ?
        <Typography
          variant="h1"
          className="wp-block-heading has-text-align-center custom-animation" // Add your custom class
          sx={ { marginTop: '20px', fontSize: { xs: 10, sm: 20 }, fontWeight: "bold" } }
          color="#fff"
          textAlign={ "center" }
        >
          { userAccount.address }
        </Typography> :
        <div style={ { display: 'none' } }></div>
      }
      <Grid mt={ 5 } container justifyContent="center" alignItems="center">
        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <img
            className="zoom-in-out"
            style={ { width: "100%" } }
            src={logo}
            alt="Logo"
          />
        </Grid>
      </Grid>

      <Typography
        variant="h1"
        className="wp-block-heading has-text-align-center custom-animation" // Add your custom class
        sx={ { fontSize: { xs: 30, sm: 50 }, fontWeight: "bold" } }
        color="#fff"
        textAlign={ "center" }
      >
        Trucking Empire Dex
      </Typography>

      <Stack mt={ 12 } justifyContent="center" alignItems="center">
        <Link
          className="animated-text"
          fontSize={ 20 }
          color={ "secondary" }
          href="mailto:support@truckingempire.io"
        >
          support@truckingempire.io
        </Link>
      </Stack>

      <Stack
        sx={ {
          border: `5px solid ${ colors.yellow[ 500 ] }`,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        } }
        mt={ 3 }
      >
        <Stack
          flexDirection={ "row" }
          alignItems={ "center" }
          justifyContent={ { xs: "center", sm: "flex-start" } }
          flexWrap={ "wrap" }
          gap={ 2 }
        >
          <Button
            variant="outlined"
            sx={ {
              color: colors.yellow[ 500 ],
              fontSize: 20,
              borderColor: colors.yellow[ 500 ],
              "&:hover": {
                backgroundColor: colors.yellow[ 500 ],
                color: theme.palette.getContrastText( colors.yellow[ 500 ] ),
              },
              width: 140,
            } }
            onClick={ () => setActiveButton( "swap" ) }
          >
            Swap
          </Button>

          <Button
            variant="outlined"
            sx={ {
              color: colors.yellow[ 500 ],
              fontSize: 20,
              borderColor: colors.yellow[ 500 ],
              "&:hover": {
                backgroundColor: colors.yellow[ 500 ],
                color: theme.palette.getContrastText( colors.yellow[ 500 ] ),
              },
              width: 140,
            } }
            onClick={ () => setActiveButton( "liquidity" ) }
          >
            Liquidity
          </Button>

          <Button
            variant="outlined"
            sx={ {
              color: colors.yellow[ 500 ],
              fontSize: 20,
              borderColor: colors.yellow[ 500 ],
              "&:hover": {
                backgroundColor: colors.yellow[ 500 ],
                color: theme.palette.getContrastText( colors.yellow[ 500 ] ),
              },
              width: 140,
            } }
            onClick={ () => setActiveButton( "staking" ) }
          >
            Staking
          </Button>

          <Button
            variant="outlined"
            sx={ {
              color: colors.yellow[ 500 ],
              fontSize: 20,
              borderColor: colors.yellow[ 500 ],
              "&:hover": {
                backgroundColor: colors.yellow[ 500 ],
                color: theme.palette.getContrastText( colors.yellow[ 500 ] ),
              },
              width: 140,
            } }
            onClick={ () => setActiveButton( "nftMarket" ) }
          >
            NFT Market
          </Button>
        </Stack>

        { activeButton === "swap" && <Swap user={ userAccount.address } balance={ wethAmount } unibal={ uniAmount }  activeButton={ activeButton }/> }

        { activeButton === "liquidity" && <Liquidity user={ userAccount } /> }

        { activeButton === "staking" && <Staking user={ userAccount } activeButton={ activeButton } /> }

        { activeButton === "nftMarket" && <NFTMarket user={ userAccount } /> }
      </Stack>
      <Stack py={ { xs: 3, sm: 15 } } px={ { xs: 3, sm: 10 } }>
        <Stack sx={ {
          gap: '20px',
          flexDirection: 'row',
          justifyContent: 'center'
        } }
        >
          <Link
            color={ "secondary" }
            href="https://twitter.com/Trucking_Empire"
          >
            <img className="link" src={ twitterLogo } alt="" />
          </Link>
          <Link
            color={ "secondary" }
            href="https://www.instagram.com/truckingempire.io/"
          >
            <img className="link" src={ instaLogo } alt="" />
          </Link>
        </Stack>
        <Typography
          variant="h1"
          sx={ { fontSize: { xs: 15, sm: 20 }, fontWeight: "thin" } }
          color="#ff6900"
          textAlign={ "center" }
        >
          Copyright Semi Token Corporation 2023
        </Typography>
      </Stack>

    </Stack>
  );
};

export default Home;