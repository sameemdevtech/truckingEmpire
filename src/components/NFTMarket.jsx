import React, { useState } from "react";
import { Stack, Typography, Button, Select, Input } from "@mui/material";
import SelectItem from "./SelectItem";

const NFTMarket = () =>
{
  const [ data, setData ] = useState( {
    nft: {
      selectNft: "nft1",
      balance: "", 
      price: "", 
    },
  } );

  const [ currentForm, setCurrentForm ] = useState( null );

  const buyNFT = () =>
  {
  };

  const sellNFT = () =>
  {
  };

  const tradeNFT = () =>
  {
  };

  const handleButtonClick = ( form ) =>
  {
    setCurrentForm( ( prevForm ) => ( prevForm === form ? null : form ) );
  };

  return (
    <Stack
      gap={ 2 }
      mt={ 2 }
      sx={ {
        background: "#fff",
        py: 4,
        px: 2,
        borderRadius: 2,
      } }
    >
      <Typography variant="h3" color="secondary">
        NFT Market
      </Typography>
      <Button
        sx={ { fontSize: 18, width: 150 } }
        variant={ currentForm === "buy" ? "contained" : "outlined" }
        onClick={ () => handleButtonClick( "buy" ) }
      >
        Buy NFT
      </Button>
      <Button
        sx={ { fontSize: 18, width: 150 } }
        variant={ currentForm === "sell" ? "contained" : "outlined" }
        onClick={ () => handleButtonClick( "sell" ) }
      >
        Sell NFT
      </Button>
      <Button
        sx={ { fontSize: 18, width: 150 } }
        variant={ currentForm === "trade" ? "contained" : "outlined" }
        onClick={ () => handleButtonClick( "trade" ) }
      >
        Trade NFT
      </Button>

      { currentForm === "buy" && (
        <>
          <Typography variant="h3" color="secondary">
            NFT Buy
          </Typography>
          <SelectItem
            value={ data.nft.selectNft }
            label={ "Select NFT" }
            menus={ [
              [ "nft1", "NFT 1" ],
              [ "nft2", "NFT 2" ],
              [ "nft3", "NFT 3" ],
            ] }
            handleChange={ ( e ) =>
              setData( ( prevData ) => ( {
                ...prevData,
                nft: { ...prevData.nft, selectNft: e.target.value },
              } ) )
            }
          />

          <div className="input-field">
            <label htmlFor={ `nft-balance-${ currentForm || "default" }` }>
              Balance:
            </label>
            <Input
              type="text"
              id={ `nft-balance-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.balance }
            />
          </div>

          <div className="input-field">
            <label htmlFor={ `nft-price-${ currentForm || "default" }` }>
              Price:
            </label>
            <Input
              type="text"
              id={ `nft-price-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.price }
            />
          </div>
        </>
      ) }

      { currentForm === "sell" && (
        <>
          <Typography variant="h3" color="secondary">
            NFT Sell
          </Typography>
          <SelectItem
            value={ data.nft.selectNft }
            label={ "Select NFT" }
            menus={ [
              [ "nft1", "NFT 1" ],
              [ "nft2", "NFT 2" ],
              [ "nft3", "NFT 3" ],
            ] }
            handleChange={ ( e ) =>
              setData( ( prevData ) => ( {
                ...prevData,
                nft: { ...prevData.nft, selectNft: e.target.value },
              } ) )
            }
          />

          <div className="input-field">
            <label htmlFor={ `nft-balance-${ currentForm || "default" }` }>
              Balance:
            </label>
            <Input
              type="text"
              id={ `nft-balance-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.balance }
            />
          </div>

          <div className="input-field">
            <label htmlFor={ `nft-price-${ currentForm || "default" }` }>
              Price:
            </label>
            <Input
              type="text"
              id={ `nft-price-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.price }
            />
          </div>
        </>
      ) }

      { currentForm === "trade" && (
        <>
          <Typography variant="h3" color="secondary">
            NFT Trade
          </Typography>
          <SelectItem
            value={ data.nft.selectNft }
            label={ "Select NFT" }
            menus={ [
              [ "nft1", "NFT 1" ],
              [ "nft2", "NFT 2" ],
              [ "nft3", "NFT 3" ],
            ] }
            handleChange={ ( e ) =>
              setData( ( prevData ) => ( {
                ...prevData,
                nft: { ...prevData.nft, selectNft: e.target.value },
              } ) )
            }
          />

          <div className="input-field">
            <label htmlFor={ `nft-balance-${ currentForm || "default" }` }>
              Balance:
            </label>
            <Input
              type="text"
              id={ `nft-balance-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.balance }
            />
          </div>

          <div className="input-field">
            <label htmlFor={ `nft-price-${ currentForm || "default" }` }>
              Price:
            </label>
            <Input
              type="text"
              id={ `nft-price-${ currentForm || "default" }` }
              readOnly
              value={ data.nft.price }
            />
          </div>
        </>
      ) }


      { currentForm === "buy" && (
        <Button className="button" onClick={ buyNFT }
          color="primary"
          variant="contained"
          sx={ { fontSize: 18, width: 150, alignSelf: 'center' } }>
          Buy NFT
        </Button>
      ) }

      { currentForm === "sell" && (
        <Button className="button" onClick={ sellNFT }
          color="primary"
          variant="contained"
          sx={ { fontSize: 18, width: 150, alignSelf: 'center' } }>
          Sell NFT
        </Button>
      ) }

      { currentForm === "trade" && (
        <Button className="button" onClick={ tradeNFT }
          color="primary"
          variant="contained"
          sx={ { fontSize: 18, width: 150, alignSelf: ' center' } }>
          Trade NFT
        </Button>
      ) }
    </Stack>
  );
};

export default NFTMarket;
