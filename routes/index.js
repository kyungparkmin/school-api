const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const getSchool = async (name) => {
  const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=${name}&KEY=${process.env.NEIS_KEY}`

  //url = https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=경북소프트&KEY=37e50690809b4850988d26024975c558

  const response = await fetch(url);

  return await response.json();
}

const getMeal = async (sc_code, schul_code) => {
  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_KEY}&Type=json&plndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${sc_code}&SD_SCHUL_CODE=${schul_code}&MLSV_YMD=20221221`;

  let response = await fetch(url);

  return await response.json();
}

router.get('/:name', async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드

    const meal = await getMeal(sc_code, schul_code);

    const arr = [];

    const breakfast = meal.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>");
    const lunch = meal.mealServiceDietInfo[1].row[1].DDISH_NM.split("<br/>");
    const dinner = meal.mealServiceDietInfo[1].row[2].DDISH_NM.split("<br/>");

    arr.push({
      "breakfast" : breakfast,
      "lunch": lunch,
      "dinner": dinner
    });

    res.status(200).json({ menu: arr, data });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/')

module.exports = router;
