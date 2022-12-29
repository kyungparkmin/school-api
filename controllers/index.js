const { getSchool } = require('../utils');


exports.getSchool = async (req, res, next) => {
  try {
    const data = await getSchool(req.params.name);

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
}



