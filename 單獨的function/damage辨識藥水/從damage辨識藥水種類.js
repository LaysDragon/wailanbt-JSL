﻿//----------------------
//物件potionArray
//儲存所有藥水資料
//----------------------
	var potionArray=new function (){
		//藥水的名稱
		this.potionName=['','回覆','迅捷','抗火','劇毒','治療','夜視','清澈(不可能出現)','虛弱','力量','緩速','跳耀','傷害','水下呼吸','隱身','稀薄(不可能出現)'];
		this.potionNarmalExtName=['水瓶','基礎 ','混濁的','(延長版)平凡的','平凡的','<錯誤>'];
		//藥水文字的顏色預設空字串
		this.potionColor=['\u00A79','\u00A7d\u00A7l','\u00A73\u00A7l','\u00A76\u00A7l','\u00A72\u00A7l','\u00A7d\u00A7l','\u00A79\u00A7l','','\u00A7c\u00A7l','\u00A75\u00A7l','\u00A7c\u00A7l','\u00A7a\u00A7l','\u00A74\u00A7l','\u00A79\u00A7l','\u00A73\u00A7l',''];
		//藥水的種類，0為預設或是時效性藥水，1為時效性藥水(無藥水等級)
		this.potionAttribute=[0,0,0,1,0,0,1,0,1,0,1,0,0,1,1,0];
		//藥效的時長，若為藥效性藥水(立即治療)則值為0，單位為秒
		this.potionEffectTime=[0,45,180,180,45,0,180,0,90,180,90,180,0,180,180,0];
		//藥水種類名稱
		this.potionType=['藥水','飛濺藥水'];
		//藥水等級名稱還有延長版名稱
		this.potionAttributeName = ['I','II','(延長版)'];
	}
	
	//-----------
	//物件:potionHelper
	//建構時傳入一個代表藥水資料的物件
	//方法:
	//-getEffectID
	//--參數:藥水damage值
	//--返回:效果id值
	//-getEffectName
	//--參數:藥水damage值
	//--返回:效果名稱
	//-isExtendPotion
	//--參數:藥水damage值
	//--返回:是否為延長版藥水,是的話為1，反之則0
	//-getEffectTime
	//--參數:藥水damage值
	//--返回:效果時長，若為即刻生效效果則為0
	//-getPotionLevel
	//--參數:藥水damage值
	//--返回:藥水等級,0為1級,1為2級,若為時效性藥水則為0
	//-getType
	//--參數:藥水damage值
	//--返回:藥水種類，一般藥水為0，噴濺藥水為1
	//-getColor
	//--參數:藥水damage值
	//--返回:藥水文字色碼
	//-getPotionName
	//--參數:藥水damage值
	//--返回:藥水完整名稱,含色碼
	//-----------
	function potionHelper( potionArray ){
		var potionData=potionArray;
		//取得藥水效果的id值
		this.getEffectID=function(value){
			return value&15;
		}
		//得取得藥水的效果名稱
		this.getEffectName = function (value){
			return potionData.potionName[this.getEffectID(value)];
		}
		//是否為延長版藥水是的話為1，反之則0
		this.isExtendPotion = function (value) {
			return (value&64)==64?1:0;
		}
		//取得效果時長，若為即刻生效藥水則為0
		this.getEffectTime = function (value){
			return potionData.potionEffectTime[this.getEffectID(value)];
		}
		//取得藥水等級,若為時效性藥水則為0(0為1級，1為2級
		this.getPotionLevel = function (value){
			return ((value&32)==32?1:0)&(~(potionData.potionAttribute[this.getEffectID(value)]));
		}
		//取得藥水種類，一般藥水為0，噴濺藥水為1
		this.getType = function (value){
			return (value&16384)==16384?1:0;
		}
		//取得藥水文字色碼,回傳字串
		this.getColor = function (value){
			return potionData.potionColor[this.getEffectID(value)];
		}
		//取得藥水正確的名稱
		this.getPotionName = function (value){
			var typeName = potionData.potionType[this.getType(value)];
			var effectName = this.getEffectName(value);
			var color = this.getColor(value);
			if(this.getEffectID(value)==0){
				switch(value&8304){
					case 0:
						return color + potionData.potionNarmalExtName[0];
						break;
					case 16:
						return color + potionData.potionNarmalExtName[1]+typeName;
						break;
					case 32:
						return color + potionData.potionNarmalExtName[2]+typeName;
						break;
					case 64:
						return color + potionData.potionNarmalExtName[3]+typeName;
						break;
					case 8192:
						return color + potionData.potionNarmalExtName[4]+typeName;
						break;
					default :
						return color + potionData.potionNarmalExtName[5]+typeName;
						
				}
			}else{
				if(this.getEffectTime(value)!=0){
					var effectTime = this.getEffectTime(value)*(this.isExtendPotion(value)?8:3)/3;
					var effectTime = effectTime*(this.getType(value)?3:4)/4;
					var effectTime = effectTime*(this.getPotionLevel(value)?1:2)/2;
					var effectTimeString =  '('+Math.floor(effectTime/60) + ':' + (effectTime%60>9?'':'0')+Math.floor(effectTime%60)+')';
				}else{
					var effectTimeString=''
				}
				
				var effectLevel = this.getPotionLevel(value);
				return color+(this.isExtendPotion(value)?potionData.potionAttributeName[2]:'')+effectName+potionData.potionAttributeName[effectLevel]+typeName+effectTimeString;
			}
		}
	}

