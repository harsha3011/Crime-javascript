const readline = require('readline');
const fs = require('fs');
var index=2016-2001+1;
var flag=true;
var ardata=[];
var c_over=[];
var c_under=[];
var c_arrest=[];
var c_noarrest=[];
var thft=[];
var aslt=[];
var re1= new RegExp (/ASSAULT/);
/*for (var i = 0; i<=index; i++) {
	c_under[i]=0;
	c_over[i]=0;
	c_arrest[i]=0;
	c_noarrest[i]=0;
	}*/
c_over.length=index;
c_over.fill(0);
c_under.length=index;
c_under.fill(0);
c_arrest.length=index;
c_arrest.fill(0);
c_noarrest.length=index;
c_noarrest.fill(0);
const rl = readline.createInterface({
	input: fs.createReadStream('csvFile/Crimes.csv')
	});
var body =new Object();
thft.length=index;
aslt.length=index;
var one,two,three,four,five;
rl.on('line', (line) => {
	ardata=line.trim().split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
	if (flag){
		flag=false;
		one=ardata.indexOf('ID');
		two=ardata.indexOf('Primary Type');
		three=ardata.indexOf('Description');
		four=ardata.indexOf('Arrest');
		five=ardata.indexOf('Year');
	}
	else{
			//First Condition
			if(ardata[two]=='THEFT'){
				if (ardata[three]=="$500 AND UNDER") {
				    c_under[(parseInt(ardata[five])-2001)]=c_under[(parseInt(ardata[five])-2001)]+1;
					thft[(parseInt(ardata[five])-2001)]={"year":parseInt(ardata[five]),"under":c_under[(parseInt(ardata[five])-2001)],"over":c_over[(parseInt(ardata[five])-2001)]};
				}
	  			else if (ardata[three]=="OVER $500") {
	    			c_over[(parseInt(ardata[five])-2001)]=c_over[(parseInt(ardata[five])-2001)]+1;
	    		    thft[(parseInt(ardata[five])-2001)]={"year":parseInt(ardata[five]),"under":c_under[(parseInt(ardata[five])-2001)],"over":c_over[(parseInt(ardata[five])-2001)]};
	    		}
			}
			else if (re1.test(ardata[two])) {
   				if (ardata[four]=='true') {
				    c_arrest[(parseInt(ardata[five])-2001)]=c_arrest[(parseInt(ardata[five])-2001)]+1;
					aslt[(parseInt(ardata[five])-2001)]={"year":parseInt(ardata[five]),"Arrest":c_arrest[(parseInt(ardata[five])-2001)],"Noarrest":c_noarrest[(parseInt(ardata[five])-2001)]};
				}
	  			else if (ardata[four]=='false') {
	    			 c_noarrest[(parseInt(ardata[five])-2001)]=c_noarrest[(parseInt(ardata[five])-2001)]+1;
					aslt[(parseInt(ardata[five])-2001)]={"year":parseInt(ardata[five]),"Arrest":c_arrest[(parseInt(ardata[five])-2001)],"Noarrest":c_noarrest[(parseInt(ardata[five])-2001)]};	
    			}
			} 
		}
	});
	rl.on('close',function(){
		/*for (var i = 2016; i >= 2001; i--) 
 		{
   			if(thft[i-2001]==null)
			{
			thft[i-2001]={"year":i,"over":0,"under":0};	
			}
			if(aslt[i-2001]==null)
			{
			aslt[i-2001]={"year":i,"Arrest":0,"Noarrest":0};	
			}
		}*/
		fs.writeFile("assault.JSON",JSON.stringify(aslt),function(err) {
    if(err){
      throw err;
    }
  });
		fs.writeFile("theft.JSON",JSON.stringify(thft),function(err) {
    if(err){
      throw err;
    }
  });
});