pragma solidity ^0.5.0;
contract TraderList {
    
    struct Info{
        string cmName;
        uint price;
        uint evType;
    }
    Info[] public tInfo;
    uint arrayLength;
    constructor () public {
        tInfo.push(Info("Pr1",100,0));//tInfo.push(Info(stName,prc,evtype));
        tInfo.push(Info("Gr1",90,1));
        tInfo.push(Info("Tr1",100,2));
        tInfo.push(Info("St1",100,3));
        
        arrayLength=4;
    }
    uint length=0;
    function getArrayLength(uint _evtype) public view returns (uint){
        for(uint i=0;i<arrayLength;i++)
        {
            if(tInfo[i].evType ==_evtype)
            {
                //length++;
            }
        }  
        return 0;
    }
    
    function geAPrice(uint index,uint _evtype) public view returns (string memory, uint,uint){
        for(uint i=index;i<arrayLength;i++)
        {
            if(tInfo[i].evType ==_evtype)
            {
                return (tInfo[i].cmName,tInfo[i].price,i+1);
            }
        }
    }
    function getPrice(uint _evtype) public view returns (string memory, uint)
    {
        uint min=~uint256(0);
        string memory tName;
        for(uint i=0;i<arrayLength;i++)
        {
            if(tInfo[i].evType ==_evtype)
            {
                if(min>tInfo[i].price /*&& tInfo[i].evType ==_evtype)*/)
                {
                    min=tInfo[i].price;
                    tName=tInfo[i].cmName;
                }
            }
        }
        return (tName,min);
    }
    /*function setPrice (string memory stName,uint prc,uint evtype,uint profit) public {
        prc=prc+prc*profit/100;
        tInfo.push(Info(stName,prc,evtype));
        arrayLength++;
    } */
}