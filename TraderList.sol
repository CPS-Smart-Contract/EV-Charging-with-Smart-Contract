pragma solidity ^0.4.18;

contract TraderList {
    
    struct Info{
        string cmName;
        uint price;
        uint evType;
    }
    Info[] public tInfo;
    uint arrayLength;
   function TraderList() public {
        tInfo.push(Info("Pr1",100,0));//tInfo.push(Info(stName,prc,evtype));
        tInfo.push(Info("Gr1",90,1));
        tInfo.push(Info("Tr1",100,2));
        tInfo.push(Info("St1",100,3));
        
        arrayLength=4;
    }
   uint length=0;
   function getArrayLength(uint _evtype) public constant returns (uint){
        for(uint i=0;i<arrayLength;i++)
        {
            if(tInfo[i].evType ==_evtype)
            {
               length++;
            }
        }  
        return length;
    }
    
    function geAPrice(uint index,uint _evtype) public constant returns (string, uint,uint){
        for(uint i=index;i<arrayLength;i++)
        {
            if(tInfo[i].evType ==_evtype)
            {
                return (tInfo[i].cmName,tInfo[i].price,i+1);
            }
        }
       /* if(tInfo[index].evType ==_evtype)
        {
            return (tInfo[index].cmName,tInfo[index].price);
        }
        */
    }
    function getPrice(uint _evtype) public constant returns (string, uint)
    {
        uint min=~uint256(0);
        string tName;
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
    function setPrice(string stName,uint prc,uint evtype,uint profit) public{
        prc=prc+prc*profit/100;
        tInfo.push(Info(stName,prc,evtype));
        arrayLength++;
    } 
}