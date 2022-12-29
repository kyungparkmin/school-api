const fetch = require("node-fetch");

exports.getSchool = async (name) => {
  const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=${name}&KEY=${process.env.NEIS_KEY}`

  //url = https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=경북소프트&KEY=37e50690809b4850988d26024975c558

  const response = await fetch(url);

  return await response.json();
}

exports.getMeal = async (sc_code, schul_code, date) => {

  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_KEY}&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${sc_code}&SD_SCHUL_CODE=${schul_code}&MLSV_YMD=${date}`;

  console.log(url);
  // https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=37e50690809b4850988d26024975c558&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750767&MLSV_YMD=20221227
  const response = await fetch(url);

  const data = await response.json();

  const length = data.mealServiceDietInfo[0].head[0].list_total_count;

  console.log(length);

  const arr = [];

  if(length === 1) {
    const meal = data.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>");
    const mealname = data.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;

    arr.push({[mealname] : meal});
  } else {
    for (let i = 0; i < length; i++) {
      const meal = data.mealServiceDietInfo[1].row[i].DDISH_NM.split("<br/>");
      const mealname = data.mealServiceDietInfo[1].row[i].MMEAL_SC_NM;

      arr.push({[mealname] : meal })
    }
  }
  return arr;
}

exports.getOneMeal = async (sc_code, schul_code, date, type) => {
  if(date === undefined) {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (1 + today.getMonth())).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    date = year + month + day;

    console.log(date);
  }

  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_KEY}&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${sc_code}&SD_SCHUL_CODE=${schul_code}&MLSV_YMD=${date}`;

  console.log(url);

  const response = await fetch(url);

  const data = await response.json();

  switch(type){
    case '조식':
      break;
    case '중식':
      break;
    case '석식':
      break;
  }
}