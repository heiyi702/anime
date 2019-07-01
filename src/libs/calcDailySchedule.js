export default function calcDailySchedule(year,month,date,themonth,prevmonth,nextmonth,nowshowyear,nowshowmonth){
	var result = [];
	 
	//首先判断当前指向的情况
	if(month == nowshowmonth){
		//指向本月的，需要遍历上月的和本月的
		prevmonth.forEach((item,index) => {
			item.schedule.forEach((schedule) =>{
				//判断这个长时间事件有没有影响今天
				if(schedule.during - (prevmonth.length - item.day + 1) >= date){
					result.push(schedule);
				}
			});
		});


		themonth.forEach((item,index)=>{
			item.schedule.forEach((schedule) =>{
				//判断这个长时间事件有没有影响今天
				if(date <= schedule.during + item.day - 1 && date >= item.day){
					result.push(schedule);
				}
			})
		});
	}else if(nowshowmonth != 12 && nowshowmonth == month - 1 || nowshowmonth == 12 && month == 1){
		//指向下月，需要遍历本月和下月
		themonth.forEach((item,index) => {
			item.schedule.forEach((schedule) =>{
				//判断这个长时间事件有没有影响今天
				if(schedule.during - (themonth.length - item.day + 1) > date){
					result.push(schedule);
				}
			});
		});


		nextmonth.forEach((item,index)=>{
			item.schedule.forEach((schedule) =>{
				//判断这个长时间事件有没有影响今天
				if(date <= schedule.during + item.day - 1 && date >= item.day){
					result.push(schedule);
				}
			})
		});

		
	}else if(nowshowmonth != 1 && nowshowmonth == month + 1 || nowshowmonth == 1 && month == 12){
		//指向上月，需要遍历上月
		prevmonth.forEach((item,index) => {
			item.schedule.forEach((schedule) =>{
				//判断这个长时间事件有没有影响今天
				if(schedule.during + item.day - 1 >= date){
					result.push(schedule);
				}
			});
		});
	}
console.log(result)
	return result;
}