const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const getSchool = async (name) => {
  const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=${name}&KEY=${process.env.NEIS_KEY}`

  //url = https://open.neis.go.kr/hub/schoolInfo?Type=json&pSize=10&SCHUL_NM=경북소프트&KEY=37e50690809b4850988d26024975c558

  const response = await fetch(url);

  return await response.json();
}

const getMeal = async () => {

}

router.get('/:name', async (req, res, next) => {


  try {
    const data = await getSchool(req.params.name);

    console.log(data.schoolInfo[1].row[0].SCHUL_NM);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
