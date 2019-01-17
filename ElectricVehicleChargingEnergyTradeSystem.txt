pragma solidity ^0.4.18;//Solidity versiyon 0.4.18

contract ElectricVehicleChargingEnergyTradeSystem
{
    struct ProductInfoStruct // This struct created to store all offers from owners
    {
        string ownerName;// Can be a person or a company
        uint energyPrice;
        uint ownerType;// Owner type 0-> Energy Producer, 1->Grid Operator, 2-> Energy Trader, 3-> Station
    }
    ProductInfoStruct[] public productInfoStruct;
    uint lengthOfProductInfoStruct;// To store lenght of Product Info Struct
    
    //Constructor Funtion add some default owners
    function ElectricVehicleChargingEnergyTradeSystem() public
    {
        productInfoStruct.push(ProductInfoStruct("Default Producer",100,0));
        productInfoStruct.push(ProductInfoStruct("Default Grid",90,1));
        productInfoStruct.push(ProductInfoStruct("Default Trader",100,2));
        productInfoStruct.push(ProductInfoStruct("Default Station",100,3));

        lengthOfProductInfoStruct=4;//In the struct there is 4 owner and their datas
    }
    
    // This function returns how many an owner(For Example: Energy producer) is stored in productInfoStruct
    function getAnOwnerLength(uint _ownerType) public constant returns (uint)
    {
       uint lengthOfTheOwnerType=0;
        for(uint i=0;i<lengthOfProductInfoStruct;i++)
        {
            if(productInfoStruct[i].ownerType ==_ownerType) // When find the wanted owner type increment 1
            {
               lengthOfTheOwnerType++;
            }
        }  
        return lengthOfTheOwnerType;// Return the lenght of the wanted owner type
    }
    
    /* This function desing for web services. Each web pages need to list related owners and the owners offers. 
    Each request returs one owner and its offer. 
    Related web page goint to send request according to return value of getAnOwnerLength funtion.
    This function need starting index and owner type.
    Function needs the starting index to know where it start search. 
    Returns owner name, its offer and where searching stop */
    function wantedValueofProductInfoStruct(uint startIndex,uint wantedOwnerType) public constant returns (string, uint,uint)
    {
        for(uint i=startIndex;i<lengthOfProductInfoStruct;i++)// Start the search starting index
        {
            if(productInfoStruct[i].ownerType ==wantedOwnerType)// When find wanted owner type return datas and where searc stop
            {
                return (productInfoStruct[i].ownerName,productInfoStruct[i].energyPrice,i+1);
            }
        }
    }
    
    // This function is to find best offer(minumum offer) in an owner type
    function getMinEnergyPriceAccordingToOwnerType(uint _ownerType) public constant returns (string, uint)
    {
        uint minEnergyPrice=~uint256(0);// Initialization of minumum energy price as max value of uint.
        string _ownerName;
        for(uint i=0;i<lengthOfProductInfoStruct;i++)// Browse all datas
        {
            if(productInfoStruct[i].ownerType ==_ownerType)// Is it wanted owner type.
            {
               if(minEnergyPrice>productInfoStruct[i].energyPrice)// Is it smaller than last minEnergyPrice.
                {
                    minEnergyPrice=productInfoStruct[i].energyPrice;// Then new min value is updated,
                    _ownerName=productInfoStruct[i].ownerName;// and its owner is updated
                }
            }
        }
        return (_ownerName,minEnergyPrice);
    }
    
    // This function to add new offers to productInfoStruct. 
    function addOffer(string ownerName,uint energyPrice,uint _ownerType,uint profitRate) public
    {
        energyPrice=energyPrice+energyPrice*profitRate/100;// Energy price is equal to energyPrice+energyPrice*profitRate/100 
        productInfoStruct.push(ProductInfoStruct(ownerName,energyPrice,_ownerType));
        lengthOfProductInfoStruct++;// We must increment lengthOfProductInfoStruct;
    } 
}