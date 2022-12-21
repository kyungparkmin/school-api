const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const getSchool = async (name) => {
  const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=${name}&KEY=${process.env.NEIS_KEY}`

  //url = https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=경북소프트&KEY=37e50690809b4850988d26024975c558

  const response = await fetch(url);

  return await response.json();
}

const getMeal = async (sc_code, schul_code, date) => {
  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_KEY}&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${sc_code}&SD_SCHUL_CODE=${schul_code}&MLSV_YMD=${date}`;
  // https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=37e50690809b4850988d26024975c558&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750767&MLSV_YMD=20221227
  let response = await fetch(url);

  let data = await response.json();

  let length = data.mealServiceDietInfo[0].head[0].list_total_count;

   /*switch(length){
      case 1:
        console.log('1');
        return 1;
     case 2:
       console.log('2');
       return 2;
     case 3:
       console.log('3');
       return 3;
    }*/


  return data;
}

router.get('/school/meal/:name/:date', async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드

    // 20221221
    const date = req.params.date;

    const meal = await getMeal(sc_code, schul_code, date);

    const arr = [];

    const breakfast = meal.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>");
    const lunch = meal.mealServiceDietInfo[1].row[1].DDISH_NM.split("<br/>");
    const dinner = meal.mealServiceDietInfo[1].row[2].DDISH_NM.split("<br/>");

    arr.push({
      "breakfast" : breakfast,
      "lunch": lunch,
      "dinner": dinner
    });

    res.status(200).json({
      status: {
        code: 200,
        message: "급식 정보를 불러오는데 성공하였습니다"
      },
      menu: arr,
      data,
      meal
    });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(400).json({
      code: 400,
      message: "급식 데이터가 없습니다"
    });
  }
})

router.get('/school/info/:name', async (req, res,next) => {
  try {
    const data = await getSchool(req.params.name);

    console.log(data.schoolInfo[1].row[0]);

    const info = data.schoolInfo[1].row[0];

    res.status(200).json({
      status: {
        code: 200,
        message: '학교 정보 조회에 성공하였습니다'
      },
      data: info
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
