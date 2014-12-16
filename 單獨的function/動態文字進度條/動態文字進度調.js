//---------
//物件animation
//建構時傳入一個代表文字動畫的陣列
//方法:
//-getAnimationText
//--參數:目前值,最大值
//--返回:"目前值/最大值"百分比所代表的動畫文字
//---------
function animation(anT){
		var animationArray = anT;
		
		this.getAnimationText = function (currectValue,maxValue){			
			currectIndex = Math.floor((currectValue*(animationArray.length-1)/maxValue)>animationArray.length?animationArray.length-1:(currectValue*(animationArray.length-1)/maxValue));
			//return currectIndex + '/'+ animationArray.length;
			return  animationArray[currectIndex];
		}
	}

//範例:
function p(v){
	function animation(anT){
		var animationArray = anT;
		
		this.getAnimationText = function (currectValue,maxValue){			
			currectIndex = Math.floor((currectValue*(animationArray.length-1)/maxValue)>animationArray.length?animationArray.length-1:(currectValue*(animationArray.length-1)/maxValue));
			//return currectIndex + '/'+ animationArray.length;
			return  animationArray[currectIndex];
		}
	}
	//可自定義文字動畫陣列
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
	//最大值
	var maxTime = 200;
	var animationTextObj = new animation(animationText);
	return animationTextObj.getAnimationText(v,maxTime);
}