//範例:
function p(v){
	//儲存所有藥水的資料
	var potionArray=new function (){
		//藥水的名稱
		this.potionName=['','回覆','迅捷','抗火','劇毒','治療','夜視','清澈(不可能出現)','虛弱','力量','緩速','跳耀','傷害','水下呼吸','隱身','稀薄(不可能出現)'];
		this.potionNarmalExtName=['水瓶','基礎 ','混濁的','(延長版)平凡的','平凡的','<錯誤>'];
		//藥水文字的顏色預設空字串
		this.potionColor=['\u00A79','\u00A7d\u00A7l','\u00A73\u00A7l','\u00A76\u00A7l','\u00A72\u00A7l','\u00A7d\u00A7l','\u00A79\u00A7l','','\u00A7c\u00A7l','\u00A75\u00A7l','\u00A7c\u00A7l','\u00A7a\u00A7l','\u00A74\u00A7l','\u00A79\u00A7l','\u00A73\u00A7l',''];
		//藥水的種類，0為預設或是時效性藥水，1為時效性藥水(無藥水等級)
		this.potionAttribute=[0,0,0,1,0,0,1,0,1,0,1,0,0,1,1,0];
		//藥效的時長，若為藥效性藥水(立即治療)則值為0，單位為秒
		this.potionEffectTime=[0,45,180,180,45,0,180,0,90,180,90,180,0,180,180,0];
		//藥水種類名稱
		this.potionType=['藥水','飛濺藥水'];
		//藥水等級名稱還有延長版名稱
		this.potionAttributeName = ['I','II','(延長版)'];
	}
	//協助計算藥水值的物件
	function potionHelper( potionArray ){
		var potionData=potionArray;
		//取得藥水效果的id值
		this.getEffectID=function(value){
			return value&15;
		}
		//得取得藥水的效果名稱
		this.getEffectName = function (value){
			return potionData.potionName[this.getEffectID(value)];
		}
		//是否為延長版藥水是的話為1，反之則0
		this.isExtendPotion = function (value) {
			return (value&64)==64?1:0;
		}
		//取得效果時長，若為即刻生效藥水則為0
		this.getEffectTime = function (value){
			return potionData.potionEffectTime[this.getEffectID(value)];
		}
		//取得藥水等級,若為時效性藥水則為0(0為1級，1為2級
		this.getPotionLevel = function (value){
			return ((value&32)==32?1:0)&(~(potionData.potionAttribute[this.getEffectID(value)]));
		}
		//取得藥水種類，一般藥水為0，噴濺藥水為1
		this.getType = function (value){
			return (value&16384)==16384?1:0;
		}
		//取得藥水文字色碼,回傳字串
		this.getColor = function (value){
			return potionData.potionColor[this.getEffectID(value)];
		}
		//取得藥水正確的名稱
		this.getPotionName = function (value){
			var typeName = potionData.potionType[this.getType(value)];
			var effectName = this.getEffectName(value);
			var color = this.getColor(value);
			if(this.getEffectID(value)==0){
				switch(value&8304){
					case 0:
						return color + potionData.potionNarmalExtName[0];
						break;
					case 16:
						return color + potionData.potionNarmalExtName[1]+typeName;
						break;
					case 32:
						return color + potionData.potionNarmalExtName[2]+typeName;
						break;
					case 64:
						return color + potionData.potionNarmalExtName[3]+typeName;
						break;
					case 8192:
						return color + potionData.potionNarmalExtName[4]+typeName;
						break;
					default :
						return color + potionData.potionNarmalExtName[5]+typeName;
						
				}
			}else{
				if(this.getEffectTime(value)!=0){
					var effectTime = this.getEffectTime(value)*(this.isExtendPotion(value)?8:3)/3;
					var effectTime = effectTime*(this.getType(value)?3:4)/4;
					var effectTime = effectTime*(this.getPotionLevel(value)?1:2)/2;
					var effectTimeString =  '('+Math.floor(effectTime/60) + ':' + (effectTime%60>9?'':'0')+Math.floor(effectTime%60)+')';
				}else{
					var effectTimeString=''
				}
				
				var effectLevel = this.getPotionLevel(value);
				return color+(this.isExtendPotion(value)?potionData.potionAttributeName[2]:'')+effectName+potionData.potionAttributeName[effectLevel]+typeName+effectTimeString;
			}
		}
	}
	
	var ph = new potionHelper(potionArray);
	return ph.getPotionName(v);
}