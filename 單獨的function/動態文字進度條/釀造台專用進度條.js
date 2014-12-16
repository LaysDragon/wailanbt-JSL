//--------
//參數:NBT BrewTime
//返回:釀造台進度條
//--------
function p(v){
	function animation(anT){
		var animationArray = anT;
		
		this.getAnimationText = function (currectValue,maxValue){			
			currectIndex = Math.floor((currectValue*(animationArray.length-1)/maxValue)>animationArray.length?animationArray.length-1:(currectValue*(animationArray.length-1)/maxValue));
			//return currectIndex + '/'+ animationArray.length;
			return  animationArray[currectIndex];
		}
	}
	var animationText = [	
	'□□□□□□□□□□□□',
	'■□□□□□□□□□□□',
	'■■□□□□□□□□□□',
	'■■■□□□□□□□□□',
	'■■■■□□□□□□□□',
	'■■■■■■□□□□□□',
	'■■■■■■■□□□□□',
	'■■■■■■■■□□□□',
	'■■■■■■■■■□□□',
	'■■■■■■■■■■□□',
	'■■■■■■■■■■■□',
	'■■■■■■■■■■■■',
		];
	//建立全域變數CauldronTimeResetDelay來決定是否要重設進度調顯示以及重設延遲
	if(typeof(CauldronTimeResetDelay)== 'undefined') CauldronTimeResetDelay =10 ;
	var maxTime =400;
	var animationTextObj = new animation(animationText);
	var temp = CauldronTimeResetDelay;	
	if((CauldronTimeResetDelay ==20) &&(v != 0))CauldronTimeResetDelay =0;
	if((CauldronTimeResetDelay ==20) && (v == 0)) v = maxTime;
	if(v == 0) CauldronTimeResetDelay++;
	return '\u00A7f'+animationTextObj.getAnimationText(maxTime-v,maxTime)+'('+Math.floor(v/20)+' s)' ;
}