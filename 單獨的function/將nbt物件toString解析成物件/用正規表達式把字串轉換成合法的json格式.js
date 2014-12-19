function convertNbtSrtingToObj(v){
					try{
						
						//把所有數字後表示類型的英文字去掉
						v= v.replace(/([0-9]+)(s|b|f|L|d)(,|})/g, '$1$3');
						//把所有:之前的字串補上引號
						v= v.replace(/(,|{){1}([^{},:]+):{1}/g, '$1\"$2\":');
						//針對bytes[]陣列處理
						v= v.replace(/\\[(\\d+) bytes\\]/g, '[$1]');
						//針對int[]處理,去掉最後一個多出來的','
						v= v.replace(/,\\]/g, ']');
						//接下針對taglist
						//如果一開始就是taglist的話就把頭尾換掉
						v= v.replace(/^\\[/g, '{');
						v= v.replace(/\\]$/g, '}');
						//全部[]通通轉換成{}
						v= v.replace(/:\\[/g, ':{');
						v= v.replace(/\\](,|}){1}/g, '}$1');
						//還原被一起轉換的int[]byte[]
						v= v.replace(/:{(\\d+(,\\d+)*)}/g, ':[$1]');
						
						v = eval('('+v+')');
					}catch(e){
						throw ( 'error: '+e);
					}
					return v;
			}
