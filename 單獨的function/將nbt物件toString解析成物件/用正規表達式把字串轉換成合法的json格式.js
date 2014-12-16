function p(v){
		v= v.replace(/^\\[/g, '{');
		v= v.replace(/\\]$/g, '}');		
		v= v.replace(/([0-9]+)(s|b|f|L|d)(,|})/g, '$1$3');
		v= v.replace(/(,|{){1}([^{},:]+):{1}/g, '$1\"$2\":');
		v= v.replace(/\\[(\\d+) bytes\\]/g, '[$1]');
		v= v.replace(/,\\]/g, ']');
		v = eval('('+v+')');
			return v;
		}