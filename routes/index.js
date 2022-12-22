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
  const response = await fetch(url);

  const data = await response.json();

  const length = data.mealServiceDietInfo[0].head[0].list_total_count;

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

router.get('/school/meal/:name/:date', async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드

    // 20221221
    let date = req.params.date;

    const meal = await getMeal(sc_code, schul_code, date);

    date = date.slice(0, 4) + '년 ' + date.slice(4, 6) + '월 ' + date.slice(6, 8) + '일';

    res.status(200).json({
      status: {
        code: 200,
        message: `${date}의 급식 정보를 불러오는데 성공하였습니다`
      },
      meal
    });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(400).json({
      code: 400,
      message: "급식 정보가 없습니다"
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
