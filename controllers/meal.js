const { getMeal, getOneMeal, getSchool } = require("../utils");

exports.getMeals = async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드
    const school_name = data.schoolInfo[1].row[0].SCHUL_NM; //학교명

    let date = req.params.date; // 20221221

    const meal = await getMeal(sc_code, schul_code, date);

    date = date.slice(0, 4) + '년 ' + date.slice(4, 6) + '월 ' + date.slice(6, 8) + '일';

    res.status(200).json({
      status: {
        code: 200,
        message: `급식 정보를 불러오는데 성공하였습니다`,
      },
      date: `${date}`,
      school: `${school_name}`,
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
}

exports.getTodayMeals = async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드
    const school_name = data.schoolInfo[1].row[0].SCHUL_NM; //학교명

    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    date = year + month + day;

    const meal = await getMeal(sc_code, schul_code, date);

    date = date.slice(0, 4) + '년 ' + date.slice(4, 6) + '월 ' + date.slice(6, 8) + '일';

    res.status(200).json({
      status: {
        code: 200,
        message: `급식 정보를 불러오는데 성공하였습니다`,
      },
      date: `${date}`,
      school: `${school_name}`,
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
}

exports.getMeal = async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

    const sc_code = data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const schul_code = data.schoolInfo[1].row[0].SD_SCHUL_CODE; // 표준학교코드
    const school_name = data.schoolInfo[1].row[0].SCHUL_NM; //학교명

    let date = req.params.date; // 20221221
    let type = req.params.type;

    const meal = await getOneMeal(sc_code, schul_code, date, type);

  } catch(err) {
    console.error(err);
    next(err);
  }
}